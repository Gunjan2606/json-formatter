import { useState, useCallback, useRef } from 'react';
import { useToast } from './use-toast';

export const useJSONFormatter = () => {
  const [input, setInput] = useState('{\n  "name": "JSON Formatter",\n  "version": "1.0.0",\n  "features": ["Fast", "Beautiful", "Powerful"]\n}');
  const [output, setOutput] = useState("");
  const [isMinified, setIsMinified] = useState(false);
  const [activeMode, setActiveMode] = useState<'format' | 'minify'>('format');
  const [error, setError] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sortKeys, setSortKeys] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [largeOutputData, setLargeOutputData] = useState<string | null>(null);
  const [largeInputData, setLargeInputData] = useState<string | null>(null);
  const largeInputDataRef = useRef<string | null>(null);
  const { toast } = useToast();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortObjectKeys = useCallback((obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((sorted: any, key) => {
          sorted[key] = sortObjectKeys(obj[key]);
          return sorted;
        }, {});
    }
    return obj;
  }, []);

  const formatJSON = useCallback((minify: boolean = false, textOverride?: string) => {
    const textToFormat = textOverride !== undefined ? textOverride : (largeInputDataRef.current || largeInputData || input);
    
    if (!textToFormat || textToFormat.trim().length === 0) {
      toast({
        title: "No Input",
        description: "Please paste or upload JSON data to format.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }
    
    setError(null);
    setIsProcessing(true);
    setUploadProgress(0);
    
    if (!textOverride) {
      setOutput('');
      setLargeOutputData(null);
    }
    
    // Use worker for processing
    if (typeof Worker !== 'undefined') {
      try {
        const worker = new Worker('/json-worker.js');
        
        const timeout = setTimeout(() => {
          worker.terminate();
          toast({
            title: "Processing Timeout",
            description: "Processing took too long. Try a smaller file.",
            variant: "destructive",
          });
          setIsProcessing(false);
        }, 30000);
        
        worker.onmessage = (event) => {
          clearTimeout(timeout);
          const { success, formatted, error: errorMsg, line, column } = event.data;
          
          if (success) {
            const outputSizeMB = formatted.length / (1024 * 1024);
            const MONACO_OUTPUT_LIMIT = 30;
            
            if (outputSizeMB < MONACO_OUTPUT_LIMIT) {
              setOutput(formatted);
              setLargeOutputData(null);
              setIsMinified(minify);
              setUploadProgress(0);
              setError(null);
            } else {
              setLargeOutputData(formatted);
              setOutput('');
              setIsMinified(minify);
              setUploadProgress(0);
              setError(null);
            }
          } else {
            setError({ message: errorMsg, line, column });
            setUploadProgress(0);
          }
          setIsProcessing(false);
          worker.terminate();
        };
        
        worker.onerror = () => {
          clearTimeout(timeout);
          worker.terminate();
          // Fallback to direct processing
          try {
            let parsed = JSON.parse(textToFormat);
            if (sortKeys) parsed = sortObjectKeys(parsed);
            const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
            setOutput(formatted);
            setIsMinified(minify);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (e: any) {
            setError({ message: e.message });
          }
          setIsProcessing(false);
        };
        
        worker.postMessage({ action: minify ? 'minify' : 'format', data: textToFormat, sortKeys });
      } catch {
        // Direct processing fallback
        try {
          let parsed = JSON.parse(textToFormat);
          if (sortKeys) parsed = sortObjectKeys(parsed);
          const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
          setOutput(formatted);
          setIsMinified(minify);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          const errorMatch = e.message.match(/position (\d+)/);
          const position = errorMatch ? parseInt(errorMatch[1]) : 0;
          const lines = textToFormat.substring(0, position).split('\n');
          setError({
            message: e.message,
            line: lines.length,
            column: lines[lines.length - 1].length + 1,
          });
        }
        setIsProcessing(false);
      }
    } else {
      // Direct processing
      try {
        let parsed = JSON.parse(textToFormat);
        if (sortKeys) parsed = sortObjectKeys(parsed);
        const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
        setOutput(formatted);
        setIsMinified(minify);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const errorMatch = e.message.match(/position (\d+)/);
        const position = errorMatch ? parseInt(errorMatch[1]) : 0;
        const lines = textToFormat.substring(0, position).split('\n');
        setError({
          message: e.message || 'Invalid JSON format',
          line: lines.length,
          column: lines[lines.length - 1].length + 1,
        });
      } finally {
        setIsProcessing(false);
      }
    }
  }, [input, largeInputData, toast, sortKeys, sortObjectKeys]);

  return {
    input,
    setInput,
    output,
    setOutput,
    isMinified,
    setIsMinified,
    activeMode,
    setActiveMode,
    error,
    setError,
    isProcessing,
    setIsProcessing,
    sortKeys,
    setSortKeys,
    uploadProgress,
    setUploadProgress,
    largeOutputData,
    setLargeOutputData,
    largeInputData,
    setLargeInputData,
    largeInputDataRef,
    formatJSON,
  };
};


"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "../components/ui/button";

// Polyfill Buffer for browser environment (Monaco Editor compatibility)
if (typeof window !== 'undefined' && typeof (window as any).Buffer === 'undefined') {
  (window as any).Buffer = function() {
    return new Uint8Array();
  };
  (window as any).Buffer.isBuffer = () => false;
  (window as any).Buffer.from = (data: any) => new Uint8Array();
  (window as any).Buffer.alloc = (size: number) => new Uint8Array(size);
}
import {
  Copy,
  Download,
  Minimize2,
  Maximize2,
  Code,
  FileJson,
  Palette,
  Settings,
  AlertCircle,
  Search,
  ArrowUpDown,
  Upload,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { ErrorDisplay } from "../components/formatter/ErrorDisplay";
import { ThemeSelector } from "../components/formatter/ThemeSelector";

const Editor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Loading editor...
      </div>
    ),
  }
);

const Index = () => {
  const [input, setInput] = useState('{\n  "name": "JSON Formatter",\n  "version": "1.0.0",\n  "features": ["Fast", "Beautiful", "Powerful"]\n}');
  const [output, setOutput] = useState("");
  const [isMinified, setIsMinified] = useState(false);
  const [error, setError] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [isProcessing, setIsProcessing] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [sortKeys, setSortKeys] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [largeOutputData, setLargeOutputData] = useState<string | null>(null); // Store large output separately
  const [largeInputData, setLargeInputData] = useState<string | null>(null); // Store large input separately
  const largeInputDataRef = useRef<string | null>(null); // Immediate access without state delay
  const inputEditorRef = useRef<any>(null);
  const outputEditorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const sortObjectKeys = useCallback((obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce((sorted: any, key) => {
          sorted[key] = sortObjectKeys(obj[key]);
          return sorted;
        }, {});
    }
    return obj;
  }, []);

  const formatJSON = useCallback((minify: boolean = false, textOverride?: string) => {
    // Use priority: textOverride > ref > largeInputData > input
    const textToFormat = textOverride !== undefined ? textOverride : (largeInputDataRef.current || largeInputData || input);
    const sizeMB = textToFormat.length / (1024 * 1024);
    
    console.log('=== formatJSON called ===');
    console.log('Size:', sizeMB.toFixed(2) + 'MB');
    console.log('Using override:', textOverride !== undefined);
    console.log('Using ref:', !!largeInputDataRef.current);
    console.log('Using largeInputData:', !!largeInputData);
    console.log('First 100 chars:', textToFormat.substring(0, 100));
    
    // Check if trying to format the info message
    if (textToFormat.includes('📁') || textToFormat.includes('File:') || textToFormat.includes('File too large') || textToFormat.includes('Processing with streaming')) {
      console.error('❌ Attempted to format info message - data not ready yet');
      setError({ message: 'Large file is still loading. Please wait...' });
      setIsProcessing(false);
      return;
    }
    
    if (!textToFormat || textToFormat.trim().length === 0) {
      console.error('❌ Empty input provided to formatJSON');
      setError({ message: 'No JSON to format. Please paste or upload JSON data.' });
      setIsProcessing(false);
      return;
    }
    
    setError(null);
    setIsProcessing(true);
    setUploadProgress(0);
    
    // Clear output immediately when starting to format
    if (!textOverride) {
      setOutput('');
      setLargeOutputData(null);
    }
    
    // Use simple worker for all files (Clarinet has CDN issues)
    if (typeof Worker !== 'undefined') {
      try {
        const worker = new Worker('/json-worker.js');
        const startTime = performance.now();
        
        const timeout = setTimeout(() => {
          worker.terminate();
          toast({
            title: "Processing Timeout",
            description: "Processing took too long. Try a smaller file.",
            variant: "destructive",
          });
          setIsProcessing(false);
        }, 30000); // 30 second timeout
        
        worker.onmessage = (event) => {
          clearTimeout(timeout);
          const { success, formatted, error: errorMsg, line, column } = event.data;
          const endTime = performance.now();
          
          console.log('Worker response:', { success, hasFormatted: !!formatted, error: errorMsg });
          
          if (success) {
            const outputSizeMB = formatted.length / (1024 * 1024);
            const MONACO_OUTPUT_LIMIT = 50; // Monaco crashes above ~50MB
            
            console.log('✅ Format successful, output size:', outputSizeMB.toFixed(2) + 'MB');
            
            if (outputSizeMB < MONACO_OUTPUT_LIMIT) {
              // Safe to display in Monaco
              setOutput(formatted);
              setLargeOutputData(null); // Clear any previous large output
              setIsMinified(minify);
              setUploadProgress(0);
            } else {
              // Output too large - store separately and show message
              console.log('⚠️  Output too large for editor ('+outputSizeMB.toFixed(1)+'MB), storing for download');
              setLargeOutputData(formatted); // Store for download
              setOutput(`✓ Formatting complete!\n\n📊 Output size: ${outputSizeMB.toFixed(1)} MB\n\n⚠️  Too large to display in editor (Monaco limit: ~50 MB)\n\n✅ Formatted JSON is ready for download\n\n👉 Click the Download button above to save your formatted file.\n\nNote: Attempting to display ${outputSizeMB.toFixed(0)}MB would crash your browser.`);
              setIsMinified(minify);
              setUploadProgress(0);
            }
          } else {
            console.error('Worker error:', errorMsg, 'Line:', line, 'Column:', column);
            setError({
              message: errorMsg,
              line,
              column,
            });
            setUploadProgress(0);
          }
          setIsProcessing(false);
          worker.terminate();
        };
        
        worker.onerror = (error) => {
          clearTimeout(timeout);
          console.error('Worker error:', error);
          worker.terminate();
          
          // Fallback to direct processing
          try {
            let parsed = JSON.parse(textToFormat);
            if (sortKeys) {
              parsed = sortObjectKeys(parsed);
            }
      const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsMinified(minify);
          } catch (e: any) {
            setError({ message: e.message });
          }
          setIsProcessing(false);
        };
        
        worker.postMessage({
          action: minify ? 'minify' : 'format',
          data: textToFormat,
          sortKeys: sortKeys
        });
      } catch (err) {
        console.error('Failed to create worker:', err);
        // Fallback to direct processing
        try {
          let parsed = JSON.parse(textToFormat);
          if (sortKeys) {
            parsed = sortObjectKeys(parsed);
          }
          const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
          setOutput(formatted);
          setIsMinified(minify);
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
    }
    // Fallback: Direct processing (no worker support)
    else {
      try {
        let parsed = JSON.parse(textToFormat);
        if (sortKeys) {
          parsed = sortObjectKeys(parsed);
        }
        const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
        setOutput(formatted);
        setIsMinified(minify);
      } catch (e: any) {
        console.error('JSON processing error:', e);
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

  const copyToClipboard = useCallback(() => {
    const textToCopy = largeOutputData || output || largeInputData || input;
    navigator.clipboard.writeText(textToCopy);
    // Copied - no toast needed
  }, [output, input, largeOutputData, largeInputData]);

  const downloadJSON = useCallback(() => {
    // Use large output data if available, otherwise use output or input
    const dataToDownload = largeOutputData || output || largeInputData || input;
    const blob = new Blob([dataToDownload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = largeOutputData ? "formatted-large.json" : "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
    // Downloaded - no toast needed
  }, [output, input, largeOutputData, largeInputData]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const formatCount = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const handleSearch = useCallback(() => {
    // Open find widget in both editors directly
    if (inputEditorRef.current) {
      inputEditorRef.current.trigger('keyboard', 'actions.find');
    }
    if (outputEditorRef.current) {
      outputEditorRef.current.trigger('keyboard', 'actions.find');
    }
  }, []);

  const handleFileUpload = useCallback(async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const sizeMB = file.size / (1024 * 1024);

    setIsProcessing(true);
    setUploadProgress(10);
    setError(null);
    
    // Clear previous output and data
    setOutput('');
    setLargeOutputData(null);
    setLargeInputData(null);
    largeInputDataRef.current = null;

    try {
      console.log('Reading file:', file.name, 'Size:', sizeMB.toFixed(2) + 'MB');
      setUploadProgress(30);
      const text = await file.text();
      console.log('File read successfully, length:', text.length);
      setUploadProgress(50);
      
      const EDITOR_SAFE_LIMIT = 50; // Monaco can handle up to ~50MB
      
      if (sizeMB < EDITOR_SAFE_LIMIT) {
        // Small files: Load into editor and format normally
        setInput(text);
        setLargeInputData(null); // Clear any previous large data
        largeInputDataRef.current = null;
        setUploadProgress(60);
        
        setTimeout(() => {
          console.log('Starting auto-format...');
          formatJSON(false, text);
        }, 500);
      } else {
        // Large files: DON'T load into editor (will crash Monaco)
        // Store the actual data and show info message
        largeInputDataRef.current = text; // Store immediately in ref for instant access
        setLargeInputData(text); // Also store in state for downloads
        setInput(`📁 File: ${file.name}\n📊 Size: ${sizeMB.toFixed(1)} MB\n\n⚠️  File too large to display in editor (Monaco limit: ~50 MB)\n\n🔄 Processing with streaming parser...\n\nFormatted output will:\n  • Stream progressively to output panel (if < 50 MB)\n  • Be available for download (if ≥ 50 MB)\n\nProcessing may take 10-60 seconds for large files...\nPlease wait...`);
        setUploadProgress(60);
        
        // Format in worker - pass text directly to avoid state timing issues
        setTimeout(() => {
          console.log('Processing large file with streaming parser...');
          formatJSON(false, text); // Pass text directly for auto-format
        }, 300);
      }
      
    } catch (err: any) {
      console.error('File read error:', err);
      setError({ message: 'File read error: ' + err.message });
      setUploadProgress(0);
      setIsProcessing(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [formatJSON]);

  // Handle Ctrl/Cmd + F to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        handleSearch();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSearch]);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const container = document.getElementById('editor-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
        if (newLeftWidth > 20 && newLeftWidth < 80) {
          setLeftWidth(newLeftWidth);
        }
      }
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className={`border-b border-border bg-card transition-all duration-300 ${
        isFullscreen ? 'py-1' : ''
      }`}>
        <div className={`container mx-auto px-4 transition-all duration-300 ${
          isFullscreen ? 'py-1' : 'py-4'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!isFullscreen && (
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                <FileJson className="w-6 h-6 text-primary-foreground" />
              </div>
              )}
              <div>
                <h1 className={`font-bold text-foreground transition-all duration-300 ${
                  isFullscreen ? 'text-sm' : 'text-2xl'
                }`}>
                  JSON Formatter
                </h1>
                {!isFullscreen && (
                <p className="text-sm text-muted-foreground">Fast, beautiful, and powerful</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className={isFullscreen ? 'h-7 w-7' : ''}
              >
                <Upload className={`${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearch}
                className={isFullscreen ? 'h-7 w-7' : ''}
                title="Search (Cmd/Ctrl+F)"
              >
                <Search className={`${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </Button>
              {!isFullscreen && <ThemeSelector theme={editorTheme} onThemeChange={setEditorTheme} />}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className={isFullscreen ? 'h-7 w-7' : ''}
              >
                {isFullscreen ? <Minimize2 className={`${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Upload/Processing Progress */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {uploadProgress < 30 ? 'Reading file' : 
                 uploadProgress < 60 ? 'Processing' : 
                 uploadProgress < 90 ? 'Formatting' : 'Finalizing'}: {uploadProgress}%
              </span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              {uploadProgress > 30 && (
                <span className="text-xs text-primary font-medium">
                  🚀 Processing in background
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && <ErrorDisplay error={error} />}

      {/* Editors */}
      <div id="editor-container" className={`flex-1 flex flex-col md:flex-row overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'p-2' : 'p-4'
      }`}>
        {/* Input Editor */}
        <div 
          className="flex flex-col min-h-[400px] rounded-lg overflow-hidden border border-border bg-card"
          style={{ width: `${leftWidth}%` }}
        >
          <div className={`px-4 border-b border-border flex items-center justify-between bg-secondary/50 transition-all duration-300 ${
            isFullscreen ? 'py-1' : 'py-2'
          }`}>
            <div className="flex items-center gap-2">
              {!isFullscreen && <Code className="w-4 h-4" />}
              <span className={`font-medium flex items-center gap-2 ${isFullscreen ? 'text-xs' : 'text-sm'}`}>
              Input
            </span>
            <span className="text-xs text-muted-foreground">
                {formatCount(input.length)}
            </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setSortKeys(!sortKeys)}
                size="sm"
                variant={sortKeys ? "default" : "ghost"}
                className={`text-xs transition-all duration-200 ${isFullscreen ? 'h-6 px-2' : 'h-7'} ${
                  sortKeys ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
                }`}
              >
                <ArrowUpDown className="w-3 h-3 mr-1" />
                {!isFullscreen && "Sort"}
              </Button>
              <div className="w-px h-4 bg-border" />
              <Button
                onClick={() => formatJSON(false)}
                size="sm"
                variant="default"
                className={`text-xs transition-all duration-200 hover:bg-primary/90 active:scale-95 ${isFullscreen ? 'h-6 px-2' : 'h-7'}`}
                disabled={isProcessing}
              >
                <Code className="w-3 h-3 mr-1" />
                Format
              </Button>
              <Button
                onClick={() => formatJSON(true)}
                size="sm"
                variant="default"
                className={`text-xs transition-all duration-200 hover:bg-primary/90 active:scale-95 ${isFullscreen ? 'h-6 px-2' : 'h-7'}`}
                disabled={isProcessing}
              >
                <Minimize2 className="w-3 h-3 mr-1" />
                Minify
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="json"
              value={input}
              onChange={(value) => setInput(value || "")}
              theme={editorTheme}
              onMount={(editor) => {
                inputEditorRef.current = editor;
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                find: {
                  addExtraSpaceOnTop: false,
                  autoFindInSelection: 'never',
                  seedSearchStringFromSelection: 'never',
                },
              }}
            />
          </div>
        </div>

        {/* Resizable Divider */}
        <div 
          className="hidden md:flex items-center justify-center w-2 cursor-col-resize hover:bg-primary/20 active:bg-primary/30 transition-colors"
          onMouseDown={handleMouseDown}
          style={{ 
            userSelect: 'none',
            touchAction: 'none'
          }}
        >
          <div className="h-12 w-1 bg-border rounded-full" />
        </div>

        {/* Output Editor */}
        <div 
          className="flex flex-col min-h-[400px] rounded-lg overflow-hidden border border-border bg-card"
          style={{ width: `calc(${100 - leftWidth}% - 0.5rem)` }}
        >
          <div className={`px-4 border-b border-border flex items-center justify-between bg-secondary/50 transition-all duration-300 ${
            isFullscreen ? 'py-1' : 'py-2'
          }`}>
            <div className="flex items-center gap-2">
              {!isFullscreen && <FileJson className="w-4 h-4" />}
              <span className={`font-medium flex items-center gap-2 ${isFullscreen ? 'text-xs' : 'text-sm'}`}>
              Output
              </span>
              {output && (
                <span className={`text-xs px-2 py-0.5 rounded ${
                  isMinified 
                    ? 'bg-orange-500/20 text-orange-500' 
                    : 'bg-green-500/20 text-green-500'
                }`}>
                  {isMinified ? 'Minified' : 'Formatted'}
                </span>
              )}
            <span className="text-xs text-muted-foreground">
                {formatCount(output.length)}
            </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={copyToClipboard}
                size="sm"
                variant="ghost"
                className={`text-xs transition-all duration-200 hover:bg-secondary active:scale-95 ${isFullscreen ? 'h-6 px-2' : 'h-7'}`}
                disabled={!output}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
              <Button
                onClick={downloadJSON}
                size="sm"
                variant="ghost"
                className={`text-xs transition-all duration-200 hover:bg-secondary active:scale-95 ${isFullscreen ? 'h-6 px-2' : 'h-7'}`}
                disabled={!output}
              >
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="json"
              value={output}
              theme={editorTheme}
              onMount={(editor) => {
                outputEditorRef.current = editor;
              }}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                find: {
                  addExtraSpaceOnTop: false,
                  autoFindInSelection: 'never',
                  seedSearchStringFromSelection: 'never',
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      {!isFullscreen && (
        <footer className="border-t border-border bg-card py-2 px-4">
          <div className="container mx-auto flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-xs">
              {(() => {
                const sizeMB = input.length / (1024 * 1024);
                if (sizeMB > 50) return <span className="text-primary">🌊 Streaming ({formatCount(input.length)})</span>;
                if (input.length > 100000) return <span className="text-primary">🚀 Worker ({formatCount(input.length)})</span>;
                return null;
              })()}
          </div>
          <div className="flex items-center gap-2">
              {isProcessing && <span className="text-primary">Processing...</span>}
          </div>
        </div>
      </footer>
      )}
    </div>
  );
};

export default Index;

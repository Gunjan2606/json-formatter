"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "../components/ui/button";

// Polyfill Buffer for browser environment (Monaco Editor compatibility)
/* eslint-disable @typescript-eslint/no-explicit-any */
if (typeof window !== 'undefined' && typeof (window as any).Buffer === 'undefined') {
  (window as any).Buffer = function() {
    return new Uint8Array();
  };
  (window as any).Buffer.isBuffer = () => false;
  (window as any).Buffer.from = () => new Uint8Array();
  (window as any).Buffer.alloc = (size: number) => new Uint8Array(size);
}
/* eslint-enable @typescript-eslint/no-explicit-any */
import {
  Copy,
  Download,
  Minimize2,
  Maximize2,
  Code,
  FileJson,
  Search,
  ArrowUpDown,
  Upload,
  Save,
  History,
  BrushCleaning,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { ErrorDisplay } from "../components/formatter/ErrorDisplay";
import { RecentOutputs } from "../components/formatter/RecentOutputs";
import { saveOutput, getAllOutputs } from "../lib/storage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { FileUpload } from "../components/ui/file-upload";

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
  const [activeMode, setActiveMode] = useState<'format' | 'minify'>('format'); // Format is default
  const [error, setError] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorTheme = "vs-dark"; // Fixed to dark mode
  const [isProcessing, setIsProcessing] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [sortKeys, setSortKeys] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [largeOutputData, setLargeOutputData] = useState<string | null>(null); // Store large output separately
  const [largeInputData, setLargeInputData] = useState<string | null>(null); // Store large input separately
  const largeInputDataRef = useRef<string | null>(null); // Immediate access without state delay
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputEditorRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const outputEditorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshSidebar, setRefreshSidebar] = useState(0);
  const [savedOutputsCount, setSavedOutputsCount] = useState(0);
  const [showLargeFileModal, setShowLargeFileModal] = useState(false);
  const [largeFileSize, setLargeFileSize] = useState(0);
  const [showLargePasteWarning, setShowLargePasteWarning] = useState(false);
  const [attemptedPasteSize, setAttemptedPasteSize] = useState(0);

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
    // Use priority: textOverride > ref > largeInputData > input
    const textToFormat = textOverride !== undefined ? textOverride : (largeInputDataRef.current || largeInputData || input);
    const sizeMB = textToFormat.length / (1024 * 1024);
    
    console.log('=== formatJSON called ===');
    console.log('Size:', sizeMB.toFixed(2) + 'MB');
    console.log('Using override:', textOverride !== undefined);
    console.log('Using ref:', !!largeInputDataRef.current);
    console.log('Using largeInputData:', !!largeInputData);
    console.log('First 100 chars:', textToFormat.substring(0, 100));
    
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
    
    // Clear output immediately when starting to format
    if (!textOverride) {
      setOutput('');
      setLargeOutputData(null);
    }
    
    // Use simple worker for all files (Clarinet has CDN issues)
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
        }, 30000); // 30 second timeout
        
        worker.onmessage = (event) => {
          clearTimeout(timeout);
          const { success, formatted, error: errorMsg, line, column } = event.data;
          
          console.log('Worker response:', { success, hasFormatted: !!formatted, error: errorMsg });
          
          if (success) {
            const outputSizeMB = formatted.length / (1024 * 1024);
            const MONACO_OUTPUT_LIMIT = 30; // Monaco crashes above ~30MB
            
            console.log('✅ Format successful, output size:', outputSizeMB.toFixed(2) + 'MB');
            
            if (outputSizeMB < MONACO_OUTPUT_LIMIT) {
              // Safe to display in Monaco
              setOutput(formatted);
              setLargeOutputData(null); // Clear any previous large output
              setIsMinified(minify);
              setUploadProgress(0);
              setError(null); // Clear any previous errors
            } else {
              // Output too large - store separately and show modal
              console.log('⚠️  Output too large for editor ('+outputSizeMB.toFixed(1)+'MB), storing for download');
              setLargeOutputData(formatted); // Store for download
              setLargeFileSize(outputSizeMB);
              setOutput(''); // Keep output editor empty
              setIsMinified(minify);
              setUploadProgress(0);
              setError(null); // Clear any previous errors
              setShowLargeFileModal(true); // Show download modal
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // Close modal if open
    if (showLargeFileModal) {
      setShowLargeFileModal(false);
    }
    // Downloaded - no toast needed
  }, [output, input, largeOutputData, largeInputData, showLargeFileModal]);

  const saveToLocalStorage = useCallback(async () => {
    const dataToSave = largeOutputData || output;
    
    if (!dataToSave || dataToSave.trim().length === 0) {
      toast({
        title: "Nothing to save",
        description: "Please format JSON first before saving.",
        variant: "destructive",
      });
      return;
    }

    try {
      const sizeMB = dataToSave.length / (1024 * 1024);
      const name = `Formatted ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
      
      await saveOutput(dataToSave, name);
      
      toast({
        title: "Saved!",
        description: `Output saved (${sizeMB.toFixed(1)} MB)`,
      });
      
      // Refresh the sidebar to show the new output
      setRefreshSidebar(prev => prev + 1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error.message || "Could not save output",
        variant: "destructive",
      });
    }
  }, [output, largeOutputData, toast]);

  const handleRestoreFromSidebar = useCallback((content: string) => {
    setInput(content);
    setIsSidebarOpen(false);
    toast({
      title: "Restored!",
      description: "Output restored to input editor",
    });
  }, [toast]);

  const clearOutput = useCallback(() => {
    setOutput('');
    setLargeOutputData(null);
    setError(null);
    setIsMinified(false);
  }, []);

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

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorPaste = useCallback((editor: any) => {
    // Add paste event listener to prevent large pastes
    const editorDomNode = editor.getDomNode();
    if (!editorDomNode) {
      console.warn('Editor DOM node not found');
      return;
    }

    const textArea = editorDomNode.querySelector('textarea');
    if (!textArea) {
      console.warn('Editor textarea not found');
      return;
    }

    const handlePaste = (e: ClipboardEvent) => {
      const pastedText = e.clipboardData?.getData('text');
      if (!pastedText) return;

      const pasteSizeBytes = new Blob([pastedText]).size;
      const pasteSizeMB = pasteSizeBytes / (1024 * 1024);
      const PASTE_LIMIT_MB = 30; // Same as Monaco editor limit

      console.log('Paste detected:', pasteSizeMB.toFixed(2) + 'MB');

      if (pasteSizeMB > PASTE_LIMIT_MB) {
        console.log('⚠️  Paste blocked - too large');
        e.preventDefault(); // Stop the paste
        e.stopPropagation();
        
        setAttemptedPasteSize(pasteSizeMB);
        setShowLargePasteWarning(true);
        
        return false;
      }
    };

    console.log('Paste listener attached to editor');
    textArea.addEventListener('paste', handlePaste, true); // Use capture phase
    
    // Cleanup
    return () => {
      textArea.removeEventListener('paste', handlePaste, true);
    };
  }, []);

  const handleSearch = useCallback(() => {
    // Open find widget in both editors directly
    if (inputEditorRef.current) {
      inputEditorRef.current.trigger('keyboard', 'actions.find');
    }
    if (outputEditorRef.current) {
      outputEditorRef.current.trigger('keyboard', 'actions.find');
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      
      const EDITOR_SAFE_LIMIT = 30; // Monaco can handle up to ~30MB
      
      if (sizeMB < EDITOR_SAFE_LIMIT) {
        // Small files: Load into editor and format normally
        setInput(text);
        setLargeInputData(null); // Clear any previous large data
        largeInputDataRef.current = null;
        setUploadProgress(60);
        
        setTimeout(() => {
          console.log('Starting auto-format in', activeMode, 'mode');
          formatJSON(activeMode === 'minify', text);
        }, 500);
      } else {
        // Large files: DON'T load into editor (will crash Monaco)
        // Store the actual data and keep editor empty
        console.log('⚠️  File too large for editor ('+sizeMB.toFixed(1)+'MB), processing without display');
        largeInputDataRef.current = text; // Store immediately in ref for instant access
        setLargeInputData(text); // Also store in state for downloads
        
        // Clear input FIRST before any processing
        setInput('');
        
        // Clear the editor content directly
        if (inputEditorRef.current) {
          inputEditorRef.current.setValue('');
        }
        
        setUploadProgress(60);
        setIsProcessing(false); // Stop processing indicator
        
        // Format in worker - pass text directly to avoid state timing issues
        setTimeout(() => {
          console.log('Processing large file in', activeMode, 'mode');
          setIsProcessing(true);
          formatJSON(activeMode === 'minify', text); // Pass text directly for auto-format
        }, 300);
      }
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  }, [formatJSON, activeMode]);

  // Handle file selection from FileUpload component
  const handleFileSelect = useCallback(async (file: File) => {
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
      
      const EDITOR_SAFE_LIMIT = 30; // Monaco can handle up to ~30MB
      
      if (sizeMB < EDITOR_SAFE_LIMIT) {
        // Small files: Load into editor and format normally
        setInput(text);
        setLargeInputData(null); // Clear any previous large data
        largeInputDataRef.current = null;
        setUploadProgress(60);
        
        setTimeout(() => {
          console.log('Starting auto-format in', activeMode, 'mode');
          formatJSON(activeMode === 'minify', text);
        }, 500);
      } else {
        // Large files: DON'T load into editor (will crash Monaco)
        // Store the actual data and keep editor empty
        console.log('⚠️  File too large for editor ('+sizeMB.toFixed(1)+'MB), processing without display');
        largeInputDataRef.current = text; // Store immediately in ref for instant access
        setLargeInputData(text); // Also store in state for downloads
        
        // Clear input FIRST before any processing
        setInput('');
        
        // Clear the editor content directly
        if (inputEditorRef.current) {
          inputEditorRef.current.setValue('');
        }
        
        setUploadProgress(60);
        setIsProcessing(false); // Stop processing indicator
        
        // Format in worker - pass text directly to avoid state timing issues
        setTimeout(() => {
          console.log('Processing large file in', activeMode, 'mode');
          setIsProcessing(true);
          formatJSON(activeMode === 'minify', text); // Pass text directly for auto-format
        }, 300);
      }
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('File read error:', err);
      setError({ message: 'File read error: ' + err.message });
      setUploadProgress(0);
      setIsProcessing(false);
    }
  }, [formatJSON, activeMode]);

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

  // Load saved outputs count
  useEffect(() => {
    const loadOutputsCount = async () => {
      const outputs = await getAllOutputs();
      setSavedOutputsCount(outputs.length);
    };
    loadOutputsCount();
  }, [refreshSidebar, isSidebarOpen]);

  // Debug: Log when modal state changes
  useEffect(() => {
    if (showLargePasteWarning) {
      console.log('🎨 Large Paste Warning Modal should now be visible!');
      console.log('attemptedPasteSize:', attemptedPasteSize);
    }
  }, [showLargePasteWarning, attemptedPasteSize]);

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

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className={`border-b border-border bg-card transition-all duration-300 ${
        isFullscreen ? 'py-1' : ''
      }`}>
        <div className={`transition-all duration-300 ${
          isFullscreen ? 'py-1 px-2' : 'py-2.5 px-4'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!isFullscreen && (
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-accent">
                <FileJson className="w-4 h-4 text-primary-foreground" />
              </div>
              )}
              <div>
                <h1 className={`font-bold text-foreground transition-all duration-300 ${
                  isFullscreen ? 'text-sm' : 'text-lg'
                }`}>
                  JSON Formatter
                </h1>
                {!isFullscreen && (
                <p className="text-xs text-muted-foreground">Fast, accurate, and reliable</p>
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
                onClick={handleSearch}
                className={isFullscreen ? 'h-7 w-7' : ''}
                title="Search (Cmd/Ctrl+F)"
              >
                <Search className={`${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className={isFullscreen ? 'h-7 w-7' : ''}
              >
                {isFullscreen ? <Minimize2 className={`${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`${isFullscreen ? 'h-7' : 'h-8'} flex items-center gap-2 px-3`}
                title="Recent Outputs"
              >
                <History className={`${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
                {!isFullscreen && (
                  <span className="text-sm font-medium">
                    History {savedOutputsCount > 0 && `(${savedOutputsCount})`}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Upload/Processing Progress */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="bg-card border-b border-border">
          <div className="px-4 py-2">
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
      <div id="editor-container" className={`flex-1 flex flex-col md:flex-row gap-4 md:gap-0 overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'p-2' : 'p-4'
      }`}>
        {/* Input Editor */}
        <div 
          className="flex flex-col min-h-[400px] rounded-lg overflow-hidden border border-border bg-card"
          style={{ width: isMobile ? '100%' : `${leftWidth}%` }}
        >
          <div className={`px-4 border-b border-border flex items-center justify-between bg-secondary/50 transition-all duration-300 ${
            isFullscreen ? 'py-1' : 'py-2'
          }`}>
            <div className="flex items-center gap-2">
              {!isFullscreen && <Code className="w-4 h-4" />}
              <span className={`font-medium ${isFullscreen ? 'text-xs' : 'text-sm'}`}>
                Input
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className={`${isFullscreen ? 'h-5 w-5' : 'h-6 w-6'}`}
                title="Upload JSON file"
              >
                <Upload className={`${isFullscreen ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
              </Button>
              <span className="text-xs text-muted-foreground">
                {formatFileSize(input.length)}
              </span>
              {/* Hidden file input for upload button */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
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
                onClick={() => {
                  setActiveMode('format');
                  formatJSON(false);
                }}
                size="sm"
                variant={activeMode === 'format' ? "default" : "ghost"}
                className={`text-xs transition-all duration-200 active:scale-95 ${isFullscreen ? 'h-6 px-2' : 'h-7'} ${
                  activeMode === 'format' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
                }`}
                disabled={isProcessing}
              >
                <Code className="w-3 h-3 mr-1" />
                Format
              </Button>
              <Button
                onClick={() => {
                  setActiveMode('minify');
                  formatJSON(true);
                }}
                size="sm"
                variant={activeMode === 'minify' ? "default" : "ghost"}
                className={`text-xs transition-all duration-200 active:scale-95 ${isFullscreen ? 'h-6 px-2' : 'h-7'} ${
                  activeMode === 'minify' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
                }`}
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
              onChange={(value) => {
                // Prevent large content from being loaded
                const sizeMB = (value?.length || 0) / (1024 * 1024);
                if (sizeMB > 30) {
                  console.warn('⚠️  Prevented large content from loading:', sizeMB.toFixed(2) + 'MB');
                  console.log('🚨 Setting modal state to show warning...');
                  
                  // Show warning modal FIRST
                  setAttemptedPasteSize(sizeMB);
                  setShowLargePasteWarning(true);
                  
                  console.log('Modal state set. attemptedPasteSize:', sizeMB, 'showLargePasteWarning:', true);
                  
                  // Clear the editor after a tiny delay to ensure modal shows
                  setTimeout(() => {
                    if (inputEditorRef.current) {
                      inputEditorRef.current.setValue('');
                    }
                  }, 100);
                  
                  return;
                }
                
                setInput(value || "");
                // Move cursor and scroll to start after paste
                if (inputEditorRef.current && value && value.length > input.length + 100) {
                  requestAnimationFrame(() => {
                    inputEditorRef.current?.setPosition({ lineNumber: 1, column: 1 });
                    inputEditorRef.current?.revealLineInCenter(1);
                  });
                }
              }}
              theme={editorTheme}
              onMount={(editor) => {
                inputEditorRef.current = editor;
                handleEditorPaste(editor);
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
          style={{ width: isMobile ? '100%' : `calc(${100 - leftWidth}% - 0.5rem)` }}
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
                {formatFileSize(output.length)}
            </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={saveToLocalStorage}
                size="icon"
                variant="ghost"
                className={`transition-all duration-200 hover:bg-primary hover:text-black active:scale-95 ${isFullscreen ? 'h-6 w-6' : 'h-7 w-7'}`}
                disabled={!output}
                title="Save to Recent Outputs"
              >
                <Save className={`${isFullscreen ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
              </Button>
              <Button
                onClick={copyToClipboard}
                size="icon"
                variant="ghost"
                className={`transition-all duration-200 hover:bg-primary hover:text-black active:scale-95 ${isFullscreen ? 'h-6 w-6' : 'h-7 w-7'}`}
                disabled={!output}
                title="Copy to clipboard"
              >
                <Copy className={`${isFullscreen ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
              </Button>
              <Button
                onClick={downloadJSON}
                size="icon"
                variant="ghost"
                className={`transition-all duration-200 hover:bg-primary hover:text-black active:scale-95 ${isFullscreen ? 'h-6 w-6' : 'h-7 w-7'}`}
                disabled={!output}
                title="Download JSON"
              >
                <Download className={`${isFullscreen ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
              </Button>
              <Button
                onClick={clearOutput}
                size="icon"
                variant="ghost"
                className={`transition-all duration-200 hover:bg-primary hover:text-black active:scale-95 ${isFullscreen ? 'h-6 w-6' : 'h-7 w-7'}`}
                disabled={!output}
                title="Clear Output"
              >
                <BrushCleaning className={`${isFullscreen ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
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
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-xs">
              {(() => {
                const sizeMB = input.length / (1024 * 1024);
                if (sizeMB > 30) return <span className="text-primary">🌊 Large File ({formatCount(input.length)})</span>;
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

      {/* Recent Outputs Sidebar */}
      <RecentOutputs
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onRestore={handleRestoreFromSidebar}
        refreshTrigger={refreshSidebar}
      />

      {/* Large File Ready Modal */}
      <Dialog open={showLargeFileModal} onOpenChange={setShowLargeFileModal}>
        <DialogContent onClose={() => setShowLargeFileModal(false)}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
               All done!
            </DialogTitle>
            <DialogDescription className="pt-4 text-base">
              Your formatted JSON ({largeFileSize.toFixed(0)} MB) is ready — too large to preview, but you can download it below.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button
              onClick={downloadJSON}
              className="w-full sm:w-auto"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download JSON
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Large Paste Warning Modal */}
      <Dialog open={showLargePasteWarning} onOpenChange={setShowLargePasteWarning}>
        <DialogContent onClose={() => setShowLargePasteWarning(false)} className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
               Content Too Large
            </DialogTitle>
            <DialogDescription className="pt-4 text-base">
              <p className="mb-4">
                You&apos;re trying to paste {attemptedPasteSize.toFixed(1)} MB of content, which may make your browser unresponsive. Please upload your file instead.
              </p>
              
              
              {/* Drag and Drop Component */}
              <FileUpload
                onFileSelect={(file) => {
                  setShowLargePasteWarning(false);
                  handleFileSelect(file);
                }}
                accept=".json"
                disabled={false}
                className="w-full"
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

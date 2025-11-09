"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "../components/ui/button";
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
  X,
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
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKeys, setSortKeys] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
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

  const formatJSON = useCallback((minify: boolean = false) => {
    const LARGE_FILE_THRESHOLD = 100000; // 100KB
    setError(null);
    setIsProcessing(true);
    
    // Use Web Worker for large files
    if (input.length > LARGE_FILE_THRESHOLD && typeof Worker !== 'undefined') {
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
          
          if (success) {
            setOutput(formatted);
            setIsMinified(minify);
            toast({
              title: minify ? "JSON Minified" : "JSON Formatted",
              description: `Successfully processed in ${(endTime - startTime).toFixed(0)}ms`,
            });
          } else {
            setError({
              message: errorMsg,
              line,
              column,
            });
            toast({
              title: "Invalid JSON",
              description: `Error at line ${line}, column ${column}`,
              variant: "destructive",
            });
          }
          setIsProcessing(false);
          worker.terminate();
        };
        
        worker.onerror = (error) => {
          clearTimeout(timeout);
          console.error('Worker error:', error);
          toast({
            title: "Processing Error",
            description: "Failed to process JSON. Processing without worker.",
            variant: "destructive",
          });
          worker.terminate();
          
          // Fallback to direct processing
          try {
            let parsed = JSON.parse(input);
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
          data: input,
          sortKeys: sortKeys
        });
      } catch (err) {
        console.error('Failed to create worker:', err);
        // Fallback to direct processing
        try {
          let parsed = JSON.parse(input);
          if (sortKeys) {
            parsed = sortObjectKeys(parsed);
          }
          const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
          setOutput(formatted);
          setIsMinified(minify);
          toast({
            title: minify ? "JSON Minified" : "JSON Formatted",
            description: sortKeys ? "Processed with sorted keys" : "Successfully processed your JSON",
          });
        } catch (e: any) {
          const errorMatch = e.message.match(/position (\d+)/);
          const position = errorMatch ? parseInt(errorMatch[1]) : 0;
          const lines = input.substring(0, position).split('\n');
          setError({
            message: e.message,
            line: lines.length,
            column: lines[lines.length - 1].length + 1,
          });
        }
        setIsProcessing(false);
      }
    } else {
      // Process small files directly
      try {
        let parsed = JSON.parse(input);
        if (sortKeys) {
          parsed = sortObjectKeys(parsed);
        }
        const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
        setOutput(formatted);
        setIsMinified(minify);
        
        toast({
          title: minify ? "JSON Minified" : "JSON Formatted",
          description: sortKeys ? "Processed with sorted keys" : "Successfully processed your JSON",
        });
      } catch (e: any) {
      const errorMatch = e.message.match(/position (\d+)/);
      const position = errorMatch ? parseInt(errorMatch[1]) : 0;
      
      // Calculate line and column from position
      const lines = input.substring(0, position).split('\n');
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;
      
      setError({
        message: e.message,
        line,
        column,
      });
      
      toast({
        title: "Invalid JSON",
        description: `Error at line ${line}, column ${column}`,
        variant: "destructive",
      });
      } finally {
        setIsProcessing(false);
      }
    }
  }, [input, toast, sortKeys, sortObjectKeys]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(output || input);
    toast({
      title: "Copied to clipboard",
      description: "JSON copied successfully",
    });
  }, [output, input, toast]);

  const downloadJSON = useCallback(() => {
    const blob = new Blob([output || input], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "JSON file saved successfully",
    });
  }, [output, input, toast]);

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

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query) return;
    
    // Trigger find in both editors
    if (inputEditorRef.current) {
      const editor = inputEditorRef.current;
      editor.trigger('search', 'actions.find', { searchString: query });
    }
    if (outputEditorRef.current) {
      const editor = outputEditorRef.current;
      editor.trigger('search', 'actions.find', { searchString: query });
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setShowSearch(false);
    // Close find widget in both editors
    if (inputEditorRef.current) {
      inputEditorRef.current.trigger('search', 'closeFindWidget');
    }
    if (outputEditorRef.current) {
      outputEditorRef.current.trigger('search', 'closeFindWidget');
    }
  }, []);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const STREAMING_THRESHOLD = 10 * 1024 * 1024; // 10MB

    // For files larger than 10MB, use streaming
    if (file.size > STREAMING_THRESHOLD && typeof Worker !== 'undefined') {
      setIsStreaming(true);
      setIsProcessing(true);
      setUploadProgress(0);
      setOutput('');
      setError(null);

      try {
        const worker = new Worker('/streaming-worker.js');
        let outputChunks = '';

        worker.onmessage = (e) => {
          const { type, data, percent, message } = e.data;

          if (type === 'progress') {
            setUploadProgress(percent);
          } else if (type === 'chunk') {
            outputChunks += data;
            setOutput(outputChunks);
          } else if (type === 'done') {
            setIsProcessing(false);
            setIsStreaming(false);
            setUploadProgress(100);
            toast({
              title: "File Processed",
              description: `Successfully processed ${(file.size / 1024 / 1024).toFixed(1)}MB file`,
            });
            worker.terminate();
          } else if (type === 'error') {
            setError({ message });
            setIsProcessing(false);
            setIsStreaming(false);
            toast({
              title: "Processing Error",
              description: message,
              variant: "destructive",
            });
            worker.terminate();
          }
        };

        worker.onerror = (error) => {
          console.error('Streaming worker error:', error);
          toast({
            title: "Worker Error",
            description: "Falling back to regular upload...",
            variant: "destructive",
          });
          setIsStreaming(false);
          setIsProcessing(false);
          worker.terminate();
        };

        worker.postMessage({ 
          action: 'format', 
          file, 
          sortKeys 
        });
      } catch (err) {
        console.error('Failed to create streaming worker:', err);
        toast({
          title: "Streaming Failed",
          description: "Loading file normally (may be slow for large files)...",
          variant: "destructive",
        });
        setIsStreaming(false);
        setIsProcessing(false);
      }
    } else {
      // For smaller files, read normally
      try {
        const text = await file.text();
        setInput(text);
        toast({
          title: "File Loaded",
          description: `${file.name} loaded successfully`,
        });
      } catch (err: any) {
        toast({
          title: "File Error",
          description: err.message,
          variant: "destructive",
        });
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [toast, sortKeys]);

  // Handle Escape key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSearch) {
        clearSearch();
      }
      // Ctrl/Cmd + F to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSearch, clearSearch]);

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
                title="Upload JSON file (supports up to 1GB+)"
                className={isFullscreen ? 'h-7 w-7' : ''}
              >
                <Upload className={`${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(!showSearch)}
                title="Search in JSON"
                className={isFullscreen ? 'h-7 w-7' : ''}
              >
                <Search className={`${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </Button>
              {!isFullscreen && <ThemeSelector theme={editorTheme} onThemeChange={setEditorTheme} />}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className={isFullscreen ? 'h-7 w-7' : ''}
              >
                {isFullscreen ? <Minimize2 className={`${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      {showSearch && (
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className={`container mx-auto px-4 transition-all duration-300 ${
            isFullscreen ? 'py-1.5' : 'py-3'
          }`}>
            <div className="flex items-center gap-2 max-w-2xl">
              <Search className={`text-muted-foreground ${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
              <input
                type="text"
                placeholder="Search keys or values..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={`flex-1 bg-background border border-border rounded px-3 focus:outline-none focus:ring-2 focus:ring-primary ${
                  isFullscreen ? 'py-1 text-xs' : 'py-1.5 text-sm'
                }`}
                autoFocus
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className={isFullscreen ? 'h-6' : 'h-7'}
                >
                  <X className={isFullscreen ? 'w-3 h-3' : 'w-4 h-4'} />
                </Button>
              )}
              {!isFullscreen && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  Press Esc to close
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar for Streaming */}
      {isStreaming && uploadProgress > 0 && (
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Processing: {uploadProgress}%
              </span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className="text-xs text-primary font-medium">
                🚀 Streaming mode active
              </span>
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
              <span 
                className="text-xs text-muted-foreground cursor-help" 
                title={`${input.length.toLocaleString()} characters`}
              >
                {formatCount(input.length)} chars
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
                title={sortKeys ? "Sorting enabled - keys will be alphabetically ordered" : "Click to enable key sorting"}
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
              <span 
                className="text-xs text-muted-foreground cursor-help" 
                title={`${output.length.toLocaleString()} characters`}
              >
                {formatCount(output.length)} chars
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
            <div className="flex items-center gap-3">
              <span>Built with ⚡ for speed</span>
              {input.length > 100000 && (
                <>
                  <span className="hidden md:inline">•</span>
                  <span className="hidden md:inline">🚀 Web Worker enabled</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isProcessing ? (
                <span className="text-primary">Processing...</span>
              ) : (
                <span className="hidden md:inline">Press Ctrl+F to search</span>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Index;

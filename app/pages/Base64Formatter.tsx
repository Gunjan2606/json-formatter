"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { ErrorDisplay } from "../components/formatter/ErrorDisplay";
import { RecentOutputs } from "../components/formatter/RecentOutputs";
import { Footer } from "../components/formatter/Footer";
import { Base64InfoSections } from "../components/formatter/Base64InfoSections";
import { useToast } from "../hooks/use-toast";
import { saveOutput, getAllOutputs } from "../lib/storage";
import {
  Lock,
  Save,
  Upload,
  Type,
  Copy,
  Download,
  BrushCleaning,
  Code,
  ArrowLeftRight,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";

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

const Base64Formatter = () => {
  const [input, setInput] = useState("Hello, World! This is a sample text for Base64 encoding and decoding.");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEncoded, setIsEncoded] = useState(false);
  const { toast } = useToast();
  const [editorFontSize, setEditorFontSize] = useState(14);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshSidebar, setRefreshSidebar] = useState(0);
  const [savedOutputsCount, setSavedOutputsCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [textSizeOpen, setTextSizeOpen] = useState(false);
  interface MonacoEditor {
    layout?: () => void;
    getAction?: (actionId: string) => { run: () => void } | null;
  }
  const inputEditorRef = useRef<MonacoEditor | null>(null);
  const outputEditorRef = useRef<MonacoEditor | null>(null);
  const quickUploadInputRef = useRef<HTMLInputElement>(null);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCount = async () => {
      const outputs = await getAllOutputs("base64");
      setSavedOutputsCount(outputs.length);
    };

    loadCount();
  }, [refreshSidebar, isSidebarOpen]);

  const handleEncode = useCallback(() => {
    if (!input.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter text or upload a file to encode.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setIsEncoded(true);
      toast({
        title: "Encoded",
        description: "Text has been encoded to Base64.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to encode";
      setError(errorMessage);
      toast({
        title: "Encoding failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [input, toast]);

  const handleDecode = useCallback(() => {
    if (!input.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter a Base64 string to decode.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Remove whitespace and validate Base64
      const cleaned = input.trim().replace(/\s/g, "");
      
      // Validate Base64 format
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned)) {
        throw new Error("Invalid Base64 string format");
      }

      const decoded = decodeURIComponent(escape(atob(cleaned)));
      setOutput(decoded);
      setIsEncoded(false);
      toast({
        title: "Decoded",
        description: "Base64 string has been decoded.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to decode. Please check if the input is a valid Base64 string.";
      setError(errorMessage);
      toast({
        title: "Decoding failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [input, toast]);

  const handleCopyOutput = useCallback(() => {
    if (!output.trim()) {
      toast({
        title: "Nothing to copy",
        description: "Please encode or decode first.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied",
      description: "Output copied to clipboard.",
    });
  }, [output, toast]);

  const handleDownloadOutput = useCallback(() => {
    if (!output.trim()) {
      toast({
        title: "Nothing to download",
        description: "Please encode or decode first.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isEncoded ? "encoded.txt" : "decoded.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "Output downloaded successfully.",
    });
  }, [output, isEncoded, toast]);

  const handleClearOutput = useCallback(() => {
    setOutput("");
    setIsEncoded(false);
    setError(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (!output.trim()) {
      toast({
        title: "Nothing to save",
        description: "Please encode or decode first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const name = `Base64 ${new Date().toLocaleString()}`;
      await saveOutput(output, name, {
        format: "base64",
        extension: isEncoded ? "txt" : "txt",
        mimeType: "text/plain",
      });
      setRefreshSidebar((prev) => prev + 1);
      setSavedOutputsCount((prev) => prev + 1);
      toast({
        title: "Saved",
        description: "Output saved successfully.",
      });
    } catch {
      toast({
        title: "Save failed",
        description: "Failed to save output.",
        variant: "destructive",
      });
    }
  }, [output, isEncoded, toast]);

  const handleFileSelect = useCallback(async (file: File) => {
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 50MB.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          setInput(content);
          toast({
            title: "File loaded",
            description: "File content loaded. Click Encode to convert to Base64.",
          });
        }
        setIsProcessing(false);
      };
      reader.onerror = () => {
        setError("Failed to read file");
        setIsProcessing(false);
        toast({
          title: "File read failed",
          description: "Failed to read the selected file.",
          variant: "destructive",
        });
      };
      reader.readAsText(file);
    } catch {
      setError("Failed to process file");
      setIsProcessing(false);
      toast({
        title: "File processing failed",
        description: "Failed to process the selected file.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleSwap = useCallback(() => {
    if (output) {
      setInput(output);
      setOutput("");
      setIsEncoded(false);
      setError(null);
    }
  }, [output]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (inputEditorRef.current?.getAction) {
      inputEditorRef.current.getAction("actions.find")?.run();
    }
    if (outputEditorRef.current?.getAction) {
      outputEditorRef.current.getAction("actions.find")?.run();
    }
  }, []);

  const handleQuickUploadClick = () => {
    quickUploadInputRef.current?.click();
  };

  const handleQuickUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    event.target.value = "";
  };

  const FONT_SIZE_OPTIONS = [
    { label: "Small", value: 12 },
    { label: "Medium", value: 14 },
    { label: "Large", value: 16 },
  ];

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (typeof document === "undefined") return;
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    if (typeof document !== "undefined") {
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
      }
    };
  }, []);

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  useEffect(() => {
    const resizeEditors = () => {
      if (inputEditorRef.current?.layout) {
        inputEditorRef.current.layout();
      }
      if (outputEditorRef.current?.layout) {
        outputEditorRef.current.layout();
      }
    };

    const timer = setTimeout(resizeEditors, 150);
    window.addEventListener("resize", resizeEditors);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resizeEditors);
    };
  }, [isFullscreen]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const percentage = (offsetX / rect.width) * 100;
      setLeftWidth(Math.min(80, Math.max(20, percentage)));
    };

    const stopDragging = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [isDragging]);

  const handleSeparatorMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onSearch={handleSearch}
        onToggleSidebar={() => setIsSidebarOpen(true)}
        savedOutputsCount={savedOutputsCount}
        title="Base64 Encoder/Decoder"
        description="Encode and decode Base64 strings"
        icon={<Lock className="w-4 h-4 text-primary-foreground" />}
      />

      {error && (
        <ErrorDisplay
          error={{ message: error }}
          onClose={() => setError(null)}
          title="Error"
        />
      )}

      <main className="flex-1 w-full px-4 py-6">
        <div
          className="w-full mx-auto space-y-6"
          style={{ width: "min(90vw, 1400px)" }}
        >
          <div
            ref={splitContainerRef}
            className="flex flex-col gap-4 lg:flex-row lg:items-stretch"
            style={{
              height: isFullscreen ? "calc(100vh - 60px)" : "80vh",
            }}
          >
            <div
              className="bg-card border border-border rounded-lg flex flex-col overflow-hidden"
              style={{
                width: isDesktop ? `${leftWidth}%` : "100%",
              }}
            >
              <div className="flex items-center justify-between border-b border-border px-2 gap-2 flex-wrap" style={{ minHeight: "40px" }}>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">Input</p>
                  <input
                    ref={quickUploadInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleQuickUploadChange}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleQuickUploadClick}
                    title="Upload file"
                    disabled={isProcessing}
                    className="hover:bg-cyan-500/20 hover:text-cyan-400"
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu open={textSizeOpen} onOpenChange={setTextSizeOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                        title="Text size"
                      >
                        <Type className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Text size</DropdownMenuLabel>
                      {FONT_SIZE_OPTIONS.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          className="flex items-center justify-between text-sm"
                          onSelect={(event) => {
                            event.preventDefault();
                            setEditorFontSize(option.value);
                            setTextSizeOpen(false);
                          }}
                        >
                          <span>{option.label}</span>
                          {editorFontSize === option.value && (
                            <Check className="w-3 h-3 text-primary" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    onClick={handleEncode}
                    size="sm"
                    variant="ghost"
                    disabled={isProcessing}
                    className={`gap-1 px-4 ${
                      output && isEncoded
                        ? "bg-cyan-500 text-black hover:bg-cyan-500"
                        : "hover:bg-cyan-500 hover:text-black"
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    Encode
                  </Button>
                  <Button
                    onClick={handleDecode}
                    size="sm"
                    variant="ghost"
                    disabled={isProcessing}
                    className={`gap-1 px-4 ${
                      output && !isEncoded
                        ? "bg-cyan-500 text-black hover:bg-cyan-500"
                        : "hover:bg-cyan-500 hover:text-black"
                    }`}
                  >
                    <Code className="w-3 h-3" />
                    Decode
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-[320px]">
                <Editor
                  height="100%"
                  defaultLanguage="plaintext"
                  theme="vs-dark"
                  value={input}
                  onChange={(value) => setInput(value || "")}
                  onMount={(editor) => {
                    inputEditorRef.current = editor;
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: editorFontSize,
                  }}
                />
              </div>
            </div>

            <div
              className="hidden lg:flex items-stretch px-1"
              style={{ cursor: "col-resize" }}
              onMouseDown={handleSeparatorMouseDown}
            >
              <div
                className={`w-1 rounded-full bg-border transition-colors ${
                  isDragging ? "bg-primary" : ""
                }`}
              />
            </div>

            <div
              className="bg-card border border-border rounded-lg flex flex-col overflow-hidden"
              style={{
                width: isDesktop ? `${100 - leftWidth}%` : "100%",
              }}
            >
              <div className="flex items-center justify-between border-b border-border px-2 gap-2 flex-wrap" style={{ minHeight: "40px" }}>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">Output</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSwap}
                    disabled={!output}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Swap"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSave}
                    disabled={!output || isProcessing}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Save"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownloadOutput}
                    disabled={!output}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyOutput}
                    disabled={!output}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClearOutput}
                    disabled={!output}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Clear"
                  >
                    <BrushCleaning className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-[320px]">
                <Editor
                  height="100%"
                  defaultLanguage="plaintext"
                  theme="vs-dark"
                  value={output}
                  onChange={(value) => setOutput(value || "")}
                  onMount={(editor) => {
                    outputEditorRef.current = editor;
                  }}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: editorFontSize,
                  }}
                />
              </div>
            </div>
          </div>

          {!isFullscreen && <Base64InfoSections />}
        </div>
      </main>

      <Footer isFullscreen={isFullscreen} />

      <RecentOutputs
        onRestore={(content) => {
          setInput(content);
          setIsSidebarOpen(false);
          toast({
            title: "Restored",
            description: "Content restored to the editor.",
          });
        }}
        onClose={() => setIsSidebarOpen(false)}
        isOpen={isSidebarOpen}
        refreshTrigger={refreshSidebar}
        format="base64"
        fileExtension="txt"
        mimeType="text/plain"
        title="Base64 History"
        emptyStateDescription='Encode or decode and click "Save" to store outputs here'
      />
    </div>
  );
};

export default Base64Formatter;


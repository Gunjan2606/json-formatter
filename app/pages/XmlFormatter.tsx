"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { ErrorDisplay } from "../components/formatter/ErrorDisplay";
import { RecentOutputs } from "../components/formatter/RecentOutputs";
import { Footer } from "../components/formatter/Footer";
import { XmlInfoSections } from "../components/formatter/XmlInfoSections";
import { useXMLFormatter } from "../hooks/useXMLFormatter";
import { useToast } from "../hooks/use-toast";
import { saveOutput, getAllOutputs } from "../lib/storage";
import {
  FileCode2,
  Save,
  Upload,
  Type,
  Copy,
  Download,
  BrushCleaning,
  Code,
  Minimize2,
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

const XmlFormatter = () => {
  const {
    input,
    setInput,
    output,
    setOutput,
    isProcessing,
    error,
    setError,
    isMinified,
    processXML,
  } = useXMLFormatter();
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
  const inputEditorRef = useRef<unknown>(null);
  const outputEditorRef = useRef<unknown>(null);
  const quickUploadInputRef = useRef<HTMLInputElement>(null);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCount = async () => {
      const outputs = await getAllOutputs("xml");
      setSavedOutputsCount(outputs.length);
    };

    loadCount();
  }, [refreshSidebar, isSidebarOpen]);

  const handleFormat = useCallback(() => processXML(false), [processXML]);
  const handleMinify = useCallback(() => processXML(true), [processXML]);

  const handleCopyOutput = useCallback(() => {
    if (!output.trim()) {
      toast({
        title: "Nothing to copy",
        description: "Please format XML first.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied",
      description: "XML copied to clipboard.",
    });
  }, [output, toast]);

  const handleDownloadOutput = useCallback(() => {
    if (!output.trim()) {
      toast({
        title: "Nothing to download",
        description: "Format or paste XML before downloading.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([output], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isMinified ? "minified.xml" : "formatted.xml";
    a.click();
    URL.revokeObjectURL(url);
  }, [output, isMinified, toast]);

  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".xml")) {
        toast({
          title: "Unsupported file",
          description: "Please upload a .xml file.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result?.toString() || "";
        setInput(text);
        toast({
          title: "File loaded",
          description: `Loaded ${file.name}`,
        });
      };
      reader.onerror = () => {
        toast({
          title: "Upload failed",
          description: "Could not read the XML file.",
          variant: "destructive",
        });
      };
      reader.readAsText(file);
    },
    [setInput, toast]
  );

  const handleSave = useCallback(async () => {
    if (!output.trim()) {
      toast({
        title: "Nothing to save",
        description: "Please format XML first.",
        variant: "destructive",
      });
      return;
    }

    const name = `XML ${new Date().toLocaleString()}`;
    await saveOutput(output, name, {
      format: "xml",
      extension: "xml",
      mimeType: "application/xml",
    });
    setRefreshSidebar((prev) => prev + 1);
    toast({
      title: "Saved",
      description: "Formatted XML stored locally.",
    });
  }, [output, toast]);

  const handleClearOutput = useCallback(() => {
    setOutput("");
  }, [setOutput]);

  const handleSearch = useCallback(() => {
    // @ts-expect-error Monaco type available at runtime
    inputEditorRef.current?.getAction("actions.find")?.run();
    // @ts-expect-error Monaco type available at runtime
    outputEditorRef.current?.getAction("actions.find")?.run();
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
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
    // Force editor resize when fullscreen state changes
    const resizeEditors = () => {
      if (inputEditorRef.current && typeof (inputEditorRef.current as any).layout === 'function') {
        (inputEditorRef.current as any).layout();
      }
      if (outputEditorRef.current && typeof (outputEditorRef.current as any).layout === 'function') {
        (outputEditorRef.current as any).layout();
      }
    };

    const timer = setTimeout(resizeEditors, 150);
    
    // Also listen for window resize events
    window.addEventListener('resize', resizeEditors);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeEditors);
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
        title="XML Formatter"
        description="Pretty-print, minify, and validate XML"
        icon={<FileCode2 className="w-4 h-4 text-primary-foreground" />}
      />

      {error && (
        <ErrorDisplay
          error={error}
          onClose={() => setError(null)}
          title="Invalid XML"
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
              height: isFullscreen ? "calc(100vh - 60px)" : "80vh"
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
                    accept=".xml,text/xml"
                    className="hidden"
                    onChange={handleQuickUploadChange}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleQuickUploadClick}
                    title="Upload XML"
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
                    onClick={handleFormat}
                    size="sm"
                    variant="ghost"
                    disabled={isProcessing}
                    className={`gap-1 px-4 ${
                      output && !isMinified
                        ? "bg-cyan-500 text-black hover:bg-cyan-500"
                        : "hover:bg-cyan-500 hover:text-black"
                    }`}
                  >
                    <Code className="w-3 h-3" />
                    Format
                  </Button>
                  <Button
                    onClick={handleMinify}
                    size="sm"
                    variant="ghost"
                    disabled={isProcessing}
                    className={`gap-1 px-4 ${
                      output && isMinified
                        ? "bg-cyan-500 text-black hover:bg-cyan-500"
                        : "hover:bg-cyan-500 hover:text-black"
                    }`}
                  >
                    <Minimize2 className="w-3 h-3" />
                    Minify
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-[320px]">
                <Editor
                  height="100%"
                  defaultLanguage="xml"
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
                  <FileCode2 className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">Output</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
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
                    <BrushCleaning className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-[320px]">
                <Editor
                  height="100%"
                  defaultLanguage="xml"
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

          {!isFullscreen && <XmlInfoSections />}
        </div>
      </main>

      <Footer isFullscreen={isFullscreen} />

      <RecentOutputs
        onRestore={(content) => {
          setInput(content);
          setIsSidebarOpen(false);
          toast({
            title: "Restored",
            description: "XML restored to the editor.",
          });
        }}
        onClose={() => setIsSidebarOpen(false)}
        isOpen={isSidebarOpen}
        refreshTrigger={refreshSidebar}
        format="xml"
        fileExtension="xml"
        mimeType="application/xml"
        title="XML History"
        emptyStateDescription='Format XML and click "Save" to store outputs here'
      />
    </div>
  );
};

export default XmlFormatter;



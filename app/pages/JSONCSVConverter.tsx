"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { ErrorDisplay } from "../components/formatter/ErrorDisplay";
import { RecentOutputs } from "../components/formatter/RecentOutputs";
import { Footer } from "../components/formatter/Footer";
import { JSONCSVInfoSections } from "../components/formatter/JSONCSVInfoSections";
import { useToast } from "../hooks/use-toast";
import { saveOutput, getAllOutputs } from "../lib/storage";
import Papa from "papaparse";
import {
  ArrowLeftRight,
  Save,
  Upload,
  Type,
  Copy,
  Download,
  BrushCleaning,
  Code,
  FileJson,
  Table,
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

const DEFAULT_JSON = `[
  {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "city": "New York"
  },
  {
    "name": "Jane Smith",
    "age": 25,
    "email": "jane@example.com",
    "city": "Los Angeles"
  }
]`;

const DEFAULT_CSV = `name,age,email,city
John Doe,30,john@example.com,New York
Jane Smith,25,jane@example.com,Los Angeles`;

// Flatten nested objects for CSV
const flattenObject = (obj: any, prefix = ""): any => {
  const flattened: any = {};
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value, newKey));
    } else if (Array.isArray(value)) {
      flattened[newKey] = JSON.stringify(value);
    } else {
      flattened[newKey] = value;
    }
  }
  return flattened;
};

const jsonToCSV = (jsonText: string): string => {
  try {
    const parsed = JSON.parse(jsonText);
    let data: any[] = [];

    // Handle different JSON structures
    if (Array.isArray(parsed)) {
      data = parsed;
    } else if (typeof parsed === "object" && parsed !== null) {
      // Single object - convert to array
      data = [parsed];
    } else {
      throw new Error("JSON must be an object or array");
    }

    if (data.length === 0) {
      return "";
    }

    // Flatten nested objects
    const flattenedData = data.map(item => flattenObject(item));

    // Convert to CSV
    return Papa.unparse(flattenedData, {
      header: true,
      skipEmptyLines: true,
    });
  } catch (err) {
    throw new Error("Failed to convert JSON to CSV: " + (err instanceof Error ? err.message : "Parse error"));
  }
};

const csvToJSON = (csvText: string): string => {
  try {
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => {
        // Try to parse JSON strings in cells
        if (value && typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value.trim();
          }
        }
        return value;
      },
    });

    if (result.errors.length > 0) {
      const errorMessages = result.errors.map(e => e.message).join(", ");
      throw new Error(`CSV parsing errors: ${errorMessages}`);
    }

    // Format JSON with indentation
    return JSON.stringify(result.data, null, 2);
  } catch (err) {
    throw new Error("Failed to convert CSV to JSON: " + (err instanceof Error ? err.message : "Parse error"));
  }
};

const JSONCSVConverter = () => {
  const [input, setInput] = useState(DEFAULT_JSON);
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversionType, setConversionType] = useState<"json-to-csv" | "csv-to-json" | null>(null);
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
      const outputs = await getAllOutputs("json-csv");
      setSavedOutputsCount(outputs.length);
    };

    loadCount();
  }, [refreshSidebar, isSidebarOpen]);

  const handleJSONToCSV = useCallback(() => {
    if (!input.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter JSON data to convert.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = jsonToCSV(input);
      setOutput(result);
      setConversionType("json-to-csv");
      toast({
        title: "Converted",
        description: "JSON converted to CSV successfully.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Conversion failed";
      setError(errorMessage);
      toast({
        title: "Conversion failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [input, toast]);

  const handleCSVToJSON = useCallback(() => {
    if (!input.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter CSV data to convert.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = csvToJSON(input);
      setOutput(result);
      setConversionType("csv-to-json");
      toast({
        title: "Converted",
        description: "CSV converted to JSON successfully.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Conversion failed";
      setError(errorMessage);
      toast({
        title: "Conversion failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [input, toast]);

  const handleSwap = useCallback(() => {
    if (output) {
      setInput(output);
      setOutput("");
      setConversionType(null);
      setError(null);
    }
  }, [output]);

  const handleCopyOutput = useCallback(() => {
    if (!output.trim()) {
      toast({
        title: "Nothing to copy",
        description: "Please convert first.",
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
        description: "Please convert first.",
        variant: "destructive",
      });
      return;
    }

    const isCSV = conversionType === "json-to-csv";
    const blob = new Blob([output], { type: isCSV ? "text/csv" : "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isCSV ? "converted.csv" : "converted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "Output downloaded successfully.",
    });
  }, [output, conversionType, toast]);

  const handleClearOutput = useCallback(() => {
    setOutput("");
    setConversionType(null);
    setError(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (!output.trim()) {
      toast({
        title: "Nothing to save",
        description: "Please convert first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const isCSV = conversionType === "json-to-csv";
      const name = `${conversionType === "json-to-csv" ? "CSV" : "JSON"} ${new Date().toLocaleString()}`;
      await saveOutput(output, name, {
        format: "json-csv",
        extension: isCSV ? "csv" : "json",
        mimeType: isCSV ? "text/csv" : "application/json",
      });
      setRefreshSidebar((prev) => prev + 1);
      setSavedOutputsCount((prev) => prev + 1);
      toast({
        title: "Saved",
        description: "Output saved successfully.",
      });
    } catch (err) {
      toast({
        title: "Save failed",
        description: "Failed to save output.",
        variant: "destructive",
      });
    }
  }, [output, conversionType, toast]);

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
            description: "File content loaded. Click convert to transform.",
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
    } catch (err) {
      setError("Failed to process file");
      setIsProcessing(false);
      toast({
        title: "File processing failed",
        description: "Failed to process the selected file.",
        variant: "destructive",
      });
    }
  }, [toast]);

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

  const inputLanguage = conversionType === "csv-to-json" ? "plaintext" : "json";
  const outputLanguage = conversionType === "json-to-csv" ? "plaintext" : "json";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onSearch={handleSearch}
        onToggleSidebar={() => setIsSidebarOpen(true)}
        savedOutputsCount={savedOutputsCount}
        title="JSON ↔ CSV Converter"
        description="Convert between JSON and CSV formats"
        icon={<ArrowLeftRight className="w-4 h-4 text-primary-foreground" />}
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
                  {conversionType === "csv-to-json" ? (
                    <Table className="w-4 h-4 text-primary" />
                  ) : (
                    <FileJson className="w-4 h-4 text-primary" />
                  )}
                  <p className="text-sm font-semibold">Input</p>
                  <input
                    ref={quickUploadInputRef}
                    type="file"
                    accept=".json,.csv,application/json,text/csv"
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
                    onClick={handleJSONToCSV}
                    size="sm"
                    variant="ghost"
                    disabled={isProcessing}
                    className={`gap-1 px-4 ${
                      conversionType === "json-to-csv"
                        ? "bg-cyan-500 text-black hover:bg-cyan-500"
                        : "hover:bg-cyan-500 hover:text-black"
                    }`}
                  >
                    <FileJson className="w-3 h-3" />
                    JSON to CSV
                  </Button>
                  <Button
                    onClick={handleCSVToJSON}
                    size="sm"
                    variant="ghost"
                    disabled={isProcessing}
                    className={`gap-1 px-4 ${
                      conversionType === "csv-to-json"
                        ? "bg-cyan-500 text-black hover:bg-cyan-500"
                        : "hover:bg-cyan-500 hover:text-black"
                    }`}
                  >
                    <Table className="w-3 h-3" />
                    CSV to JSON
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-[320px]">
                <Editor
                  height="100%"
                  defaultLanguage={inputLanguage}
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
                  {conversionType === "json-to-csv" ? (
                    <Table className="w-4 h-4 text-primary" />
                  ) : (
                    <FileJson className="w-4 h-4 text-primary" />
                  )}
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
                  defaultLanguage={outputLanguage}
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

          {!isFullscreen && <JSONCSVInfoSections />}
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
        format="json-csv"
        fileExtension="txt"
        mimeType="text/plain"
        title="Conversion History"
        emptyStateDescription='Convert and click "Save" to store outputs here'
      />
    </div>
  );
};

export default JSONCSVConverter;


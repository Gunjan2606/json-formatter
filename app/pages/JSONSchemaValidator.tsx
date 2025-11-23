"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { ErrorDisplay } from "../components/formatter/ErrorDisplay";
import { RecentOutputs } from "../components/formatter/RecentOutputs";
import { Footer } from "../components/formatter/Footer";
import { JSONSchemaInfoSections } from "../components/formatter/JSONSchemaInfoSections";
import { useToast } from "../hooks/use-toast";
import { saveOutput, getAllOutputs } from "../lib/storage";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import {
  CheckCircle,
  Save,
  Upload,
  Type,
  Copy,
  Download,
  BrushCleaning,
  Code,
  FileJson,
  Check,
  X,
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

const DEFAULT_SCHEMA = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number",
      "minimum": 0
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  },
  "required": ["name", "email"]
}`;

const DEFAULT_DATA = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}`;

const JSONSchemaValidator = () => {
  const [schema, setSchema] = useState(DEFAULT_SCHEMA);
  const [data, setData] = useState(DEFAULT_DATA);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors: string[];
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
  const schemaEditorRef = useRef<MonacoEditor | null>(null);
  const dataEditorRef = useRef<MonacoEditor | null>(null);
  const schemaUploadInputRef = useRef<HTMLInputElement>(null);
  const dataUploadInputRef = useRef<HTMLInputElement>(null);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCount = async () => {
      const outputs = await getAllOutputs("json-schema");
      setSavedOutputsCount(outputs.length);
    };

    loadCount();
  }, [refreshSidebar, isSidebarOpen]);

  const handleValidate = useCallback(() => {
    if (!schema.trim()) {
      toast({
        title: "Empty schema",
        description: "Please enter a JSON Schema to validate against.",
        variant: "destructive",
      });
      return;
    }

    if (!data.trim()) {
      toast({
        title: "Empty data",
        description: "Please enter JSON data to validate.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setError(null);
    setValidationResult(null);

    try {
      // Parse schema
      let parsedSchema;
      try {
        parsedSchema = JSON.parse(schema);
      } catch (err) {
        throw new Error("Invalid JSON Schema: " + (err instanceof Error ? err.message : "Parse error"));
      }

      // Parse data
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (err) {
        throw new Error("Invalid JSON data: " + (err instanceof Error ? err.message : "Parse error"));
      }

      // Validate using Ajv with format support
      const ajv = new Ajv({ allErrors: true, verbose: true });
      addFormats(ajv); // Add format validators (email, date, uri, etc.)
      const validate = ajv.compile(parsedSchema);
      const valid = validate(parsedData);

      if (valid) {
        setValidationResult({
          valid: true,
          errors: [],
        });
        toast({
          title: "Validation successful",
          description: "The JSON data conforms to the schema.",
        });
      } else {
        const errors = validate.errors?.map((err) => {
          const path = err.instancePath || err.schemaPath || "root";
          return `${path}: ${err.message}`;
        }) || ["Validation failed"];
        setValidationResult({
          valid: false,
          errors,
        });
        toast({
          title: "Validation failed",
          description: `Found ${errors.length} error(s).`,
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Validation error";
      setError(errorMessage);
      toast({
        title: "Validation error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [schema, data, toast]);

  const handleCopySchema = useCallback(() => {
    if (!schema.trim()) {
      toast({
        title: "Nothing to copy",
        description: "Schema editor is empty.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(schema);
    toast({
      title: "Copied",
      description: "Schema copied to clipboard.",
    });
  }, [schema, toast]);

  const handleCopyData = useCallback(() => {
    if (!data.trim()) {
      toast({
        title: "Nothing to copy",
        description: "Data editor is empty.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(data);
    toast({
      title: "Copied",
      description: "Data copied to clipboard.",
    });
  }, [data, toast]);

  const handleDownloadSchema = useCallback(() => {
    if (!schema.trim()) {
      toast({
        title: "Nothing to download",
        description: "Schema editor is empty.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([schema], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "Schema downloaded successfully.",
    });
  }, [schema, toast]);

  const handleDownloadData = useCallback(() => {
    if (!data.trim()) {
      toast({
        title: "Nothing to download",
        description: "Data editor is empty.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "Data downloaded successfully.",
    });
  }, [data, toast]);

  const handleClearResults = useCallback(() => {
    setValidationResult(null);
    setError(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (!validationResult) {
      toast({
        title: "Nothing to save",
        description: "Please validate first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const resultText = validationResult.valid
        ? "✓ Validation successful - The JSON data conforms to the schema."
        : `✗ Validation failed:\n${validationResult.errors.join("\n")}`;

      const name = `Validation ${new Date().toLocaleString()}`;
      await saveOutput(resultText, name, {
        format: "json-schema",
        extension: "txt",
        mimeType: "text/plain",
      });
      setRefreshSidebar((prev) => prev + 1);
      setSavedOutputsCount((prev) => prev + 1);
      toast({
        title: "Saved",
        description: "Validation result saved successfully.",
      });
    } catch (err) {
      toast({
        title: "Save failed",
        description: "Failed to save validation result.",
        variant: "destructive",
      });
    }
  }, [validationResult, toast]);

  const handleFileSelect = useCallback(
    (file: File, type: "schema" | "data") => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      setIsProcessing(true);
      setError(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          if (type === "schema") {
            setSchema(content);
          } else {
            setData(content);
          }
          toast({
            title: "File loaded",
            description: `File content loaded into ${type} editor.`,
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
    },
    [toast]
  );

  const handleSchemaUploadClick = () => {
    schemaUploadInputRef.current?.click();
  };

  const handleDataUploadClick = () => {
    dataUploadInputRef.current?.click();
  };

  const handleSchemaUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file, "schema");
    }
    event.target.value = "";
  };

  const handleDataUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file, "data");
    }
    event.target.value = "";
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (schemaEditorRef.current?.getAction) {
      schemaEditorRef.current.getAction("actions.find")?.run();
    }
    if (dataEditorRef.current?.getAction) {
      dataEditorRef.current.getAction("actions.find")?.run();
    }
  }, []);

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
      if (schemaEditorRef.current?.layout) {
        schemaEditorRef.current.layout();
      }
      if (dataEditorRef.current?.layout) {
        dataEditorRef.current.layout();
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
        title="JSON Schema Validator"
        description="Validate JSON data against JSON Schema"
        icon={<CheckCircle className="w-4 h-4 text-primary-foreground" />}
      />

      {error && (
        <ErrorDisplay
          error={{ message: error }}
          onClose={() => setError(null)}
          title="Error"
        />
      )}

      {validationResult && !validationResult.valid && (
        <div className="mx-4 mt-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-destructive">Validation Failed</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {validationResult.errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {validationResult && validationResult.valid && (
        <div className="mx-4 mt-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold text-green-500">Validation Successful</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              The JSON data conforms to the schema.
            </p>
          </div>
        </div>
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
                  <FileJson className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">Schema</p>
                  <input
                    ref={schemaUploadInputRef}
                    type="file"
                    accept=".json,application/json"
                    className="hidden"
                    onChange={handleSchemaUploadChange}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSchemaUploadClick}
                    title="Upload schema"
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
                    variant="ghost"
                    size="icon"
                    onClick={handleCopySchema}
                    disabled={!schema}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Copy schema"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownloadSchema}
                    disabled={!schema}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Download schema"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-[320px]">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  theme="vs-dark"
                  value={schema}
                  onChange={(value) => setSchema(value || "")}
                  onMount={(editor) => {
                    schemaEditorRef.current = editor;
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
                  <Code className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">Data</p>
                  <input
                    ref={dataUploadInputRef}
                    type="file"
                    accept=".json,application/json"
                    className="hidden"
                    onChange={handleDataUploadChange}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDataUploadClick}
                    title="Upload data"
                    disabled={isProcessing}
                    className="hover:bg-cyan-500/20 hover:text-cyan-400"
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <Button
                    onClick={handleValidate}
                    size="sm"
                    variant="default"
                    disabled={isProcessing}
                    className="gap-1 px-4 bg-cyan-500 text-black hover:bg-cyan-500"
                  >
                    <CheckCircle className="w-3 h-3" />
                    {isProcessing ? "Validating..." : "Validate"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyData}
                    disabled={!data}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Copy data"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownloadData}
                    disabled={!data}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Download data"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  {validationResult && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSave}
                        disabled={isProcessing}
                        className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                        title="Save result"
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClearResults}
                        className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                        title="Clear results"
                      >
                        <BrushCleaning className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex-1 min-h-[320px]">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  theme="vs-dark"
                  value={data}
                  onChange={(value) => setData(value || "")}
                  onMount={(editor) => {
                    dataEditorRef.current = editor;
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: editorFontSize,
                  }}
                />
              </div>
            </div>
          </div>

          {!isFullscreen && <JSONSchemaInfoSections />}
        </div>
      </main>

      <Footer isFullscreen={isFullscreen} />

      <RecentOutputs
        onRestore={(content) => {
          // Try to parse and set as data if it's JSON, otherwise show in toast
          try {
            JSON.parse(content);
            setData(content);
            setIsSidebarOpen(false);
            toast({
              title: "Restored",
              description: "Data restored to the editor.",
            });
          } catch {
            toast({
              title: "Invalid JSON",
              description: "Could not restore content.",
              variant: "destructive",
            });
          }
        }}
        onClose={() => setIsSidebarOpen(false)}
        isOpen={isSidebarOpen}
        refreshTrigger={refreshSidebar}
        format="json-schema"
        fileExtension="txt"
        mimeType="text/plain"
        title="Validation History"
        emptyStateDescription='Validate and click "Save" to store results here'
      />
    </div>
  );
};

export default JSONSchemaValidator;


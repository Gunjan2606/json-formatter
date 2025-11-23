"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { ErrorDisplay } from "../components/formatter/ErrorDisplay";
import { RecentOutputs } from "../components/formatter/RecentOutputs";
import { Footer } from "../components/formatter/Footer";
import { JSONDiffInfoSections } from "../components/formatter/JSONDiffInfoSections";
import { useToast } from "../hooks/use-toast";
import { saveOutput, getAllOutputs } from "../lib/storage";
import {
  GitCompare,
  Save,
  Upload,
  Type,
  Copy,
  Download,
  BrushCleaning,
  Code,
  FileJson,
  Check,
  ArrowLeftRight,
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

const DEFAULT_JSON_1 = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "city": "New York"
}`;

const DEFAULT_JSON_2 = `{
  "name": "John Doe",
  "age": 31,
  "email": "john.doe@example.com",
  "country": "USA"
}`;

interface DiffResult {
  added: Array<{ path: string; value: any }>;
  removed: Array<{ path: string; value: any }>;
  modified: Array<{ path: string; oldValue: any; newValue: any }>;
}

const compareJSON = (obj1: any, obj2: any, path = ""): DiffResult => {
  const result: DiffResult = {
    added: [],
    removed: [],
    modified: [],
  };

  const allKeys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);

  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;
    const val1 = obj1?.[key];
    const val2 = obj2?.[key];

    if (!(key in obj1)) {
      // Added in obj2
      result.added.push({ path: currentPath, value: val2 });
    } else if (!(key in obj2)) {
      // Removed from obj1
      result.removed.push({ path: currentPath, value: val1 });
    } else if (typeof val1 === "object" && val1 !== null && !Array.isArray(val1) &&
               typeof val2 === "object" && val2 !== null && !Array.isArray(val2)) {
      // Both are objects, recurse
      const nested = compareJSON(val1, val2, currentPath);
      result.added.push(...nested.added);
      result.removed.push(...nested.removed);
      result.modified.push(...nested.modified);
    } else if (Array.isArray(val1) && Array.isArray(val2)) {
      // Compare arrays
      const maxLen = Math.max(val1.length, val2.length);
      for (let i = 0; i < maxLen; i++) {
        const itemPath = `${currentPath}[${i}]`;
        if (i >= val1.length) {
          result.added.push({ path: itemPath, value: val2[i] });
        } else if (i >= val2.length) {
          result.removed.push({ path: itemPath, value: val1[i] });
        } else if (JSON.stringify(val1[i]) !== JSON.stringify(val2[i])) {
          result.modified.push({
            path: itemPath,
            oldValue: val1[i],
            newValue: val2[i],
          });
        }
      }
    } else if (JSON.stringify(val1) !== JSON.stringify(val2)) {
      // Modified
      result.modified.push({
        path: currentPath,
        oldValue: val1,
        newValue: val2,
      });
    }
  }

  return result;
};

const JSONDiffTool = () => {
  const [json1, setJson1] = useState(DEFAULT_JSON_1);
  const [json2, setJson2] = useState(DEFAULT_JSON_2);
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null);
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
  const json1EditorRef = useRef<MonacoEditor | null>(null);
  const json2EditorRef = useRef<MonacoEditor | null>(null);
  const json1UploadInputRef = useRef<HTMLInputElement>(null);
  const json2UploadInputRef = useRef<HTMLInputElement>(null);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCount = async () => {
      const outputs = await getAllOutputs("json-diff");
      setSavedOutputsCount(outputs.length);
    };

    loadCount();
  }, [refreshSidebar, isSidebarOpen]);

  const handleCompare = useCallback(() => {
    if (!json1.trim()) {
      toast({
        title: "Empty JSON 1",
        description: "Please enter the first JSON to compare.",
        variant: "destructive",
      });
      return;
    }

    if (!json2.trim()) {
      toast({
        title: "Empty JSON 2",
        description: "Please enter the second JSON to compare.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setError(null);
    setDiffResult(null);

    try {
      // Parse both JSON objects
      let parsed1;
      try {
        parsed1 = JSON.parse(json1);
      } catch (err) {
        throw new Error("Invalid JSON 1: " + (err instanceof Error ? err.message : "Parse error"));
      }

      let parsed2;
      try {
        parsed2 = JSON.parse(json2);
      } catch (err) {
        throw new Error("Invalid JSON 2: " + (err instanceof Error ? err.message : "Parse error"));
      }

      // Compare the objects
      const result = compareJSON(parsed1, parsed2);
      setDiffResult(result);

      const totalChanges = result.added.length + result.removed.length + result.modified.length;
      if (totalChanges === 0) {
        toast({
          title: "No differences",
          description: "The JSON objects are identical.",
        });
      } else {
        toast({
          title: "Comparison complete",
          description: `Found ${totalChanges} difference(s).`,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Comparison error";
      setError(errorMessage);
      toast({
        title: "Comparison error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [json1, json2, toast]);

  const handleSwap = useCallback(() => {
    const temp = json1;
    setJson1(json2);
    setJson2(temp);
    setDiffResult(null);
    setError(null);
  }, [json1, json2]);

  const handleCopyJson1 = useCallback(() => {
    if (!json1.trim()) {
      toast({
        title: "Nothing to copy",
        description: "JSON 1 editor is empty.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(json1);
    toast({
      title: "Copied",
      description: "JSON 1 copied to clipboard.",
    });
  }, [json1, toast]);

  const handleCopyJson2 = useCallback(() => {
    if (!json2.trim()) {
      toast({
        title: "Nothing to copy",
        description: "JSON 2 editor is empty.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(json2);
    toast({
      title: "Copied",
      description: "JSON 2 copied to clipboard.",
    });
  }, [json2, toast]);

  const handleDownloadJson1 = useCallback(() => {
    if (!json1.trim()) {
      toast({
        title: "Nothing to download",
        description: "JSON 1 editor is empty.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([json1], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "json1.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "JSON 1 downloaded successfully.",
    });
  }, [json1, toast]);

  const handleDownloadJson2 = useCallback(() => {
    if (!json2.trim()) {
      toast({
        title: "Nothing to download",
        description: "JSON 2 editor is empty.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([json2], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "json2.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "JSON 2 downloaded successfully.",
    });
  }, [json2, toast]);

  const handleClearResults = useCallback(() => {
    setDiffResult(null);
    setError(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (!diffResult) {
      toast({
        title: "Nothing to save",
        description: "Please compare first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const totalChanges = diffResult.added.length + diffResult.removed.length + diffResult.modified.length;
      let resultText = `JSON Diff Results\n`;
      resultText += `Total changes: ${totalChanges}\n\n`;

      if (diffResult.added.length > 0) {
        resultText += `Added (${diffResult.added.length}):\n`;
        diffResult.added.forEach((item) => {
          resultText += `  + ${item.path}: ${JSON.stringify(item.value)}\n`;
        });
        resultText += `\n`;
      }

      if (diffResult.removed.length > 0) {
        resultText += `Removed (${diffResult.removed.length}):\n`;
        diffResult.removed.forEach((item) => {
          resultText += `  - ${item.path}: ${JSON.stringify(item.value)}\n`;
        });
        resultText += `\n`;
      }

      if (diffResult.modified.length > 0) {
        resultText += `Modified (${diffResult.modified.length}):\n`;
        diffResult.modified.forEach((item) => {
          resultText += `  ~ ${item.path}:\n`;
          resultText += `    Old: ${JSON.stringify(item.oldValue)}\n`;
          resultText += `    New: ${JSON.stringify(item.newValue)}\n`;
        });
      }

      if (totalChanges === 0) {
        resultText = "No differences found. The JSON objects are identical.";
      }

      const name = `Diff ${new Date().toLocaleString()}`;
      await saveOutput(resultText, name, {
        format: "json-diff",
        extension: "txt",
        mimeType: "text/plain",
      });
      setRefreshSidebar((prev) => prev + 1);
      setSavedOutputsCount((prev) => prev + 1);
      toast({
        title: "Saved",
        description: "Diff result saved successfully.",
      });
    } catch (err) {
      toast({
        title: "Save failed",
        description: "Failed to save diff result.",
        variant: "destructive",
      });
    }
  }, [diffResult, toast]);

  const handleFileSelect = useCallback(
    (file: File, type: "json1" | "json2") => {
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
          if (type === "json1") {
            setJson1(content);
          } else {
            setJson2(content);
          }
          toast({
            title: "File loaded",
            description: `File content loaded into ${type === "json1" ? "JSON 1" : "JSON 2"} editor.`,
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

  const handleJson1UploadClick = () => {
    json1UploadInputRef.current?.click();
  };

  const handleJson2UploadClick = () => {
    json2UploadInputRef.current?.click();
  };

  const handleJson1UploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file, "json1");
    }
    event.target.value = "";
  };

  const handleJson2UploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file, "json2");
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
    if (json1EditorRef.current?.getAction) {
      json1EditorRef.current.getAction("actions.find")?.run();
    }
    if (json2EditorRef.current?.getAction) {
      json2EditorRef.current.getAction("actions.find")?.run();
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
      if (json1EditorRef.current?.layout) {
        json1EditorRef.current.layout();
      }
      if (json2EditorRef.current?.layout) {
        json2EditorRef.current.layout();
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
        title="JSON Diff Tool"
        description="Compare and diff JSON objects"
        icon={<GitCompare className="w-4 h-4 text-primary-foreground" />}
      />

      {error && (
        <ErrorDisplay
          error={{ message: error }}
          onClose={() => setError(null)}
          title="Error"
        />
      )}

      {diffResult && (
        <div className="mx-4 mt-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-primary" />
                Diff Results
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  disabled={isProcessing}
                  className="gap-1"
                >
                  <Save className="w-4 h-4" />
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearResults}
                  className="gap-1"
                >
                  <BrushCleaning className="w-4 h-4" />
                  Clear
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {diffResult.added.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-green-500 mb-2">
                    Added ({diffResult.added.length})
                  </h4>
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-3 space-y-1">
                    {diffResult.added.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="text-green-500">+</span>{" "}
                        <span className="font-mono">{item.path}</span>:{" "}
                        <span className="text-muted-foreground">
                          {JSON.stringify(item.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {diffResult.removed.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-red-500 mb-2">
                    Removed ({diffResult.removed.length})
                  </h4>
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3 space-y-1">
                    {diffResult.removed.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="text-red-500">-</span>{" "}
                        <span className="font-mono">{item.path}</span>:{" "}
                        <span className="text-muted-foreground">
                          {JSON.stringify(item.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {diffResult.modified.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-yellow-500 mb-2">
                    Modified ({diffResult.modified.length})
                  </h4>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 space-y-2">
                    {diffResult.modified.map((item, idx) => (
                      <div key={idx} className="text-sm space-y-1">
                        <div>
                          <span className="text-yellow-500">~</span>{" "}
                          <span className="font-mono">{item.path}</span>
                        </div>
                        <div className="ml-4 space-y-1">
                          <div>
                            <span className="text-red-500">-</span>{" "}
                            <span className="text-muted-foreground">
                              {JSON.stringify(item.oldValue)}
                            </span>
                          </div>
                          <div>
                            <span className="text-green-500">+</span>{" "}
                            <span className="text-muted-foreground">
                              {JSON.stringify(item.newValue)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {diffResult.added.length === 0 &&
                diffResult.removed.length === 0 &&
                diffResult.modified.length === 0 && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-4 text-center">
                    <Check className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No differences found. The JSON objects are identical.
                    </p>
                  </div>
                )}
            </div>
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
                  <p className="text-sm font-semibold">JSON 1</p>
                  <input
                    ref={json1UploadInputRef}
                    type="file"
                    accept=".json,application/json"
                    className="hidden"
                    onChange={handleJson1UploadChange}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleJson1UploadClick}
                    title="Upload JSON 1"
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
                    onClick={handleCopyJson1}
                    disabled={!json1}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Copy JSON 1"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownloadJson1}
                    disabled={!json1}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Download JSON 1"
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
                  value={json1}
                  onChange={(value) => setJson1(value || "")}
                  onMount={(editor) => {
                    json1EditorRef.current = editor;
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
                  <p className="text-sm font-semibold">JSON 2</p>
                  <input
                    ref={json2UploadInputRef}
                    type="file"
                    accept=".json,application/json"
                    className="hidden"
                    onChange={handleJson2UploadChange}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleJson2UploadClick}
                    title="Upload JSON 2"
                    disabled={isProcessing}
                    className="hover:bg-cyan-500/20 hover:text-cyan-400"
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <Button
                    onClick={handleCompare}
                    size="sm"
                    variant="default"
                    disabled={isProcessing}
                    className="gap-1 px-4 bg-cyan-500 text-black hover:bg-cyan-500"
                  >
                    <GitCompare className="w-3 h-3" />
                    {isProcessing ? "Comparing..." : "Compare"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSwap}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Swap"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyJson2}
                    disabled={!json2}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Copy JSON 2"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownloadJson2}
                    disabled={!json2}
                    className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
                    title="Download JSON 2"
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
                  value={json2}
                  onChange={(value) => setJson2(value || "")}
                  onMount={(editor) => {
                    json2EditorRef.current = editor;
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: editorFontSize,
                  }}
                />
              </div>
            </div>
          </div>

          {!isFullscreen && <JSONDiffInfoSections />}
        </div>
      </main>

      <Footer isFullscreen={isFullscreen} />

      <RecentOutputs
        onRestore={(content) => {
          // Try to parse and set as json1 if it's JSON, otherwise show in toast
          try {
            JSON.parse(content);
            setJson1(content);
            setIsSidebarOpen(false);
            toast({
              title: "Restored",
              description: "JSON restored to JSON 1 editor.",
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
        format="json-diff"
        fileExtension="txt"
        mimeType="text/plain"
        title="Diff History"
        emptyStateDescription='Compare and click "Save" to store results here'
      />
    </div>
  );
};

export default JSONDiffTool;


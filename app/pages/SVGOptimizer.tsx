"use client";

import { useState, useRef } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { ErrorDisplay } from "../components/formatter/ErrorDisplay";
import { useSVGOptimizer } from "../hooks/useSVGOptimizer";
import { FileCode2, Upload, Download, Copy, Trash2, Check } from "lucide-react";
import { useToast } from "../hooks/use-toast";

export default function SVGOptimizer() {
  const { inputSVG, handleInputChange, result, error, clear } = useSVGOptimizer();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".svg")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an SVG file",
        variant: "destructive",
      });
      return;
    }

    const text = await file.text();
    handleInputChange(text);
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.optimizedSVG);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Optimized SVG copied to clipboard",
    });
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.optimizedSVG], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimized.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSampleSVG = () => {
    const sample = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 24.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 200 200" style="enable-background:new 0 0 200 200;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#667EEA;}
	.st1{fill:#764BA2;}
</style>
<g>
	<circle class="st0" cx="100" cy="60" r="40" />
	<rect class="st1" x="60" y="100" width="80" height="80" rx="10" />
	<path class="st0" d="M100,120 L120,160 L80,160 Z" />
</g>
</svg>`;
    handleInputChange(sample);
    toast({
      title: "Sample Loaded!",
      description: "Try optimizing this example SVG",
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="SVG Optimizer"
        icon={<FileCode2 className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* Toolbar */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Upload SVG
              </Button>
              <Button variant="outline" onClick={loadSampleSVG}>
                Try Sample
              </Button>
              <div className="flex-1" />
              <Button
                variant="outline"
                onClick={handleCopy}
                disabled={!result}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button onClick={handleDownload} disabled={!result}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" onClick={clear} disabled={!inputSVG}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats - More visual */}
          {result && (
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h3 className="font-semibold text-lg">Optimization Complete!</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Original Size</div>
                  <div className="text-3xl font-bold">{formatBytes(result.originalSize)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Optimized Size</div>
                  <div className="text-3xl font-bold text-blue-600">{formatBytes(result.optimizedSize)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Saved</div>
                  <div className="text-3xl font-bold text-green-600">{formatBytes(result.savings)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Reduction</div>
                  <div className="text-4xl font-black text-green-600">
                    {result.savingsPercent.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && <ErrorDisplay error={{ message: error }} title="Invalid SVG" />}

          {/* Visual Before/After Comparison */}
          {inputSVG && result && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Visual Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium mb-2 text-muted-foreground">Before</div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg p-8 flex items-center justify-center min-h-[200px] border-2 border-red-200 dark:border-red-900">
                    <div dangerouslySetInnerHTML={{ __html: inputSVG }} />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2 text-muted-foreground">After</div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-8 flex items-center justify-center min-h-[200px] border-2 border-green-200 dark:border-green-900">
                    <div dangerouslySetInnerHTML={{ __html: result.optimizedSVG }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Code Input/Output Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="space-y-3">
              <h3 className="font-semibold">Input SVG Code</h3>
              <div className="relative">
                <textarea
                  value={inputSVG}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Paste your SVG code here or upload a file..."
                  className="w-full h-96 p-4 bg-card border border-border rounded-lg font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Output */}
            <div className="space-y-3">
              <h3 className="font-semibold">Optimized SVG Code</h3>
              <div className="relative">
                <textarea
                  value={result?.optimizedSVG || ""}
                  readOnly
                  placeholder="Optimized SVG will appear here..."
                  className="w-full h-96 p-4 bg-card border border-border rounded-lg font-mono text-xs resize-none focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-lg">What does this tool do?</h3>
            <p className="text-muted-foreground">
              This SVG optimizer reduces file size by removing unnecessary elements while keeping your SVG visually identical. It removes comments, whitespace, metadata, and redundant attributes.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium">Optimizations performed:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Remove XML declarations and comments</li>
                <li>Remove editor metadata (Sketch, Illustrator, etc.)</li>
                <li>Remove unnecessary whitespace</li>
                <li>Remove empty groups and default attributes</li>
                <li>Simplify identity transforms</li>
                <li>Reduce number precision to 2 decimal places</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {!isFullscreen && <Footer isFullscreen={isFullscreen} />}
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { TextDiffInfoSections } from "../components/formatter/TextDiffInfoSections";
import { useTextDiff, type DiffMode, type ViewMode, type DiffLine } from "../hooks/useTextDiff";
import {
  FileText,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ArrowLeftRight,
  Trash2,
  Download,
} from "lucide-react";

const TextDiffComponent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const {
    leftText,
    setLeftText,
    rightText,
    setRightText,
    diffMode,
    setDiffMode,
    viewMode,
    setViewMode,
    diffResult,
    clear,
    swap,
  } = useTextDiff();

  const handleCopy = useCallback((value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  }, []);

  const handleDownload = useCallback(() => {
    if (!diffResult) return;
    const content = `=== Original ===\n${leftText}\n\n=== Modified ===\n${rightText}\n\n=== Stats ===\nAdditions: ${diffResult.stats.additions}\nDeletions: ${diffResult.stats.deletions}\nModifications: ${diffResult.stats.modifications}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `diff-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }, [diffResult, leftText, rightText]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  return (
    <div
      className={`${isFullscreen ? "h-screen overflow-hidden" : "min-h-screen"} bg-background text-foreground flex flex-col`}
    >
      <Header
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
        title="Text & Code Diff"
        description="Compare with smart highlighting"
        icon={<FileText className="w-4 h-4 text-primary-foreground" />}
      />

      <main className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-4 w-full max-w-7xl mx-auto`}>
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
            {(["characters", "words", "lines"] as DiffMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setDiffMode(mode)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  diffMode === mode
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === "characters" && "Character"}
                {mode === "words" && "Word"}
                {mode === "lines" && "Line"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
            {(["split", "unified"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === mode
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === "split" && "Split"}
                {mode === "unified" && "Unified"}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          <Button variant="ghost" size="sm" onClick={swap} className="gap-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Swap
          </Button>
          <Button variant="ghost" size="sm" onClick={clear} className="gap-1.5">
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </Button>
          {diffResult && (
            <Button variant="ghost" size="sm" onClick={handleDownload} className="gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Download
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Statistics */}
        {diffResult && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Additions</p>
              <p className="text-lg font-bold text-emerald-500">{diffResult.stats.additions}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Deletions</p>
              <p className="text-lg font-bold text-red-500">{diffResult.stats.deletions}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Modifications</p>
              <p className="text-lg font-bold text-yellow-500">{diffResult.stats.modifications}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Unchanged</p>
              <p className="text-lg font-bold text-muted-foreground">{diffResult.stats.unchanged}</p>
            </div>
          </div>
        )}

        {/* Diff Display */}
        {viewMode === "split" ? (
          <div className="grid grid-cols-2 gap-4 flex-1">
            {/* Left Panel */}
            <div className="bg-card border border-border rounded-lg flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <span className="text-sm font-semibold text-muted-foreground">Original</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleCopy(leftText, "left")}
                >
                  {copiedField === "left" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
              </div>
              {!diffResult ? (
                <textarea
                  value={leftText}
                  onChange={(e) => setLeftText(e.target.value)}
                  placeholder="Paste original text here..."
                  className="flex-1 w-full bg-background p-3 font-mono text-sm focus:outline-none resize-none"
                  spellCheck={false}
                />
              ) : (
                <div className="flex-1 overflow-auto p-2">
                  {diffResult.left.map((line, i) => (
                    <DiffLineComponent key={i} line={line} />
                  ))}
                </div>
              )}
            </div>

            {/* Right Panel */}
            <div className="bg-card border border-border rounded-lg flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <span className="text-sm font-semibold text-muted-foreground">Modified</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleCopy(rightText, "right")}
                >
                  {copiedField === "right" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
              </div>
              {!diffResult ? (
                <textarea
                  value={rightText}
                  onChange={(e) => setRightText(e.target.value)}
                  placeholder="Paste modified text here..."
                  className="flex-1 w-full bg-background p-3 font-mono text-sm focus:outline-none resize-none"
                  spellCheck={false}
                />
              ) : (
                <div className="flex-1 overflow-auto p-2">
                  {diffResult.right.map((line, i) => (
                    <DiffLineComponent key={i} line={line} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg flex flex-col flex-1">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <span className="text-sm font-semibold text-muted-foreground">Unified Diff</span>
            </div>
            {!diffResult ? (
              <div className="flex-1 grid grid-cols-2 gap-4 p-3">
                <textarea
                  value={leftText}
                  onChange={(e) => setLeftText(e.target.value)}
                  placeholder="Paste original text here..."
                  className="w-full bg-background border border-border rounded p-3 font-mono text-sm focus:outline-none resize-none"
                  spellCheck={false}
                />
                <textarea
                  value={rightText}
                  onChange={(e) => setRightText(e.target.value)}
                  placeholder="Paste modified text here..."
                  className="w-full bg-background border border-border rounded p-3 font-mono text-sm focus:outline-none resize-none"
                  spellCheck={false}
                />
              </div>
            ) : (
              <div className="flex-1 overflow-auto p-2">
                {diffResult.unified.map((line, i) => (
                  <div
                    key={i}
                    className={`font-mono text-xs leading-relaxed px-2 py-0.5 ${
                      line.type === "added"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : line.type === "removed"
                        ? "bg-red-500/10 text-red-500"
                        : ""
                    }`}
                  >
                    <span className="text-muted-foreground mr-4">
                      {line.type === "added" && "+"}
                      {line.type === "removed" && "-"}
                      {line.type === "unchanged" && " "}
                    </span>
                    {line.content}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <TextDiffInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />
    </div>
  );
};

function DiffLineComponent({ line }: { line: DiffLine }) {
  const bgColor =
    line.type === "added"
      ? "bg-emerald-500/10"
      : line.type === "removed"
      ? "bg-red-500/10"
      : line.type === "modified"
      ? "bg-yellow-500/10"
      : "";

  return (
    <div className={`font-mono text-xs leading-relaxed px-2 py-0.5 ${bgColor} flex`}>
      <span className="text-muted-foreground mr-3 select-none flex-shrink-0 w-8 text-right">
        {line.lineNumber > 0 ? line.lineNumber : ""}
      </span>
      {line.changes ? (
        <span className="flex-1">
          {line.changes.map((change, i) => (
            <span
              key={i}
              className={
                change.type === "added"
                  ? "bg-emerald-500/30 text-emerald-500"
                  : change.type === "removed"
                  ? "bg-red-500/30 text-red-500"
                  : ""
              }
            >
              {change.value}
            </span>
          ))}
        </span>
      ) : (
        <span className="flex-1">{line.content}</span>
      )}
    </div>
  );
}

export default TextDiffComponent;

"use client";

import { useState, useCallback } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { LoremIpsumInfoSections } from "../components/formatter/LoremIpsumInfoSections";
import { useLoremIpsum, type TextStyle, type OutputFormat, type LengthPreset } from "../hooks/useLoremIpsum";
import {
  FileText,
  Copy,
  Check,
  RotateCcw,
  Maximize2,
  Minimize2,
} from "lucide-react";

const LoremIpsumGeneratorComponent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    style,
    setStyle,
    format,
    setFormat,
    lengthPreset,
    setLengthPreset,
    customParagraphs,
    setCustomParagraphs,
    includeHeadings,
    setIncludeHeadings,
    includeLists,
    setIncludeLists,
    wordLimit,
    setWordLimit,
    charLimit,
    setCharLimit,
    generatedText,
    stats,
    copyToClipboard,
    reset,
  } = useLoremIpsum();

  const handleCopy = useCallback(() => {
    copyToClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [copyToClipboard]);

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
        title="Lorem Ipsum Generator"
        description="Generate placeholder text instantly"
        icon={<FileText className="w-4 h-4 text-primary-foreground" />}
      />

      <main className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-4 w-full max-w-7xl mx-auto`}>
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleCopy} className="gap-1.5">
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </Button>

          <Button onClick={reset} variant="ghost" size="sm" className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>

          <div className="flex-1" />

          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Text Style */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <label className="text-sm font-semibold text-muted-foreground">Text Style</label>
            <div className="grid grid-cols-2 gap-2">
              {(["classic", "hipster", "tech", "corporate", "pirate"] as TextStyle[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all border ${
                    style === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-muted-foreground hover:border-primary"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Output Format */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <label className="text-sm font-semibold text-muted-foreground">Output Format</label>
            <div className="grid grid-cols-3 gap-2">
              {(["plain", "html", "markdown"] as OutputFormat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all border ${
                    format === f
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-muted-foreground hover:border-primary"
                  }`}
                >
                  {f === "plain" ? "Plain" : f === "html" ? "HTML" : "Markdown"}
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <label className="text-sm font-semibold text-muted-foreground">Length</label>
            <div className="grid grid-cols-4 gap-2">
              {(["short", "medium", "long", "custom"] as LengthPreset[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLengthPreset(l)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all border ${
                    lengthPreset === l
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-muted-foreground hover:border-primary"
                  }`}
                >
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </button>
              ))}
            </div>
            {lengthPreset === "custom" && (
              <input
                type="number"
                value={customParagraphs}
                onChange={(e) => setCustomParagraphs(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="50"
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
                placeholder="Number of paragraphs"
              />
            )}
          </div>

          {/* Formatting Options */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <label className="text-sm font-semibold text-muted-foreground">Formatting</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHeadings}
                  onChange={(e) => setIncludeHeadings(e.target.checked)}
                  className="rounded"
                />
                Include Headings
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLists}
                  onChange={(e) => setIncludeLists(e.target.checked)}
                  className="rounded"
                />
                Include Lists
              </label>
            </div>
          </div>

          {/* Limits */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3 md:col-span-2">
            <label className="text-sm font-semibold text-muted-foreground">Limits (Optional)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Max Words</label>
                <input
                  type="number"
                  value={wordLimit || ""}
                  onChange={(e) => setWordLimit(e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="Unlimited"
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Max Characters</label>
                <input
                  type="number"
                  value={charLimit || ""}
                  onChange={(e) => setCharLimit(e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="Unlimited"
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Useful for meta descriptions (160 chars), tweets (280 chars), etc.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Words</p>
            <p className="text-lg font-bold">{stats.words}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Characters</p>
            <p className="text-lg font-bold">{stats.characters}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Sentences</p>
            <p className="text-lg font-bold">{stats.sentences}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Paragraphs</p>
            <p className="text-lg font-bold">{stats.paragraphs}</p>
          </div>
        </div>

        {/* Generated Text */}
        <div className="bg-card border border-border rounded-lg flex-1 flex flex-col">
          <div className="p-3 border-b border-border">
            <span className="text-sm font-semibold text-muted-foreground">Generated Text</span>
          </div>
          <div className="flex-1 overflow-auto">
            {format === "html" ? (
              <div
                className="p-4 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: generatedText }}
              />
            ) : format === "markdown" ? (
              <pre className="p-4 font-mono text-sm whitespace-pre-wrap">{generatedText}</pre>
            ) : (
              <p className="p-4 text-sm leading-relaxed whitespace-pre-wrap">{generatedText}</p>
            )}
          </div>
        </div>
      </main>

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <LoremIpsumInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />
    </div>
  );
};

export default LoremIpsumGeneratorComponent;

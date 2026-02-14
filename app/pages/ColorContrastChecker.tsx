"use client";

import { useState } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useColorContrast } from "../hooks/useColorContrast";
import { Palette, ArrowLeftRight, Check, X } from "lucide-react";

export default function ColorContrastChecker() {
  const {
    foreground,
    background,
    setForeground,
    setBackground,
    contrastRatio,
    wcagResults,
    swap,
  } = useColorContrast();

  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="Color Contrast Checker"
        icon={<Palette className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* Quick Presets - More visual */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-3">Quick Test Combinations</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => { setForeground("#000000"); setBackground("#ffffff"); }}
                className="p-3 rounded-lg border-2 border-border hover:border-primary transition-all text-left"
                style={{ background: "#ffffff", color: "#000000" }}
              >
                <div className="font-semibold text-sm mb-1">Black / White</div>
                <div className="text-xs opacity-70">✓ AAA Pass</div>
              </button>
              <button
                onClick={() => { setForeground("#ffffff"); setBackground("#000000"); }}
                className="p-3 rounded-lg border-2 border-border hover:border-primary transition-all text-left"
                style={{ background: "#000000", color: "#ffffff" }}
              >
                <div className="font-semibold text-sm mb-1">White / Black</div>
                <div className="text-xs opacity-70">✓ AAA Pass</div>
              </button>
              <button
                onClick={() => { setForeground("#ffffff"); setBackground("#007bff"); }}
                className="p-3 rounded-lg border-2 border-border hover:border-primary transition-all text-left"
                style={{ background: "#007bff", color: "#ffffff" }}
              >
                <div className="font-semibold text-sm mb-1">Button Text</div>
                <div className="text-xs opacity-70">✓ AA Pass</div>
              </button>
              <button
                onClick={() => { setForeground("#dc3545"); setBackground("#ffffff"); }}
                className="p-3 rounded-lg border-2 border-border hover:border-primary transition-all text-left"
                style={{ background: "#ffffff", color: "#dc3545" }}
              >
                <div className="font-semibold text-sm mb-1">Red Warning</div>
                <div className="text-xs opacity-70">✗ Fail</div>
              </button>
              <button
                onClick={() => { setForeground("#28a745"); setBackground("#ffffff"); }}
                className="p-3 rounded-lg border-2 border-border hover:border-primary transition-all text-left"
                style={{ background: "#ffffff", color: "#28a745" }}
              >
                <div className="font-semibold text-sm mb-1">Success Text</div>
                <div className="text-xs opacity-70">✓ AA Pass</div>
              </button>
              <button
                onClick={() => { setForeground("#999999"); setBackground("#ffffff"); }}
                className="p-3 rounded-lg border-2 border-border hover:border-primary transition-all text-left"
                style={{ background: "#ffffff", color: "#999999" }}
              >
                <div className="font-semibold text-sm mb-1">Light Gray</div>
                <div className="text-xs opacity-70">✗ Common Error</div>
              </button>
            </div>
          </div>

          {/* Color Inputs */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-sm font-medium mb-2 block">Foreground (Text)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                  />
                  <input
                    type="text"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={swap} variant="outline">
                  <ArrowLeftRight className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                  />
                  <input
                    type="text"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Preview</h3>
            <div
              className="p-8 rounded-lg"
              style={{ backgroundColor: background, color: foreground }}
            >
              <h2 className="text-4xl font-bold mb-4">Sample Heading Text</h2>
              <p className="text-base mb-4">
                This is normal body text. The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-lg font-semibold">Large bold text sample</p>
            </div>
          </div>

          {/* Results */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-6">Accessibility Results</h3>

            {/* Big contrast ratio display */}
            <div className="text-center mb-8 p-6 bg-gradient-to-br from-muted/50 to-muted rounded-xl">
              <div className="text-sm text-muted-foreground mb-2 font-medium">CONTRAST RATIO</div>
              <div className={`text-7xl font-black mb-3 ${
                contrastRatio >= 7 ? "text-green-500" :
                contrastRatio >= 4.5 ? "text-yellow-500" :
                "text-red-500"
              }`}>
                {contrastRatio.toFixed(2)}<span className="text-4xl">:1</span>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                contrastRatio >= 7 ? "bg-green-500/10 text-green-600" :
                contrastRatio >= 4.5 ? "bg-yellow-500/10 text-yellow-600" :
                "bg-red-500/10 text-red-600"
              }`}>
                {contrastRatio >= 7
                  ? "✓ Excellent - Exceeds all standards"
                  : contrastRatio >= 4.5
                  ? "✓ Good - Meets AA standards"
                  : "✗ Poor - Does not meet accessibility standards"}
              </div>
            </div>

            {/* WCAG Compliance Grid */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm mb-3">WCAG 2.1 Compliance:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className={`p-4 rounded-lg border-2 ${
                  wcagResults.aaNormalText
                    ? "border-green-500 bg-green-500/5"
                    : "border-red-500 bg-red-500/5"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {wcagResults.aaNormalText ? (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                          <X className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <span className="font-semibold">AA Normal Text</span>
                    </div>
                    <span className="text-xs font-mono bg-background px-2 py-1 rounded">≥4.5:1</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Body text, paragraphs (14pt or smaller)</p>
                </div>

                <div className={`p-4 rounded-lg border-2 ${
                  wcagResults.aaLargeText
                    ? "border-green-500 bg-green-500/5"
                    : "border-red-500 bg-red-500/5"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {wcagResults.aaLargeText ? (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                          <X className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <span className="font-semibold">AA Large Text</span>
                    </div>
                    <span className="text-xs font-mono bg-background px-2 py-1 rounded">≥3:1</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Headings, large text (18pt+ or bold 14pt+)</p>
                </div>

                <div className={`p-4 rounded-lg border-2 ${
                  wcagResults.aaaNormalText
                    ? "border-green-500 bg-green-500/5"
                    : "border-border bg-muted/30"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {wcagResults.aaaNormalText ? (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                          <X className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <span className="font-semibold">AAA Normal Text</span>
                    </div>
                    <span className="text-xs font-mono bg-background px-2 py-1 rounded">≥7:1</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Enhanced - Best for accessibility</p>
                </div>

                <div className={`p-4 rounded-lg border-2 ${
                  wcagResults.aaaLargeText
                    ? "border-green-500 bg-green-500/5"
                    : "border-border bg-muted/30"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {wcagResults.aaaLargeText ? (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                          <X className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <span className="font-semibold">AAA Large Text</span>
                    </div>
                    <span className="text-xs font-mono bg-background px-2 py-1 rounded">≥4.5:1</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Enhanced large text</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {!isFullscreen && <Footer isFullscreen={isFullscreen} />}
    </div>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useWordCloud, ShapeType, ColorScheme } from "../hooks/useWordCloud";
import { Cloud, Upload, Download, RotateCcw, Palette } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { WordCloudInfoSections } from "../components/formatter/WordCloudInfoSections";

const shapes: { id: ShapeType; name: string }[] = [
  { id: "rectangle", name: "Rectangle" },
  { id: "circle", name: "Circle" },
  { id: "ellipse", name: "Ellipse" },
  { id: "triangle", name: "Triangle" },
];

const colorSchemes: { id: ColorScheme; name: string }[] = [
  { id: "blue", name: "Blue" },
  { id: "rainbow", name: "Rainbow" },
  { id: "warm", name: "Warm" },
  { id: "cool", name: "Cool" },
  { id: "monochrome", name: "Monochrome" },
  { id: "custom", name: "Custom" },
];

const fontFamilies = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Impact",
  "Comic Sans MS",
];

export default function WordCloudGenerator() {
  const {
    text,
    setText,
    settings,
    updateSettings,
    wordFrequencies,
    getColorForWord,
    reset,
  } = useWordCloud();

  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateWordCloud = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || wordFrequencies.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 800;
    const height = 600;
    canvas.width = width;
    canvas.height = height;

    // Clear and set background
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Calculate font sizes based on frequency
    const maxCount = wordFrequencies[0].count;
    const minCount = wordFrequencies[wordFrequencies.length - 1].count;
    const fontRange = settings.maxFontSize - settings.minFontSize;

    const words = wordFrequencies.map((item, index) => {
      const normalizedCount = (item.count - minCount) / (maxCount - minCount || 1);
      const fontSize = settings.minFontSize + normalizedCount * fontRange;
      return {
        text: item.word,
        fontSize: Math.round(fontSize),
        color: getColorForWord(index),
        placed: false,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
    });

    // Measure word dimensions
    words.forEach((word) => {
      ctx.font = `bold ${word.fontSize}px ${settings.fontFamily}`;
      const metrics = ctx.measureText(word.text);
      word.width = metrics.width + settings.padding * 2;
      word.height = word.fontSize + settings.padding * 2;
    });

    // Simple spiral placement algorithm
    const centerX = width / 2;
    const centerY = height / 2;

    const isInShape = (x: number, y: number): boolean => {
      const dx = x - centerX;
      const dy = y - centerY;

      switch (settings.shape) {
        case "circle": {
          const radius = Math.min(width, height) / 2 - 20;
          return dx * dx + dy * dy <= radius * radius;
        }
        case "ellipse": {
          const radiusX = width / 2 - 20;
          const radiusY = height / 2 - 20;
          return (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1;
        }
        case "triangle": {
          const h = height - 40;
          const w = width - 40;
          // Simple triangle check (pointing up)
          const ty = centerY - h / 3;
          const relY = y - ty;
          if (relY < 0) return false;
          if (relY > h) return false;
          const maxX = (w / 2) * (1 - relY / h);
          return Math.abs(dx) <= maxX;
        }
        default: // rectangle
          return (
            x >= 20 &&
            x <= width - 20 &&
            y >= 20 &&
            y <= height - 20
          );
      }
    };

    const checkCollision = (word: typeof words[0], testX: number, testY: number): boolean => {
      for (const other of words) {
        if (!other.placed || other === word) continue;
        if (
          testX < other.x + other.width &&
          testX + word.width > other.x &&
          testY < other.y + other.height &&
          testY + word.height > other.y
        ) {
          return true;
        }
      }
      return false;
    };

    // Place words using spiral
    words.forEach((word) => {
      let placed = false;
      let angle = 0;
      let radius = 0;
      const step = 5;

      while (!placed && radius < Math.max(width, height)) {
        const x = centerX + radius * Math.cos(angle) - word.width / 2;
        const y = centerY + radius * Math.sin(angle) - word.height / 2;

        if (
          isInShape(x + word.width / 2, y + word.height / 2) &&
          !checkCollision(word, x, y)
        ) {
          word.x = x;
          word.y = y;
          word.placed = true;
          placed = true;
        }

        angle += 0.3;
        if (angle > Math.PI * 2) {
          angle = 0;
          radius += step;
        }
      }
    });

    // Draw words
    words.forEach((word) => {
      if (word.placed) {
        ctx.font = `bold ${word.fontSize}px ${settings.fontFamily}`;
        ctx.fillStyle = word.color;
        ctx.fillText(word.text, word.x + settings.padding, word.y + word.fontSize);
      }
    });
  }, [wordFrequencies, settings, getColorForWord]);

  useEffect(() => {
    if (wordFrequencies.length > 0) {
      generateWordCloud();
    }
  }, [wordFrequencies, settings, generateWordCloud]);

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setText(e.target?.result as string);
    };
    reader.readAsText(file);
  }, [setText]);

  const downloadPNG = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "word-cloud.png";
        a.click();
        URL.revokeObjectURL(url);
        toast({
          title: "Downloaded!",
          description: "Word cloud saved as PNG",
        });
      }
    });
  }, [toast]);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="Word Cloud Generator"
        icon={<Cloud className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* Text Input */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Enter Your Text</h3>
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  size="sm"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
                <Button onClick={reset} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-40 px-4 py-3 bg-background border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Paste your text here or upload a file. Common words will be filtered out automatically."
            />

            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{text.split(/\s+/).filter(Boolean).length} words</span>
              <span>{wordFrequencies.length} unique words (after filtering)</span>
            </div>
          </div>

          {/* Preview and Controls */}
          {wordFrequencies.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Preview */}
              <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Word Cloud Preview</h3>
                  <div className="flex gap-2">
                    <Button onClick={downloadPNG} size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto border border-border rounded-lg"
                  />
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                {/* Shape */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-medium mb-2 block">Shape</label>
                  <div className="grid grid-cols-2 gap-2">
                    {shapes.map((shape) => (
                      <Button
                        key={shape.id}
                        onClick={() => updateSettings({ shape: shape.id })}
                        variant={settings.shape === shape.id ? "default" : "outline"}
                        size="sm"
                      >
                        {shape.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Color Scheme */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Color Scheme
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {colorSchemes.map((scheme) => (
                      <Button
                        key={scheme.id}
                        onClick={() => updateSettings({ colorScheme: scheme.id })}
                        variant={settings.colorScheme === scheme.id ? "default" : "outline"}
                        size="sm"
                      >
                        {scheme.name}
                      </Button>
                    ))}
                  </div>

                  {settings.colorScheme === "custom" && (
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">Custom Colors</label>
                      <div className="grid grid-cols-4 gap-2">
                        {settings.customColors.map((color, i) => (
                          <input
                            key={i}
                            type="color"
                            value={color}
                            onChange={(e) => {
                              const newColors = [...settings.customColors];
                              newColors[i] = e.target.value;
                              updateSettings({ customColors: newColors });
                            }}
                            className="w-full h-10 rounded cursor-pointer bg-muted border-2 border-border"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Font */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-medium mb-2 block">Font Family</label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => updateSettings({ fontFamily: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                  >
                    {fontFamilies.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Background */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-medium mb-2 block">Background</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                      className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                    />
                    <input
                      type="text"
                      value={settings.backgroundColor}
                      onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Advanced */}
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <label className="text-sm font-medium">Advanced Settings</label>

                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Max Words: {settings.maxWords}
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={settings.maxWords}
                      onChange={(e) => updateSettings({ maxWords: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Font Size: {settings.minFontSize}–{settings.maxFontSize}px
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="8"
                        max="50"
                        value={settings.minFontSize}
                        onChange={(e) => updateSettings({ minFontSize: Number(e.target.value) })}
                        className="w-1/2 px-2 py-1 bg-background border border-border rounded text-xs"
                      />
                      <input
                        type="number"
                        min="20"
                        max="120"
                        value={settings.maxFontSize}
                        onChange={(e) => updateSettings({ maxFontSize: Number(e.target.value) })}
                        className="w-1/2 px-2 py-1 bg-background border border-border rounded text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {wordFrequencies.length === 0 && text.trim() === "" && (
            <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-12 text-center">
              <Cloud className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-lg mb-2">Create Your Word Cloud</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter or paste your text above to generate a beautiful word cloud visualization.
                Common words are automatically filtered out.
              </p>
            </div>
          )}
        </div>
      </main>

      {!isFullscreen && (
        <>
          <WordCloudInfoSections />
          <Footer isFullscreen={isFullscreen} />
        </>
      )}
    </div>
  );
}

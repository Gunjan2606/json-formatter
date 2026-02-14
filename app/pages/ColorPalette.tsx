"use client";

import { useState } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useColorPalette, HarmonyMode } from "../hooks/useColorPalette";
import {
  Palette,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Shuffle,
  RotateCcw,
  Copy,
  Download,
  Check,
  X,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { ColorPaletteInfoSections } from "../components/formatter/ColorPaletteInfoSections";

export default function ColorPalette() {
  const {
    colors,
    harmonyMode,
    setHarmonyMode,
    generatePalette,
    toggleLock,
    updateColor,
    addColor,
    removeColor,
    contrastResults,
    reset,
  } = useColorPalette();

  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const copyHexCodes = () => {
    const hexCodes = colors.map((c) => c.hex).join(", ");
    navigator.clipboard.writeText(hexCodes);
    toast({
      title: "Copied!",
      description: "Hex codes copied to clipboard",
    });
  };

  const copyCSSVariables = () => {
    const cssVars = colors
      .map((c, i) => `  --color-${i + 1}: ${c.hex};`)
      .join("\n");
    const css = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(css);
    toast({
      title: "Copied!",
      description: "CSS variables copied to clipboard",
    });
  };

  const downloadAsPNG = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colorWidth = canvas.width / colors.length;
    colors.forEach((color, index) => {
      ctx.fillStyle = color.hex;
      ctx.fillRect(index * colorWidth, 0, colorWidth, canvas.height);
    });

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "color-palette.png";
        a.click();
        URL.revokeObjectURL(url);
        toast({
          title: "Downloaded!",
          description: "Palette saved as PNG",
        });
      }
    });
  };

  const downloadAsSVG = () => {
    const colorWidth = 100 / colors.length;
    const rects = colors
      .map(
        (color, index) =>
          `<rect x="${index * colorWidth}%" y="0" width="${colorWidth}%" height="100%" fill="${color.hex}" />`
      )
      .join("\n  ");

    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  ${rects}
</svg>`;

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color-palette.svg";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "Palette saved as SVG",
    });
  };

  const getWCAGLevel = (ratio: number): { level: string; passes: boolean } => {
    if (ratio >= 7) return { level: "AAA", passes: true };
    if (ratio >= 4.5) return { level: "AA", passes: true };
    if (ratio >= 3) return { level: "AA Large", passes: true };
    return { level: "Fail", passes: false };
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="Color Palette Generator"
        icon={<Palette className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* Palette Display */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="grid" style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}>
              {colors.map((color) => (
                <div
                  key={color.id}
                  className="relative group"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Always visible lock button in top-right corner */}
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={() => toggleLock(color.id)}
                      className={`p-2 rounded-lg backdrop-blur-sm transition-all ${
                        color.locked
                          ? "bg-black/50 text-white"
                          : "bg-white/50 text-black hover:bg-white/70"
                      }`}
                      title={color.locked ? "Locked - Click to unlock" : "Unlocked - Click to lock"}
                    >
                      {color.locked ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <Unlock className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Hover actions */}
                  <div className="h-64 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <div className="space-y-2">
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(color.hex);
                          toast({ title: "Copied!", description: color.hex });
                        }}
                        size="sm"
                        variant="secondary"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      {colors.length > 2 && (
                        <Button
                          onClick={() => removeColor(color.id)}
                          size="sm"
                          variant="secondary"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Color value editor at bottom */}
                  <div className="absolute bottom-4 left-0 right-0 text-center px-2">
                    <div className="inline-flex items-center gap-2 bg-white/95 dark:bg-black/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => updateColor(color.id, e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer bg-muted border-2 border-border"
                        title="Pick color"
                      />
                      <input
                        type="text"
                        value={color.hex}
                        onChange={(e) => updateColor(color.id, e.target.value)}
                        className="w-20 bg-transparent border-0 text-sm font-mono focus:outline-none"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto_auto] gap-4 items-end">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Color Harmony
                </label>
                <select
                  value={harmonyMode}
                  onChange={(e) => setHarmonyMode(e.target.value as HarmonyMode)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                >
                  <option value="random">🎲 Random</option>
                  <option value="complementary">🔄 Complementary (High Contrast)</option>
                  <option value="analogous">🌈 Analogous (Harmonious)</option>
                  <option value="triadic">⚖️ Triadic (Balanced)</option>
                  <option value="monochromatic">🎨 Monochromatic (Unified)</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  {harmonyMode === "random" && "Completely random colors"}
                  {harmonyMode === "complementary" && "Opposite colors on the color wheel"}
                  {harmonyMode === "analogous" && "Adjacent colors on the color wheel"}
                  {harmonyMode === "triadic" && "Three evenly spaced colors"}
                  {harmonyMode === "monochromatic" && "Variations of the same hue"}
                </p>
              </div>
              <Button onClick={generatePalette} size="lg" className="h-11">
                <Shuffle className="w-4 h-4 mr-2" />
                Generate New
              </Button>
              <Button onClick={addColor} variant="outline" disabled={colors.length >= 10} className="h-11">
                <Plus className="w-4 h-4 mr-2" />
                Add Color
              </Button>
              <Button onClick={reset} variant="outline" className="h-11">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
              <p className="font-medium mb-1">💡 Tips:</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Click the <Lock className="w-3 h-3 inline" /> icon to lock colors you like</li>
                <li>• Hover over any color to copy or remove it</li>
                <li>• Edit hex values directly or use the color picker</li>
              </ul>
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Export Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button onClick={copyHexCodes} variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copy Hex Codes
              </Button>
              <Button onClick={copyCSSVariables} variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS Variables
              </Button>
              <Button onClick={downloadAsPNG} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
              <Button onClick={downloadAsSVG} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download SVG
              </Button>
            </div>
          </div>

          {/* Contrast Checker */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">WCAG Contrast Checker</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3">Color</th>
                    <th className="text-left py-2 px-3">Hex</th>
                    <th className="text-left py-2 px-3">vs White</th>
                    <th className="text-left py-2 px-3">WCAG</th>
                    <th className="text-left py-2 px-3">vs Black</th>
                    <th className="text-left py-2 px-3">WCAG</th>
                  </tr>
                </thead>
                <tbody>
                  {contrastResults.map((result) => {
                    const whiteResult = getWCAGLevel(result.contrastWithWhite);
                    const blackResult = getWCAGLevel(result.contrastWithBlack);
                    return (
                      <tr key={result.id} className="border-b border-border">
                        <td className="py-2 px-3">
                          <div
                            className="w-8 h-8 rounded border border-border"
                            style={{ backgroundColor: result.hex }}
                          />
                        </td>
                        <td className="py-2 px-3 font-mono">{result.hex}</td>
                        <td className="py-2 px-3">{result.contrastWithWhite.toFixed(2)}:1</td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            {whiteResult.passes ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span className={whiteResult.passes ? "text-green-500" : "text-red-500"}>
                              {whiteResult.level}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-3">{result.contrastWithBlack.toFixed(2)}:1</td>
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            {blackResult.passes ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span className={blackResult.passes ? "text-green-500" : "text-red-500"}>
                              {blackResult.level}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-xs text-muted-foreground space-y-1">
              <p><strong>AAA:</strong> 7:1 ratio - Enhanced contrast (recommended)</p>
              <p><strong>AA:</strong> 4.5:1 ratio - Minimum for normal text</p>
              <p><strong>AA Large:</strong> 3:1 ratio - Minimum for large text (18pt+)</p>
            </div>
          </div>
        </div>
      </main>

      {!isFullscreen && (
        <>
          <ColorPaletteInfoSections />
          <Footer isFullscreen={isFullscreen} />
        </>
      )}
    </div>
  );
}

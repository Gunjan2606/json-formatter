"use client";

import { useState } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useGradientGenerator, gradientPresets, GradientType } from "../hooks/useGradientGenerator";
import {
  Palette,
  Plus,
  Trash2,
  Shuffle,
  RotateCcw,
  Copy,
  Download,
  ArrowUpDown,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { GradientGeneratorInfoSections } from "../components/formatter/GradientGeneratorInfoSections";

export default function GradientGenerator() {
  const {
    colorStops,
    settings,
    cssGradient,
    addColorStop,
    removeColorStop,
    updateColorStop,
    updateSettings,
    randomizeColors,
    reverseGradient,
    sortColorStops,
    reset,
    loadPreset,
  } = useGradientGenerator();

  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const copyCSSToClipboard = () => {
    navigator.clipboard.writeText(`background: ${cssGradient};`);
    toast({
      title: "Copied!",
      description: "CSS gradient code copied to clipboard",
    });
  };

  const downloadAsPNG = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = settings.type === "linear"
      ? ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      : settings.type === "radial"
      ? ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2)
      : ctx.createConicGradient((settings.angle * Math.PI) / 180, canvas.width / 2, canvas.height / 2);

    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    sortedStops.forEach((stop) => {
      gradient.addColorStop(stop.position / 100, stop.color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "gradient.png";
        a.click();
        URL.revokeObjectURL(url);
        toast({
          title: "Downloaded!",
          description: "Gradient image saved as PNG",
        });
      }
    });
  };

  const downloadAsSVG = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops
      .map((stop) => `<stop offset="${stop.position}%" stop-color="${stop.color}" />`)
      .join("\n      ");

    let gradientDef = "";
    if (settings.type === "linear") {
      const angleRad = (settings.angle * Math.PI) / 180;
      const x1 = 50 + 50 * Math.cos(angleRad + Math.PI);
      const y1 = 50 + 50 * Math.sin(angleRad + Math.PI);
      const x2 = 50 + 50 * Math.cos(angleRad);
      const y2 = 50 + 50 * Math.sin(angleRad);
      gradientDef = `<linearGradient id="grad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">\n      ${stopsString}\n    </linearGradient>`;
    } else if (settings.type === "radial") {
      gradientDef = `<radialGradient id="grad" cx="50%" cy="50%" r="50%">\n      ${stopsString}\n    </radialGradient>`;
    } else {
      gradientDef = `<linearGradient id="grad">\n      ${stopsString}\n    </linearGradient>`;
    }

    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${gradientDef}
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
</svg>`;

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gradient.svg";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "Gradient saved as SVG",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="CSS Gradient Generator"
        icon={<Palette className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* Gradient Preview - Now the hero */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div
              className="w-full h-80 sm:h-96 relative group"
              style={{ background: cssGradient }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                  Live Preview
                </div>
                <div className="flex gap-2">
                  <Button onClick={copyCSSToClipboard} size="sm" className="bg-black/50 backdrop-blur-sm hover:bg-black/70">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy CSS
                  </Button>
                  <Button onClick={downloadAsPNG} size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                    <Download className="w-4 h-4 mr-2" />
                    PNG
                  </Button>
                  <Button onClick={downloadAsSVG} size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                    <Download className="w-4 h-4 mr-2" />
                    SVG
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* CSS Output - More prominent */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">CSS Code</h3>
              <Button onClick={copyCSSToClipboard} size="sm" variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              <code className="font-mono">background: {cssGradient};</code>
            </pre>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Color Stops */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Color Stops</h3>
                <div className="flex gap-2">
                  <Button onClick={addColorStop} size="sm" variant="outline" title="Add a new color stop">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                  <Button onClick={randomizeColors} size="sm" variant="outline" title="Randomize all colors">
                    <Shuffle className="w-4 h-4" />
                  </Button>
                  <Button onClick={reverseGradient} size="sm" variant="outline" title="Reverse gradient direction">
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                  <Button onClick={sortColorStops} size="sm" variant="outline" title="Sort stops by position">
                    Sort
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {colorStops.map((stop) => (
                  <div key={stop.id} className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                      className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border flex-shrink-0"
                      title="Pick a color"
                    />
                    <input
                      type="text"
                      value={stop.color}
                      onChange={(e) => updateColorStop(stop.id, { color: e.target.value.toUpperCase() })}
                      maxLength={7}
                      placeholder="#FFFFFF"
                      className="flex-1 min-w-[100px] px-3 py-2 bg-background border border-border rounded text-sm font-mono"
                      title="Hex color code"
                    />
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <input
                        type="number"
                        value={stop.position}
                        onChange={(e) => updateColorStop(stop.id, { position: Number(e.target.value) })}
                        min="0"
                        max="100"
                        className="w-16 px-2 py-2 bg-background border border-border rounded text-sm"
                        title="Position (0-100%)"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                    <Button
                      onClick={() => removeColorStop(stop.id)}
                      size="sm"
                      variant="ghost"
                      disabled={colorStops.length <= 2}
                      title="Delete color stop (minimum 2 required)"
                      className="flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Settings</h3>
                <Button onClick={reset} size="sm" variant="outline">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>

              <div className="space-y-4">
                {/* Gradient Type */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Gradient Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["linear", "radial", "conic"] as GradientType[]).map((type) => (
                      <Button
                        key={type}
                        onClick={() => updateSettings({ type })}
                        variant={settings.type === type ? "default" : "outline"}
                        size="sm"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Angle (for linear and conic) */}
                {(settings.type === "linear" || settings.type === "conic") && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Angle: {settings.angle}°
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={settings.angle}
                      onChange={(e) => updateSettings({ angle: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Shape (for radial) */}
                {settings.type === "radial" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Shape</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => updateSettings({ shape: "circle" })}
                        variant={settings.shape === "circle" ? "default" : "outline"}
                        size="sm"
                      >
                        Circle
                      </Button>
                      <Button
                        onClick={() => updateSettings({ shape: "ellipse" })}
                        variant={settings.shape === "ellipse" ? "default" : "outline"}
                        size="sm"
                      >
                        Ellipse
                      </Button>
                    </div>
                  </div>
                )}

                {/* Position (for radial and conic) */}
                {(settings.type === "radial" || settings.type === "conic") && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Position</label>
                    <select
                      value={settings.position}
                      onChange={(e) => updateSettings({ position: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    >
                      <option value="center">Center</option>
                      <option value="top">Top</option>
                      <option value="bottom">Bottom</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                      <option value="top left">Top Left</option>
                      <option value="top right">Top Right</option>
                      <option value="bottom left">Bottom Left</option>
                      <option value="bottom right">Bottom Right</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gradient Presets - Moved to bottom, more visual */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Gradient Presets</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {gradientPresets.map((preset) => {
                const presetGradient = `linear-gradient(135deg, ${preset.stops
                  .map((s) => `${s.color} ${s.position}%`)
                  .join(", ")})`;
                return (
                  <button
                    key={preset.name}
                    onClick={() => loadPreset(preset)}
                    className="group relative h-24 rounded-lg overflow-hidden border-2 border-border hover:border-primary hover:shadow-xl transition-all"
                    style={{ background: presetGradient }}
                    title={`Apply ${preset.name} gradient`}
                  >
                    {/* Strong dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Text with strong shadow and background */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                        <span className="text-white text-xs font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {preset.name}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {!isFullscreen && (
        <>
          <GradientGeneratorInfoSections />
          <Footer isFullscreen={isFullscreen} />
        </>
      )}
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { ColorPickerInfoSections } from "../components/formatter/ColorPickerInfoSections";
import { useColorPicker, type HarmonyType } from "../hooks/useColorPicker";
import {
  Palette,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";

type Tab = "picker" | "shades" | "harmony" | "contrast" | "export";

const HARMONY_TYPES: { value: HarmonyType; label: string; description: string }[] = [
  { value: "complementary", label: "Complementary", description: "Opposite on color wheel" },
  { value: "analogous", label: "Analogous", description: "Adjacent colors" },
  { value: "triadic", label: "Triadic", description: "Evenly spaced (120°)" },
  { value: "split-complementary", label: "Split-Comp.", description: "Base + complement sides" },
  { value: "monochromatic", label: "Monochromatic", description: "Single hue variations" },
];

const ColorPickerComponent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("picker");

  const {
    currentColor,
    setCurrentColor,
    compareColor,
    setCompareColor,
    formats,
    harmonyType,
    setHarmonyType,
    harmony,
    shades,
    contrastRatio,
    wcagCompliance,
    exportCSS,
    exportTailwind,
    exportSass,
    exportJS,
    exportJSON,
  } = useColorPicker();

  const handleCopy = useCallback((value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  }, []);

  const handleDownloadExport = useCallback((content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

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
        title="Color Picker"
        description="Generate palettes & design tokens"
        icon={<Palette className="w-4 h-4 text-primary-foreground" />}
      />

      <main className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-6 w-full max-w-5xl mx-auto`}>
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1 overflow-x-auto">
          {[
            { id: "picker", label: "Picker" },
            { id: "shades", label: "Shades" },
            { id: "harmony", label: "Harmony" },
            { id: "contrast", label: "Contrast" },
            { id: "export", label: "Export" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Picker Tab */}
        {activeTab === "picker" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Preview */}
            <div className="space-y-4">
              <div
                className="w-full h-64 rounded-lg border-2 border-border"
                style={{ backgroundColor: currentColor }}
              />
              <div className="bg-card border border-border rounded-lg p-4">
                <label className="text-sm text-muted-foreground block mb-2">HEX Code</label>
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <label className="text-sm text-muted-foreground block mb-2">Visual Picker</label>
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-full h-12 rounded bg-muted border-2 border-border cursor-pointer"
                />
              </div>
            </div>

            {/* Formats */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Color Formats</h3>
              <FormatRow
                label="HEX"
                value={formats.hex}
                field="hex"
                copied={copiedField === "hex"}
                onCopy={handleCopy}
              />
              <FormatRow
                label="RGB"
                value={`${formats.rgb.r}, ${formats.rgb.g}, ${formats.rgb.b}`}
                field="rgb"
                copied={copiedField === "rgb"}
                onCopy={handleCopy}
              />
              <FormatRow
                label="HSL"
                value={`${formats.hsl.h}°, ${formats.hsl.s}%, ${formats.hsl.l}%`}
                field="hsl"
                copied={copiedField === "hsl"}
                onCopy={handleCopy}
              />
              <FormatRow
                label="HSV"
                value={`${formats.hsv.h}°, ${formats.hsv.s}%, ${formats.hsv.v}%`}
                field="hsv"
                copied={copiedField === "hsv"}
                onCopy={handleCopy}
              />
              <FormatRow
                label="OKLCH"
                value={`${formats.oklch.l}, ${formats.oklch.c}, ${formats.oklch.h}°`}
                field="oklch"
                copied={copiedField === "oklch"}
                onCopy={handleCopy}
                note="Modern, perceptually uniform"
              />
            </div>
          </div>
        )}

        {/* Shades Tab */}
        {activeTab === "shades" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Shade Scale (50-900)
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Generate a complete shade scale from your base color. Perfect for design systems.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {Object.entries(shades).map(([weight, color]) => (
                  <div key={weight} className="space-y-2">
                    <div
                      className="w-full h-20 rounded-md border border-border"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground">{weight}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopy(color, `shade-${weight}`)}
                      >
                        {copiedField === `shade-${weight}` ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs font-mono">{color}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Harmony Tab */}
        {activeTab === "harmony" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Color Harmony</h3>
              <select
                value={harmonyType}
                onChange={(e) => setHarmonyType(e.target.value as HarmonyType)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
              >
                {HARMONY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} — {type.description}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {harmony.map((color, i) => (
                  <div key={i} className="space-y-2">
                    <div
                      className="w-full h-24 rounded-md border-2 border-border"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-mono">{color}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopy(color, `harmony-${i}`)}
                      >
                        {copiedField === `harmony-${i}` ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contrast Tab */}
        {activeTab === "contrast" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">
                  Foreground Color
                </label>
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-full h-12 rounded bg-muted border-2 border-border cursor-pointer"
                />
              </div>
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">
                  Background Color
                </label>
                <input
                  type="text"
                  value={compareColor}
                  onChange={(e) => setCompareColor(e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="color"
                  value={compareColor}
                  onChange={(e) => setCompareColor(e.target.value)}
                  className="w-full h-12 rounded bg-muted border-2 border-border cursor-pointer"
                />
              </div>
            </div>

            {/* Preview */}
            <div
              className="bg-card border border-border rounded-lg p-8 text-center"
              style={{ backgroundColor: compareColor }}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ color: currentColor }}>
                Sample Heading
              </h2>
              <p className="text-base" style={{ color: currentColor }}>
                This is sample body text to preview contrast.
              </p>
            </div>

            {/* Contrast Results */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Contrast Ratio
                </h3>
                <p className="text-3xl font-bold">{contrastRatio.toFixed(2)}:1</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">WCAG AA</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {wcagCompliance.aa.normal ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-xs">Normal text (4.5:1)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {wcagCompliance.aa.large ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-xs">Large text (3:1)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">WCAG AAA</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {wcagCompliance.aaa.normal ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-xs">Normal text (7:1)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {wcagCompliance.aaa.large ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-xs">Large text (4.5:1)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Tab */}
        {activeTab === "export" && (
          <div className="space-y-4">
            <ExportSection
              title="CSS Custom Properties"
              code={exportCSS()}
              filename="colors.css"
              onCopy={handleCopy}
              onDownload={handleDownloadExport}
              copiedField={copiedField}
            />
            <ExportSection
              title="Tailwind Config"
              code={exportTailwind()}
              filename="tailwind.config.js"
              onCopy={handleCopy}
              onDownload={handleDownloadExport}
              copiedField={copiedField}
            />
            <ExportSection
              title="Sass/SCSS Variables"
              code={exportSass()}
              filename="colors.scss"
              onCopy={handleCopy}
              onDownload={handleDownloadExport}
              copiedField={copiedField}
            />
            <ExportSection
              title="JavaScript/TypeScript"
              code={exportJS()}
              filename="colors.ts"
              onCopy={handleCopy}
              onDownload={handleDownloadExport}
              copiedField={copiedField}
            />
            <ExportSection
              title="JSON Design Tokens"
              code={exportJSON()}
              filename="colors.json"
              onCopy={handleCopy}
              onDownload={handleDownloadExport}
              copiedField={copiedField}
            />
          </div>
        )}

        {/* Fullscreen Toggle */}
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </main>

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <ColorPickerInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />
    </div>
  );
};

function FormatRow({
  label,
  value,
  field,
  copied,
  onCopy,
  note,
}: {
  label: string;
  value: string;
  field: string;
  copied: boolean;
  onCopy: (value: string, field: string) => void;
  note?: string;
}) {
  return (
    <div className="bg-secondary/30 rounded-md p-3 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          {note && <span className="text-[10px] text-muted-foreground/60 italic">{note}</span>}
        </div>
        <p className="font-mono text-sm">{value}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 flex-shrink-0"
        onClick={() => onCopy(value, field)}
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </Button>
    </div>
  );
}

function ExportSection({
  title,
  code,
  filename,
  onCopy,
  onDownload,
  copiedField,
}: {
  title: string;
  code: string;
  filename: string;
  onCopy: (value: string, field: string) => void;
  onDownload: (content: string, filename: string) => void;
  copiedField: string | null;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(code, filename)}
            className="gap-1.5"
          >
            {copiedField === filename ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDownload(code, filename)}
            className="gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </Button>
        </div>
      </div>
      <pre className="bg-secondary/30 rounded-md p-3 overflow-x-auto text-xs font-mono leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

export default ColorPickerComponent;

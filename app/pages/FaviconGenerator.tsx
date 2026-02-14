"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useFaviconGenerator, faviconSizes } from "../hooks/useFaviconGenerator";
import { ImageIcon, Upload, Download, RotateCcw } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import JSZip from "jszip";

export default function FaviconGenerator() {
  const {
    settings,
    imagePreview,
    updateSettings,
    handleImageUpload,
    generateFavicon,
    reset,
  } = useFaviconGenerator();

  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previews, setPreviews] = useState<Record<number, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate previews whenever settings change (live preview)
  useEffect(() => {
    const generatePreviews = async () => {
      const newPreviews: Record<number, string> = {};
      for (const { size } of faviconSizes) {
        const dataUrl = await generateFavicon(size);
        newPreviews[size] = dataUrl;
      }
      setPreviews(newPreviews);
    };

    // Only generate if we have text or image
    if (settings.text || imagePreview) {
      generatePreviews();
    }
  }, [settings, imagePreview, generateFavicon]);

  const downloadAll = async () => {
    const zip = new JSZip();

    for (const { name, size } of faviconSizes) {
      const dataUrl = await generateFavicon(size);
      const base64 = dataUrl.split(",")[1];
      zip.file(name, base64, { base64: true });
    }

    // Generate HTML snippet
    const htmlSnippet = `<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;
    zip.file("favicon-html.txt", htmlSnippet);

    // Generate manifest
    const manifest = {
      name: "Your App Name",
      short_name: "App",
      icons: [
        { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: settings.backgroundColor,
      background_color: settings.backgroundColor,
      display: "standalone",
    };
    zip.file("site.webmanifest", JSON.stringify(manifest, null, 2));

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favicons.zip";
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Favicons package downloaded as ZIP",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="Favicon Generator"
        icon={<ImageIcon className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* Controls Card */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Create Your Favicon</h3>
              <div className="flex gap-2">
                <Button onClick={reset} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                {Object.keys(previews).length > 0 && (
                  <Button onClick={downloadAll} size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                )}
              </div>
            </div>

            {/* Source Type Tabs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => updateSettings({ sourceType: "text" })}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  settings.sourceType === "text"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Text Favicon
              </button>
              <button
                onClick={() => updateSettings({ sourceType: "image" })}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  settings.sourceType === "image"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Image Favicon
              </button>
            </div>

            {/* Text Mode */}
            {settings.sourceType === "text" ? (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Text (1-3 characters)</label>
                  <input
                    type="text"
                    value={settings.text}
                    onChange={(e) => updateSettings({ text: e.target.value.slice(0, 3) })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-lg font-medium text-center"
                    placeholder="A"
                    maxLength={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Text Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.textColor}
                        onChange={(e) => updateSettings({ textColor: e.target.value })}
                        className="w-14 h-11 rounded-lg cursor-pointer bg-muted border-2 border-border"
                      />
                      <input
                        type="text"
                        value={settings.textColor}
                        onChange={(e) => updateSettings({ textColor: e.target.value })}
                        className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Background Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.backgroundColor}
                        onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                        className="w-14 h-11 rounded-lg cursor-pointer bg-muted border-2 border-border"
                      />
                      <input
                        type="text"
                        value={settings.backgroundColor}
                        onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                        className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Font Family</label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => updateSettings({ fontFamily: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                  >
                    <option value="Arial">Arial (Clean, Modern)</option>
                    <option value="Helvetica">Helvetica (Classic)</option>
                    <option value="Times New Roman">Times New Roman (Serif)</option>
                    <option value="Courier New">Courier New (Monospace)</option>
                    <option value="Georgia">Georgia (Elegant)</option>
                    <option value="Verdana">Verdana (Readable)</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                />
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-lg border-2 border-border shadow-sm"
                      />
                    </div>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-16 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-colors"
                  >
                    <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                    <p className="font-medium">Click to upload image</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Square images work best (512x512 recommended)
                    </p>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Live Preview - Always visible when there's content */}
          {(settings.text || imagePreview) && Object.keys(previews).length > 0 && (
            <>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Live Preview</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {faviconSizes.map(({ size, description }) => (
                    <div
                      key={size}
                      className="bg-gradient-to-br from-muted to-muted/50 rounded-lg p-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
                    >
                      <div
                        className="bg-white rounded-md flex items-center justify-center shadow-sm overflow-hidden"
                        style={{ width: Math.min(size, 96), height: Math.min(size, 96) }}
                      >
                        {previews[size] && (
                          <img
                            src={previews[size]}
                            alt={`${size}x${size}`}
                            className="w-full h-full object-contain rounded-md"
                          />
                        )}
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold">{size}x{size}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HTML Implementation Code */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Implementation Code</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Add this code to the &lt;head&gt; section of your HTML:
                </p>
                <pre className="bg-muted p-4 rounded-lg text-xs sm:text-sm overflow-x-auto">
                  <code>{`<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`}</code>
                </pre>
              </div>
            </>
          )}

          {/* Empty State */}
          {!settings.text && !imagePreview && (
            <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-12 text-center">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-lg mb-2">Create Your First Favicon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Choose between text or image mode above to start creating your favicon.
                Changes will preview instantly.
              </p>
            </div>
          )}
        </div>
      </main>

      {!isFullscreen && <Footer isFullscreen={isFullscreen} />}
    </div>
  );
}

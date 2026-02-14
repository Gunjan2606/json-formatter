"use client";

import { useState, useRef, useCallback } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useWatermark, PositionType } from "../hooks/useWatermark";
import { FileImage, Upload, Download, RotateCcw, X, Package } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import JSZip from "jszip";
import { WatermarkToolInfoSections } from "../components/formatter/WatermarkToolInfoSections";

const positions: { id: PositionType; name: string }[] = [
  { id: "top-left", name: "Top Left" },
  { id: "top-right", name: "Top Right" },
  { id: "center", name: "Center" },
  { id: "bottom-left", name: "Bottom Left" },
  { id: "bottom-right", name: "Bottom Right" },
];

const fonts = ["Arial", "Helvetica", "Times New Roman", "Georgia", "Verdana", "Impact"];

export default function WatermarkTool() {
  const {
    settings,
    images,
    updateSettings,
    handleImageUpload,
    removeImage,
    clearAll,
    reset,
  } = useWatermark();

  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const applyWatermark = useCallback(
    async (imageUrl: string): Promise<string> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(imageUrl);
            return;
          }

          // Draw original image
          ctx.drawImage(img, 0, 0);

          // Set watermark position
          let x = settings.offsetX;
          let y = settings.offsetY;

          if (settings.position === "top-right") {
            x = canvas.width - settings.offsetX;
          } else if (settings.position === "bottom-left") {
            y = canvas.height - settings.offsetY;
          } else if (settings.position === "bottom-right") {
            x = canvas.width - settings.offsetX;
            y = canvas.height - settings.offsetY;
          } else if (settings.position === "center") {
            x = canvas.width / 2;
            y = canvas.height / 2;
          }

          ctx.save();
          ctx.globalAlpha = settings.opacity;
          ctx.translate(x, y);
          ctx.rotate((settings.rotation * Math.PI) / 180);

          if (settings.type === "text") {
            ctx.font = `bold ${settings.fontSize}px ${settings.fontFamily}`;
            ctx.fillStyle = settings.textColor;
            ctx.textAlign = settings.position.includes("right") ? "right" : settings.position === "center" ? "center" : "left";
            ctx.textBaseline = settings.position.includes("bottom") ? "bottom" : settings.position === "center" ? "middle" : "top";
            ctx.fillText(settings.text, 0, 0);
          } else if (settings.type === "logo" && settings.logoUrl) {
            const logo = new Image();
            logo.crossOrigin = "anonymous";
            logo.onload = () => {
              const aspectRatio = logo.width / logo.height;
              const logoWidth = settings.logoSize;
              const logoHeight = settings.logoSize / aspectRatio;
              const offsetX = settings.position.includes("right") ? -logoWidth : settings.position === "center" ? -logoWidth / 2 : 0;
              const offsetY = settings.position.includes("bottom") ? -logoHeight : settings.position === "center" ? -logoHeight / 2 : 0;
              ctx.drawImage(logo, offsetX, offsetY, logoWidth, logoHeight);
              ctx.restore();
              resolve(canvas.toDataURL("image/jpeg", 0.95));
            };
            logo.src = settings.logoUrl;
            return;
          }

          ctx.restore();
          resolve(canvas.toDataURL("image/jpeg", 0.95));
        };
        img.src = imageUrl;
      });
    },
    [settings]
  );

  const downloadSingle = useCallback(
    async (imageId: string) => {
      const image = images.find((img) => img.id === imageId);
      if (!image) return;

      const watermarked = await applyWatermark(image.preview);
      const a = document.createElement("a");
      a.href = watermarked;
      a.download = `watermarked-${image.file.name}`;
      a.click();

      toast({
        title: "Downloaded!",
        description: "Watermarked image saved",
      });
    },
    [images, applyWatermark, toast]
  );

  const downloadAll = useCallback(async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    try {
      const zip = new JSZip();

      for (const image of images) {
        const watermarked = await applyWatermark(image.preview);
        const base64 = watermarked.split(",")[1];
        zip.file(`watermarked-${image.file.name}`, base64, { base64: true });
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "watermarked-images.zip";
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Downloaded!",
        description: `${images.length} watermarked images saved as ZIP`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to process images",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [images, applyWatermark, toast]);

  const handleLogoUpload = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    updateSettings({ logoUrl: url });
  }, [updateSettings]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="Watermark Tool"
        icon={<FileImage className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* Upload Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Upload Images</h3>
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) handleImageUpload(e.target.files);
                  }}
                />
                <Button onClick={() => fileInputRef.current?.click()} size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Add Images
                </Button>
                {images.length > 0 && (
                  <>
                    <Button onClick={clearAll} variant="outline" size="sm">
                      Clear All
                    </Button>
                    <Button onClick={downloadAll} size="sm" disabled={isProcessing}>
                      <Package className="w-4 h-4 mr-2" />
                      {isProcessing ? "Processing..." : `Download All (${images.length})`}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {images.length === 0 ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-16 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-colors"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">Upload Images</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Single or multiple images • PNG, JPG, WebP
                </p>
              </button>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <Button
                      onClick={() => downloadSingle(image.id)}
                      className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settings */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Preview */}
              <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Preview (First Image)</h3>
                <div className="relative inline-block">
                  <img
                    src={images[0].preview}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg border border-border"
                  />
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      opacity: settings.opacity,
                      ...(settings.position === "top-left" && { top: settings.offsetY, left: settings.offsetX }),
                      ...(settings.position === "top-right" && { top: settings.offsetY, right: settings.offsetX }),
                      ...(settings.position === "bottom-left" && { bottom: settings.offsetY, left: settings.offsetX }),
                      ...(settings.position === "bottom-right" && { bottom: settings.offsetY, right: settings.offsetX }),
                      ...(settings.position === "center" && { top: "50%", left: "50%", transform: `translate(-50%, -50%) rotate(${settings.rotation}deg)` }),
                      ...((settings.position !== "center") && { transform: `rotate(${settings.rotation}deg)` }),
                    }}
                  >
                    {settings.type === "text" && (
                      <div
                        style={{
                          fontFamily: settings.fontFamily,
                          fontSize: `${settings.fontSize}px`,
                          color: settings.textColor,
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {settings.text}
                      </div>
                    )}
                    {settings.type === "logo" && settings.logoUrl && (
                      <img
                        src={settings.logoUrl}
                        alt="Logo"
                        style={{ width: settings.logoSize, height: "auto" }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Type */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-medium mb-2 block">Watermark Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => updateSettings({ type: "text" })}
                      variant={settings.type === "text" ? "default" : "outline"}
                      size="sm"
                    >
                      Text
                    </Button>
                    <Button
                      onClick={() => updateSettings({ type: "logo" })}
                      variant={settings.type === "logo" ? "default" : "outline"}
                      size="sm"
                    >
                      Logo
                    </Button>
                  </div>
                </div>

                {/* Text Settings */}
                {settings.type === "text" && (
                  <>
                    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Text</label>
                        <input
                          type="text"
                          value={settings.text}
                          onChange={(e) => updateSettings({ text: e.target.value })}
                          className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                          placeholder="© Your Name"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Font</label>
                        <select
                          value={settings.fontFamily}
                          onChange={(e) => updateSettings({ fontFamily: e.target.value })}
                          className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                        >
                          {fonts.map((font) => (
                            <option key={font} value={font}>
                              {font}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Size: {settings.fontSize}px
                        </label>
                        <input
                          type="range"
                          min="12"
                          max="120"
                          value={settings.fontSize}
                          onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={settings.textColor}
                            onChange={(e) => updateSettings({ textColor: e.target.value })}
                            className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                          />
                          <input
                            type="text"
                            value={settings.textColor}
                            onChange={(e) => updateSettings({ textColor: e.target.value })}
                            className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Logo Settings */}
                {settings.type === "logo" && (
                  <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Logo Image</label>
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleLogoUpload(file);
                        }}
                      />
                      <Button
                        onClick={() => logoInputRef.current?.click()}
                        variant="outline"
                        className="w-full"
                        size="sm"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {settings.logoUrl ? "Change Logo" : "Upload Logo"}
                      </Button>
                    </div>

                    {settings.logoUrl && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Size: {settings.logoSize}px
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="300"
                          value={settings.logoSize}
                          onChange={(e) => updateSettings({ logoSize: Number(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Position */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <label className="text-sm font-medium mb-2 block">Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    {positions.map((pos) => (
                      <Button
                        key={pos.id}
                        onClick={() => updateSettings({ position: pos.id })}
                        variant={settings.position === pos.id ? "default" : "outline"}
                        size="sm"
                      >
                        {pos.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Common Settings */}
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Opacity: {Math.round(settings.opacity * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={settings.opacity}
                      onChange={(e) => updateSettings({ opacity: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Rotation: {settings.rotation}°
                    </label>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      value={settings.rotation}
                      onChange={(e) => updateSettings({ rotation: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <Button onClick={reset} variant="outline" className="w-full">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset All
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {!isFullscreen && (
        <>
          <WatermarkToolInfoSections />
          <Footer isFullscreen={isFullscreen} />
        </>
      )}
    </div>
  );
}

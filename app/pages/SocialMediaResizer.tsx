"use client";

import { useState, useRef, useCallback } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useSocialMediaResizer, platformSizes } from "../hooks/useSocialMediaResizer";
import { Share2, Upload, Download, RotateCcw, Check, Package } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import JSZip from "jszip";
import { SocialMediaResizerInfoSections } from "../components/formatter/SocialMediaResizerInfoSections";

export default function SocialMediaResizer() {
  const {
    uploadedImage,
    originalImage,
    fitMode,
    selectedPlatforms,
    handleImageUpload,
    setFitMode,
    togglePlatform,
    selectAll,
    deselectAll,
    reset,
  } = useSocialMediaResizer();

  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resizeImage = useCallback(
    (width: number, height: number): string => {
      if (!originalImage) return "";

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "";

      // Fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      const imgRatio = originalImage.width / originalImage.height;
      const targetRatio = width / height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (fitMode === "cover") {
        if (imgRatio > targetRatio) {
          drawHeight = height;
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = width;
          drawHeight = width / imgRatio;
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        }
      } else {
        // contain
        if (imgRatio > targetRatio) {
          drawWidth = width;
          drawHeight = width / imgRatio;
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        } else {
          drawHeight = height;
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
          offsetY = 0;
        }
      }

      ctx.drawImage(originalImage, offsetX, offsetY, drawWidth, drawHeight);
      return canvas.toDataURL("image/jpeg", 0.95);
    },
    [originalImage, fitMode]
  );

  const downloadSingle = useCallback(
    (platformId: string) => {
      const platform = platformSizes.find((p) => p.id === platformId);
      if (!platform) return;

      const dataUrl = resizeImage(platform.width, platform.height);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${platform.platform.toLowerCase()}-${platform.name.toLowerCase()}-${platform.width}x${platform.height}.jpg`;
      a.click();

      toast({
        title: "Downloaded!",
        description: `${platform.platform} ${platform.name} saved`,
      });
    },
    [resizeImage, toast]
  );

  const downloadAll = useCallback(async () => {
    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    try {
      const zip = new JSZip();

      for (const platformId of selectedPlatforms) {
        const platform = platformSizes.find((p) => p.id === platformId);
        if (!platform) continue;

        const dataUrl = resizeImage(platform.width, platform.height);
        const base64 = dataUrl.split(",")[1];
        const filename = `${platform.platform.toLowerCase()}-${platform.name.toLowerCase()}-${platform.width}x${platform.height}.jpg`;
        zip.file(filename, base64, { base64: true });
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "social-media-images.zip";
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Downloaded!",
        description: `${selectedPlatforms.length} images saved as ZIP`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to create ZIP file",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  }, [selectedPlatforms, resizeImage, toast]);

  const groupedPlatforms = platformSizes.reduce((acc, platform) => {
    if (!acc[platform.platform]) {
      acc[platform.platform] = [];
    }
    acc[platform.platform].push(platform);
    return acc;
  }, {} as Record<string, typeof platformSizes>);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="Social Media Resizer"
        icon={<Share2 className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* Upload Section */}
          {!uploadedImage ? (
            <div className="bg-card border border-border rounded-lg p-8">
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
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-24 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-colors"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">Upload Your Image</p>
                <p className="text-sm text-muted-foreground mt-2">
                  One image → All social media sizes • Max 10MB
                </p>
              </button>
            </div>
          ) : (
            <>
              {/* Controls */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="sm"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Fit Mode:</span>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setFitMode("cover")}
                          variant={fitMode === "cover" ? "default" : "outline"}
                          size="sm"
                        >
                          Cover
                        </Button>
                        <Button
                          onClick={() => setFitMode("contain")}
                          variant={fitMode === "contain" ? "default" : "outline"}
                          size="sm"
                        >
                          Contain
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={selectAll} variant="outline" size="sm">
                      Select All
                    </Button>
                    <Button onClick={deselectAll} variant="outline" size="sm">
                      Deselect All
                    </Button>
                    <Button onClick={reset} variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button
                      onClick={downloadAll}
                      size="sm"
                      disabled={selectedPlatforms.length === 0 || isDownloading}
                    >
                      <Package className="w-4 h-4 mr-2" />
                      {isDownloading ? "Preparing..." : `Download All (${selectedPlatforms.length})`}
                    </Button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Cover:</strong> Fills entire frame, may crop edges • <strong>Contain:</strong> Fits entire image, may show white space
                  </p>
                </div>
              </div>

              {/* Platform Grid */}
              <div className="space-y-6">
                {Object.entries(groupedPlatforms).map(([platform, sizes]) => (
                  <div key={platform} className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      {platform}
                      <span className="text-xs text-muted-foreground font-normal">
                        ({sizes.filter((s) => selectedPlatforms.includes(s.id)).length}/{sizes.length} selected)
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sizes.map((size) => {
                        const isSelected = selectedPlatforms.includes(size.id);
                        const previewUrl = resizeImage(size.width, size.height);

                        return (
                          <div
                            key={size.id}
                            className={`relative rounded-lg border-2 transition-all ${
                              isSelected
                                ? "border-primary bg-primary/5"
                                : "border-border bg-muted/30"
                            }`}
                          >
                            {/* Selection Checkbox */}
                            <button
                              onClick={() => togglePlatform(size.id)}
                              className="absolute top-2 left-2 z-10 w-6 h-6 rounded-md border-2 border-border bg-background flex items-center justify-center hover:border-primary transition-colors"
                            >
                              {isSelected && <Check className="w-4 h-4 text-primary" />}
                            </button>

                            {/* Download Single */}
                            <button
                              onClick={() => downloadSingle(size.id)}
                              className="absolute top-2 right-2 z-10 p-1.5 rounded-md bg-background border border-border hover:bg-muted transition-colors"
                              title="Download this size"
                            >
                              <Download className="w-4 h-4" />
                            </button>

                            {/* Preview */}
                            <div className="p-4">
                              <div
                                className="w-full rounded-md overflow-hidden bg-white"
                                style={{
                                  aspectRatio: `${size.width}/${size.height}`,
                                }}
                              >
                                {previewUrl && (
                                  <img
                                    src={previewUrl}
                                    alt={`${size.platform} ${size.name}`}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>

                              {/* Info */}
                              <div className="mt-3 space-y-1">
                                <div className="font-semibold text-sm">{size.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {size.width} × {size.height} • {size.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {!isFullscreen && (
        <>
          <SocialMediaResizerInfoSections />
          <Footer isFullscreen={isFullscreen} />
        </>
      )}
    </div>
  );
}

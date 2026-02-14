"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { ImageCompressorInfoSections } from "../components/formatter/ImageCompressorInfoSections";
import { useImageCompressor, type CompressedImage } from "../hooks/useImageCompressor";
import {
  Image as ImageIcon,
  Upload,
  Download,
  Trash2,
  Settings,
  Check,
  X,
  Loader2,
  ZoomIn,
  Maximize2,
  Minimize2,
} from "lucide-react";

const ImageCompressorComponent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [previewImage, setPreviewImage] = useState<{
    original: string;
    compressed: string;
    name: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    images,
    settings,
    stats,
    isCompressing,
    addImages,
    compressImages,
    downloadImage,
    downloadAll,
    removeImage,
    clearAll,
    updateSettings,
    resetSettings,
  } = useImageCompressor();

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      if (imageFiles.length > 0) {
        addImages(imageFiles);
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [addImages]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      if (imageFiles.length > 0) {
        addImages(imageFiles);
      }
    },
    [addImages]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
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

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

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
        title="Image Compressor"
        description="Compress PNG, JPG, WebP, GIF & more"
        icon={<ImageIcon className="w-4 h-4 text-primary-foreground" />}
      />

      <main className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-4 w-full max-w-7xl mx-auto`}>
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="gap-1.5"
            disabled={isCompressing}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Images
          </Button>

          {images.length > 0 && (
            <>
              <Button
                onClick={() => compressImages()}
                disabled={isCompressing || stats.pending === 0}
                variant="default"
                className="gap-1.5"
              >
                {isCompressing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Compress All ({stats.pending})
                  </>
                )}
              </Button>

              <Button
                onClick={downloadAll}
                disabled={stats.completed === 0}
                variant="outline"
                className="gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download All ({stats.completed})
              </Button>
            </>
          )}

          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="ghost"
            size="sm"
            className="gap-1.5"
          >
            <Settings className="w-3.5 h-3.5" />
            Settings
          </Button>

          {images.length > 0 && (
            <Button
              onClick={clearAll}
              variant="ghost"
              size="sm"
              className="gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </Button>
          )}

          <div className="flex-1" />

          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Compression Settings</h3>
              <Button onClick={resetSettings} variant="ghost" size="sm">
                Reset
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quality */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Quality: {settings.quality}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={settings.quality}
                  onChange={(e) => updateSettings({ quality: parseInt(e.target.value) })}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Higher = better quality, larger file size
                </p>
              </div>

              {/* Max Dimension */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Max Dimension: {settings.maxWidthOrHeight === 0 ? "Original" : `${settings.maxWidthOrHeight}px`}
                </label>
                <select
                  value={settings.maxWidthOrHeight}
                  onChange={(e) => updateSettings({ maxWidthOrHeight: parseInt(e.target.value) })}
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
                >
                  <option value="0">Keep Original</option>
                  <option value="1920">1920px (Full HD)</option>
                  <option value="1280">1280px (HD)</option>
                  <option value="800">800px (Small)</option>
                  <option value="400">400px (Thumbnail)</option>
                </select>
              </div>

              {/* Output Format */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Output Format</label>
                <select
                  value={settings.format}
                  onChange={(e) => updateSettings({ format: e.target.value as "original" | "jpeg" | "png" | "webp" })}
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
                >
                  <option value="original">Keep Original</option>
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP (Best Compression)</option>
                </select>
              </div>

              {/* Preserve EXIF */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={settings.preserveExif}
                    onChange={(e) => updateSettings({ preserveExif: e.target.checked })}
                    className="rounded"
                  />
                  Preserve EXIF Metadata
                </label>
                <p className="text-xs text-muted-foreground">
                  Keep camera settings, location, and other metadata
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Total Images</p>
              <p className="text-lg font-bold">{stats.totalImages}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Completed</p>
              <p className="text-lg font-bold text-emerald-500">{stats.completed}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Original Size</p>
              <p className="text-lg font-bold">{formatBytes(stats.totalOriginalSize)}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Saved</p>
              <p className="text-lg font-bold text-emerald-500">
                {formatBytes(stats.totalSavings)} (
                {stats.totalOriginalSize > 0
                  ? ((stats.totalSavings / stats.totalOriginalSize) * 100).toFixed(1)
                  : 0}
                %)
              </p>
            </div>
          </div>
        )}

        {/* Upload Area */}
        {images.length === 0 && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg p-12 cursor-pointer hover:border-primary hover:bg-card transition-colors"
          >
            <div className="text-center space-y-4">
              <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold">Drop images here or click to upload</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supports PNG, JPG, WebP, GIF, AVIF, SVG • No file size limits • 100% private
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                onDownload={() => downloadImage(image)}
                onRemove={() => removeImage(image.id)}
                onPreview={() => {
                  if (image.status === "completed") {
                    setPreviewImage({
                      original: image.originalPreview,
                      compressed: image.compressedPreview,
                      name: image.original.name,
                    });
                  }
                }}
                formatBytes={formatBytes}
              />
            ))}
          </div>
        )}
      </main>

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-card rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">{previewImage.name}</h3>
              <Button variant="ghost" size="icon" onClick={() => setPreviewImage(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <p className="text-sm font-medium mb-2 text-center">Original</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewImage.original}
                  alt="Original"
                  className="w-full h-auto rounded border border-border"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2 text-center">Compressed</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewImage.compressed}
                  alt="Compressed"
                  className="w-full h-auto rounded border border-border"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <ImageCompressorInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />
    </div>
  );
};

function ImageCard({
  image,
  onDownload,
  onRemove,
  onPreview,
  formatBytes,
}: {
  image: CompressedImage;
  onDownload: () => void;
  onRemove: () => void;
  onPreview: () => void;
  formatBytes: (bytes: number) => string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Preview */}
      <div className="aspect-video relative bg-muted">
        {image.originalPreview && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.originalPreview}
              alt={image.original.name}
              className="w-full h-full object-cover"
            />
            {image.status === "completed" && (
              <button
                onClick={onPreview}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <p className="text-sm font-medium truncate" title={image.original.name}>
          {image.original.name}
        </p>

        {/* Status */}
        {image.status === "pending" && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-gray-500" />
            Ready to compress
          </div>
        )}

        {image.status === "compressing" && (
          <div className="flex items-center gap-2 text-xs text-blue-500">
            <Loader2 className="w-3 h-3 animate-spin" />
            Compressing...
          </div>
        )}

        {image.status === "completed" && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-emerald-500">
              <Check className="w-3 h-3" />
              Compressed successfully
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Original</p>
                <p className="font-medium">{formatBytes(image.originalSize)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Compressed</p>
                <p className="font-medium">{formatBytes(image.compressedSize)}</p>
              </div>
            </div>
            <div className="text-xs text-emerald-500 font-medium">
              Saved {formatBytes(image.savings)} ({image.savingsPercent.toFixed(1)}%)
            </div>
          </div>
        )}

        {image.status === "error" && (
          <div className="flex items-center gap-2 text-xs text-red-500">
            <X className="w-3 h-3" />
            {image.error || "Compression failed"}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          {image.status === "completed" && (
            <Button onClick={onDownload} size="sm" variant="outline" className="flex-1">
              <Download className="w-3 h-3 mr-1" />
              Download
            </Button>
          )}
          <Button onClick={onRemove} size="sm" variant="ghost">
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ImageCompressorComponent;

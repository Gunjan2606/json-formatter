"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  RefreshCw,
} from "lucide-react";

const ImageCompressorComponent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [previewImage, setPreviewImage] = useState<CompressedImage | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
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

  // Auto-compress when new images are added
  const prevCountRef = useRef(0);
  useEffect(() => {
    if (settings.autoCompress && images.length > prevCountRef.current && !isCompressing) {
      compressImages();
    }
    prevCountRef.current = images.length;
  }, [images.length, settings.autoCompress, isCompressing, compressImages]);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      if (imageFiles.length > 0) addImages(imageFiles);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [addImages]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      if (imageFiles.length > 0) addImages(imageFiles);
    },
    [addImages]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = Array.from(e.clipboardData?.items || []);
      const imageFiles = items
        .filter((item) => item.type.startsWith("image/"))
        .map((item) => item.getAsFile())
        .filter(Boolean) as File[];
      if (imageFiles.length > 0) addImages(imageFiles);
    },
    [addImages]
  );

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

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

      <main
        className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-4 w-full max-w-7xl mx-auto`}
      >
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
            <Button onClick={clearAll} variant="ghost" size="sm" className="gap-1.5">
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Quality: {settings.quality}%</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={settings.quality}
                  onChange={(e) => updateSettings({ quality: parseInt(e.target.value) })}
                  className="w-full accent-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Higher = better quality, larger file size
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Max Dimension:{" "}
                  {settings.maxWidthOrHeight === 0
                    ? "Original"
                    : `${settings.maxWidthOrHeight}px`}
                </label>
                <select
                  value={settings.maxWidthOrHeight}
                  onChange={(e) =>
                    updateSettings({ maxWidthOrHeight: parseInt(e.target.value) })
                  }
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
                >
                  <option value="0">Keep Original</option>
                  <option value="1920">1920px (Full HD)</option>
                  <option value="1280">1280px (HD)</option>
                  <option value="800">800px (Small)</option>
                  <option value="400">400px (Thumbnail)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Output Format</label>
                <select
                  value={settings.format}
                  onChange={(e) =>
                    updateSettings({
                      format: e.target.value as "original" | "jpeg" | "png" | "webp",
                    })
                  }
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
                >
                  <option value="original">Keep Original</option>
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP (Best Compression)</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.preserveExif}
                    onChange={(e) => updateSettings({ preserveExif: e.target.checked })}
                    className="rounded"
                  />
                  Preserve EXIF Metadata
                </label>
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoCompress}
                    onChange={(e) => updateSettings({ autoCompress: e.target.checked })}
                    className="rounded"
                  />
                  Auto-compress on upload
                </label>
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
              <p className="text-xs text-muted-foreground">Total Saved</p>
              <p className="text-lg font-bold text-emerald-500">
                {formatBytes(stats.totalSavings)}{" "}
                {stats.totalOriginalSize > 0 && (
                  <span className="text-sm">
                    ({((stats.totalSavings / stats.totalOriginalSize) * 100).toFixed(1)}%)
                  </span>
                )}
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
                <p className="text-lg font-semibold">
                  Drop images here, click to upload, or paste from clipboard
                </p>
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
                onCompress={() => compressImages([image.id])}
                onPreview={() => {
                  if (image.status === "completed") {
                    setSliderPos(50);
                    setPreviewImage(image);
                  }
                }}
                formatBytes={formatBytes}
                isCompressing={isCompressing}
              />
            ))}
          </div>
        )}
      </main>

      {/* Before/After Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{previewImage.original.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Drag the slider to compare original vs compressed
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setPreviewImage(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Slider comparison */}
            <div className="p-4 space-y-4">
              <div
                className="relative overflow-hidden rounded border border-border select-none"
                style={{ userSelect: "none" }}
              >
                {/* Compressed (full width, behind) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewImage.compressedPreview}
                  alt="Compressed"
                  className="w-full h-auto block"
                  draggable={false}
                />

                {/* Original (clipped to left portion) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewImage.originalPreview}
                    alt="Original"
                    className="w-full h-auto block"
                    style={{ minWidth: `${10000 / sliderPos}%` }}
                    draggable={false}
                  />
                </div>

                {/* Divider line */}
                <div
                  className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_4px_rgba(0,0,0,0.8)]"
                  style={{ left: `${sliderPos}%` }}
                />

                {/* Labels */}
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
                  Original
                </div>
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
                  Compressed
                </div>

                {/* Slider handle */}
                <div
                  className="absolute inset-y-0 flex items-center"
                  style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
                >
                  <div className="w-8 h-8 rounded-full bg-white shadow-lg border-2 border-gray-300 flex items-center justify-center cursor-ew-resize">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M4 7H1M1 7L3 5M1 7L3 9M10 7H13M13 7L11 5M13 7L11 9" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Invisible range input for dragging */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/40 rounded p-3 space-y-1">
                  <p className="font-medium text-muted-foreground">Original</p>
                  <p className="font-bold">{formatBytes(previewImage.originalSize)}</p>
                  {previewImage.originalDimensions && (
                    <p className="text-xs text-muted-foreground">
                      {previewImage.originalDimensions.width} × {previewImage.originalDimensions.height}px
                    </p>
                  )}
                </div>
                <div className="bg-emerald-500/10 rounded p-3 space-y-1">
                  <p className="font-medium text-emerald-600">Compressed</p>
                  <p className="font-bold text-emerald-500">{formatBytes(previewImage.compressedSize)}</p>
                  {previewImage.compressedDimensions && (
                    <p className="text-xs text-muted-foreground">
                      {previewImage.compressedDimensions.width} × {previewImage.compressedDimensions.height}px
                    </p>
                  )}
                  <p className="text-xs text-emerald-500 font-medium">
                    −{previewImage.savingsPercent.toFixed(1)}% smaller
                  </p>
                </div>
              </div>

              <Button onClick={() => downloadImage(previewImage)} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Compressed
              </Button>
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
  onCompress,
  onPreview,
  formatBytes,
  isCompressing,
}: {
  image: CompressedImage;
  onDownload: () => void;
  onRemove: () => void;
  onCompress: () => void;
  onPreview: () => void;
  formatBytes: (bytes: number) => string;
  isCompressing: boolean;
}) {
  const [showCompressed, setShowCompressed] = useState(false);
  const previewSrc =
    showCompressed && image.compressedPreview
      ? image.compressedPreview
      : image.originalPreview;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Thumbnail */}
      <div className="aspect-video relative bg-muted">
        {previewSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewSrc}
            alt={image.original.name}
            className="w-full h-full object-cover"
          />
        )}

        {/* Top-right actions */}
        <div className="absolute top-2 right-2 flex gap-1">
          {image.status === "completed" && (
            <>
              <button
                onClick={() => setShowCompressed((v) => !v)}
                title={showCompressed ? "Show original" : "Show compressed"}
                className="bg-black/50 hover:bg-black/70 text-white px-2 py-1 rounded text-[10px] font-medium transition-colors"
              >
                {showCompressed ? "Original" : "Compressed"}
              </button>
              <button
                onClick={onPreview}
                className="bg-black/50 hover:bg-black/70 text-white p-1.5 rounded transition-colors"
                title="Compare"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <p className="text-sm font-medium truncate" title={image.original.name}>
          {image.original.name}
        </p>

        {image.status === "pending" && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            Ready to compress
            {image.originalDimensions && (
              <span className="ml-auto">
                {image.originalDimensions.width}×{image.originalDimensions.height}
              </span>
            )}
          </div>
        )}

        {image.status === "compressing" && (
          <div className="flex items-center gap-2 text-xs text-blue-500">
            <Loader2 className="w-3 h-3 animate-spin" />
            Compressing...
          </div>
        )}

        {image.status === "completed" && (
          <div className="space-y-1.5">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Original</p>
                <p className="font-medium">{formatBytes(image.originalSize)}</p>
                {image.originalDimensions && (
                  <p className="text-muted-foreground text-[10px]">
                    {image.originalDimensions.width}×{image.originalDimensions.height}
                  </p>
                )}
              </div>
              <div>
                <p className="text-muted-foreground">Compressed</p>
                <p className="font-medium text-emerald-500">{formatBytes(image.compressedSize)}</p>
                {image.compressedDimensions && (
                  <p className="text-muted-foreground text-[10px]">
                    {image.compressedDimensions.width}×{image.compressedDimensions.height}
                  </p>
                )}
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
        <div className="flex items-center gap-2 pt-1">
          {image.status === "completed" && (
            <Button onClick={onDownload} size="sm" variant="outline" className="flex-1 gap-1">
              <Download className="w-3 h-3" />
              Download
            </Button>
          )}
          {image.status === "pending" && (
            <Button
              onClick={onCompress}
              size="sm"
              variant="outline"
              className="flex-1 gap-1"
              disabled={isCompressing}
            >
              <Check className="w-3 h-3" />
              Compress
            </Button>
          )}
          {image.status === "error" && (
            <Button
              onClick={onCompress}
              size="sm"
              variant="outline"
              className="flex-1 gap-1"
              disabled={isCompressing}
            >
              <RefreshCw className="w-3 h-3" />
              Retry
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

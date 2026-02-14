"use client";

import { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";

export interface CompressedImage {
  id: string;
  original: File;
  compressed: Blob | null;
  originalSize: number;
  compressedSize: number;
  originalPreview: string;
  compressedPreview: string;
  savings: number;
  savingsPercent: number;
  status: "pending" | "compressing" | "completed" | "error";
  error?: string;
}

export interface CompressionSettings {
  quality: number; // 0-100
  maxWidthOrHeight: number; // 0 = no limit
  preserveExif: boolean;
  format: "original" | "jpeg" | "png" | "webp";
}

const DEFAULT_SETTINGS: CompressionSettings = {
  quality: 80,
  maxWidthOrHeight: 0,
  preserveExif: false,
  format: "original",
};

export function useImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [settings, setSettings] = useState<CompressionSettings>(DEFAULT_SETTINGS);
  const [isCompressing, setIsCompressing] = useState(false);

  const addImages = useCallback((files: File[]) => {
    const newImages: CompressedImage[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      original: file,
      compressed: null,
      originalSize: file.size,
      compressedSize: 0,
      originalPreview: "",
      compressedPreview: "",
      savings: 0,
      savingsPercent: 0,
      status: "pending" as const,
    }));

    // Generate preview URLs
    newImages.forEach((img) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) =>
          prev.map((i) =>
            i.id === img.id ? { ...i, originalPreview: e.target?.result as string } : i
          )
        );
      };
      reader.readAsDataURL(img.original);
    });

    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const compressImages = useCallback(
    async (imageIds?: string[]) => {
      setIsCompressing(true);

      const imagesToCompress = imageIds
        ? images.filter((img) => imageIds.includes(img.id))
        : images.filter((img) => img.status === "pending");

      for (const image of imagesToCompress) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id ? { ...img, status: "compressing" as const } : img
          )
        );

        try {
          const options: {
            maxSizeMB: number;
            useWebWorker: boolean;
            preserveExif: boolean;
            initialQuality: number;
            maxWidthOrHeight?: number;
            fileType?: string;
          } = {
            maxSizeMB: Infinity,
            useWebWorker: true,
            preserveExif: settings.preserveExif,
            initialQuality: settings.quality / 100,
          };

          if (settings.maxWidthOrHeight > 0) {
            options.maxWidthOrHeight = settings.maxWidthOrHeight;
          }

          // Determine output format
          if (settings.format !== "original") {
            options.fileType = `image/${settings.format}`;
          }

          const compressedBlob = await imageCompression(image.original, options);
          const compressedSize = compressedBlob.size;
          const savings = image.originalSize - compressedSize;
          const savingsPercent = (savings / image.originalSize) * 100;

          // Generate compressed preview
          const reader = new FileReader();
          reader.onload = (e) => {
            setImages((prev) =>
              prev.map((img) =>
                img.id === image.id
                  ? {
                      ...img,
                      compressed: compressedBlob,
                      compressedSize,
                      savings,
                      savingsPercent,
                      compressedPreview: e.target?.result as string,
                      status: "completed" as const,
                    }
                  : img
              )
            );
          };
          reader.readAsDataURL(compressedBlob);
        } catch (error) {
          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id
                ? {
                    ...img,
                    status: "error" as const,
                    error: error instanceof Error ? error.message : "Compression failed",
                  }
                : img
            )
          );
        }
      }

      setIsCompressing(false);
    },
    [images, settings]
  );

  const downloadImage = useCallback((image: CompressedImage) => {
    if (!image.compressed) return;

    const url = URL.createObjectURL(image.compressed);
    const link = document.createElement("a");
    link.href = url;

    // Determine file extension
    const ext = settings.format === "original"
      ? image.original.name.split(".").pop()
      : settings.format;

    const baseName = image.original.name.replace(/\.[^/.]+$/, "");
    link.download = `${baseName}-compressed.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  }, [settings.format]);

  const downloadAll = useCallback(async () => {
    const completedImages = images.filter((img) => img.status === "completed" && img.compressed);

    if (completedImages.length === 0) return;

    if (completedImages.length === 1) {
      downloadImage(completedImages[0]);
      return;
    }

    // Create ZIP file
    const zip = new JSZip();

    completedImages.forEach((image) => {
      if (image.compressed) {
        const ext = settings.format === "original"
          ? image.original.name.split(".").pop()
          : settings.format;

        const baseName = image.original.name.replace(/\.[^/.]+$/, "");
        zip.file(`${baseName}-compressed.${ext}`, image.compressed);
      }
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `compressed-images-${Date.now()}.zip`;
    link.click();
    URL.revokeObjectURL(url);
  }, [images, downloadImage, settings.format]);

  const removeImage = useCallback((imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  }, []);

  const clearAll = useCallback(() => {
    setImages([]);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<CompressionSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const stats = {
    totalImages: images.length,
    completed: images.filter((img) => img.status === "completed").length,
    pending: images.filter((img) => img.status === "pending").length,
    compressing: images.filter((img) => img.status === "compressing").length,
    errors: images.filter((img) => img.status === "error").length,
    totalOriginalSize: images.reduce((sum, img) => sum + img.originalSize, 0),
    totalCompressedSize: images.reduce(
      (sum, img) => sum + (img.status === "completed" ? img.compressedSize : 0),
      0
    ),
    totalSavings: images.reduce(
      (sum, img) => sum + (img.status === "completed" ? img.savings : 0),
      0
    ),
  };

  return {
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
  };
}

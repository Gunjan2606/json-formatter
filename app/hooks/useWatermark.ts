"use client";

import { useState, useCallback } from "react";

export type WatermarkType = "text" | "logo";
export type PositionType = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface WatermarkSettings {
  type: WatermarkType;
  // Text settings
  text: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  // Logo settings
  logoUrl: string | null;
  logoSize: number;
  // Common settings
  position: PositionType;
  opacity: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

const defaultSettings: WatermarkSettings = {
  type: "text",
  text: "© Your Name",
  fontSize: 48,
  fontFamily: "Arial",
  textColor: "#ffffff",
  logoUrl: null,
  logoSize: 100,
  position: "bottom-right",
  opacity: 0.7,
  rotation: 0,
  offsetX: 20,
  offsetY: 20,
};

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  processed: boolean;
}

export function useWatermark() {
  const [settings, setSettings] = useState<WatermarkSettings>(defaultSettings);
  const [images, setImages] = useState<ImageFile[]>([]);

  const updateSettings = useCallback((updates: Partial<WatermarkSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleImageUpload = useCallback((files: FileList) => {
    const newImages: ImageFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const id = Math.random().toString(36).substring(7);
        const preview = URL.createObjectURL(file);
        newImages.push({ id, file, preview, processed: false });
      }
    });
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  }, [images]);

  const reset = useCallback(() => {
    clearAll();
    setSettings(defaultSettings);
  }, [clearAll]);

  return {
    settings,
    images,
    updateSettings,
    handleImageUpload,
    removeImage,
    clearAll,
    reset,
  };
}

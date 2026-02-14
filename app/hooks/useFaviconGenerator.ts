"use client";

import { useState, useCallback } from "react";

export interface FaviconSettings {
  sourceType: "text" | "image";
  text: string;
  textColor: string;
  backgroundColor: string;
  fontSize: number;
  fontFamily: string;
}

const defaultSettings: FaviconSettings = {
  sourceType: "text",
  text: "A",
  textColor: "#ffffff",
  backgroundColor: "#667eea",
  fontSize: 64,
  fontFamily: "Arial",
};

export function useFaviconGenerator() {
  const [settings, setSettings] = useState<FaviconSettings>(defaultSettings);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const updateSettings = useCallback((updates: Partial<FaviconSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleImageUpload = useCallback((file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const generateFavicon = useCallback(
    async (size: number): Promise<string> => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "";

      // Fill background
      ctx.fillStyle = settings.backgroundColor;
      ctx.fillRect(0, 0, size, size);

      if (settings.sourceType === "text") {
        // Draw text
        ctx.fillStyle = settings.textColor;
        ctx.font = `${settings.fontSize * (size / 128)}px ${settings.fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(settings.text, size / 2, size / 2);
      } else if (imagePreview) {
        // Draw image
        const img = new Image();
        img.src = imagePreview;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        ctx.drawImage(img, 0, 0, size, size);
      }

      return canvas.toDataURL("image/png");
    },
    [settings, imagePreview]
  );

  const reset = useCallback(() => {
    setSettings(defaultSettings);
    setImageFile(null);
    setImagePreview(null);
  }, []);

  return {
    settings,
    imageFile,
    imagePreview,
    updateSettings,
    handleImageUpload,
    generateFavicon,
    reset,
  };
}

export const faviconSizes = [
  { name: "favicon-16x16.png", size: 16, description: "Browser tab (small)" },
  { name: "favicon-32x32.png", size: 32, description: "Browser tab (standard)" },
  { name: "favicon-48x48.png", size: 48, description: "Browser tab (HD)" },
  { name: "apple-touch-icon.png", size: 180, description: "Apple devices" },
  { name: "android-chrome-192x192.png", size: 192, description: "Android (standard)" },
  { name: "android-chrome-512x512.png", size: 512, description: "Android (HD)" },
];

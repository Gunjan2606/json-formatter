"use client";

import { useState, useCallback } from "react";

export type DeviceType = "iphone-15-pro" | "iphone-14" | "macbook-pro" | "ipad-pro" | "android";
export type DeviceColor = "black" | "white" | "silver" | "gold";
export type BackgroundType = "transparent" | "solid" | "gradient";

export interface MockupSettings {
  device: DeviceType;
  deviceColor: DeviceColor;
  backgroundType: BackgroundType;
  backgroundColor: string;
  gradientStart: string;
  gradientEnd: string;
  shadow: boolean;
  reflection: boolean;
}

const defaultSettings: MockupSettings = {
  device: "iphone-15-pro",
  deviceColor: "black",
  backgroundType: "gradient",
  backgroundColor: "#f3f4f6",
  gradientStart: "#667eea",
  gradientEnd: "#764ba2",
  shadow: true,
  reflection: false,
};

// Default placeholder image (gradient)
const defaultPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea'/%3E%3Cstop offset='100%25' style='stop-color:%23764ba2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='600' fill='url(%23g)'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='32' font-weight='bold' fill='white'%3EYour App%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='white' opacity='0.8'%3EScreenshot Preview%3C/text%3E%3C/svg%3E";

export function useDeviceMockup() {
  const [settings, setSettings] = useState<MockupSettings>(defaultSettings);
  const [uploadedImage, setUploadedImage] = useState<string | null>(defaultPlaceholder);

  const updateSettings = useCallback((updates: Partial<MockupSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleImageUpload = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const reset = useCallback(() => {
    setSettings(defaultSettings);
    setUploadedImage(null);
  }, []);

  const clearImage = useCallback(() => {
    setUploadedImage(null);
  }, []);

  return {
    settings,
    uploadedImage,
    updateSettings,
    handleImageUpload,
    reset,
    clearImage,
  };
}

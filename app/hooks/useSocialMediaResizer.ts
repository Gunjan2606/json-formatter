"use client";

import { useState, useCallback, useEffect } from "react";

export type FitMode = "cover" | "contain";

export interface PlatformSize {
  id: string;
  platform: string;
  name: string;
  width: number;
  height: number;
  description: string;
}

export const platformSizes: PlatformSize[] = [
  // Instagram
  { id: "ig-post", platform: "Instagram", name: "Post", width: 1080, height: 1080, description: "Square feed post" },
  { id: "ig-story", platform: "Instagram", name: "Story", width: 1080, height: 1920, description: "Vertical story/reel" },
  { id: "ig-landscape", platform: "Instagram", name: "Landscape", width: 1080, height: 566, description: "Landscape post" },

  // Twitter/X
  { id: "twitter-post", platform: "Twitter", name: "Post", width: 1200, height: 675, description: "Tweet image" },
  { id: "twitter-header", platform: "Twitter", name: "Header", width: 1500, height: 500, description: "Profile banner" },

  // LinkedIn
  { id: "linkedin-post", platform: "LinkedIn", name: "Post", width: 1200, height: 627, description: "Feed post" },
  { id: "linkedin-banner", platform: "LinkedIn", name: "Banner", width: 1584, height: 396, description: "Profile banner" },

  // Facebook
  { id: "fb-post", platform: "Facebook", name: "Post", width: 1200, height: 630, description: "Feed post" },
  { id: "fb-cover", platform: "Facebook", name: "Cover", width: 820, height: 312, description: "Profile cover" },

  // YouTube
  { id: "yt-thumbnail", platform: "YouTube", name: "Thumbnail", width: 1280, height: 720, description: "Video thumbnail" },
  { id: "yt-banner", platform: "YouTube", name: "Banner", width: 2560, height: 1440, description: "Channel banner" },

  // Pinterest
  { id: "pinterest-pin", platform: "Pinterest", name: "Pin", width: 1000, height: 1500, description: "Standard pin" },

  // TikTok
  { id: "tiktok-video", platform: "TikTok", name: "Video", width: 1080, height: 1920, description: "Vertical video" },
];

// Default sample image (gradient with text)
const defaultSampleImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2310b981'/%3E%3Cstop offset='100%25' style='stop-color:%233b82f6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='800' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='64' font-weight='bold' fill='white'%3ESocial Media%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='32' fill='white' opacity='0.9'%3EResize for All Platforms%3C/text%3E%3C/svg%3E";

export function useSocialMediaResizer() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(defaultSampleImage);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [fitMode, setFitMode] = useState<FitMode>("cover");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    platformSizes.map((p) => p.id)
  );

  // Load default image on mount
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setOriginalImage(img);
    };
    img.src = defaultSampleImage;
  }, []);

  const handleImageUpload = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setUploadedImage(dataUrl);

      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  const togglePlatform = useCallback((platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  }, []);

  const selectAll = useCallback(() => {
    setSelectedPlatforms(platformSizes.map((p) => p.id));
  }, []);

  const deselectAll = useCallback(() => {
    setSelectedPlatforms([]);
  }, []);

  const reset = useCallback(() => {
    setUploadedImage(null);
    setOriginalImage(null);
    setFitMode("cover");
    setSelectedPlatforms(platformSizes.map((p) => p.id));
  }, []);

  return {
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
  };
}

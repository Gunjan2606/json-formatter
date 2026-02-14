"use client";

import { useState, useCallback, useMemo } from "react";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function useColorContrast() {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");

  const contrastRatio = useMemo(() => {
    return getContrastRatio(foreground, background);
  }, [foreground, background]);

  const wcagResults = useMemo(() => {
    return {
      aaLargeText: contrastRatio >= 3,
      aaNormalText: contrastRatio >= 4.5,
      aaaLargeText: contrastRatio >= 4.5,
      aaaNormalText: contrastRatio >= 7,
    };
  }, [contrastRatio]);

  const swap = useCallback(() => {
    const temp = foreground;
    setForeground(background);
    setBackground(temp);
  }, [foreground, background]);

  return {
    foreground,
    background,
    setForeground,
    setBackground,
    contrastRatio,
    wcagResults,
    swap,
  };
}

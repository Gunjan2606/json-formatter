"use client";

import { useState, useCallback, useMemo } from "react";

export interface Color {
  id: string;
  hex: string;
  locked: boolean;
}

export type HarmonyMode = "complementary" | "analogous" | "triadic" | "monochromatic" | "random";

const generateId = () => Math.random().toString(36).substr(2, 9);

// Convert hex to HSL
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Generate random color
function randomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Generate palette based on harmony mode
function generateHarmonyPalette(baseColor: string, mode: HarmonyMode): string[] {
  const hsl = hexToHSL(baseColor);
  const colors: string[] = [baseColor];

  switch (mode) {
    case "complementary":
      colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
      colors.push(hslToHex((hsl.h + 30) % 360, hsl.s - 20, hsl.l + 10));
      colors.push(hslToHex((hsl.h + 210) % 360, hsl.s - 20, hsl.l + 10));
      colors.push(hslToHex((hsl.h + 15) % 360, hsl.s - 10, hsl.l - 10));
      break;

    case "analogous":
      colors.push(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
      colors.push(hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l));
      colors.push(hslToHex((hsl.h + 60) % 360, hsl.s - 10, hsl.l + 10));
      colors.push(hslToHex((hsl.h - 60 + 360) % 360, hsl.s - 10, hsl.l - 10));
      break;

    case "triadic":
      colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
      colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
      colors.push(hslToHex((hsl.h + 60) % 360, hsl.s - 15, hsl.l + 10));
      colors.push(hslToHex((hsl.h + 180) % 360, hsl.s - 15, hsl.l - 10));
      break;

    case "monochromatic":
      colors.push(hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 20)));
      colors.push(hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 20)));
      colors.push(hslToHex(hsl.h, Math.max(20, hsl.s - 30), hsl.l));
      colors.push(hslToHex(hsl.h, Math.min(100, hsl.s + 20), Math.max(10, hsl.l - 10)));
      break;

    case "random":
    default:
      for (let i = 0; i < 4; i++) {
        colors.push(randomColor());
      }
  }

  return colors;
}

// Calculate contrast ratio (WCAG)
function getContrastRatio(hex1: string, hex2: string): number {
  const getLuminance = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;

    const [rs, gs, bs] = [r, g, b].map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

const defaultColors: Color[] = [
  { id: generateId(), hex: "#667eea", locked: false },
  { id: generateId(), hex: "#764ba2", locked: false },
  { id: generateId(), hex: "#f093fb", locked: false },
  { id: generateId(), hex: "#4facfe", locked: false },
  { id: generateId(), hex: "#43e97b", locked: false },
];

export function useColorPalette() {
  const [colors, setColors] = useState<Color[]>(defaultColors);
  const [harmonyMode, setHarmonyMode] = useState<HarmonyMode>("random");

  const generatePalette = useCallback(() => {
    const baseColor = colors.find((c) => c.locked)?.hex || randomColor();
    const newPalette = generateHarmonyPalette(baseColor, harmonyMode);

    setColors(
      colors.map((color, index) =>
        color.locked
          ? color
          : {
              ...color,
              hex: newPalette[index] || randomColor(),
            }
      )
    );
  }, [colors, harmonyMode]);

  const toggleLock = useCallback((id: string) => {
    setColors((prev) =>
      prev.map((color) =>
        color.id === id ? { ...color, locked: !color.locked } : color
      )
    );
  }, []);

  const updateColor = useCallback((id: string, hex: string) => {
    setColors((prev) =>
      prev.map((color) => (color.id === id ? { ...color, hex } : color))
    );
  }, []);

  const addColor = useCallback(() => {
    if (colors.length < 10) {
      setColors([
        ...colors,
        { id: generateId(), hex: randomColor(), locked: false },
      ]);
    }
  }, [colors]);

  const removeColor = useCallback((id: string) => {
    if (colors.length > 2) {
      setColors(colors.filter((c) => c.id !== id));
    }
  }, [colors]);

  const contrastResults = useMemo(() => {
    return colors.map((color) => ({
      id: color.id,
      hex: color.hex,
      contrastWithWhite: getContrastRatio(color.hex, "#FFFFFF"),
      contrastWithBlack: getContrastRatio(color.hex, "#000000"),
    }));
  }, [colors]);

  const reset = useCallback(() => {
    setColors(defaultColors);
    setHarmonyMode("random");
  }, []);

  return {
    colors,
    harmonyMode,
    setHarmonyMode,
    generatePalette,
    toggleLock,
    updateColor,
    addColor,
    removeColor,
    contrastResults,
    reset,
    hexToHSL,
    hslToHex,
  };
}

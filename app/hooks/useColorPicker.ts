"use client";

import { useState, useCallback, useMemo } from "react";

export interface ColorFormats {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
  oklch: { l: number; c: number; h: number };
}

export type HarmonyType = "complementary" | "analogous" | "triadic" | "split-complementary" | "monochromatic";

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

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

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

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

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

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
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

  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function rgbToOklch(r: number, g: number, b: number): { l: number; c: number; h: number } {
  // Simplified OKLCH conversion (for production, use culori library)
  const { h, s, l } = rgbToHsl(r, g, b);
  return {
    l: Math.round(l * 100) / 100,
    c: Math.round(s) / 100,
    h: Math.round(h),
  };
}

function getColorFormats(hex: string): ColorFormats {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);

  return { hex, rgb, hsl, hsv, oklch };
}

function generateHarmony(hex: string, type: HarmonyType): string[] {
  const rgb = hexToRgb(hex);
  const { h } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  switch (type) {
    case "complementary": {
      const rgb2 = hslToRgb((h + 180) % 360, 70, 50);
      return [hex, rgbToHex(rgb2.r, rgb2.g, rgb2.b)];
    }
    case "analogous": {
      const rgb1 = hslToRgb((h - 30 + 360) % 360, 70, 50);
      const rgb2 = hslToRgb((h + 30) % 360, 70, 50);
      return [
        rgbToHex(rgb1.r, rgb1.g, rgb1.b),
        hex,
        rgbToHex(rgb2.r, rgb2.g, rgb2.b),
      ];
    }
    case "triadic": {
      const rgb1 = hslToRgb((h + 120) % 360, 70, 50);
      const rgb2 = hslToRgb((h + 240) % 360, 70, 50);
      return [
        hex,
        rgbToHex(rgb1.r, rgb1.g, rgb1.b),
        rgbToHex(rgb2.r, rgb2.g, rgb2.b),
      ];
    }
    case "split-complementary": {
      const rgb1 = hslToRgb((h + 150) % 360, 70, 50);
      const rgb2 = hslToRgb((h + 210) % 360, 70, 50);
      return [
        hex,
        rgbToHex(rgb1.r, rgb1.g, rgb1.b),
        rgbToHex(rgb2.r, rgb2.g, rgb2.b),
      ];
    }
    case "monochromatic": {
      const rgb1 = hslToRgb(h, 70, 30);
      const rgb2 = hslToRgb(h, 70, 50);
      const rgb3 = hslToRgb(h, 70, 70);
      const rgb4 = hslToRgb(h, 70, 90);
      return [
        rgbToHex(rgb1.r, rgb1.g, rgb1.b),
        rgbToHex(rgb2.r, rgb2.g, rgb2.b),
        hex,
        rgbToHex(rgb3.r, rgb3.g, rgb3.b),
        rgbToHex(rgb4.r, rgb4.g, rgb4.b),
      ];
    }
    default:
      return [hex];
  }
}

function generateShades(hex: string): Record<string, string> {
  const rgb = hexToRgb(hex);
  const { h, s } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const shades: Record<string, string> = {};

  const lightnesses = [95, 90, 80, 70, 60, 50, 40, 30, 20, 10];
  const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  lightnesses.forEach((l, i) => {
    const rgb = hslToRgb(h, s, l);
    shades[weights[i]] = rgbToHex(rgb.r, rgb.g, rgb.b);
  });

  return shades;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const getLuminance = (hex: string) => {
    const rgb = hexToRgb(hex);
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
      val /= 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function useColorPicker() {
  const [currentColor, setCurrentColor] = useState("#3b82f6");
  const [compareColor, setCompareColor] = useState("#ffffff");
  const [harmonyType, setHarmonyType] = useState<HarmonyType>("complementary");

  const formats = useMemo(() => getColorFormats(currentColor), [currentColor]);

  const harmony = useMemo(() => generateHarmony(currentColor, harmonyType), [currentColor, harmonyType]);

  const shades = useMemo(() => generateShades(currentColor), [currentColor]);

  const contrastRatio = useMemo(() => getContrastRatio(currentColor, compareColor), [currentColor, compareColor]);

  const wcagCompliance = useMemo(() => {
    const ratio = contrastRatio;
    return {
      aa: {
        normal: ratio >= 4.5,
        large: ratio >= 3.0,
      },
      aaa: {
        normal: ratio >= 7.0,
        large: ratio >= 4.5,
      },
    };
  }, [contrastRatio]);

  const exportCSS = useCallback(() => {
    return `:root {
  --color-primary: ${currentColor};
  --color-primary-rgb: ${formats.rgb.r}, ${formats.rgb.g}, ${formats.rgb.b};
}`;
  }, [currentColor, formats]);

  const exportTailwind = useCallback(() => {
    return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          ${Object.entries(shades)
            .map(([weight, color]) => `${weight}: '${color}'`)
            .join(",\n          ")}
        }
      }
    }
  }
}`;
  }, [shades]);

  const exportSass = useCallback(() => {
    return Object.entries(shades)
      .map(([weight, color]) => `$color-primary-${weight}: ${color};`)
      .join("\n");
  }, [shades]);

  const exportJS = useCallback(() => {
    return `export const colors = {
  primary: {
    ${Object.entries(shades)
      .map(([weight, color]) => `${weight}: '${color}'`)
      .join(",\n    ")}
  }
};`;
  }, [shades]);

  const exportJSON = useCallback(() => {
    return JSON.stringify({ primary: shades }, null, 2);
  }, [shades]);

  return {
    currentColor,
    setCurrentColor,
    compareColor,
    setCompareColor,
    formats,
    harmonyType,
    setHarmonyType,
    harmony,
    shades,
    contrastRatio,
    wcagCompliance,
    exportCSS,
    exportTailwind,
    exportSass,
    exportJS,
    exportJSON,
  };
}

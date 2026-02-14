"use client";

import { useState, useCallback, useMemo } from "react";

export type GradientType = "linear" | "radial" | "conic";
export type GradientDirection =
  | "to right"
  | "to left"
  | "to top"
  | "to bottom"
  | "to top right"
  | "to top left"
  | "to bottom right"
  | "to bottom left";

export interface ColorStop {
  id: string;
  color: string;
  position: number; // 0-100
}

export interface GradientSettings {
  type: GradientType;
  direction: GradientDirection;
  angle: number; // 0-360 for linear, used for conic
  shape: "circle" | "ellipse"; // for radial
  position: string; // for radial (e.g., "center", "top left")
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// Better default with more contrast (Sunset gradient)
const defaultColorStops: ColorStop[] = [
  { id: generateId(), color: "#ff6b6b", position: 0 },
  { id: generateId(), color: "#feca57", position: 50 },
  { id: generateId(), color: "#ee5a6f", position: 100 },
];

export function useGradientGenerator() {
  const [colorStops, setColorStops] = useState<ColorStop[]>(defaultColorStops);
  const [settings, setSettings] = useState<GradientSettings>({
    type: "linear",
    direction: "to right",
    angle: 90,
    shape: "circle",
    position: "center",
  });

  const cssGradient = useMemo(() => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");

    if (settings.type === "linear") {
      return `linear-gradient(${settings.angle}deg, ${stopsString})`;
    } else if (settings.type === "radial") {
      return `radial-gradient(${settings.shape} at ${settings.position}, ${stopsString})`;
    } else {
      // conic
      return `conic-gradient(from ${settings.angle}deg at ${settings.position}, ${stopsString})`;
    }
  }, [colorStops, settings]);

  const addColorStop = useCallback(() => {
    const newPosition = colorStops.length > 0
      ? Math.min(100, Math.max(...colorStops.map(s => s.position)) + 10)
      : 50;

    setColorStops([
      ...colorStops,
      {
        id: generateId(),
        color: "#ffffff",
        position: newPosition,
      },
    ]);
  }, [colorStops]);

  const removeColorStop = useCallback((id: string) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((stop) => stop.id !== id));
    }
  }, [colorStops]);

  const updateColorStop = useCallback((id: string, updates: Partial<ColorStop>) => {
    // Validate hex color if color is being updated
    if (updates.color && !isValidHexColor(updates.color)) {
      return; // Don't update with invalid color
    }

    // Clamp position to 0-100
    if (updates.position !== undefined) {
      updates.position = Math.max(0, Math.min(100, updates.position));
    }

    setColorStops(
      colorStops.map((stop) =>
        stop.id === id ? { ...stop, ...updates } : stop
      )
    );
  }, [colorStops]);

  // Helper function to validate hex colors
  const isValidHexColor = (color: string): boolean => {
    return /^#[0-9A-F]{6}$/i.test(color);
  };

  const sortColorStops = useCallback(() => {
    setColorStops([...colorStops].sort((a, b) => a.position - b.position));
  }, [colorStops]);

  const updateSettings = useCallback((updates: Partial<GradientSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const randomizeColors = useCallback(() => {
    const randomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    setColorStops(
      colorStops.map((stop) => ({
        ...stop,
        color: randomColor(),
      }))
    );
  }, [colorStops]);

  const reverseGradient = useCallback(() => {
    setColorStops(
      colorStops.map((stop) => ({
        ...stop,
        position: 100 - stop.position,
      }))
    );
  }, [colorStops]);

  const reset = useCallback(() => {
    setColorStops(defaultColorStops);
    setSettings({
      type: "linear",
      direction: "to right",
      angle: 90,
      shape: "circle",
      position: "center",
    });
  }, []);

  const loadPreset = useCallback((preset: { stops: ColorStop[]; settings?: Partial<GradientSettings> }) => {
    setColorStops(preset.stops.map(stop => ({ ...stop, id: generateId() })));
    if (preset.settings) {
      setSettings(prev => ({ ...prev, ...preset.settings }));
    }
  }, []);

  return {
    colorStops,
    settings,
    cssGradient,
    addColorStop,
    removeColorStop,
    updateColorStop,
    updateSettings,
    randomizeColors,
    reverseGradient,
    sortColorStops,
    reset,
    loadPreset,
  };
}

// Preset gradients
export const gradientPresets = [
  {
    name: "Purple Bliss",
    stops: [
      { id: "1", color: "#667eea", position: 0 },
      { id: "2", color: "#764ba2", position: 100 },
    ],
  },
  {
    name: "Sunset",
    stops: [
      { id: "1", color: "#ff6b6b", position: 0 },
      { id: "2", color: "#feca57", position: 50 },
      { id: "3", color: "#ee5a6f", position: 100 },
    ],
  },
  {
    name: "Ocean",
    stops: [
      { id: "1", color: "#2e3192", position: 0 },
      { id: "2", color: "#1bffff", position: 100 },
    ],
  },
  {
    name: "Forest",
    stops: [
      { id: "1", color: "#134e5e", position: 0 },
      { id: "2", color: "#71b280", position: 100 },
    ],
  },
  {
    name: "Fire",
    stops: [
      { id: "1", color: "#f12711", position: 0 },
      { id: "2", color: "#f5af19", position: 100 },
    ],
  },
  {
    name: "Cotton Candy",
    stops: [
      { id: "1", color: "#fbc2eb", position: 0 },
      { id: "2", color: "#a6c1ee", position: 100 },
    ],
  },
  {
    name: "Royal",
    stops: [
      { id: "1", color: "#141e30", position: 0 },
      { id: "2", color: "#243b55", position: 100 },
    ],
  },
  {
    name: "Rainbow",
    stops: [
      { id: "1", color: "#ff0000", position: 0 },
      { id: "2", color: "#ff7f00", position: 16.67 },
      { id: "3", color: "#ffff00", position: 33.33 },
      { id: "4", color: "#00ff00", position: 50 },
      { id: "5", color: "#0000ff", position: 66.67 },
      { id: "6", color: "#4b0082", position: 83.33 },
      { id: "7", color: "#9400d3", position: 100 },
    ],
  },
  {
    name: "Peach",
    stops: [
      { id: "1", color: "#ffecd2", position: 0 },
      { id: "2", color: "#fcb69f", position: 100 },
    ],
  },
  {
    name: "Mint",
    stops: [
      { id: "1", color: "#00b09b", position: 0 },
      { id: "2", color: "#96c93d", position: 100 },
    ],
  },
  {
    name: "Aurora",
    stops: [
      { id: "1", color: "#4facfe", position: 0 },
      { id: "2", color: "#00f2fe", position: 100 },
    ],
  },
  {
    name: "Velvet",
    stops: [
      { id: "1", color: "#e73c7e", position: 0 },
      { id: "2", color: "#ee7752", position: 100 },
    ],
  },
  {
    name: "Slate",
    stops: [
      { id: "1", color: "#373b44", position: 0 },
      { id: "2", color: "#4286f4", position: 100 },
    ],
  },
  {
    name: "Emerald",
    stops: [
      { id: "1", color: "#348f50", position: 0 },
      { id: "2", color: "#56b4d3", position: 100 },
    ],
  },
  {
    name: "Crimson",
    stops: [
      { id: "1", color: "#c33764", position: 0 },
      { id: "2", color: "#1d2671", position: 100 },
    ],
  },
  {
    name: "Dawn",
    stops: [
      { id: "1", color: "#f83600", position: 0 },
      { id: "2", color: "#f9d423", position: 100 },
    ],
  },
];

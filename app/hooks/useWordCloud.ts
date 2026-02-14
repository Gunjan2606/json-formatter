"use client";

import { useState, useCallback, useMemo } from "react";

export type ShapeType = "rectangle" | "circle" | "ellipse" | "triangle";
export type ColorScheme = "blue" | "rainbow" | "warm" | "cool" | "monochrome" | "custom";

export interface WordCloudSettings {
  shape: ShapeType;
  colorScheme: ColorScheme;
  customColors: string[];
  fontFamily: string;
  maxWords: number;
  minFontSize: number;
  maxFontSize: number;
  backgroundColor: string;
  padding: number;
}

const defaultSettings: WordCloudSettings = {
  shape: "rectangle",
  colorScheme: "blue",
  customColors: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"],
  fontFamily: "Arial",
  maxWords: 50,
  minFontSize: 12,
  maxFontSize: 72,
  backgroundColor: "#ffffff",
  padding: 5,
};

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he",
  "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "will",
  "with", "i", "me", "my", "we", "our", "you", "your", "this", "but", "or",
  "if", "not", "have", "been", "would", "could", "should", "can", "may",
]);

export interface WordData {
  text: string;
  count: number;
  fontSize: number;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

const defaultText = `Word clouds are visual representations of text data where word size indicates frequency.
They help identify themes and patterns quickly. Popular words appear larger making key concepts stand out.
Data visualization tools transform complex information into meaningful insights. Content analysis reveals
hidden patterns in documents. Text mining extracts valuable knowledge from unstructured data. Analytics
platforms provide powerful features for understanding customer feedback and survey responses. Beautiful
designs enhance presentations making information more engaging and memorable. Creative graphics capture
attention instantly while professional layouts build credibility and trust.`;

export function useWordCloud() {
  const [text, setText] = useState<string>(defaultText);
  const [settings, setSettings] = useState<WordCloudSettings>(defaultSettings);

  const updateSettings = useCallback((updates: Partial<WordCloudSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const wordFrequencies = useMemo(() => {
    if (!text.trim()) return [];

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.has(word));

    const frequencyMap = new Map<string, number>();
    words.forEach((word) => {
      frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    });

    return Array.from(frequencyMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, settings.maxWords)
      .map(([word, count]) => ({ word, count }));
  }, [text, settings.maxWords]);

  const getColorForWord = useCallback(
    (index: number): string => {
      if (settings.colorScheme === "custom") {
        return settings.customColors[index % settings.customColors.length];
      }

      const schemes: Record<ColorScheme, string[]> = {
        blue: ["#3b82f6", "#60a5fa", "#93c5fd", "#1e40af", "#2563eb"],
        rainbow: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"],
        warm: ["#dc2626", "#ea580c", "#f59e0b", "#eab308"],
        cool: ["#0891b2", "#0284c7", "#3b82f6", "#6366f1", "#8b5cf6"],
        monochrome: ["#1f2937", "#374151", "#4b5563", "#6b7280", "#9ca3af"],
        custom: settings.customColors,
      };

      const colors = schemes[settings.colorScheme];
      return colors[index % colors.length];
    },
    [settings.colorScheme, settings.customColors]
  );

  const reset = useCallback(() => {
    setText("");
    setSettings(defaultSettings);
  }, []);

  return {
    text,
    setText,
    settings,
    updateSettings,
    wordFrequencies,
    getColorForWord,
    reset,
  };
}

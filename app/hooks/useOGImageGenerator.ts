"use client";

import { useState, useCallback } from "react";

interface OGImageData {
  title: string;
  description: string;
  author: string;
  logo: string;
  backgroundType: "solid" | "gradient";
  backgroundColor: string;
  gradientStart: string;
  gradientEnd: string;
  textColor: string;
  accentColor: string;
  layout: "default" | "minimal" | "modern";
}

export function useOGImageGenerator() {
  const [data, setData] = useState<OGImageData>({
    title: "Amazing Blog Post Title",
    description: "A brief description of what this article is about and why readers should click through.",
    author: "Author Name",
    logo: "",
    backgroundType: "gradient",
    backgroundColor: "#1e293b",
    gradientStart: "#3b82f6",
    gradientEnd: "#8b5cf6",
    textColor: "#ffffff",
    accentColor: "#60a5fa",
    layout: "default",
  });

  const updateField = useCallback((field: keyof OGImageData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const generateImage = useCallback(async (): Promise<string> => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");

    if (!ctx) return "";

    // Background
    if (data.backgroundType === "gradient") {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, data.gradientStart);
      gradient.addColorStop(1, data.gradientEnd);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = data.backgroundColor;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Layout-specific rendering
    if (data.layout === "default") {
      // Border accent
      ctx.fillStyle = data.accentColor;
      ctx.fillRect(0, 0, 10, canvas.height);

      // Title
      ctx.fillStyle = data.textColor;
      ctx.font = "bold 64px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "left";

      const titleLines = wrapText(ctx, data.title, 1100);
      titleLines.slice(0, 2).forEach((line, i) => {
        ctx.fillText(line, 80, 180 + i * 80);
      });

      // Description
      ctx.font = "32px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = data.textColor + "cc"; // 80% opacity

      const descLines = wrapText(ctx, data.description, 1100);
      descLines.slice(0, 2).forEach((line, i) => {
        ctx.fillText(line, 80, 380 + i * 45);
      });

      // Author
      ctx.font = "28px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = data.accentColor;
      ctx.fillText(data.author, 80, 550);
    } else if (data.layout === "minimal") {
      // Centered minimal layout
      ctx.textAlign = "center";

      // Title
      ctx.fillStyle = data.textColor;
      ctx.font = "bold 72px system-ui, -apple-system, sans-serif";
      const titleLines = wrapText(ctx, data.title, 1000);
      titleLines.slice(0, 2).forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, 250 + i * 90);
      });

      // Description
      ctx.font = "36px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = data.textColor + "bb";
      const descLines = wrapText(ctx, data.description, 900);
      descLines.slice(0, 1).forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, 480 + i * 50);
      });

      // Author at bottom
      ctx.font = "30px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = data.accentColor;
      ctx.fillText(data.author, canvas.width / 2, 570);
    } else if (data.layout === "modern") {
      // Modern card-style layout
      // Card background
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.roundRect(60, 120, 1080, 400, 20);
      ctx.fill();

      ctx.textAlign = "left";

      // Title
      ctx.fillStyle = data.textColor;
      ctx.font = "bold 60px system-ui, -apple-system, sans-serif";
      const titleLines = wrapText(ctx, data.title, 1000);
      titleLines.slice(0, 2).forEach((line, i) => {
        ctx.fillText(line, 100, 220 + i * 75);
      });

      // Description
      ctx.font = "32px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = data.textColor + "dd";
      const descLines = wrapText(ctx, data.description, 1000);
      descLines.slice(0, 2).forEach((line, i) => {
        ctx.fillText(line, 100, 400 + i * 42);
      });

      // Author badge
      ctx.fillStyle = data.accentColor;
      ctx.roundRect(100, 480, data.author.length * 18 + 40, 50, 25);
      ctx.fill();
      ctx.fillStyle = "#000000";
      ctx.font = "bold 28px system-ui, -apple-system, sans-serif";
      ctx.fillText(data.author, 120, 513);
    }

    return canvas.toDataURL("image/png");
  }, [data]);

  return {
    data,
    updateField,
    generateImage,
  };
}

// Helper function to wrap text
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine + (currentLine ? " " : "") + word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

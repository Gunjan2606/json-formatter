"use client";

import { useState, useCallback } from "react";

interface OptimizationResult {
  optimizedSVG: string;
  originalSize: number;
  optimizedSize: number;
  savings: number;
  savingsPercent: number;
}

export function useSVGOptimizer() {
  const [inputSVG, setInputSVG] = useState("");
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState("");

  const optimizeSVG = useCallback((svg: string) => {
    setError("");

    if (!svg.trim()) {
      setResult(null);
      return;
    }

    // Check if it's valid SVG
    if (!svg.includes("<svg")) {
      setError("Input does not appear to be valid SVG");
      setResult(null);
      return;
    }

    try {
      let optimized = svg;

      // Remove XML declaration
      optimized = optimized.replace(/<\?xml[^?]*\?>/g, "");

      // Remove comments
      optimized = optimized.replace(/<!--[\s\S]*?-->/g, "");

      // Remove DOCTYPE
      optimized = optimized.replace(/<!DOCTYPE[^>]*>/g, "");

      // Remove unnecessary whitespace between tags
      optimized = optimized.replace(/>\s+</g, "><");

      // Remove leading/trailing whitespace
      optimized = optimized.trim();

      // Remove editor/generator metadata
      optimized = optimized.replace(/\s*xmlns:(?:sketch|illustrator|serif)[^"]*"[^"]*"/g, "");
      optimized = optimized.replace(/\s*(?:sketch|illustrator|serif):[^"]*"[^"]*"/g, "");

      // Remove empty groups
      optimized = optimized.replace(/<g[^>]*>\s*<\/g>/g, "");

      // Remove unnecessary default attributes
      optimized = optimized.replace(/\s+fill-opacity="1"/g, "");
      optimized = optimized.replace(/\s+stroke-opacity="1"/g, "");
      optimized = optimized.replace(/\s+fill-rule="nonzero"/g, "");

      // Simplify transform matrices that are identity
      optimized = optimized.replace(/\s+transform="matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)"/g, "");
      optimized = optimized.replace(/\s+transform="translate\(0,\s*0\)"/g, "");

      // Remove unnecessary precision from numbers (keep 2 decimal places)
      optimized = optimized.replace(/(\d+\.\d{3,})/g, (match) => {
        return parseFloat(match).toFixed(2);
      });

      const originalSize = new Blob([svg]).size;
      const optimizedSize = new Blob([optimized]).size;
      const savings = originalSize - optimizedSize;
      const savingsPercent = originalSize > 0 ? (savings / originalSize) * 100 : 0;

      setResult({
        optimizedSVG: optimized,
        originalSize,
        optimizedSize,
        savings,
        savingsPercent,
      });
    } catch {
      setError("Failed to optimize SVG. Please check if the SVG is valid.");
      setResult(null);
    }
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setInputSVG(value);
      optimizeSVG(value);
    },
    [optimizeSVG]
  );

  const clear = useCallback(() => {
    setInputSVG("");
    setResult(null);
    setError("");
  }, []);

  return {
    inputSVG,
    handleInputChange,
    result,
    error,
    clear,
  };
}

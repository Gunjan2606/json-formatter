"use client";

import { useCallback, useState } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { NumberConverterInfoSections } from "../components/formatter/NumberConverterInfoSections";
import { useNumberConverter, type NumberBase } from "../hooks/useNumberConverter";
import {
  Binary,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ArrowUpDown,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const BASE_OPTIONS: { value: NumberBase; label: string; short: string; prefix: string }[] = [
  { value: "binary", label: "Binary", short: "BIN", prefix: "Base 2" },
  { value: "octal", label: "Octal", short: "OCT", prefix: "Base 8" },
  { value: "decimal", label: "Decimal", short: "DEC", prefix: "Base 10" },
  { value: "hexadecimal", label: "Hexadecimal", short: "HEX", prefix: "Base 16" },
];

const PLACEHOLDER_MAP: Record<NumberBase, string> = {
  binary: "e.g. 1010 1111 or 0b10101111",
  octal: "e.g. 257 or 0o257",
  decimal: "e.g. 175 or 1,000,000",
  hexadecimal: "e.g. AF or 0xFF",
};

const EXAMPLE_VALUES: { label: string; value: string; base: NumberBase }[] = [
  { label: "255", value: "255", base: "decimal" },
  { label: "0xFF", value: "FF", base: "hexadecimal" },
  { label: "0b11111111", value: "11111111", base: "binary" },
  { label: "Max Int32", value: "2147483647", base: "decimal" },
  { label: "Max UInt64", value: "18446744073709551615", base: "decimal" },
  { label: "Deadbeef", value: "DEADBEEF", base: "hexadecimal" },
];

const NumberConverter = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedBase, setCopiedBase] = useState<string | null>(null);

  const {
    state,
    setInputValue,
    setInputBase,
    setGroupDigits,
    results,
    bitLength,
    swap,
  } = useNumberConverter();

  const handleCopy = useCallback(
    (value: string, base: string) => {
      // Copy without grouping (raw value)
      const raw = value.replace(/[\s,]/g, "");
      navigator.clipboard.writeText(raw);
      setCopiedBase(base);
      setTimeout(() => setCopiedBase(null), 1500);
    },
    []
  );

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleExample = useCallback(
    (value: string, base: NumberBase) => {
      setInputBase(base);
      setInputValue(value);
    },
    [setInputBase, setInputValue]
  );

  return (
    <div
      className={`${isFullscreen ? "h-screen overflow-hidden" : "min-h-screen"} bg-background text-foreground flex flex-col`}
    >
      <Header
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
        title="Number Base Converter"
        description="Convert between hex, binary, decimal & octal"
        icon={<Binary className="w-4 h-4 text-primary-foreground" />}
      />

      <main className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-6 w-full max-w-4xl mx-auto`}>
        {/* Input Base Selector */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
          {BASE_OPTIONS.map(({ value, label, short, prefix }) => (
            <button
              key={value}
              onClick={() => setInputBase(value)}
              title={label}
              className={`flex-1 flex flex-col items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                state.inputBase === value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <span className="font-bold text-xs sm:text-sm">{short}</span>
              <span className="text-[10px] opacity-70 hidden sm:block">{prefix}</span>
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-muted-foreground">
              Input ({BASE_OPTIONS.find((b) => b.value === state.inputBase)?.label})
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGroupDigits(!state.groupDigits)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                title="Toggle digit grouping"
              >
                {state.groupDigits ? (
                  <ToggleRight className="w-4 h-4 text-primary" />
                ) : (
                  <ToggleLeft className="w-4 h-4" />
                )}
                Group Digits
              </button>
            </div>
          </div>
          <input
            type="text"
            value={state.inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={PLACEHOLDER_MAP[state.inputBase]}
            className="w-full bg-background border border-border rounded-md px-4 py-3 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            spellCheck={false}
            autoComplete="off"
          />
          {state.error && (
            <p className="text-xs text-red-500 font-medium">{state.error}</p>
          )}
        </div>

        {/* Quick Examples */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Try:</span>
          {EXAMPLE_VALUES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => handleExample(ex.value, ex.base)}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-secondary border border-border hover:border-primary/50 hover:text-foreground text-muted-foreground transition-all"
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-3">
            {(Object.entries(results) as [NumberBase, string][]).map(([base, value]) => {
              const opt = BASE_OPTIONS.find((b) => b.value === base)!;
              const isInputBase = base === state.inputBase;
              return (
                <div
                  key={base}
                  className={`bg-card border rounded-lg p-4 transition-all ${
                    isInputBase ? "border-primary/50 bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {opt.short}
                        </span>
                        <span className="text-xs text-muted-foreground">{opt.label} ({opt.prefix})</span>
                        {isInputBase && (
                          <span className="text-[10px] text-primary font-medium">INPUT</span>
                        )}
                      </div>
                      <div
                        className="font-mono text-sm sm:text-base break-all select-all cursor-text leading-relaxed"
                        title="Click to select"
                      >
                        {value}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!isInputBase && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => swap(base)}
                          title={`Use ${opt.label} as input`}
                        >
                          <ArrowUpDown className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopy(value, base)}
                        title={`Copy ${opt.label} value`}
                      >
                        {copiedBase === base ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bit Length & Fullscreen */}
        <div className="flex items-center gap-3 flex-wrap">
          {results && (
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
              <span className="text-xs text-muted-foreground">Bit Length:</span>
              <span className="text-sm font-mono font-bold">{bitLength} bits</span>
              {bitLength <= 8 && <span className="text-[10px] text-muted-foreground">(byte)</span>}
              {bitLength > 8 && bitLength <= 16 && <span className="text-[10px] text-muted-foreground">(16-bit)</span>}
              {bitLength > 16 && bitLength <= 32 && <span className="text-[10px] text-muted-foreground">(32-bit)</span>}
              {bitLength > 32 && bitLength <= 64 && <span className="text-[10px] text-muted-foreground">(64-bit)</span>}
              {bitLength > 64 && <span className="text-[10px] text-muted-foreground">(BigInt)</span>}
            </div>
          )}
          <div className="flex-1" />
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Common Conversions Reference */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-1.5">
            <Binary className="w-4 h-4 text-primary" />
            Quick Reference
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-1.5 pr-4">Decimal</th>
                  <th className="text-left py-1.5 pr-4">Hex</th>
                  <th className="text-left py-1.5 pr-4">Binary</th>
                  <th className="text-left py-1.5">Octal</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  [0, "0", "0000", "0"],
                  [1, "1", "0001", "1"],
                  [8, "8", "1000", "10"],
                  [10, "A", "1010", "12"],
                  [15, "F", "1111", "17"],
                  [16, "10", "10000", "20"],
                  [255, "FF", "11111111", "377"],
                  [256, "100", "100000000", "400"],
                ].map(([dec, hex, bin, oct]) => (
                  <tr key={String(dec)} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-1.5 pr-4">{dec}</td>
                    <td className="py-1.5 pr-4">{hex}</td>
                    <td className="py-1.5 pr-4">{bin}</td>
                    <td className="py-1.5">{oct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Privacy notice */}
        <div className="bg-card border border-border rounded-lg p-3 flex items-start gap-2">
          <Binary className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            All conversions are performed locally in your browser using JavaScript BigInt.
            No data is sent to any server. Supports arbitrarily large numbers with full precision.
          </p>
        </div>
      </main>

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <NumberConverterInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />
    </div>
  );
};

export default NumberConverter;

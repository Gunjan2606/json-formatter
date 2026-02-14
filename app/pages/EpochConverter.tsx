"use client";

import { useCallback, useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { EpochConverterInfoSections } from "../components/formatter/EpochConverterInfoSections";
import { useEpochConverter, type TimestampPrecision } from "../hooks/useEpochConverter";
import {
  Clock,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Calendar,
  Hash,
} from "lucide-react";

const PRESET_OPTIONS = [
  { value: "now", label: "Now" },
  { value: "tomorrow-9am", label: "Tomorrow 9am" },
  { value: "yesterday", label: "Yesterday" },
  { value: "start-of-day", label: "Start of Day" },
  { value: "end-of-day", label: "End of Day" },
  { value: "start-of-month", label: "Start of Month" },
  { value: "end-of-month", label: "End of Month" },
  { value: "start-of-year", label: "Start of Year" },
];

const EpochConverter = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

  const {
    state,
    setInputValue,
    setInputMode,
    setPrecision,
    setTimezone,
    setPreset,
    result,
    POPULAR_TIMEZONES,
  } = useEpochConverter();

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = useCallback((value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

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
        title="Epoch & Timestamp Converter"
        description="Convert Unix timestamps to dates instantly"
        icon={<Clock className="w-4 h-4 text-primary-foreground" />}
      />

      <main className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-6 w-full max-w-4xl mx-auto`}>
        {/* Current Time Display */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current Unix Timestamp</p>
              <p className="text-2xl font-mono font-bold">{currentTime.toLocaleString()}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue(currentTime.toString())}
              className="gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              Use Now
            </Button>
          </div>
        </div>

        {/* Input Mode Toggle */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
          <button
            onClick={() => setInputMode("timestamp")}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              state.inputMode === "timestamp"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            Timestamp to Date
          </button>
          <button
            onClick={() => setInputMode("date")}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              state.inputMode === "date"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Date to Timestamp
          </button>
        </div>

        {/* Input Field */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="text-sm font-semibold text-muted-foreground">
              {state.inputMode === "timestamp" ? "Enter Unix Timestamp" : "Enter Date"}
            </label>
            {state.inputMode === "timestamp" && (
              <div className="flex items-center gap-1.5">
                {(["seconds", "milliseconds", "microseconds"] as TimestampPrecision[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrecision(p)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                      state.precision === p
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p === "seconds" && "10"}
                    {p === "milliseconds" && "13"}
                    {p === "microseconds" && "16"} digits
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            value={state.inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              state.inputMode === "timestamp"
                ? "e.g., 1609459200 or 1609459200000"
                : "e.g., 2021-01-01 or January 1, 2021"
            }
            className="w-full bg-background border border-border rounded-md px-4 py-3 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            spellCheck={false}
            autoComplete="off"
          />
          {state.error && (
            <p className="text-xs text-red-500 font-medium">{state.error}</p>
          )}
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Quick Presets:</span>
          {PRESET_OPTIONS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setPreset(preset.value)}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary border border-border hover:border-primary/50 hover:text-foreground text-muted-foreground transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Timestamp Results */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-primary" />
                Unix Timestamps
              </h3>
              <div className="space-y-2">
                <ResultRow
                  label="Seconds (10 digits)"
                  value={result.timestamp.seconds.toString()}
                  field="seconds"
                  copied={copiedField === "seconds"}
                  onCopy={handleCopy}
                />
                <ResultRow
                  label="Milliseconds (13 digits)"
                  value={result.timestamp.milliseconds.toString()}
                  field="milliseconds"
                  copied={copiedField === "milliseconds"}
                  onCopy={handleCopy}
                  note="JavaScript Date.now()"
                />
                <ResultRow
                  label="Microseconds (16 digits)"
                  value={result.timestamp.microseconds.toString()}
                  field="microseconds"
                  copied={copiedField === "microseconds"}
                  onCopy={handleCopy}
                />
              </div>
            </div>

            {/* Date Results */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                Date Formats
              </h3>
              <div className="space-y-2">
                <ResultRow
                  label="ISO 8601"
                  value={result.date.iso}
                  field="iso"
                  copied={copiedField === "iso"}
                  onCopy={handleCopy}
                  note="Standard format"
                />
                <ResultRow
                  label="RFC 2822"
                  value={result.date.rfc2822}
                  field="rfc2822"
                  copied={copiedField === "rfc2822"}
                  onCopy={handleCopy}
                  note="HTTP headers"
                />
                <ResultRow
                  label="Human Readable"
                  value={result.date.readable}
                  field="readable"
                  copied={copiedField === "readable"}
                  onCopy={handleCopy}
                />
                <ResultRow
                  label="UTC"
                  value={result.date.utc}
                  field="utc"
                  copied={copiedField === "utc"}
                  onCopy={handleCopy}
                />
                <ResultRow
                  label="Local Time"
                  value={result.date.local}
                  field="local"
                  copied={copiedField === "local"}
                  onCopy={handleCopy}
                />
              </div>
            </div>

            {/* Relative Time & Timezone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="text-xs font-semibold text-muted-foreground mb-2">Relative Time</h4>
                <p className="text-lg font-medium">{result.relative}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground">Custom Timezone</h4>
                <select
                  value={state.selectedTimezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {POPULAR_TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                <ResultRow
                  label={state.selectedTimezone}
                  value={result.date.custom}
                  field="custom"
                  copied={copiedField === "custom"}
                  onCopy={handleCopy}
                  compact
                />
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Toggle */}
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Info Card */}
        <div className="bg-card border border-border rounded-lg p-3 flex items-start gap-2">
          <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            All conversions are performed locally in your browser. Unix timestamps are timezone-independent
            and represent a specific moment in UTC. The timestamp 0 = January 1, 1970 at 00:00:00 UTC.
          </p>
        </div>
      </main>

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <EpochConverterInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />
    </div>
  );
};

function ResultRow({
  label,
  value,
  field,
  copied,
  onCopy,
  note,
  compact = false,
}: {
  label: string;
  value: string;
  field: string;
  copied: boolean;
  onCopy: (value: string, field: string) => void;
  note?: string;
  compact?: boolean;
}) {
  return (
    <div className={`flex items-start gap-3 ${compact ? "" : "bg-secondary/30 rounded-md p-2"}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs text-muted-foreground">{label}</span>
          {note && (
            <span className="text-[10px] text-muted-foreground/60 italic">{note}</span>
          )}
        </div>
        <p className="font-mono text-sm break-all select-all cursor-text">{value}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 flex-shrink-0"
        onClick={() => onCopy(value, field)}
        title="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </Button>
    </div>
  );
}

export default EpochConverter;

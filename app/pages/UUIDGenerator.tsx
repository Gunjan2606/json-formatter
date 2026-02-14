"use client";

import { useCallback, useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { UUIDGeneratorInfoSections } from "../components/formatter/UUIDGeneratorInfoSections";
import { useUUIDGenerator, type UUIDVersion } from "../hooks/useUUIDGenerator";
import {
  Fingerprint,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  RefreshCw,
  Download,
  Trash2,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";

type Tab = "generate" | "decode" | "bulk" | "history";

const VERSION_INFO = {
  v4: {
    label: "UUID v4",
    short: "v4",
    description: "Random (122 bits)",
    useCase: "General purpose, API tokens, session IDs",
    recommendation: "Best for security & general use",
  },
  v7: {
    label: "UUID v7",
    short: "v7",
    description: "Timestamp + Random",
    useCase: "Database primary keys, event logs",
    recommendation: "Best for databases (sortable)",
  },
  v1: {
    label: "UUID v1",
    short: "v1",
    description: "Legacy timestamp",
    useCase: "Legacy system compatibility",
    recommendation: "Avoid for new projects",
  },
};

const UUIDGenerator = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("generate");
  const [bulkUUIDs, setBulkUUIDs] = useState<string[]>([]);

  const {
    version,
    setVersion,
    currentUUID,
    generate,
    bulkCount,
    setBulkCount,
    generateBulk,
    formats,
    history,
    clearHistory,
    decodeInput,
    setDecodeInput,
    decodeResult,
  } = useUUIDGenerator();

  // Generate initial UUID on mount
  useEffect(() => {
    if (!currentUUID) generate();
  }, [currentUUID, generate]);

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

  const handleGenerateBulk = useCallback(() => {
    const uuids = generateBulk(bulkCount);
    setBulkUUIDs(uuids);
  }, [bulkCount, generateBulk]);

  const handleCopyAllBulk = useCallback(() => {
    const text = bulkUUIDs.join("\n");
    navigator.clipboard.writeText(text);
    setCopiedField("bulk-all");
    setTimeout(() => setCopiedField(null), 1500);
  }, [bulkUUIDs]);

  const handleDownloadBulk = useCallback(() => {
    const text = bulkUUIDs.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [bulkUUIDs]);

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
        title="UUID Generator"
        description="Generate, validate & decode UUIDs"
        icon={<Fingerprint className="w-4 h-4 text-primary-foreground" />}
      />

      <main className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-6 w-full max-w-4xl mx-auto`}>
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
          {[
            { id: "generate", label: "Generate" },
            { id: "decode", label: "Decode" },
            { id: "bulk", label: "Bulk" },
            { id: "history", label: "History", count: history.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="text-xs bg-primary/20 px-1.5 py-0.5 rounded">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Generate Tab */}
        {activeTab === "generate" && (
          <div className="space-y-6">
            {/* Version Selector */}
            <div className="grid grid-cols-3 gap-2">
              {(["v4", "v7", "v1"] as UUIDVersion[]).map((v) => {
                const info = VERSION_INFO[v];
                return (
                  <button
                    key={v}
                    onClick={() => setVersion(v)}
                    className={`flex flex-col items-start p-3 rounded-lg border-2 transition-all ${
                      version === v
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">{info.short}</span>
                      {version === v && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{info.description}</span>
                  </button>
                );
              })}
            </div>

            {/* Version Info */}
            <div className="bg-card border border-border rounded-lg p-3 flex items-start gap-2">
              <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">
                  {VERSION_INFO[version].recommendation}
                </p>
                <p>{VERSION_INFO[version].useCase}</p>
              </div>
            </div>

            {/* Generate Button */}
            <Button onClick={generate} className="w-full gap-2" size="lg">
              <RefreshCw className="w-4 h-4" />
              Generate UUID
            </Button>

            {/* Current UUID Display */}
            {formats && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground">Formats</h3>
                <FormatRow
                  label="Standard"
                  value={formats.standard}
                  field="standard"
                  copied={copiedField === "standard"}
                  onCopy={handleCopy}
                  note="Default format with hyphens"
                />
                <FormatRow
                  label="No Hyphens"
                  value={formats.noHyphens}
                  field="noHyphens"
                  copied={copiedField === "noHyphens"}
                  onCopy={handleCopy}
                  note="32 hex characters"
                />
                <FormatRow
                  label="Uppercase"
                  value={formats.uppercase}
                  field="uppercase"
                  copied={copiedField === "uppercase"}
                  onCopy={handleCopy}
                />
                <FormatRow
                  label="Braces"
                  value={formats.braces}
                  field="braces"
                  copied={copiedField === "braces"}
                  onCopy={handleCopy}
                  note="Microsoft GUID format"
                />
                <FormatRow
                  label="URN"
                  value={formats.urn}
                  field="urn"
                  copied={copiedField === "urn"}
                  onCopy={handleCopy}
                  note="RFC 4122 URN format"
                />
                <FormatRow
                  label="Base64"
                  value={formats.base64}
                  field="base64"
                  copied={copiedField === "base64"}
                  onCopy={handleCopy}
                  note="URL-safe, 22 chars"
                />
              </div>
            )}
          </div>
        )}

        {/* Decode Tab */}
        {activeTab === "decode" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <label className="text-sm font-semibold text-muted-foreground">
                Paste UUID to Decode
              </label>
              <input
                type="text"
                value={decodeInput}
                onChange={(e) => setDecodeInput(e.target.value)}
                placeholder="e.g., 550e8400-e29b-41d4-a716-446655440000"
                className="w-full bg-background border border-border rounded-md px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                spellCheck={false}
              />
            </div>

            {decodeResult && (
              <div className="space-y-3">
                {!decodeResult.isValid ? (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-500 mb-1">Invalid UUID</p>
                      {decodeResult.warnings.map((w, i) => (
                        <p key={i} className="text-xs text-red-500/80">{w}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-emerald-500">Valid UUID</p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                      <h3 className="text-sm font-semibold">Details</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Version</p>
                          <p className="font-mono font-medium">v{decodeResult.version}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Variant</p>
                          <p className="font-mono font-medium">{decodeResult.variant}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Format</p>
                          <p className="font-mono font-medium">{decodeResult.format}</p>
                        </div>
                        {decodeResult.randomBits && (
                          <div>
                            <p className="text-xs text-muted-foreground">Random Bits</p>
                            <p className="font-mono font-medium">{decodeResult.randomBits}</p>
                          </div>
                        )}
                      </div>

                      {decodeResult.timestamp && (
                        <div className="pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-1">Embedded Timestamp</p>
                          <p className="font-mono text-sm">{decodeResult.timestamp.toISOString()}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {decodeResult.timestamp.toLocaleString()}
                          </p>
                        </div>
                      )}

                      {decodeResult.warnings.length > 0 && (
                        <div className="pt-3 border-t border-border">
                          <p className="text-xs font-semibold text-yellow-500 mb-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Warnings
                          </p>
                          {decodeResult.warnings.map((w, i) => (
                            <p key={i} className="text-xs text-yellow-500/80">{w}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bulk Tab */}
        {activeTab === "bulk" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-muted-foreground">
                  Number of UUIDs
                </label>
                <span className="text-sm font-mono font-bold">{bulkCount}</span>
              </div>
              <input
                type="range"
                min={1}
                max={10000}
                value={bulkCount}
                onChange={(e) => setBulkCount(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>1</span>
                <span>10,000</span>
              </div>
            </div>

            <Button onClick={handleGenerateBulk} className="w-full gap-2" size="lg">
              <RefreshCw className="w-4 h-4" />
              Generate {bulkCount.toLocaleString()} UUIDs
            </Button>

            {bulkUUIDs.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {bulkUUIDs.length.toLocaleString()} UUIDs generated
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyAllBulk}
                      className="gap-1.5"
                    >
                      {copiedField === "bulk-all" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      Copy All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadBulk}
                      className="gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 max-h-[400px] overflow-y-auto">
                  <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
                    {bulkUUIDs.join("\n")}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Fingerprint className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No UUIDs generated yet</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last {history.length} generated
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="gap-1.5 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear
                  </Button>
                </div>
                <div className="space-y-2">
                  {history.map((uuid, i) => (
                    <div
                      key={i}
                      className="bg-card border border-border rounded-lg p-3 flex items-center justify-between gap-3"
                    >
                      <span className="font-mono text-sm flex-1 truncate">{uuid}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 flex-shrink-0"
                        onClick={() => handleCopy(uuid, `history-${i}`)}
                      >
                        {copiedField === `history-${i}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Fullscreen Toggle */}
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Privacy Notice */}
        <div className="bg-card border border-border rounded-lg p-3 flex items-start gap-2">
          <Fingerprint className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            All UUIDs are generated locally using the Web Crypto API. No data is sent to any server.
            Use v4 for security, v7 for databases.
          </p>
        </div>
      </main>

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <UUIDGeneratorInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />
    </div>
  );
};

function FormatRow({
  label,
  value,
  field,
  copied,
  onCopy,
  note,
}: {
  label: string;
  value: string;
  field: string;
  copied: boolean;
  onCopy: (value: string, field: string) => void;
  note?: string;
}) {
  return (
    <div className="bg-secondary/30 rounded-md p-3 flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
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

export default UUIDGenerator;

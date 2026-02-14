"use client";

import { useEffect, useCallback } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { PasswordGeneratorInfoSections } from "../components/formatter/PasswordGeneratorInfoSections";
import { useToast } from "../hooks/use-toast";
import {
  usePasswordGenerator,
  type GeneratorMode,
} from "../hooks/usePasswordGenerator";
import {
  KeyRound,
  RefreshCw,
  Copy,
  Check,
  Shield,
  Hash,
  Type,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useState } from "react";

const PasswordGenerator = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const { options, updateOption, passwords, generate, entropy } = usePasswordGenerator();

  // Generate on mount and when options change
  useEffect(() => {
    generate();
  }, [generate]);

  const handleCopy = useCallback(
    (value: string, id: string) => {
      navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    },
    []
  );

  const handleCopyAll = useCallback(() => {
    const all = passwords.map((p) => p.value).join("\n");
    navigator.clipboard.writeText(all);
    toast({ title: "All passwords copied" });
  }, [passwords, toast]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const modeButtons: { mode: GeneratorMode; label: string; icon: React.ReactNode }[] = [
    { mode: "random", label: "Random", icon: <KeyRound className="w-3.5 h-3.5" /> },
    { mode: "passphrase", label: "Passphrase", icon: <Type className="w-3.5 h-3.5" /> },
    { mode: "pin", label: "PIN", icon: <Hash className="w-3.5 h-3.5" /> },
  ];

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
        title="Password Generator"
        description="Secure, client-side password generation"
        icon={<KeyRound className="w-4 h-4 text-primary-foreground" />}
      />

      <main className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-6 w-full max-w-4xl mx-auto`}>
        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
          {modeButtons.map(({ mode, label, icon }) => (
            <button
              key={mode}
              onClick={() => updateOption("mode", mode)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                options.mode === mode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Generated Password Display */}
        <div className="space-y-3">
          {passwords.map((entry) => (
            <div key={entry.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div
                  className="flex-1 font-mono text-lg break-all select-all cursor-text leading-relaxed"
                  title="Click to select"
                >
                  {entry.value}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={() => handleCopy(entry.value, entry.id)}
                  title="Copy password"
                >
                  {copiedId === entry.id ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {/* Strength bar */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        i <= entry.strength.score ? entry.strength.color : "bg-secondary"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {entry.strength.label}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {entry.strength.crackTime}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={generate} className="gap-1.5">
            <RefreshCw className="w-4 h-4" />
            Generate
          </Button>
          {passwords.length > 1 && (
            <Button variant="outline" onClick={handleCopyAll} className="gap-1.5">
              <Copy className="w-4 h-4" />
              Copy All
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Options Panel */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-primary" />
            Options
          </h3>

          {/* Random Mode Options */}
          {options.mode === "random" && (
            <div className="space-y-4">
              {/* Length slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-muted-foreground">Length</label>
                  <span className="text-sm font-mono font-bold">{options.length}</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={128}
                  value={options.length}
                  onChange={(e) => updateOption("length", parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                  <span>4</span>
                  <span>128</span>
                </div>
              </div>

              {/* Character toggles */}
              <div className="grid grid-cols-2 gap-2">
                <ToggleOption
                  label="Uppercase (A-Z)"
                  checked={options.uppercase}
                  onChange={(v) => updateOption("uppercase", v)}
                />
                <ToggleOption
                  label="Lowercase (a-z)"
                  checked={options.lowercase}
                  onChange={(v) => updateOption("lowercase", v)}
                />
                <ToggleOption
                  label="Numbers (0-9)"
                  checked={options.numbers}
                  onChange={(v) => updateOption("numbers", v)}
                />
                <ToggleOption
                  label="Symbols (!@#$%)"
                  checked={options.symbols}
                  onChange={(v) => updateOption("symbols", v)}
                />
                <ToggleOption
                  label="Exclude ambiguous (0O, 1lI)"
                  checked={options.excludeAmbiguous}
                  onChange={(v) => updateOption("excludeAmbiguous", v)}
                />
              </div>
            </div>
          )}

          {/* Passphrase Mode Options */}
          {options.mode === "passphrase" && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-muted-foreground">Number of Words</label>
                  <span className="text-sm font-mono font-bold">{options.wordCount}</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={10}
                  value={options.wordCount}
                  onChange={(e) => updateOption("wordCount", parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                  <span>3</span>
                  <span>10</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Separator</label>
                <div className="flex gap-1.5">
                  {["-", ".", "_", " ", "~"].map((sep) => (
                    <button
                      key={sep}
                      onClick={() => updateOption("separator", sep)}
                      className={`px-3 py-1.5 rounded-md text-sm font-mono border transition-all ${
                        options.separator === sep
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary border-border hover:border-primary/50"
                      }`}
                    >
                      {sep === " " ? "space" : sep}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <ToggleOption
                  label="Capitalize words"
                  checked={options.capitalize}
                  onChange={(v) => updateOption("capitalize", v)}
                />
                <ToggleOption
                  label="Include number"
                  checked={options.includeNumber}
                  onChange={(v) => updateOption("includeNumber", v)}
                />
              </div>
            </div>
          )}

          {/* PIN Mode Options */}
          {options.mode === "pin" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted-foreground">PIN Length</label>
                <span className="text-sm font-mono font-bold">{options.pinLength}</span>
              </div>
              <input
                type="range"
                min={4}
                max={12}
                value={options.pinLength}
                onChange={(e) => updateOption("pinLength", parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                <span>4</span>
                <span>12</span>
              </div>
            </div>
          )}

          {/* Bulk count */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-muted-foreground">Generate Count</label>
              <span className="text-sm font-mono font-bold">{options.count}</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={options.count}
              onChange={(e) => updateOption("count", parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          {/* Entropy display */}
          {passwords.length > 0 && (
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Entropy</span>
                <span className="font-mono">{Math.round(entropy)} bits</span>
              </div>
            </div>
          )}
        </div>

        {/* Privacy notice */}
        <div className="bg-card border border-border rounded-lg p-3 flex items-start gap-2">
          <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            All passwords are generated locally in your browser using the cryptographically
            secure <code className="text-foreground">crypto.getRandomValues()</code> API.
            Nothing is sent to any server. We never see, store, or log your passwords.
          </p>
        </div>
      </main>

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <PasswordGeneratorInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />
    </div>
  );
};

function ToggleOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
          checked
            ? "bg-primary border-primary"
            : "border-muted-foreground/40 hover:border-primary/60"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" />}
      </button>
      <span className="text-sm text-muted-foreground">{label}</span>
    </label>
  );
}

export default PasswordGenerator;

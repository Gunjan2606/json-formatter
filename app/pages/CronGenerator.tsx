"use client";

import { useState } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useCronGenerator, cronPresets } from "../hooks/useCronGenerator";
import { Clock, Copy, RotateCcw, Calendar } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { CronGeneratorInfoSections } from "../components/formatter/CronGeneratorInfoSections";

export default function CronGenerator() {
  const {
    cronParts,
    cronExpression,
    humanReadable,
    nextRuns,
    updatePart,
    loadPreset,
    reset,
  } = useCronGenerator();

  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const copyCronExpression = () => {
    navigator.clipboard.writeText(cronExpression);
    toast({
      title: "Copied!",
      description: "Cron expression copied to clipboard",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="Cron Expression Generator"
        icon={<Clock className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* Cron Expression Display - Hero */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/20 rounded-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-500" />
                <h3 className="font-semibold text-lg">Your Cron Expression</h3>
              </div>
              <Button onClick={copyCronExpression} size="lg">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg border border-border mb-4">
              <div className="font-mono text-3xl md:text-4xl text-center font-bold tracking-wider">
                {cronExpression}
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-background/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-lg font-medium">{humanReadable}</span>
              </div>
            </div>
          </div>

          {/* Quick Presets First - Most users want these */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Quick Presets - Pick One</h3>
              <Button onClick={reset} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cronPresets.map((preset) => (
                <Button
                  key={preset.name}
                  onClick={() => loadPreset(preset.cron)}
                  variant="outline"
                  className="h-auto py-3 px-4 flex flex-col items-start gap-1 hover:border-primary hover:bg-primary/5"
                >
                  <span className="font-semibold text-sm">{preset.name}</span>
                  <code className="text-xs text-muted-foreground font-mono">
                    {`${preset.cron.minute} ${preset.cron.hour} ${preset.cron.dayOfMonth} ${preset.cron.month} ${preset.cron.dayOfWeek}`}
                  </code>
                </Button>
              ))}
            </div>
          </div>

          {/* Advanced Builder - Collapsible feel */}
          <details className="bg-card border border-border rounded-lg" open>
            <summary className="p-6 cursor-pointer font-semibold text-lg hover:bg-muted/30 transition-colors">
              Advanced Builder (Manual Configuration)
            </summary>
            <div className="p-6 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Minute */}
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <span>⏱️ Minute</span>
                  </label>
                  <input
                    type="text"
                    value={cronParts.minute}
                    onChange={(e) => updatePart("minute", e.target.value)}
                    className="w-full px-3 py-3 bg-background border-2 border-border rounded-lg text-center font-mono text-lg font-bold focus:border-primary focus:outline-none"
                    placeholder="*"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">0-59</p>
                </div>

                {/* Hour */}
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <span>🕐 Hour</span>
                  </label>
                  <input
                    type="text"
                    value={cronParts.hour}
                    onChange={(e) => updatePart("hour", e.target.value)}
                    className="w-full px-3 py-3 bg-background border-2 border-border rounded-lg text-center font-mono text-lg font-bold focus:border-primary focus:outline-none"
                    placeholder="*"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">0-23</p>
                </div>

                {/* Day of Month */}
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <span>📅 Day</span>
                  </label>
                  <input
                    type="text"
                    value={cronParts.dayOfMonth}
                    onChange={(e) => updatePart("dayOfMonth", e.target.value)}
                    className="w-full px-3 py-3 bg-background border-2 border-border rounded-lg text-center font-mono text-lg font-bold focus:border-primary focus:outline-none"
                    placeholder="*"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">1-31</p>
                </div>

                {/* Month */}
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <span>📆 Month</span>
                  </label>
                  <input
                    type="text"
                    value={cronParts.month}
                    onChange={(e) => updatePart("month", e.target.value)}
                    className="w-full px-3 py-3 bg-background border-2 border-border rounded-lg text-center font-mono text-lg font-bold focus:border-primary focus:outline-none"
                    placeholder="*"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">1-12</p>
                </div>

                {/* Day of Week */}
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <span>📍 Weekday</span>
                  </label>
                  <input
                    type="text"
                    value={cronParts.dayOfWeek}
                    onChange={(e) => updatePart("dayOfWeek", e.target.value)}
                    className="w-full px-3 py-3 bg-background border-2 border-border rounded-lg text-center font-mono text-lg font-bold focus:border-primary focus:outline-none"
                    placeholder="*"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">0-6</p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                <p className="font-semibold mb-3 text-sm">💡 Quick Guide:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-start gap-2">
                    <code className="bg-background px-2 py-1 rounded font-mono font-bold">*</code>
                    <span className="text-muted-foreground">Any value (runs every time)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="bg-background px-2 py-1 rounded font-mono font-bold">*/5</code>
                    <span className="text-muted-foreground">Every 5 units (e.g., every 5 min)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="bg-background px-2 py-1 rounded font-mono font-bold">1-5</code>
                    <span className="text-muted-foreground">Range (Mon to Fri if in weekday)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <code className="bg-background px-2 py-1 rounded font-mono font-bold">1,3,5</code>
                    <span className="text-muted-foreground">List (specific values only)</span>
                  </div>
                </div>
              </div>
            </div>
          </details>

          {/* Next Runs */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5" />
              <h3 className="font-semibold">Next 5 Executions</h3>
            </div>
            <div className="space-y-2">
              {nextRuns.map((run, index) => (
                <div
                  key={index}
                  className="p-3 bg-muted rounded text-sm font-mono"
                >
                  {run}
                </div>
              ))}
            </div>
          </div>

          {/* Examples - Simplified */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-lg">Common Examples</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <code className="bg-muted px-2 py-1 rounded font-mono text-sm flex-shrink-0">
                  0 0 * * *
                </code>
                <span className="text-sm text-muted-foreground">
                  Daily at midnight
                </span>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-muted px-2 py-1 rounded font-mono text-sm flex-shrink-0">
                  */15 * * * *
                </code>
                <span className="text-sm text-muted-foreground">
                  Every 15 minutes
                </span>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-muted px-2 py-1 rounded font-mono text-sm flex-shrink-0">
                  0 9 * * 1-5
                </code>
                <span className="text-sm text-muted-foreground">
                  Every weekday (Monday to Friday) at 9 AM
                </span>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-muted px-2 py-1 rounded font-mono text-sm flex-shrink-0">
                  0 0 1 * *
                </code>
                <span className="text-sm text-muted-foreground">
                  First day of every month at midnight
                </span>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-muted px-2 py-1 rounded font-mono text-sm flex-shrink-0">
                  30 2 * * 0
                </code>
                <span className="text-sm text-muted-foreground">
                  Every Sunday at 2:30 AM
                </span>
              </div>
              <div className="flex items-start gap-3">
                <code className="bg-muted px-2 py-1 rounded font-mono text-sm flex-shrink-0">
                  0 */6 * * *
                </code>
                <span className="text-sm text-muted-foreground">
                  Every 6 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {!isFullscreen && (
        <>
          <CronGeneratorInfoSections />
          <Footer isFullscreen={isFullscreen} />
        </>
      )}
    </div>
  );
}

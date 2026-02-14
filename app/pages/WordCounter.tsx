"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { WordCounterInfoSections } from "../components/formatter/WordCounterInfoSections";
import { useToast } from "../hooks/use-toast";
import { useWordCounter } from "../hooks/useWordCounter";
import {
  FileText,
  Upload,
  Copy,
  Download,
  Trash2,
  Type,
  Hash,
  Clock,
  MessageSquare,
  BarChart3,
  Search,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";

function formatTime(seconds: number): string {
  if (seconds < 1) return "0 sec";
  if (seconds < 60) return `${Math.ceil(seconds)} sec`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.ceil(seconds % 60);
  if (mins < 60) return secs > 0 ? `${mins} min ${secs} sec` : `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return `${hrs} hr ${remainMins} min`;
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const WordCounter = () => {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { stats, keywordDensity, socialLimits } = useWordCounter(text);

  // Load fontSize from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wordCounter_fontSize");
      if (saved) setFontSize(parseInt(saved));
    }
  }, []);

  const handleCopy = useCallback(() => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  }, [text, toast]);

  const handleDownload = useCallback(() => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [text]);

  const handleClear = useCallback(() => {
    setText("");
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const content = await file.text();
        setText(content);
        toast({ title: "File loaded", description: file.name });
      } catch {
        toast({ title: "Failed to read file", variant: "destructive" });
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [toast]
  );

  const handleFontSize = useCallback(
    (size: number) => {
      setFontSize(size);
      if (typeof window !== "undefined") {
        localStorage.setItem("wordCounter_fontSize", String(size));
      }
      toast({
        title: `Text size: ${size === 14 ? "Small" : size === 16 ? "Medium" : "Large"}`,
      });
    },
    [toast]
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

  const handleSearch = useCallback(() => {
    // Focus textarea and use native browser find
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleCopyStats = useCallback(() => {
    const statsText = [
      `Words: ${formatNumber(stats.words)}`,
      `Characters: ${formatNumber(stats.characters)}`,
      `Characters (no spaces): ${formatNumber(stats.charactersNoSpaces)}`,
      `Sentences: ${formatNumber(stats.sentences)}`,
      `Paragraphs: ${formatNumber(stats.paragraphs)}`,
      `Lines: ${formatNumber(stats.lines)}`,
      `Reading Time: ${formatTime(stats.readingTimeSeconds)}`,
      `Speaking Time: ${formatTime(stats.speakingTimeSeconds)}`,
      `Bytes (UTF-8): ${formatBytes(stats.bytesUtf8)}`,
      `Unique Words: ${formatNumber(stats.uniqueWords)}`,
      `Avg Word Length: ${stats.avgWordLength.toFixed(1)}`,
    ].join("\n");
    navigator.clipboard.writeText(statsText);
    toast({ title: "Stats copied" });
  }, [stats, toast]);

  // FAQ JSON-LD for SEO
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I count words online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply paste or type your text into the editor above. The word count, character count, and all other statistics update instantly in real time. You can also upload a text file.",
        },
      },
      {
        "@type": "Question",
        name: "Is my text safe in this online word counter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, 100% safe. All text processing happens locally in your browser using JavaScript. Your text is never sent to any server, stored, or logged. We have zero access to your content.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between characters and characters without spaces?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Characters counts every character including spaces, tabs, and newlines. Characters without spaces excludes all whitespace, giving you the count of only letters, numbers, and punctuation.",
        },
      },
      {
        "@type": "Question",
        name: "How is reading time calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reading time is calculated by dividing the total word count by 238 words per minute, which is the average adult silent reading speed based on research. Speaking time uses 150 words per minute.",
        },
      },
    ],
  };

  return (
    <div
      className={`${isFullscreen ? "h-screen overflow-hidden" : "min-h-screen"} bg-background text-foreground flex flex-col`}
    >
      <Header
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onSearch={handleSearch}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
        title="Word Counter"
        description="Count words, characters, and more"
        icon={<FileText className="w-4 h-4 text-primary-foreground" />}
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.json,.csv,.xml,.html,.yml,.yaml"
        onChange={handleFileUpload}
        className="hidden"
      />

      <main className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-4 w-full max-w-7xl mx-auto`}>
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-8"
              title="Upload text file"
            >
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              Upload
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8"
              disabled={!text}
              title="Copy text"
            >
              <Copy className="w-3.5 h-3.5 mr-1.5" />
              Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="h-8"
              disabled={!text}
              title="Download as .txt"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8"
              disabled={!text}
              title="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyStats}
              className="h-8"
              disabled={!text}
              title="Copy all stats"
            >
              <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
              Copy Stats
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Text size">
                  <Type className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleFontSize(14)} className={fontSize === 14 ? "bg-primary/20" : ""}>
                  Small
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFontSize(16)} className={fontSize === 16 ? "bg-primary/20" : ""}>
                  Medium
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFontSize(18)} className={fontSize === 18 ? "bg-primary/20" : ""}>
                  Large
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="w-full bg-card border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: "1.7",
              minHeight: isFullscreen ? "40vh" : "280px",
              maxHeight: isFullscreen ? "60vh" : "500px",
            }}
            spellCheck
            autoFocus
          />
          {/* Live word count badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-3 text-xs text-muted-foreground bg-card/90 backdrop-blur-sm px-2 py-1 rounded border border-border">
            <span>{formatNumber(stats.words)} words</span>
            <span className="text-border">|</span>
            <span>{formatNumber(stats.characters)} chars</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <StatCard icon={<Hash className="w-4 h-4" />} label="Words" value={formatNumber(stats.words)} />
          <StatCard
            icon={<Type className="w-4 h-4" />}
            label="Characters"
            value={formatNumber(stats.characters)}
          />
          <StatCard
            icon={<Type className="w-4 h-4" />}
            label="Chars (no spaces)"
            value={formatNumber(stats.charactersNoSpaces)}
          />
          <StatCard
            icon={<MessageSquare className="w-4 h-4" />}
            label="Sentences"
            value={formatNumber(stats.sentences)}
          />
          <StatCard icon={<FileText className="w-4 h-4" />} label="Paragraphs" value={formatNumber(stats.paragraphs)} />
          <StatCard icon={<FileText className="w-4 h-4" />} label="Lines" value={formatNumber(stats.lines)} />
          <StatCard
            icon={<Clock className="w-4 h-4" />}
            label="Reading Time"
            value={formatTime(stats.readingTimeSeconds)}
          />
          <StatCard
            icon={<Clock className="w-4 h-4" />}
            label="Speaking Time"
            value={formatTime(stats.speakingTimeSeconds)}
          />
        </div>

        {/* Developer Stats */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" />
            Developer Stats
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <StatCard label="Bytes (UTF-8)" value={formatBytes(stats.bytesUtf8)} small />
            <StatCard label="Unique Words" value={formatNumber(stats.uniqueWords)} small />
            <StatCard label="Avg Word Length" value={stats.avgWordLength.toFixed(1)} small />
          </div>
        </div>

        {/* Social Media Limits */}
        {text.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Social Media Limits
            </h3>
            <div className="space-y-2">
              {socialLimits.map((item) => {
                const pct = Math.min((item.current / item.limit) * 100, 100);
                const isOver = item.current > item.limit;
                return (
                  <div key={item.platform} className="bg-card border border-border rounded-lg px-3 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{item.platform}</span>
                      <span className={`text-xs ${isOver ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                        {formatNumber(item.current)} / {formatNumber(item.limit)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${isOver ? "bg-destructive" : item.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Keyword Density */}
        {keywordDensity.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              Keyword Density (top 15)
            </h3>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-3 py-2 text-muted-foreground font-medium">Keyword</th>
                    <th className="text-right px-3 py-2 text-muted-foreground font-medium">Count</th>
                    <th className="text-right px-3 py-2 text-muted-foreground font-medium">Density</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordDensity.map((entry) => (
                    <tr key={entry.word} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-3 py-1.5 font-medium">{entry.word}</td>
                      <td className="px-3 py-1.5 text-right text-muted-foreground">{entry.count}</td>
                      <td className="px-3 py-1.5 text-right">
                        <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                          {entry.density.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <WordCounterInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
};

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  small = false,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className={`bg-card border border-border rounded-lg ${small ? "px-3 py-2" : "p-3"} flex flex-col`}>
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        {icon && <span className="text-primary">{icon}</span>}
        <span className={`${small ? "text-[11px]" : "text-xs"} font-medium`}>{label}</span>
      </div>
      <span className={`${small ? "text-base" : "text-lg"} font-bold text-foreground`}>{value}</span>
    </div>
  );
}

export default WordCounter;

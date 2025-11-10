"use client";

import { Button } from "../../components/ui/button";
import { Code, Minimize, Copy, Download, Zap } from "lucide-react";

interface ToolbarProps {
  onFormat: () => void;
  onMinify: () => void;
  onCopy: () => void;
  onDownload: () => void;
  isMinified: boolean;
  isProcessing?: boolean;
}

export const Toolbar = ({ onFormat, onMinify, onCopy, onDownload, isProcessing = false }: ToolbarProps) => {
  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={onFormat}
            variant="default"
            size="sm"
            className="gap-2"
            disabled={isProcessing}
          >
            <Code className="w-4 h-4" />
            {isProcessing ? "Processing..." : "Format"}
          </Button>
          
          <Button
            onClick={onMinify}
            variant="secondary"
            size="sm"
            className="gap-2"
            disabled={isProcessing}
          >
            <Minimize className="w-4 h-4" />
            Minify
          </Button>
          
          <div className="hidden md:block w-px h-6 bg-border mx-1" />
          
          <Button
            onClick={onCopy}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
          
          <Button
            onClick={onDownload}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="w-3 h-3 text-primary" />
            <span className="hidden md:inline">Lightning fast formatting</span>
          </div>
        </div>
      </div>
    </div>
  );
};

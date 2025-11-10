"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Download, RotateCcw, Trash2, X, History, Trash, AlertTriangle } from "lucide-react";
import { SavedOutput, getAllOutputs, deleteOutput, clearAllOutputs, formatSize } from "../../lib/storage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";

interface RecentOutputsProps {
  onRestore: (content: string) => void;
  onClose: () => void;
  isOpen: boolean;
  refreshTrigger?: number;
}

export function RecentOutputs({ onRestore, onClose, isOpen, refreshTrigger }: RecentOutputsProps) {
  const [outputs, setOutputs] = useState<SavedOutput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showClearDialog, setShowClearDialog] = useState(false);

  const loadOutputs = async () => {
    setIsLoading(true);
    const savedOutputs = await getAllOutputs();
    setOutputs(savedOutputs);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadOutputs();
    }
  }, [isOpen, refreshTrigger]);

  const handleRestore = (output: SavedOutput) => {
    onRestore(output.content);
  };

  const handleDownload = (output: SavedOutput) => {
    const blob = new Blob([output.content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${output.name.replace(/[^a-z0-9]/gi, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: string) => {
    await deleteOutput(id);
    await loadOutputs();
  };

  const handleClearAll = async () => {
    await clearAllOutputs();
    await loadOutputs();
    setShowClearDialog(false);
    onClose(); // Close the sidebar after clearing all
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/50">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-primary" />
          <h2 className="font-semibold text-sm">Recent Outputs</h2>
          <span className="text-xs text-muted-foreground">({outputs.length}/10)</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Clear All Button */}
      {outputs.length > 0 && (
        <div className="p-3 border-b border-border">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowClearDialog(true)}
            className="w-full text-xs"
          >
            <Trash className="w-3 h-3 mr-2" />
            Clear All
          </Button>
        </div>
      )}

      {/* Outputs List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">Loading...</p>
          </div>
        ) : outputs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6 text-center">
            <History className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm font-medium mb-1">No saved outputs yet</p>
            <p className="text-xs">Format JSON and click &quot;Save&quot; to store outputs here</p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {outputs.map((output) => (
              <div
                key={output.id}
                className="border border-border rounded-lg p-3 bg-secondary/20 hover:bg-secondary/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" title={output.name}>
                      {output.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatSize(output.size)}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(output.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(output)}
                    className="flex-1 h-7 text-xs"
                    title="Restore to editor"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Restore
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(output)}
                    className="flex-1 h-7 text-xs"
                    title="Download"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(output.id)}
                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-border bg-secondary/20">
        <p className="text-xs text-muted-foreground text-center">
          Max 10 outputs • Auto-deletes oldest
        </p>
      </div>

      {/* Clear All Confirmation Dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent onClose={() => setShowClearDialog(false)}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Clear All Outputs?
            </DialogTitle>
            <DialogDescription className="pt-4">
              This will permanently delete all {outputs.length} saved output{outputs.length !== 1 ? 's' : ''} from your browser storage. 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 gap-2">
            <Button
              variant="ghost"
              onClick={() => setShowClearDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleClearAll}
            >
              <Trash className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


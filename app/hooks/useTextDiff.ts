"use client";

import { useState, useMemo, useCallback } from "react";
import * as Diff from "diff";

export type DiffMode = "characters" | "words" | "lines";
export type ViewMode = "split" | "unified";

export interface DiffResult {
  left: DiffLine[];
  right: DiffLine[];
  unified: UnifiedDiffLine[];
  stats: DiffStats;
}

export interface DiffLine {
  content: string;
  type: "added" | "removed" | "unchanged" | "modified";
  lineNumber: number;
  changes?: IntraLineChange[];
}

export interface UnifiedDiffLine {
  content: string;
  type: "added" | "removed" | "unchanged";
  oldLineNumber: number | null;
  newLineNumber: number | null;
}

export interface IntraLineChange {
  value: string;
  type: "added" | "removed" | "unchanged";
}

export interface DiffStats {
  additions: number;
  deletions: number;
  modifications: number;
  unchanged: number;
}

function getIntraLineChanges(oldLine: string, newLine: string): {
  left: IntraLineChange[];
  right: IntraLineChange[];
} {
  const changes = Diff.diffChars(oldLine, newLine);
  const left: IntraLineChange[] = [];
  const right: IntraLineChange[] = [];

  changes.forEach((change) => {
    if (change.removed) {
      left.push({ value: change.value, type: "removed" });
    } else if (change.added) {
      right.push({ value: change.value, type: "added" });
    } else {
      left.push({ value: change.value, type: "unchanged" });
      right.push({ value: change.value, type: "unchanged" });
    }
  });

  return { left, right };
}

function computeDiff(leftText: string, rightText: string, mode: DiffMode): DiffResult {
  let changes: Diff.Change[];
  if (mode === "characters") {
    changes = Diff.diffChars(leftText, rightText);
  } else if (mode === "words") {
    changes = Diff.diffWords(leftText, rightText);
  } else {
    changes = Diff.diffLines(leftText, rightText);
  }

  const left: DiffLine[] = [];
  const right: DiffLine[] = [];
  const unified: UnifiedDiffLine[] = [];

  let leftLineNum = 1;
  let rightLineNum = 1;

  const stats: DiffStats = {
    additions: 0,
    deletions: 0,
    modifications: 0,
    unchanged: 0,
  };

  if (mode === "lines") {
    // Line-by-line diff with intra-line changes for modified lines
    const lineDiff = Diff.diffLines(leftText, rightText);
    const leftLinesArray = leftText.split("\n");
    const rightLinesArray = rightText.split("\n");

    let leftIndex = 0;
    let rightIndex = 0;

    lineDiff.forEach((change) => {
      const lineCount = change.count || 0;

      if (change.removed) {
        for (let i = 0; i < lineCount; i++) {
          const content = leftLinesArray[leftIndex + i] || "";
          left.push({
            content,
            type: "removed",
            lineNumber: leftLineNum++,
          });
          stats.deletions++;

          unified.push({
            content,
            type: "removed",
            oldLineNumber: leftLineNum - 1,
            newLineNumber: null,
          });
        }
        leftIndex += lineCount;
      } else if (change.added) {
        for (let i = 0; i < lineCount; i++) {
          const content = rightLinesArray[rightIndex + i] || "";
          right.push({
            content,
            type: "added",
            lineNumber: rightLineNum++,
          });
          stats.additions++;

          unified.push({
            content,
            type: "added",
            oldLineNumber: null,
            newLineNumber: rightLineNum - 1,
          });
        }
        rightIndex += lineCount;
      } else {
        for (let i = 0; i < lineCount; i++) {
          const content = leftLinesArray[leftIndex + i] || "";
          left.push({
            content,
            type: "unchanged",
            lineNumber: leftLineNum++,
          });
          right.push({
            content,
            type: "unchanged",
            lineNumber: rightLineNum++,
          });
          stats.unchanged++;

          unified.push({
            content,
            type: "unchanged",
            oldLineNumber: leftLineNum - 1,
            newLineNumber: rightLineNum - 1,
          });
        }
        leftIndex += lineCount;
        rightIndex += lineCount;
      }
    });

    // Detect modified lines (removed + added with similar content)
    for (let i = 0; i < left.length; i++) {
      if (left[i].type === "removed") {
        for (let j = 0; j < right.length; j++) {
          if (
            right[j].type === "added" &&
            Math.abs(i - j) <= 3 &&
            similarity(left[i].content, right[j].content) > 0.5
          ) {
            const intraChanges = getIntraLineChanges(left[i].content, right[j].content);
            left[i].type = "modified";
            left[i].changes = intraChanges.left;
            right[j].type = "modified";
            right[j].changes = intraChanges.right;
            stats.modifications++;
            stats.deletions--;
            stats.additions--;
            break;
          }
        }
      }
    }
  } else {
    // Character or word mode
    changes.forEach((change) => {
      const lines = change.value.split("\n");
      lines.forEach((line, idx) => {
        if (idx < lines.length - 1 || line) {
          if (change.removed) {
            left.push({
              content: line,
              type: "removed",
              lineNumber: leftLineNum++,
            });
            stats.deletions++;
          } else if (change.added) {
            right.push({
              content: line,
              type: "added",
              lineNumber: rightLineNum++,
            });
            stats.additions++;
          } else {
            left.push({
              content: line,
              type: "unchanged",
              lineNumber: leftLineNum++,
            });
            right.push({
              content: line,
              type: "unchanged",
              lineNumber: rightLineNum++,
            });
            stats.unchanged++;
          }
        }
      });
    });
  }

  // Balance arrays for side-by-side view
  while (left.length < right.length) {
    left.push({ content: "", type: "unchanged", lineNumber: 0 });
  }
  while (right.length < left.length) {
    right.push({ content: "", type: "unchanged", lineNumber: 0 });
  }

  return { left, right, unified, stats };
}

function similarity(a: string, b: string): number {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (longer.length === 0) return 1.0;

  const editDistance = levenshtein(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function useTextDiff() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [diffMode, setDiffMode] = useState<DiffMode>("lines");
  const [viewMode, setViewMode] = useState<ViewMode>("split");

  const diffResult = useMemo(() => {
    if (!leftText && !rightText) return null;
    return computeDiff(leftText, rightText, diffMode);
  }, [leftText, rightText, diffMode]);

  const clear = useCallback(() => {
    setLeftText("");
    setRightText("");
  }, []);

  const swap = useCallback(() => {
    const temp = leftText;
    setLeftText(rightText);
    setRightText(temp);
  }, [leftText, rightText]);

  return {
    leftText,
    setLeftText,
    rightText,
    setRightText,
    diffMode,
    setDiffMode,
    viewMode,
    setViewMode,
    diffResult,
    clear,
    swap,
  };
}

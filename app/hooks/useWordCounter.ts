"use client";

import { useMemo } from "react";

// Common English stop words to exclude from keyword density
const STOP_WORDS = new Set([
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see",
  "other", "than", "then", "now", "look", "only", "come", "its", "over",
  "think", "also", "back", "after", "use", "two", "how", "our", "work",
  "first", "well", "way", "even", "new", "want", "because", "any", "these",
  "give", "day", "most", "us", "is", "are", "was", "were", "been", "has",
  "had", "did", "am", "does", "did", "being", "having", "doing",
]);

export interface WordStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeSeconds: number;
  speakingTimeSeconds: number;
  bytesUtf8: number;
  uniqueWords: number;
  avgWordLength: number;
}

export interface KeywordEntry {
  word: string;
  count: number;
  density: number; // percentage
}

export interface SocialMediaLimit {
  platform: string;
  limit: number;
  current: number;
  color: string;
}

function countWords(text: string): string[] {
  if (!text.trim()) return [];
  return text.trim().split(/\s+/).filter(Boolean);
}

function countSentences(text: string): number {
  if (!text.trim()) return 0;
  // Split on sentence-ending punctuation followed by space, newline, or end of string
  const sentences = text.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim().length > 0);
  return sentences.length;
}

function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
}

function countLines(text: string): number {
  if (!text) return 0;
  if (!text.trim()) return 0;
  return text.split("\n").length;
}

function computeKeywordDensity(words: string[], totalWords: number): KeywordEntry[] {
  if (totalWords === 0) return [];

  const freq: Record<string, number> = {};
  for (const w of words) {
    const lower = w.toLowerCase().replace(/[^a-z0-9'-]/g, "");
    if (!lower || lower.length < 2 || STOP_WORDS.has(lower)) continue;
    freq[lower] = (freq[lower] || 0) + 1;
  }

  return Object.entries(freq)
    .map(([word, count]) => ({
      word,
      count,
      density: (count / totalWords) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
}

export function useWordCounter(text: string) {
  const stats: WordStats = useMemo(() => {
    const words = countWords(text);
    const wordCount = words.length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = countSentences(text);
    const paragraphs = countParagraphs(text);
    const lines = countLines(text);

    // Average reading speed: 238 wpm (research-backed)
    const readingTimeSeconds = wordCount > 0 ? (wordCount / 238) * 60 : 0;
    // Average speaking speed: 150 wpm
    const speakingTimeSeconds = wordCount > 0 ? (wordCount / 150) * 60 : 0;

    // UTF-8 byte count
    const bytesUtf8 = new Blob([text]).size;

    // Unique words
    const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z0-9'-]/g, ""))).size;

    // Average word length
    const totalCharsInWords = words.reduce((sum, w) => sum + w.length, 0);
    const avgWordLength = wordCount > 0 ? totalCharsInWords / wordCount : 0;

    return {
      words: wordCount,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      lines,
      readingTimeSeconds,
      speakingTimeSeconds,
      bytesUtf8,
      uniqueWords,
      avgWordLength,
    };
  }, [text]);

  const keywordDensity: KeywordEntry[] = useMemo(() => {
    const words = countWords(text);
    return computeKeywordDensity(words, words.length);
  }, [text]);

  const socialLimits: SocialMediaLimit[] = useMemo(() => {
    const charCount = text.length;
    return [
      { platform: "Twitter / X", limit: 280, current: charCount, color: "bg-sky-500" },
      { platform: "Meta Description", limit: 160, current: charCount, color: "bg-emerald-500" },
      { platform: "LinkedIn Post", limit: 3000, current: charCount, color: "bg-blue-600" },
      { platform: "Instagram Caption", limit: 2200, current: charCount, color: "bg-pink-500" },
      { platform: "Facebook Post", limit: 63206, current: charCount, color: "bg-indigo-500" },
    ];
  }, [text]);

  return { stats, keywordDensity, socialLimits };
}

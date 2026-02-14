"use client";

import { useState, useCallback, useMemo } from "react";

export type TextStyle = "classic" | "hipster" | "tech" | "corporate" | "pirate";
export type OutputFormat = "plain" | "html" | "markdown";
export type LengthPreset = "short" | "medium" | "long" | "custom";

const CLASSIC_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum",
];

const HIPSTER_WORDS = [
  "artisan", "craft", "beard", "fixie", "sustainable", "organic", "vinyl",
  "retro", "vintage", "kale", "quinoa", "gluten-free", "kombucha", "aesthetic",
  "minimalist", "pour-over", "cold-brew", "avocado", "toast", "meditation",
  "yoga", "chakra", "vegan", "farm-to-table", "locally-sourced", "authentic",
  "handcrafted", "bespoke", "curated", "artisanal", "small-batch", "heritage",
  "reclaimed", "upcycled", "ethical", "conscious", "mindful", "wellness",
  "holistic", "indie", "underground", "DIY", "maker", "coworking", "nomad",
];

const TECH_WORDS = [
  "algorithm", "API", "backend", "bandwidth", "blockchain", "cache", "cloud",
  "compiler", "database", "deployment", "docker", "encryption", "framework",
  "frontend", "function", "git", "hash", "infrastructure", "iteration", "kernel",
  "latency", "microservice", "middleware", "optimization", "parameter", "pipeline",
  "protocol", "query", "recursion", "refactor", "repository", "runtime", "scalability",
  "server", "stack", "syntax", "thread", "token", "validation", "variable", "webhook",
];

const CORPORATE_WORDS = [
  "synergy", "leverage", "paradigm", "stakeholder", "bandwidth", "deliverable",
  "actionable", "metrics", "optimize", "streamline", "benchmark", "ecosystem",
  "scalable", "robust", "proactive", "strategic", "alignment", "value-add",
  "best-practice", "core-competency", "drill-down", "game-changer", "growth-hacking",
  "KPI", "low-hanging-fruit", "mindshare", "move-the-needle", "omnichannel",
  "pivot", "reimagine", "roadmap", "seamless", "touch-base", "transparency",
];

const PIRATE_WORDS = [
  "ahoy", "matey", "treasure", "ship", "captain", "crew", "sail", "anchor",
  "plank", "parrot", "gold", "chest", "compass", "map", "island", "sea",
  "ocean", "wave", "storm", "cannon", "sword", "rum", "barrel", "deck",
  "mast", "flag", "skull", "bones", "scurvy", "buccaneer", "corsair", "vessel",
];

const WORD_BANKS = {
  classic: CLASSIC_WORDS,
  hipster: HIPSTER_WORDS,
  tech: TECH_WORDS,
  corporate: CORPORATE_WORDS,
  pirate: PIRATE_WORDS,
};

function randomInt(min: number, max: number, seed: number): number {
  const x = Math.sin(seed++) * 10000;
  const random = x - Math.floor(x);
  return Math.floor(random * (max - min + 1)) + min;
}

function generateSentence(words: string[], wordCount: number, seed: number): string {
  const sentence: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const wordIndex = randomInt(0, words.length - 1, seed + i);
    sentence.push(words[wordIndex]);
  }
  // Capitalize first word
  sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
  return sentence.join(" ") + ".";
}

function generateParagraph(words: string[], sentenceCount: number, seed: number): string {
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    const wordCount = randomInt(8, 16, seed + i * 100);
    sentences.push(generateSentence(words, wordCount, seed + i * 1000));
  }
  return sentences.join(" ");
}

export function useLoremIpsum() {
  const [style, setStyle] = useState<TextStyle>("classic");
  const [format, setFormat] = useState<OutputFormat>("plain");
  const [lengthPreset, setLengthPreset] = useState<LengthPreset>("medium");
  const [customParagraphs, setCustomParagraphs] = useState(5);
  const [includeHeadings, setIncludeHeadings] = useState(false);
  const [includeLists, setIncludeLists] = useState(false);
  const [wordLimit, setWordLimit] = useState<number | null>(null);
  const [charLimit, setCharLimit] = useState<number | null>(null);

  const paragraphCount = useMemo(() => {
    switch (lengthPreset) {
      case "short":
        return 2;
      case "medium":
        return 5;
      case "long":
        return 10;
      case "custom":
        return customParagraphs;
    }
  }, [lengthPreset, customParagraphs]);

  const generatedText = useMemo(() => {
    const words = WORD_BANKS[style];
    const seed = Date.now();
    const paragraphs: string[] = [];

    for (let i = 0; i < paragraphCount; i++) {
      const sentenceCount = randomInt(4, 7, seed + i * 10000);
      let paragraph = generateParagraph(words, sentenceCount, seed + i * 100000);

      // Add heading before some paragraphs
      if (includeHeadings && i > 0 && i % 3 === 0) {
        const headingWords = randomInt(2, 4, seed + i * 50000);
        const heading = generateSentence(words, headingWords, seed + i * 60000).replace(".", "");
        paragraph = `__HEADING__${heading}__/HEADING__\n\n${paragraph}`;
      }

      // Add list after some paragraphs
      if (includeLists && i > 0 && i % 4 === 0) {
        const listItems: string[] = [];
        const itemCount = randomInt(3, 5, seed + i * 70000);
        for (let j = 0; j < itemCount; j++) {
          const itemWords = randomInt(3, 7, seed + i * 80000 + j * 1000);
          listItems.push(generateSentence(words, itemWords, seed + i * 90000 + j * 10000).replace(".", ""));
        }
        paragraph += `\n\n__LIST__${listItems.join("__ITEM__")}__/LIST__`;
      }

      paragraphs.push(paragraph);
    }

    let text = paragraphs.join("\n\n");

    // Apply word limit
    if (wordLimit && wordLimit > 0) {
      const textWords = text.split(/\s+/);
      if (textWords.length > wordLimit) {
        text = textWords.slice(0, wordLimit).join(" ") + "...";
      }
    }

    // Apply character limit
    if (charLimit && charLimit > 0 && text.length > charLimit) {
      text = text.substring(0, charLimit) + "...";
    }

    return text;
  }, [style, paragraphCount, includeHeadings, includeLists, wordLimit, charLimit]);

  const formattedText = useMemo(() => {
    let text = generatedText;

    switch (format) {
      case "html":
        // Replace headings
        text = text.replace(/__HEADING__(.*?)__\/HEADING__/g, "<h2>$1</h2>");

        // Replace lists
        text = text.replace(/__LIST__(.*?)__\/LIST__/g, (_, items) => {
          const listItems = items.split("__ITEM__").map((item: string) => `  <li>${item}</li>`).join("\n");
          return `<ul>\n${listItems}\n</ul>`;
        });

        // Wrap paragraphs
        text = text.split("\n\n").map(p => {
          if (p.startsWith("<h2>") || p.startsWith("<ul>")) return p;
          return `<p>${p}</p>`;
        }).join("\n\n");
        break;

      case "markdown":
        // Replace headings
        text = text.replace(/__HEADING__(.*?)__\/HEADING__/g, "## $1");

        // Replace lists
        text = text.replace(/__LIST__(.*?)__\/LIST__/g, (_, items) => {
          const listItems = items.split("__ITEM__").map((item: string) => `- ${item}`).join("\n");
          return listItems;
        });
        break;

      case "plain":
        // Remove all markers
        text = text.replace(/__HEADING__(.*?)__\/HEADING__\n\n/g, "$1\n\n");
        text = text.replace(/__LIST__(.*?)__\/LIST__/g, (_, items) => {
          return items.split("__ITEM__").join("\n• ");
        });
        break;
    }

    return text;
  }, [generatedText, format]);

  const stats = useMemo(() => {
    const plainText = generatedText.replace(/__HEADING__.*?__\/HEADING__/g, "").replace(/__LIST__.*?__\/LIST__/g, "");
    const words = plainText.split(/\s+/).filter(w => w.length > 0).length;
    const characters = plainText.length;
    const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    return {
      words,
      characters,
      sentences,
      paragraphs: paragraphCount,
    };
  }, [generatedText, paragraphCount]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(formattedText);
  }, [formattedText]);

  const reset = useCallback(() => {
    setStyle("classic");
    setFormat("plain");
    setLengthPreset("medium");
    setIncludeHeadings(false);
    setIncludeLists(false);
    setWordLimit(null);
    setCharLimit(null);
  }, []);

  return {
    style,
    setStyle,
    format,
    setFormat,
    lengthPreset,
    setLengthPreset,
    customParagraphs,
    setCustomParagraphs,
    includeHeadings,
    setIncludeHeadings,
    includeLists,
    setIncludeLists,
    wordLimit,
    setWordLimit,
    charLimit,
    setCharLimit,
    generatedText: formattedText,
    stats,
    copyToClipboard,
    reset,
  };
}

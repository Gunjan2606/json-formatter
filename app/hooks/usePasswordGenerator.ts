"use client";

import { useState, useCallback, useMemo } from "react";

export type GeneratorMode = "random" | "passphrase" | "pin";

export interface PasswordOptions {
  mode: GeneratorMode;
  // Random mode
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  // Passphrase mode
  wordCount: number;
  separator: string;
  capitalize: boolean;
  includeNumber: boolean;
  // PIN mode
  pinLength: number;
  // Bulk
  count: number;
}

export interface PasswordEntry {
  id: string;
  value: string;
  strength: PasswordStrength;
}

export interface PasswordStrength {
  score: number; // 0-4
  label: string;
  color: string;
  crackTime: string;
}

const AMBIGUOUS_CHARS = "il1Lo0O";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const UPPER_SAFE = UPPER.split("").filter((c) => !AMBIGUOUS_CHARS.includes(c)).join("");
const LOWER_SAFE = LOWER.split("").filter((c) => !AMBIGUOUS_CHARS.includes(c)).join("");
const DIGITS_SAFE = DIGITS.split("").filter((c) => !AMBIGUOUS_CHARS.includes(c)).join("");

// Common English words for passphrase generation (diceware-style)
const WORDLIST = [
  "apple", "brave", "cloud", "dance", "eagle", "flame", "grape", "house", "ivory", "jumbo",
  "knife", "lemon", "mango", "night", "ocean", "piano", "queen", "river", "storm", "tiger",
  "ultra", "vivid", "waltz", "xenon", "yacht", "zebra", "amber", "bloom", "cedar", "drift",
  "ember", "frost", "gleam", "haven", "inlet", "jewel", "karma", "lunar", "maple", "noble",
  "orbit", "pearl", "quest", "ridge", "solar", "torch", "unity", "vault", "wheat", "yield",
  "arena", "basin", "coral", "delta", "epoch", "forge", "glyph", "helix", "index", "joust",
  "knack", "ledge", "motor", "nexus", "oasis", "plaza", "quilt", "realm", "scale", "triad",
  "umbra", "vigor", "wrist", "oxide", "youth", "zones", "agile", "bison", "crane", "dwarf",
  "elbow", "fiber", "grain", "haste", "icing", "jazzy", "kayak", "logic", "marsh", "nifty",
  "olive", "prism", "radar", "shrub", "trend", "union", "vocal", "windy", "relay", "zonal",
  "acorn", "blaze", "chime", "drape", "easel", "flock", "globe", "hiker", "ivory", "juicy",
  "kiosk", "llama", "moose", "nudge", "oxide", "plumb", "quirk", "robin", "snowy", "tulip",
  "usher", "verse", "wagon", "pixel", "yeast", "zingy", "atlas", "birch", "clamp", "depot",
  "fairy", "flint", "grace", "hedge", "irony", "jolly", "kneel", "lotus", "mirth", "nerve",
  "onset", "patch", "quota", "rhyme", "swirl", "thick", "urban", "valve", "witch", "cynic",
  "yodel", "zippy", "badge", "cabin", "dodge", "exert", "focus", "grill", "humor", "input",
  "joint", "ketch", "lyric", "medal", "notch", "omega", "prowl", "quote", "roast", "spark",
  "thorn", "upset", "venom", "whirl", "alpha", "brisk", "crest", "denim", "extra", "froze",
  "ghost", "habit", "image", "juice", "knots", "layer", "mural", "novel", "optic", "plume",
  "ranch", "sweep", "thyme", "unity", "vivid", "waste", "bonus", "crisp", "dream", "equip",
];

function getRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function generateRandomPassword(options: PasswordOptions): string {
  let charset = "";
  if (options.uppercase) charset += options.excludeAmbiguous ? UPPER_SAFE : UPPER;
  if (options.lowercase) charset += options.excludeAmbiguous ? LOWER_SAFE : LOWER;
  if (options.numbers) charset += options.excludeAmbiguous ? DIGITS_SAFE : DIGITS;
  if (options.symbols) charset += SYMBOLS;

  if (!charset) charset = LOWER + DIGITS;

  let password = "";
  for (let i = 0; i < options.length; i++) {
    password += charset[getRandomInt(charset.length)];
  }
  return password;
}

function generatePassphrase(options: PasswordOptions): string {
  const words: string[] = [];
  for (let i = 0; i < options.wordCount; i++) {
    let word = WORDLIST[getRandomInt(WORDLIST.length)];
    if (options.capitalize) {
      word = word[0].toUpperCase() + word.slice(1);
    }
    words.push(word);
  }
  let result = words.join(options.separator);
  if (options.includeNumber) {
    result += getRandomInt(100);
  }
  return result;
}

function generatePin(length: number): string {
  let pin = "";
  for (let i = 0; i < length; i++) {
    pin += getRandomInt(10).toString();
  }
  return pin;
}

function estimateEntropy(password: string, options: PasswordOptions): number {
  if (options.mode === "passphrase") {
    // ~10 bits per word with a 200-word list, plus some for number/separator
    let entropy = options.wordCount * Math.log2(WORDLIST.length);
    if (options.includeNumber) entropy += Math.log2(100);
    if (options.capitalize) entropy += options.wordCount; // 1 bit per word for case
    return entropy;
  }

  if (options.mode === "pin") {
    return options.pinLength * Math.log2(10);
  }

  // Random mode
  let charsetSize = 0;
  if (options.uppercase) charsetSize += options.excludeAmbiguous ? UPPER_SAFE.length : 26;
  if (options.lowercase) charsetSize += options.excludeAmbiguous ? LOWER_SAFE.length : 26;
  if (options.numbers) charsetSize += options.excludeAmbiguous ? DIGITS_SAFE.length : 10;
  if (options.symbols) charsetSize += SYMBOLS.length;
  if (charsetSize === 0) charsetSize = 36;

  return password.length * Math.log2(charsetSize);
}

function entropyToStrength(entropy: number): PasswordStrength {
  // Based on research: <28 bits = very weak, 28-35 = weak, 36-59 = fair, 60-127 = strong, 128+ = very strong
  if (entropy < 28) {
    return { score: 0, label: "Very Weak", color: "bg-red-500", crackTime: "Instantly" };
  }
  if (entropy < 36) {
    return { score: 1, label: "Weak", color: "bg-orange-500", crackTime: "Minutes to hours" };
  }
  if (entropy < 60) {
    return { score: 2, label: "Fair", color: "bg-yellow-500", crackTime: "Days to months" };
  }
  if (entropy < 80) {
    return { score: 3, label: "Strong", color: "bg-emerald-500", crackTime: "Years to decades" };
  }
  if (entropy < 128) {
    return { score: 3, label: "Strong", color: "bg-emerald-500", crackTime: "Centuries" };
  }
  return { score: 4, label: "Very Strong", color: "bg-primary", crackTime: "Millions of years" };
}

function evaluatePassword(password: string, options: PasswordOptions): PasswordStrength {
  const entropy = estimateEntropy(password, options);
  return entropyToStrength(entropy);
}

export const DEFAULT_OPTIONS: PasswordOptions = {
  mode: "random",
  length: 20,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
  wordCount: 4,
  separator: "-",
  capitalize: true,
  includeNumber: true,
  pinLength: 6,
  count: 1,
};

export function usePasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);

  const generate = useCallback(() => {
    const results: PasswordEntry[] = [];
    for (let i = 0; i < options.count; i++) {
      let value: string;
      switch (options.mode) {
        case "passphrase":
          value = generatePassphrase(options);
          break;
        case "pin":
          value = generatePin(options.pinLength);
          break;
        default:
          value = generateRandomPassword(options);
      }
      const strength = evaluatePassword(value, options);
      results.push({
        id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
        value,
        strength,
      });
    }
    setPasswords(results);
  }, [options]);

  const updateOption = useCallback(<K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const entropy = useMemo(() => {
    if (passwords.length === 0) return 0;
    return estimateEntropy(passwords[0].value, options);
  }, [passwords, options]);

  return {
    options,
    setOptions,
    updateOption,
    passwords,
    generate,
    entropy,
  };
}

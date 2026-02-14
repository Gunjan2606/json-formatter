"use client";

import { useState, useMemo, useCallback } from "react";

export type NumberBase = "binary" | "octal" | "decimal" | "hexadecimal";

export interface ConversionResult {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
}

export interface NumberConverterState {
  inputValue: string;
  inputBase: NumberBase;
  groupDigits: boolean;
  error: string | null;
}

const BASE_MAP: Record<NumberBase, number> = {
  binary: 2,
  octal: 8,
  decimal: 10,
  hexadecimal: 16,
};

const BASE_LABELS: Record<NumberBase, string> = {
  binary: "Binary (Base 2)",
  octal: "Octal (Base 8)",
  decimal: "Decimal (Base 10)",
  hexadecimal: "Hexadecimal (Base 16)",
};

const BASE_PREFIXES: Record<NumberBase, string> = {
  binary: "0b",
  octal: "0o",
  decimal: "",
  hexadecimal: "0x",
};

const VALID_CHARS: Record<NumberBase, RegExp> = {
  binary: /^-?[01]+$/,
  octal: /^-?[0-7]+$/,
  decimal: /^-?[0-9]+$/,
  hexadecimal: /^-?[0-9a-fA-F]+$/,
};

function groupBinary(s: string): string {
  const negative = s.startsWith("-");
  const abs = negative ? s.slice(1) : s;
  const padded = abs.length % 4 === 0 ? abs : abs.padStart(Math.ceil(abs.length / 4) * 4, "0");
  const grouped = padded.match(/.{1,4}/g)?.join(" ") ?? abs;
  return negative ? `-${grouped}` : grouped;
}

function groupOctal(s: string): string {
  const negative = s.startsWith("-");
  const abs = negative ? s.slice(1) : s;
  const padded = abs.length % 3 === 0 ? abs : abs.padStart(Math.ceil(abs.length / 3) * 3, "0");
  const grouped = padded.match(/.{1,3}/g)?.join(" ") ?? abs;
  return negative ? `-${grouped}` : grouped;
}

function groupDecimal(s: string): string {
  const negative = s.startsWith("-");
  const abs = negative ? s.slice(1) : s;
  const grouped = abs.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return negative ? `-${grouped}` : grouped;
}

function groupHex(s: string): string {
  const negative = s.startsWith("-");
  const abs = negative ? s.slice(1) : s;
  const upper = abs.toUpperCase();
  const padded = upper.length % 4 === 0 ? upper : upper.padStart(Math.ceil(upper.length / 4) * 4, "0");
  const grouped = padded.match(/.{1,4}/g)?.join(" ") ?? upper;
  return negative ? `-${grouped}` : grouped;
}

function formatResult(value: string, base: NumberBase, grouped: boolean): string {
  if (!grouped) {
    return base === "hexadecimal" ? value.toUpperCase() : value;
  }
  switch (base) {
    case "binary": return groupBinary(value);
    case "octal": return groupOctal(value);
    case "decimal": return groupDecimal(value);
    case "hexadecimal": return groupHex(value);
  }
}

function stripInput(input: string): string {
  // Remove common prefixes, spaces, commas, underscores
  return input
    .trim()
    .replace(/^0[bBxXoO]/, "")
    .replace(/[\s,_]/g, "");
}

export function useNumberConverter() {
  const [state, setState] = useState<NumberConverterState>({
    inputValue: "",
    inputBase: "decimal",
    groupDigits: true,
    error: null,
  });

  const setInputValue = useCallback((value: string) => {
    setState((prev) => ({ ...prev, inputValue: value, error: null }));
  }, []);

  const setInputBase = useCallback((base: NumberBase) => {
    setState((prev) => ({ ...prev, inputBase: base, error: null }));
  }, []);

  const setGroupDigits = useCallback((grouped: boolean) => {
    setState((prev) => ({ ...prev, groupDigits: grouped }));
  }, []);

  const results = useMemo<ConversionResult | null>(() => {
    const cleaned = stripInput(state.inputValue);
    if (!cleaned) return null;

    // Validate input
    if (!VALID_CHARS[state.inputBase].test(cleaned)) {
      setState((prev) => ({
        ...prev,
        error: `Invalid ${state.inputBase} number. Allowed characters: ${getValidCharsDesc(state.inputBase)}`,
      }));
      return null;
    }

    try {
      // Use BigInt for large number support
      const negative = cleaned.startsWith("-");
      const abs = negative ? cleaned.slice(1) : cleaned;
      const radix = BASE_MAP[state.inputBase];

      let bigValue: bigint;
      try {
        bigValue = parseBigInt(abs, radix);
        if (negative) bigValue = -bigValue;
      } catch {
        setState((prev) => ({ ...prev, error: "Number too large to process" }));
        return null;
      }

      const ZERO = BigInt(0);
      const neg = bigValue < ZERO;
      const absVal = neg ? -bigValue : bigValue;

      return {
        binary: formatResult(
          (neg ? "-" : "") + absVal.toString(2),
          "binary",
          state.groupDigits
        ),
        octal: formatResult(
          (neg ? "-" : "") + absVal.toString(8),
          "octal",
          state.groupDigits
        ),
        decimal: formatResult(
          (neg ? "-" : "") + absVal.toString(10),
          "decimal",
          state.groupDigits
        ),
        hexadecimal: formatResult(
          (neg ? "-" : "") + absVal.toString(16),
          "hexadecimal",
          state.groupDigits
        ),
      };
    } catch {
      setState((prev) => ({ ...prev, error: "Failed to convert number" }));
      return null;
    }
  }, [state.inputValue, state.inputBase, state.groupDigits]);

  const bitLength = useMemo(() => {
    if (!results) return 0;
    const raw = results.binary.replace(/[\s-]/g, "").replace(/^0+/, "");
    return raw.length || 1;
  }, [results]);

  const swap = useCallback((targetBase: NumberBase) => {
    if (!results) return;
    // Get the raw value in the target base and set it as input
    const cleaned = stripInput(state.inputValue);
    if (!cleaned) return;
    const negative = cleaned.startsWith("-");
    const abs = negative ? cleaned.slice(1) : cleaned;
    const radix = BASE_MAP[state.inputBase];
    try {
      let bigValue = parseBigInt(abs, radix);
      if (negative) bigValue = -bigValue;
      const ZERO = BigInt(0);
      const neg = bigValue < ZERO;
      const absVal = neg ? -bigValue : bigValue;
      const newValue = (neg ? "-" : "") + absVal.toString(BASE_MAP[targetBase]);
      setState((prev) => ({
        ...prev,
        inputValue: targetBase === "hexadecimal" ? newValue.toUpperCase() : newValue,
        inputBase: targetBase,
        error: null,
      }));
    } catch {
      // ignore
    }
  }, [results, state.inputValue, state.inputBase]);

  return {
    state,
    setInputValue,
    setInputBase,
    setGroupDigits,
    results,
    bitLength,
    swap,
    BASE_LABELS,
    BASE_PREFIXES,
  };
}

function parseBigInt(str: string, radix: number): bigint {
  if (radix === 10) return BigInt(str);
  if (radix === 16) return BigInt("0x" + str);
  if (radix === 8) return BigInt("0o" + str);
  if (radix === 2) return BigInt("0b" + str);
  throw new Error(`Unsupported radix: ${radix}`);
}

function getValidCharsDesc(base: NumberBase): string {
  switch (base) {
    case "binary": return "0, 1";
    case "octal": return "0-7";
    case "decimal": return "0-9";
    case "hexadecimal": return "0-9, A-F";
  }
}

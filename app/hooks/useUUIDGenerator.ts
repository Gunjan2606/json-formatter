"use client";

import { useState, useCallback, useMemo } from "react";

export type UUIDVersion = "v1" | "v4" | "v7";

export interface UUIDFormats {
  standard: string;
  noHyphens: string;
  uppercase: string;
  braces: string;
  urn: string;
  base64: string;
}

export interface UUIDDecodeResult {
  isValid: boolean;
  version: number | null;
  variant: string | null;
  timestamp: Date | null;
  timestampMs: number | null;
  randomBits: number | null;
  format: string;
  warnings: string[];
}

function generateV4UUID(): string {
  // Use crypto.randomUUID() if available (most secure)
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback to manual generation
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  // Set version (4) and variant (RFC 4122)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function generateV1UUID(): string {
  // Simple v1 implementation (timestamp + random)
  // Note: This doesn't use actual MAC address for privacy
  const now = Date.now();
  const timeHigh = ((now / 1000) | 0) + 0x01b21dd213814000;
  const timeLow = (now % 1000) * 10000;

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  // Set time fields
  const timeHighBigInt = BigInt(Math.floor(timeHigh));
  bytes[0] = Number((timeHighBigInt >> BigInt(24)) & BigInt(0xff));
  bytes[1] = Number((timeHighBigInt >> BigInt(16)) & BigInt(0xff));
  bytes[2] = Number((timeHighBigInt >> BigInt(8)) & BigInt(0xff));
  bytes[3] = Number(timeHighBigInt & BigInt(0xff));

  const timeLowBigInt = BigInt(timeLow);
  bytes[4] = Number((timeLowBigInt >> BigInt(8)) & BigInt(0xff));
  bytes[5] = Number(timeLowBigInt & BigInt(0xff));

  // Set version (1) and variant
  bytes[6] = (bytes[6] & 0x0f) | 0x10;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function generateV7UUID(): string {
  // UUID v7: unix timestamp (48 bits) + random (74 bits)
  const now = Date.now();
  const timestampMs = BigInt(now);

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  // Set timestamp (48 bits = 6 bytes)
  bytes[0] = Number((timestampMs >> BigInt(40)) & BigInt(0xff));
  bytes[1] = Number((timestampMs >> BigInt(32)) & BigInt(0xff));
  bytes[2] = Number((timestampMs >> BigInt(24)) & BigInt(0xff));
  bytes[3] = Number((timestampMs >> BigInt(16)) & BigInt(0xff));
  bytes[4] = Number((timestampMs >> BigInt(8)) & BigInt(0xff));
  bytes[5] = Number(timestampMs & BigInt(0xff));

  // Set version (7) and variant
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function generateUUID(version: UUIDVersion): string {
  switch (version) {
    case "v1":
      return generateV1UUID();
    case "v7":
      return generateV7UUID();
    default:
      return generateV4UUID();
  }
}

function formatUUID(uuid: string): UUIDFormats {
  const clean = uuid.replace(/-/g, "").toLowerCase();

  // Base64 encoding (UUID is 128 bits = 16 bytes)
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  const base64 = btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return {
    standard: uuid.toLowerCase(),
    noHyphens: clean,
    uppercase: uuid.toUpperCase(),
    braces: `{${uuid.toLowerCase()}}`,
    urn: `urn:uuid:${uuid.toLowerCase()}`,
    base64,
  };
}

function decodeUUID(input: string): UUIDDecodeResult {
  const cleaned = input.trim().replace(/[{}urn:uuid]/gi, "").replace(/-/g, "");

  // Validate format
  if (!/^[0-9a-f]{32}$/i.test(cleaned)) {
    return {
      isValid: false,
      version: null,
      variant: null,
      timestamp: null,
      timestampMs: null,
      randomBits: null,
      format: "invalid",
      warnings: ["Invalid UUID format. Expected 32 hexadecimal characters."],
    };
  }

  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(cleaned.slice(i * 2, i * 2 + 2), 16);
  }

  const version = (bytes[6] >> 4) & 0x0f;
  const variantBits = (bytes[8] >> 6) & 0x03;
  let variant = "Unknown";
  if (variantBits === 2) variant = "RFC 4122";
  else if (variantBits === 0) variant = "NCS";
  else if (variantBits === 3) variant = "Microsoft";

  const warnings: string[] = [];
  let timestamp: Date | null = null;
  let timestampMs: number | null = null;

  // Extract timestamp for time-based UUIDs
  if (version === 1) {
    warnings.push(
      "UUID v1 may expose MAC address. Consider using v7 for new projects."
    );
    // v1 timestamp extraction (Gregorian epoch)
    const timeLow = (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
    const timeMid = (bytes[4] << 8) | bytes[5];
    const timeHi = ((bytes[6] & 0x0f) << 8) | bytes[7];
    const time100ns = BigInt(timeHi) * BigInt(0x100000000) + BigInt(timeMid) * BigInt(0x10000) + BigInt(timeLow);

    // Convert from 100-nanosecond intervals since 1582-10-15 to Unix ms
    const unixEpochStart = BigInt("122192928000000000"); // 1970-01-01 in UUID time
    const unixTime100ns = time100ns - unixEpochStart;
    timestampMs = Number(unixTime100ns / BigInt(10000));

    if (timestampMs > 0 && timestampMs < Date.now() + 1000000000000) {
      timestamp = new Date(timestampMs);
    }
  } else if (version === 7) {
    // v7 timestamp extraction (Unix epoch ms in first 48 bits)
    const ts = BigInt(bytes[0]) * BigInt(0x10000000000) +
               BigInt(bytes[1]) * BigInt(0x100000000) +
               BigInt(bytes[2]) * BigInt(0x1000000) +
               BigInt(bytes[3]) * BigInt(0x10000) +
               BigInt(bytes[4]) * BigInt(0x100) +
               BigInt(bytes[5]);
    timestampMs = Number(ts);
    timestamp = new Date(timestampMs);
  }

  const randomBits = version === 4 ? 122 : version === 7 ? 74 : null;

  return {
    isValid: true,
    version,
    variant,
    timestamp,
    timestampMs,
    randomBits,
    format: input.includes("-") ? "standard" : "no-hyphens",
    warnings,
  };
}

export function useUUIDGenerator() {
  const [version, setVersion] = useState<UUIDVersion>("v4");
  const [currentUUID, setCurrentUUID] = useState<string>("");
  const [bulkCount, setBulkCount] = useState<number>(10);
  const [history, setHistory] = useState<string[]>([]);
  const [decodeInput, setDecodeInput] = useState<string>("");

  const generate = useCallback(() => {
    const uuid = generateUUID(version);
    setCurrentUUID(uuid);
    setHistory((prev) => [uuid, ...prev.slice(0, 19)]); // Keep last 20
  }, [version]);

  const generateBulk = useCallback(
    (count: number): string[] => {
      const uuids: string[] = [];
      for (let i = 0; i < count; i++) {
        uuids.push(generateUUID(version));
      }
      return uuids;
    },
    [version]
  );

  const formats = useMemo<UUIDFormats | null>(() => {
    if (!currentUUID) return null;
    return formatUUID(currentUUID);
  }, [currentUUID]);

  const decodeResult = useMemo<UUIDDecodeResult | null>(() => {
    if (!decodeInput.trim()) return null;
    return decodeUUID(decodeInput);
  }, [decodeInput]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    version,
    setVersion,
    currentUUID,
    generate,
    bulkCount,
    setBulkCount,
    generateBulk,
    formats,
    history,
    clearHistory,
    decodeInput,
    setDecodeInput,
    decodeResult,
  };
}

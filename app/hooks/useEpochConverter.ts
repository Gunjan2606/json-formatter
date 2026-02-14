"use client";

import { useState, useMemo, useCallback } from "react";

export type TimestampPrecision = "seconds" | "milliseconds" | "microseconds";
export type InputMode = "timestamp" | "date";

export interface EpochConverterState {
  inputValue: string;
  inputMode: InputMode;
  precision: TimestampPrecision;
  selectedTimezone: string;
  error: string | null;
}

export interface ConversionResult {
  timestamp: {
    seconds: number;
    milliseconds: number;
    microseconds: number;
  };
  date: {
    iso: string;
    rfc2822: string;
    readable: string;
    utc: string;
    local: string;
    custom: string;
  };
  relative: string;
  timezone: string;
  isValid: boolean;
}

const POPULAR_TIMEZONES = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "EST/EDT (New York)" },
  { value: "America/Los_Angeles", label: "PST/PDT (Los Angeles)" },
  { value: "America/Chicago", label: "CST/CDT (Chicago)" },
  { value: "Europe/London", label: "GMT/BST (London)" },
  { value: "Europe/Paris", label: "CET/CEST (Paris)" },
  { value: "Asia/Tokyo", label: "JST (Tokyo)" },
  { value: "Asia/Shanghai", label: "CST (Shanghai)" },
  { value: "Asia/Kolkata", label: "IST (India)" },
  { value: "Australia/Sydney", label: "AEDT/AEST (Sydney)" },
];

function detectPrecision(input: string): TimestampPrecision {
  const cleaned = input.trim().replace(/[,_\s]/g, "");
  const num = cleaned.replace(/^-/, "");

  if (num.length <= 10) return "seconds";
  if (num.length <= 13) return "milliseconds";
  return "microseconds";
}

function parseTimestamp(input: string, precision: TimestampPrecision): Date | null {
  const cleaned = input.trim().replace(/[,_\s]/g, "");
  const num = parseFloat(cleaned);

  if (isNaN(num)) return null;

  let ms: number;
  if (precision === "seconds") {
    ms = num * 1000;
  } else if (precision === "milliseconds") {
    ms = num;
  } else {
    ms = num / 1000;
  }

  const date = new Date(ms);
  return isNaN(date.getTime()) ? null : date;
}

function parseDate(input: string): Date | null {
  // Try various date formats
  const trimmed = input.trim();

  // ISO 8601
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    const date = new Date(trimmed);
    if (!isNaN(date.getTime())) return date;
  }

  // Unix timestamp (fallback)
  const num = parseFloat(trimmed.replace(/[,_\s]/g, ""));
  if (!isNaN(num)) {
    const precision = detectPrecision(trimmed);
    return parseTimestamp(trimmed, precision);
  }

  // Natural language date
  const date = new Date(trimmed);
  return isNaN(date.getTime()) ? null : date;
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.abs(diffMs / 1000);
  const isPast = diffMs < 0;

  if (diffSec < 60) {
    const sec = Math.floor(diffSec);
    return isPast ? `${sec} second${sec !== 1 ? "s" : ""} ago` : `in ${sec} second${sec !== 1 ? "s" : ""}`;
  }
  if (diffSec < 3600) {
    const min = Math.floor(diffSec / 60);
    return isPast ? `${min} minute${min !== 1 ? "s" : ""} ago` : `in ${min} minute${min !== 1 ? "s" : ""}`;
  }
  if (diffSec < 86400) {
    const hr = Math.floor(diffSec / 3600);
    return isPast ? `${hr} hour${hr !== 1 ? "s" : ""} ago` : `in ${hr} hour${hr !== 1 ? "s" : ""}`;
  }
  if (diffSec < 2592000) {
    const day = Math.floor(diffSec / 86400);
    return isPast ? `${day} day${day !== 1 ? "s" : ""} ago` : `in ${day} day${day !== 1 ? "s" : ""}`;
  }
  if (diffSec < 31536000) {
    const month = Math.floor(diffSec / 2592000);
    return isPast ? `${month} month${month !== 1 ? "s" : ""} ago` : `in ${month} month${month !== 1 ? "s" : ""}`;
  }
  const year = Math.floor(diffSec / 31536000);
  return isPast ? `${year} year${year !== 1 ? "s" : ""} ago` : `in ${year} year${year !== 1 ? "s" : ""}`;
}

function formatInTimezone(date: Date, timezone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

export function useEpochConverter() {
  const [state, setState] = useState<EpochConverterState>({
    inputValue: "",
    inputMode: "timestamp",
    precision: "seconds",
    selectedTimezone: "UTC",
    error: null,
  });

  const setInputValue = useCallback((value: string) => {
    setState((prev) => ({ ...prev, inputValue: value, error: null }));
  }, []);

  const setInputMode = useCallback((mode: InputMode) => {
    setState((prev) => ({ ...prev, inputMode: mode, error: null }));
  }, []);

  const setPrecision = useCallback((precision: TimestampPrecision) => {
    setState((prev) => ({ ...prev, precision }));
  }, []);

  const setTimezone = useCallback((timezone: string) => {
    setState((prev) => ({ ...prev, selectedTimezone: timezone }));
  }, []);

  const result = useMemo<ConversionResult | null>(() => {
    if (!state.inputValue.trim()) return null;

    let date: Date | null = null;

    if (state.inputMode === "timestamp") {
      const detected = detectPrecision(state.inputValue);
      // Auto-update precision if different
      if (detected !== state.precision) {
        setState((prev) => ({ ...prev, precision: detected }));
      }
      date = parseTimestamp(state.inputValue, detected);
    } else {
      date = parseDate(state.inputValue);
    }

    if (!date) {
      setState((prev) => ({
        ...prev,
        error: state.inputMode === "timestamp"
          ? "Invalid timestamp. Enter a Unix timestamp (10, 13, or 16 digits)."
          : "Invalid date. Try ISO 8601 format (YYYY-MM-DD) or natural language.",
      }));
      return null;
    }

    const timestampSec = Math.floor(date.getTime() / 1000);
    const timestampMs = date.getTime();
    const timestampMicro = timestampMs * 1000;

    return {
      timestamp: {
        seconds: timestampSec,
        milliseconds: timestampMs,
        microseconds: timestampMicro,
      },
      date: {
        iso: date.toISOString(),
        rfc2822: date.toUTCString(),
        readable: date.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        }),
        utc: date.toUTCString(),
        local: date.toLocaleString(),
        custom: formatInTimezone(date, state.selectedTimezone),
      },
      relative: getRelativeTime(date),
      timezone: state.selectedTimezone,
      isValid: true,
    };
  }, [state.inputValue, state.inputMode, state.precision, state.selectedTimezone]);

  const setPreset = useCallback((preset: string) => {
    let date: Date;
    const now = new Date();

    switch (preset) {
      case "now":
        date = now;
        break;
      case "tomorrow-9am":
        date = new Date(now);
        date.setDate(date.getDate() + 1);
        date.setHours(9, 0, 0, 0);
        break;
      case "yesterday":
        date = new Date(now);
        date.setDate(date.getDate() - 1);
        break;
      case "start-of-day":
        date = new Date(now);
        date.setHours(0, 0, 0, 0);
        break;
      case "end-of-day":
        date = new Date(now);
        date.setHours(23, 59, 59, 999);
        break;
      case "start-of-month":
        date = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "end-of-month":
        date = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        break;
      case "start-of-year":
        date = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      default:
        return;
    }

    const timestamp = Math.floor(date.getTime() / 1000);
    setState((prev) => ({
      ...prev,
      inputValue: timestamp.toString(),
      inputMode: "timestamp",
      precision: "seconds",
      error: null,
    }));
  }, []);

  return {
    state,
    setInputValue,
    setInputMode,
    setPrecision,
    setTimezone,
    setPreset,
    result,
    POPULAR_TIMEZONES,
  };
}

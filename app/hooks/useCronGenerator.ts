"use client";

import { useState, useCallback, useMemo } from "react";

export interface CronParts {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

const defaultCron: CronParts = {
  minute: "*",
  hour: "*",
  dayOfMonth: "*",
  month: "*",
  dayOfWeek: "*",
};

export function useCronGenerator() {
  const [cronParts, setCronParts] = useState<CronParts>(defaultCron);

  const cronExpression = useMemo(() => {
    return `${cronParts.minute} ${cronParts.hour} ${cronParts.dayOfMonth} ${cronParts.month} ${cronParts.dayOfWeek}`;
  }, [cronParts]);

  const updatePart = useCallback((part: keyof CronParts, value: string) => {
    setCronParts((prev) => ({ ...prev, [part]: value }));
  }, []);

  const humanReadable = useMemo(() => {
    const { minute, hour, dayOfMonth, month, dayOfWeek } = cronParts;

    // Every minute
    if (minute === "*" && hour === "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
      return "Every minute";
    }

    // Every hour
    if (minute === "0" && hour === "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
      return "Every hour at minute 0";
    }

    // Daily at specific time
    if (minute !== "*" && hour !== "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
      return `Daily at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    }

    // Every X minutes
    if (minute.startsWith("*/") && hour === "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
      const interval = minute.substring(2);
      return `Every ${interval} minutes`;
    }

    // Every X hours
    if (minute === "0" && hour.startsWith("*/") && dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
      const interval = hour.substring(2);
      return `Every ${interval} hours`;
    }

    // Weekly on specific day
    if (minute !== "*" && hour !== "*" && dayOfMonth === "*" && month === "*" && dayOfWeek !== "*") {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayName = !isNaN(Number(dayOfWeek)) ? days[Number(dayOfWeek)] : dayOfWeek;
      return `Every ${dayName} at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    }

    // Monthly on specific day
    if (minute !== "*" && hour !== "*" && dayOfMonth !== "*" && month === "*" && dayOfWeek === "*") {
      return `Monthly on day ${dayOfMonth} at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    }

    // Complex expression
    let description = "At";

    if (minute !== "*") {
      description += ` minute ${minute}`;
    } else {
      description += " every minute";
    }

    if (hour !== "*") {
      description += `, hour ${hour}`;
    }

    if (dayOfMonth !== "*") {
      description += `, day ${dayOfMonth}`;
    }

    if (month !== "*") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthName = !isNaN(Number(month)) ? months[Number(month) - 1] : month;
      description += `, month ${monthName}`;
    }

    if (dayOfWeek !== "*") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayName = !isNaN(Number(dayOfWeek)) ? days[Number(dayOfWeek)] : dayOfWeek;
      description += `, on ${dayName}`;
    }

    return description;
  }, [cronParts]);

  const nextRuns = useMemo(() => {
    try {
      const now = new Date();
      const runs: string[] = [];
      let current = new Date(now);

      // Simple next run calculator (simplified version)
      for (let i = 0; i < 5; i++) {
        current = getNextRun(current, cronParts);
        if (current) {
          runs.push(current.toLocaleString());
        }
      }

      return runs;
    } catch {
      return ["Invalid cron expression"];
    }
  }, [cronParts]);

  const loadPreset = useCallback((preset: CronParts) => {
    setCronParts(preset);
  }, []);

  const reset = useCallback(() => {
    setCronParts(defaultCron);
  }, []);

  return {
    cronParts,
    cronExpression,
    humanReadable,
    nextRuns,
    updatePart,
    loadPreset,
    reset,
  };
}

// Simplified next run calculator
function getNextRun(from: Date, cron: CronParts): Date {
  const next = new Date(from);
  next.setSeconds(0);
  next.setMilliseconds(0);

  // Increment by 1 minute
  next.setMinutes(next.getMinutes() + 1);

  // Check if matches cron
  const matches = matchesCron(next, cron);
  if (matches) {
    return next;
  }

  // Try up to 1000 minutes ahead
  for (let i = 0; i < 1000; i++) {
    next.setMinutes(next.getMinutes() + 1);
    if (matchesCron(next, cron)) {
      return next;
    }
  }

  return next;
}

function matchesCron(date: Date, cron: CronParts): boolean {
  const minute = date.getMinutes();
  const hour = date.getHours();
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1;
  const dayOfWeek = date.getDay();

  if (!matchesPart(minute.toString(), cron.minute)) return false;
  if (!matchesPart(hour.toString(), cron.hour)) return false;
  if (!matchesPart(dayOfMonth.toString(), cron.dayOfMonth)) return false;
  if (!matchesPart(month.toString(), cron.month)) return false;
  if (!matchesPart(dayOfWeek.toString(), cron.dayOfWeek)) return false;

  return true;
}

function matchesPart(value: string, pattern: string): boolean {
  if (pattern === "*") return true;

  // Exact match
  if (pattern === value) return true;

  // Step values (*/5)
  if (pattern.startsWith("*/")) {
    const step = parseInt(pattern.substring(2));
    return parseInt(value) % step === 0;
  }

  // Range (1-5)
  if (pattern.includes("-")) {
    const [start, end] = pattern.split("-").map(Number);
    const val = parseInt(value);
    return val >= start && val <= end;
  }

  // List (1,3,5)
  if (pattern.includes(",")) {
    return pattern.split(",").includes(value);
  }

  return false;
}

// Preset cron expressions
export const cronPresets = [
  { name: "Every minute", cron: { minute: "*", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { name: "Every 5 minutes", cron: { minute: "*/5", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { name: "Every 15 minutes", cron: { minute: "*/15", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { name: "Every 30 minutes", cron: { minute: "*/30", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { name: "Every hour", cron: { minute: "0", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { name: "Every 6 hours", cron: { minute: "0", hour: "*/6", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { name: "Every 12 hours", cron: { minute: "0", hour: "*/12", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { name: "Daily at midnight", cron: { minute: "0", hour: "0", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { name: "Daily at 9 AM", cron: { minute: "0", hour: "9", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { name: "Daily at 5 PM", cron: { minute: "0", hour: "17", dayOfMonth: "*", month: "*", dayOfWeek: "*" } },
  { name: "Every Monday at 9 AM", cron: { minute: "0", hour: "9", dayOfMonth: "*", month: "*", dayOfWeek: "1" } },
  { name: "Every Sunday at midnight", cron: { minute: "0", hour: "0", dayOfMonth: "*", month: "*", dayOfWeek: "0" } },
  { name: "First day of month", cron: { minute: "0", hour: "0", dayOfMonth: "1", month: "*", dayOfWeek: "*" } },
];

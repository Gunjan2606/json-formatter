"use client";

import { Clock, Shield, Zap, FileCode, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const EpochConverterInfoSections = () => {
  const [expandedFAQs, setExpandedFAQs] = useState<Record<number, boolean>>({});

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Overview */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Epoch & Unix Timestamp Converter
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Convert Unix timestamps to human-readable dates and vice versa. A Unix timestamp (also
          known as Unix epoch, Unix time, or POSIX time) is the number of seconds that have elapsed
          since January 1, 1970 at 00:00:00 UTC (the Unix epoch). It&apos;s the universal time format
          used by computers, databases, and APIs worldwide.
          <br /><br />
          Our converter handles seconds (10 digits), milliseconds (13 digits, used by JavaScript),
          and microseconds (16 digits) with automatic precision detection. Unlike cluttered
          competitors filled with ads, we offer a clean, fast, keyboard-first interface designed
          for developers who need quick conversions without friction.
          <br /><br />
          Features include real-time conversion, multiple date format outputs (ISO 8601, RFC 2822,
          readable), timezone support with visual picker, relative time display (&quot;2 hours ago&quot;),
          quick presets (Now, Tomorrow 9am, End of month), and one-click copy for all values.
        </p>
      </section>

      {/* Key Capabilities */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Key Capabilities
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Smart auto-detection:</strong> Automatically
            detects if your input is seconds (10 digits), milliseconds (13 digits, like JavaScript
            Date.now()), or microseconds (16 digits). No manual selection needed.
          </li>
          <li>
            <strong className="text-foreground">Bidirectional conversion:</strong> Convert from
            Unix timestamp to date OR from human-readable date to timestamp. Both directions work
            instantly as you type.
          </li>
          <li>
            <strong className="text-foreground">Multiple output formats:</strong> See all common
            date formats simultaneously — ISO 8601, RFC 2822, human-readable, UTC, local time, and
            custom timezone format. No need to click between tabs.
          </li>
          <li>
            <strong className="text-foreground">Relative time display:</strong> Instantly see
            &quot;2 hours ago&quot;, &quot;in 3 days&quot;, or &quot;5 months ago&quot; — useful for understanding timestamps
            at a glance without mental math.
          </li>
          <li>
            <strong className="text-foreground">Quick presets:</strong> One-click shortcuts for
            common times — &quot;Now&quot;, &quot;Tomorrow 9am&quot;, &quot;Start of day&quot;, &quot;End of month&quot;, &quot;Start of
            year&quot;. Perfect for testing edge cases.
          </li>
          <li>
            <strong className="text-foreground">Timezone support:</strong> Convert to any timezone
            with a dropdown picker showing popular zones (UTC, EST, PST, GMT, JST, IST, etc.).
            Understand DST behavior instantly.
          </li>
          <li>
            <strong className="text-foreground">One-click copy:</strong> Every value has a copy
            button. No need to manually select and copy text — just click and paste into your code.
          </li>
        </ul>
      </section>

      {/* Privacy */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          Privacy & Security
        </h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            All timestamp conversions happen entirely in your browser using JavaScript&apos;s built-in
            Date object. No data is sent to any server. No timestamps are logged. No cookies track
            your usage.
          </p>
          <p>
            This means you can safely convert sensitive timestamps — like auth token expiry times,
            database records, or system logs — without any privacy concerns. When you close the tab,
            everything is gone from memory.
          </p>
        </div>
      </section>

      {/* How-to */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          How to Use
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Choose your input mode: <strong>Timestamp</strong> (Unix epoch) or <strong>Date</strong> (human-readable).</li>
          <li>Type or paste your value. Timestamps auto-detect precision (seconds, milliseconds, microseconds).</li>
          <li>See instant conversions in all formats below — no &quot;Convert&quot; button needed.</li>
          <li>Click any <strong>copy</strong> icon to copy that specific value to your clipboard.</li>
          <li>Use <strong>Quick Presets</strong> to try common times like &quot;Now&quot;, &quot;Tomorrow 9am&quot;, &quot;Start of month&quot;.</li>
          <li>Change <strong>Timezone</strong> to see the same moment in different locations (UTC, EST, PST, etc.).</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <FAQItem
            index={1}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What is a Unix timestamp?"
            answer="A Unix timestamp (also called Unix epoch or POSIX time) is the number of seconds since January 1, 1970 at 00:00:00 UTC. This moment is called the Unix epoch. For example, the timestamp 1609459200 represents January 1, 2021 at midnight UTC. It's a universal time format used across programming languages, databases, and operating systems."
          />
          <FAQItem
            index={2}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What's the difference between seconds, milliseconds, and microseconds?"
            answer="Unix timestamps come in three precision levels: (1) Seconds (10 digits, e.g., 1609459200) — the original Unix format used by most systems. (2) Milliseconds (13 digits, e.g., 1609459200000) — used by JavaScript (Date.now()), Java, and databases like MongoDB. (3) Microseconds (16 digits, e.g., 1609459200000000) — used by high-precision systems. Our tool auto-detects which one you're using based on digit count."
          />
          <FAQItem
            index={3}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Are Unix timestamps timezone-independent?"
            answer="Yes! Unix timestamps always represent a specific moment in UTC (Coordinated Universal Time), regardless of your local timezone. The timestamp 1609459200 is the same moment everywhere on Earth — midnight UTC on January 1, 2021. When you convert to a human-readable date, the tool applies the timezone offset, so it displays differently in New York (7pm Dec 31, 2020 EST) vs Tokyo (9am Jan 1, 2021 JST), but both refer to the same instant."
          />
          <FAQItem
            index={4}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Why does JavaScript use milliseconds instead of seconds?"
            answer="JavaScript's Date.now() returns milliseconds (13 digits) because JavaScript was designed in the 1990s for browser timing with sub-second precision needs (animations, event timestamps). This is different from traditional Unix systems which use seconds. When working with APIs, databases, or other languages, always check whether they expect seconds or milliseconds to avoid being off by 1000x."
          />
          <FAQItem
            index={5}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What is ISO 8601 and RFC 2822 format?"
            answer="ISO 8601 (e.g., 2021-01-01T00:00:00.000Z) is the international standard for date/time representation. The 'T' separates date and time, and 'Z' means UTC (Zulu time). RFC 2822 (e.g., Fri, 01 Jan 2021 00:00:00 GMT) is the format used in HTTP headers and email timestamps. ISO 8601 is more modern and preferred for APIs, while RFC 2822 is used for legacy protocols."
          />
          <FAQItem
            index={6}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What will happen on January 19, 2038 (the Year 2038 problem)?"
            answer="The Year 2038 problem affects 32-bit systems that store timestamps as a signed integer. On January 19, 2038 at 03:14:07 UTC, the timestamp will overflow and wrap to negative values, potentially causing systems to think it's December 13, 1901. Modern 64-bit systems (which support timestamps beyond the year 292 billion) are not affected. Most operating systems and languages have already migrated to 64-bit timestamps."
          />
        </div>
      </section>
    </div>
  );
};

function FAQItem({
  index,
  expanded,
  toggle,
  question,
  answer,
}: {
  index: number;
  expanded: Record<number, boolean>;
  toggle: (index: number) => void;
  question: string;
  answer: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => toggle(index)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
      >
        <span className="font-semibold text-sm pr-4">{question}</span>
        {expanded[index] ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {expanded[index] && (
        <div className="px-4 pb-3 text-muted-foreground text-xs leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

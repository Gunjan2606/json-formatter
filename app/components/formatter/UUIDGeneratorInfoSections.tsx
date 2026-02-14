"use client";

import { Fingerprint, Shield, Zap, FileCode, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const UUIDGeneratorInfoSections = () => {
  const [expandedFAQs, setExpandedFAQs] = useState<Record<number, boolean>>({});

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Overview */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Fingerprint className="w-5 h-5 text-primary" />
          UUID Generator & Validator
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Generate universally unique identifiers (UUIDs) for databases, APIs, and distributed
          systems. A UUID (also called GUID in Microsoft contexts) is a 128-bit identifier that&apos;s
          statistically guaranteed to be unique across space and time without requiring a central
          authority.
          <br /><br />
          We support the three most commonly used UUID versions: <strong>v4</strong> (random, 70%
          of use cases), <strong>v7</strong> (timestamp + random, optimal for databases, 20% of use
          cases), and <strong>v1</strong> (legacy timestamp + MAC, 8% of use cases). Unlike cluttered
          competitors, our tool offers instant generation, multiple format outputs, UUID decoding
          with timestamp extraction, bulk generation, and validation — all in a clean, ad-free
          interface.
          <br /><br />
          Whether you need a single UUID for an API token, 10,000 UUIDs for database seeding, or
          want to decode and extract timestamps from existing UUIDs, this tool handles it all with
          zero server requests and complete privacy.
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
            <strong className="text-foreground">Three UUID versions:</strong> v4 (cryptographically
            random, best for security), v7 (sortable timestamps, best for databases), and v1 (legacy
            support with privacy warnings).
          </li>
          <li>
            <strong className="text-foreground">Multiple format outputs:</strong> Standard (with
            hyphens), no hyphens, uppercase, braces, URN format, and Base64-encoded (22 chars vs 36).
            Every format has its own copy button.
          </li>
          <li>
            <strong className="text-foreground">UUID decoder & timestamp extractor:</strong> Paste
            any UUID to see its version, variant, embedded timestamp (for v1/v7), random bits count,
            and security warnings. Perfect for debugging and understanding UUID structure.
          </li>
          <li>
            <strong className="text-foreground">Smart bulk generation:</strong> Generate up to 10,000
            UUIDs at once with format options (array, line-separated, CSV, JSON). Export as text file
            or copy all to clipboard.
          </li>
          <li>
            <strong className="text-foreground">History tracking:</strong> Automatically saves your
            last 20 generated UUIDs in session storage. Quickly re-copy previously generated UUIDs
            without leaving the page.
          </li>
          <li>
            <strong className="text-foreground">Validation & analysis:</strong> Validate any UUID
            string with detailed feedback — version detection, variant identification, format
            analysis, and security recommendations.
          </li>
          <li>
            <strong className="text-foreground">Version recommendations:</strong> Tooltips and
            guidance help you choose the right version for your use case (database keys, API tokens,
            distributed systems, session management).
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
            All UUIDs are generated entirely in your browser using the Web Crypto API
            (<code>crypto.randomUUID()</code> for v4, <code>crypto.getRandomValues()</code> for
            v1/v7). No UUIDs are sent to any server. No generation history is logged remotely.
            No cookies track your usage.
          </p>
          <p>
            Our v1 implementation uses random values instead of your actual MAC address to protect
            your privacy. For new projects, we recommend v4 (maximum randomness) or v7 (sortability +
            security). The tool will warn you if you&apos;re using a UUID version with potential security
            implications.
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
          <li>Select your <strong>UUID version</strong> (v4 for general use, v7 for databases, v1 for legacy systems).</li>
          <li>Click <strong>Generate UUID</strong> to create a new identifier.</li>
          <li>Copy any format you need — standard, no hyphens, Base64, etc.</li>
          <li>For bulk generation, use the <strong>Bulk</strong> tab and select how many UUIDs you need (1-10,000).</li>
          <li>To decode a UUID, paste it into the <strong>Decode</strong> tab to see version, timestamp, and warnings.</li>
          <li>To validate, paste any string into the <strong>Validate</strong> tab for detailed analysis.</li>
          <li>Check <strong>History</strong> to re-copy recently generated UUIDs.</li>
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
            question="What is a UUID and why do I need one?"
            answer="A UUID (Universally Unique IDentifier) is a 128-bit number used to uniquely identify information in computer systems. Unlike auto-incrementing database IDs, UUIDs can be generated independently on any machine without coordination, making them ideal for distributed systems, microservices, API identifiers, and database primary keys. The probability of generating a duplicate UUID is so astronomically low (1 in 2^122 for v4) that it's considered negligible in practice."
          />
          <FAQItem
            index={2}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Which UUID version should I use?"
            answer="Use UUID v4 for general-purpose identifiers, API tokens, and session IDs — it provides maximum randomness with 122 bits of entropy. Use UUID v7 for database primary keys and event logs — it's sortable by timestamp, which dramatically improves database performance by enabling sequential inserts and reducing index fragmentation. Avoid UUID v1 for new projects — it's legacy and has privacy concerns (exposes MAC address). Our v1 implementation uses random values for privacy, but v7 is still the better modern choice."
          />
          <FAQItem
            index={3}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Why is UUID v7 better for databases than v4?"
            answer="UUID v7 embeds a timestamp in the first 48 bits, making it naturally sortable by creation time. This means new records are inserted at the end of database indexes instead of random locations (like v4), which: (1) Reduces page splits and index fragmentation, (2) Improves INSERT performance by 2-5x, (3) Makes recent data queries faster, (4) Reduces storage overhead. For databases handling millions of rows, v7 can save significant disk I/O and improve query performance. Use v4 only for small databases or when sortability isn't important."
          />
          <FAQItem
            index={4}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Are UUIDs truly unique? Can collisions happen?"
            answer="For UUID v4, the probability of a collision is approximately 1 in 2^122 (5.3 × 10^36). To put this in perspective: if you generated 1 billion UUIDs per second, it would take ~85 years to have a 50% chance of a single collision. For UUID v7, uniqueness depends on timestamp precision (1ms) plus 74 random bits. In practice, collisions are so rare they're considered impossible. However, poorly implemented UUID generators (not using cryptographic randomness) can increase collision risk — our tool uses Web Crypto API for maximum security."
          />
          <FAQItem
            index={5}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What's the difference between UUID and GUID?"
            answer="They're the same thing. UUID (Universally Unique IDentifier) is the standard term defined by RFC 4122. GUID (Globally Unique IDentifier) is Microsoft's name for the same concept, used in Windows, .NET, and COM technologies. Both refer to 128-bit identifiers with the same format (8-4-4-4-12 hexadecimal digits). The terms are interchangeable, though 'UUID' is more common in modern development."
          />
          <FAQItem
            index={6}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Can I extract the timestamp from a UUID?"
            answer="Yes, but only from time-based UUIDs (v1, v6, v7). UUID v4 is completely random and contains no timestamp. Our decoder automatically extracts timestamps from v1 and v7 UUIDs, showing you exactly when they were created. This is useful for debugging distributed systems, understanding data age, or sorting events by UUID when timestamps aren't stored separately. Note that v1 timestamps use a special Gregorian calendar epoch (1582-10-15) rather than Unix epoch."
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

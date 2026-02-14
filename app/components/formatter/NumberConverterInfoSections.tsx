"use client";

import { Binary, Shield, Zap, FileCode, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const NumberConverterInfoSections = () => {
  const [expandedFAQs, setExpandedFAQs] = useState<Record<number, boolean>>({});

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Overview */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Binary className="w-5 h-5 text-primary" />
          Number Base Converter
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Convert numbers between binary (base 2), octal (base 8), decimal (base 10), and
          hexadecimal (base 16) instantly. Our converter processes everything locally in your
          browser with live-as-you-type results — no server calls, no delays, no ads.
          <br /><br />
          Unlike other converters that are limited to 64-bit integers, our tool uses JavaScript
          BigInt under the hood, allowing you to convert arbitrarily large numbers — hundreds or
          thousands of digits — with full precision. Whether you&apos;re debugging memory addresses,
          working with network protocols, parsing binary data, or studying computer science, this
          tool gives you instant, accurate conversions.
          <br /><br />
          Features include automatic digit grouping for readability (4-digit groups for binary and
          hex, 3-digit groups for decimal), bit-length display, one-click copy, and a clean dark-mode
          interface designed for developers.
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
            <strong className="text-foreground">Four number bases:</strong> Binary (base 2),
            Octal (base 8), Decimal (base 10), and Hexadecimal (base 16) — the four bases
            every developer needs.
          </li>
          <li>
            <strong className="text-foreground">Live conversion:</strong> Results update
            in real-time as you type, with no need to click a convert button. Just type and
            see all four bases instantly.
          </li>
          <li>
            <strong className="text-foreground">Big number support:</strong> Powered by
            JavaScript BigInt, there&apos;s no 64-bit limit. Convert numbers with hundreds of
            digits without losing precision.
          </li>
          <li>
            <strong className="text-foreground">Smart input parsing:</strong> Automatically
            strips common prefixes (0x, 0b, 0o), spaces, commas, and underscores from your
            input so you can paste values from any source.
          </li>
          <li>
            <strong className="text-foreground">Digit grouping:</strong> Toggle automatic
            digit grouping for readability — binary and hex in groups of 4, octal in groups
            of 3, decimal with comma separators.
          </li>
          <li>
            <strong className="text-foreground">Bit length display:</strong> See exactly
            how many bits your number requires — useful for sizing data types and understanding
            memory layout.
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
            All conversions happen entirely in your browser using JavaScript&apos;s built-in
            BigInt arithmetic. No data is sent to any server, no values are logged, and no
            cookies are used to track your conversions.
          </p>
          <p>
            This makes it safe to convert sensitive values like memory addresses, cryptographic
            key fragments, or proprietary data formats. When you close the tab, everything is gone.
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
          <li>Select your <strong>input base</strong> (Binary, Octal, Decimal, or Hexadecimal).</li>
          <li>Type or paste your number into the input field. Prefixes like 0x, 0b, 0o are automatically stripped.</li>
          <li>All four base conversions appear instantly below as you type.</li>
          <li>Click the <strong>copy</strong> icon next to any result to copy it to your clipboard.</li>
          <li>Toggle <strong>Group Digits</strong> for easier reading of long numbers.</li>
          <li>Click any result&apos;s base label to <strong>swap</strong> it into the input field for further conversion.</li>
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
            question="What is hexadecimal and why do programmers use it?"
            answer="Hexadecimal (base 16) uses digits 0-9 and letters A-F. Programmers use it because each hex digit represents exactly 4 binary bits, making it a compact way to express binary data. For example, the byte 11111111 in binary is simply FF in hex. It's used everywhere: memory addresses, color codes (#FF5733), MAC addresses, and raw data inspection."
          />
          <FAQItem
            index={2}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What is the difference between binary, octal, decimal, and hexadecimal?"
            answer="These are different number systems (bases). Binary (base 2) uses only 0 and 1 — it's how computers store data at the hardware level. Octal (base 8) uses 0-7 and is used in Unix file permissions. Decimal (base 10) is the everyday system we use. Hexadecimal (base 16) uses 0-9 and A-F, commonly used to represent binary data compactly in programming."
          />
          <FAQItem
            index={3}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="How do I convert hex to decimal manually?"
            answer="Multiply each hex digit by 16 raised to its position power (right to left, starting at 0). For example, hex 1A3: (1 × 16²) + (A × 16¹) + (3 × 16⁰) = (1 × 256) + (10 × 16) + (3 × 1) = 256 + 160 + 3 = 419 in decimal. Or just paste the value here and get the answer instantly."
          />
          <FAQItem
            index={4}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Can this tool handle very large numbers?"
            answer="Yes. Unlike many converters that are limited to 32-bit or 64-bit integers (max ~18 quintillion in decimal), our tool uses JavaScript's BigInt type which supports arbitrarily large integers. You can convert numbers with hundreds or thousands of digits with no loss of precision."
          />
          <FAQItem
            index={5}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What are common uses for binary to decimal conversion?"
            answer="Binary to decimal conversion is essential when reading raw data from hardware registers, debugging network protocols (IP addresses, subnet masks), working with bitwise operations in code, understanding file formats at the byte level, and learning computer science fundamentals. It's also used in digital electronics and embedded systems programming."
          />
          <FAQItem
            index={6}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What does the bit length tell me?"
            answer="The bit length shows how many binary digits (bits) are needed to represent your number. This is useful for determining which data type to use: 8 bits = byte, 16 bits = short/char, 32 bits = int/float, 64 bits = long/double. If your number exceeds the bit width of a data type, it will overflow — the bit length display helps you avoid this."
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

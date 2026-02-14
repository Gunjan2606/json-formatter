"use client";

import { Palette, Shield, Zap, FileCode, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const ColorPickerInfoSections = () => {
  const [expandedFAQs, setExpandedFAQs] = useState<Record<number, boolean>>({});

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Overview */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Color Picker & Palette Generator
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A developer-first color picker with instant export to CSS variables, Tailwind config, Sass,
          JavaScript, and JSON. Unlike traditional color pickers that leave you copying hex codes one
          by one, our tool generates complete design systems with 50-900 shade scales, accessibility
          checking, and ready-to-use code.
          <br /><br />
          Pick a color and instantly see it in multiple formats (HEX, RGB, HSL, HSV, OKLCH), generate
          harmonious palettes (complementary, analogous, triadic, monochromatic), create full shade
          scales for design systems, and validate WCAG contrast ratios for accessibility. Export your
          entire color system as CSS custom properties, Tailwind config, Sass variables, or design
          tokens with one click.
          <br /><br />
          Features include real-time WCAG AA/AAA compliance checking, shade generation from a single
          color, color harmony suggestions, multiple format outputs, and a clean ad-free interface
          designed for speed and developer workflow.
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
            <strong className="text-foreground">5 color formats:</strong> View your color as HEX
            (#3b82f6), RGB (59, 130, 246), HSL (217°, 91%, 60%), HSV (217°, 76%, 96%), and OKLCH
            (0.63, 0.18, 238) with instant copy buttons for each format.
          </li>
          <li>
            <strong className="text-foreground">Developer-first exports:</strong> One-click export
            to CSS custom properties, Tailwind config, Sass/SCSS variables, JavaScript objects, or
            JSON design tokens. No manual copying — get production-ready code instantly.
          </li>
          <li>
            <strong className="text-foreground">Shade generator:</strong> Generate full 50-900 shade
            scales from a single color. Perfect for building design systems with consistent color
            scales across your UI (50=lightest, 500=base, 900=darkest).
          </li>
          <li>
            <strong className="text-foreground">Color harmonies:</strong> Generate complementary,
            analogous, triadic, split-complementary, and monochromatic palettes based on color theory.
            Instant suggestions for visually pleasing color combinations.
          </li>
          <li>
            <strong className="text-foreground">WCAG contrast checker:</strong> Real-time contrast
            ratio calculation with AA/AAA compliance indicators for normal text, large text, and UI
            components. Ensures your colors meet accessibility standards.
          </li>
          <li>
            <strong className="text-foreground">Quick color input:</strong> Paste any hex code, use
            the visual picker, or type RGB/HSL values. Supports #RGB, #RRGGBB, and named colors.
            Instant conversion between all formats.
          </li>
          <li>
            <strong className="text-foreground">Copy with one click:</strong> Every color value,
            every shade, every format has its own copy button. No manual selection needed — just
            click and paste into your code.
          </li>
        </ul>
      </section>

      {/* Privacy */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          Developer Experience
        </h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong className="text-foreground">Client-side processing:</strong> All color
            conversions and calculations happen in your browser. No server requests, instant
            performance, works offline after initial load.
          </p>
          <p>
            <strong className="text-foreground">Zero ads, zero clutter:</strong> Unlike competitors
            with intrusive ads and premium upsells, our tool is completely free with a clean,
            focused interface designed for developer productivity.
          </p>
          <p>
            <strong className="text-foreground">Keyboard-first:</strong> Navigate and interact
            using keyboard shortcuts. Tab through inputs, arrow keys for fine-tuning, Enter to
            copy — optimized for developer workflow.
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
          <li>Pick a color using the visual picker or paste a hex code.</li>
          <li>View the color in all formats (HEX, RGB, HSL, HSV, OKLCH) with instant copy buttons.</li>
          <li>Generate full shade scales (50-900) for design systems from the Shades tab.</li>
          <li>Explore color harmonies (complementary, analogous, triadic) from the Harmony tab.</li>
          <li>Check WCAG contrast ratios against your background color for accessibility.</li>
          <li>Export your color system as CSS variables, Tailwind config, Sass, JS, or JSON.</li>
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
            question="What is OKLCH and why should I use it?"
            answer="OKLCH is a perceptually uniform color space that makes it easier to manipulate colors predictably. Unlike HSL where lightness changes inconsistently across hues, OKLCH ensures that L:50% looks equally light whether it's blue, yellow, or red. This makes it perfect for generating consistent shade scales. Browser support: Safari 15.4+, Chrome 111+, Firefox 113+."
          />
          <FAQItem
            index={2}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What do the shade numbers (50-900) mean?"
            answer="Shade scales (50, 100, 200...900) are a convention popularized by Tailwind CSS for design systems. 50 is the lightest tint, 500 is typically your base color, and 900 is the darkest shade. This gives you 10 shades per color for consistent UI design. For example: 50 for backgrounds, 500 for buttons, 700 for hover states, 900 for text."
          />
          <FAQItem
            index={3}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What are WCAG AA and AAA compliance levels?"
            answer="WCAG (Web Content Accessibility Guidelines) defines minimum contrast ratios for readable text. AA requires 4.5:1 for normal text and 3:1 for large text (18pt+) — this is the legal minimum in many jurisdictions. AAA is the enhanced standard: 7:1 for normal text and 4.5:1 for large text. Use AA as your minimum, AAA for critical content or government sites."
          />
          <FAQItem
            index={4}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What's the difference between RGB, HSL, and HSV?"
            answer="RGB (Red, Green, Blue) is additive color mixing used by screens. HSL (Hue, Saturation, Lightness) is easier for designers — hue is the color wheel position (0-360°), saturation is color intensity (0-100%), lightness is brightness (0-100%). HSV (Hue, Saturation, Value) is similar but uses 'value' instead of lightness. HSL is most common for CSS, HSV is common in design software."
          />
          <FAQItem
            index={5}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="How do complementary and analogous color schemes work?"
            answer="Complementary colors are opposite on the color wheel (e.g., blue and orange) — they create maximum contrast and visual impact. Analogous colors are adjacent on the wheel (e.g., blue, blue-green, green) — they create harmonious, low-contrast designs. Triadic uses three evenly-spaced colors (120° apart) for vibrant yet balanced palettes."
          />
          <FAQItem
            index={6}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Can I export colors for Tailwind CSS?"
            answer="Yes! Click the Tailwind export button to get a complete theme config with your color and all 10 shade scales (50-900). You can paste this directly into your tailwind.config.js file under theme.extend.colors. The format is production-ready and follows Tailwind conventions."
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

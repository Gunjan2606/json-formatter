"use client";

import { QrCode, Shield, Zap, FileCode, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const QRGeneratorInfoSections = () => {
  const [expandedFAQs, setExpandedFAQs] = useState<Record<number, boolean>>({});

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Overview */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <QrCode className="w-5 h-5 text-primary" />
          QR Code Generator
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Generate static QR codes that work forever — no subscriptions, no expiration dates, no
          hidden fees. Unlike many &quot;free&quot; QR code generators that deactivate your codes after 7 days
          unless you pay, our QR codes are truly static and permanent.
          <br /><br />
          All QR codes are generated entirely in your browser using client-side JavaScript. Your data
          never touches our servers. No tracking, no analytics, no privacy concerns. Create QR codes
          for URLs, plain text, emails, phone numbers, SMS messages, WiFi credentials, and contact
          cards (vCards) with full customization options.
          <br /><br />
          Features include color customization, logo upload, multiple error correction levels
          (L/M/Q/H), PNG/SVG/PDF export, and a clean ad-free interface. Whether you need a single
          QR code for a business card or bulk generation for an event, this tool handles it with
          complete transparency and zero tricks.
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
            <strong className="text-foreground">7 QR code types:</strong> URL/Link, Plain Text,
            Email (mailto:), Phone (tel:), SMS, WiFi credentials (SSID + password), and vCard
            (contact cards with name, phone, email, etc.).
          </li>
          <li>
            <strong className="text-foreground">Static QR codes only:</strong> Your codes work
            forever. No server dependencies, no expiration dates, no subscription required. Print
            them on business cards, flyers, or products with confidence.
          </li>
          <li>
            <strong className="text-foreground">Full customization:</strong> Change foreground and
            background colors, upload your logo (up to 2MB, centered with automatic sizing), adjust
            QR code size (100px - 1000px), and select error correction level (L/M/Q/H).
          </li>
          <li>
            <strong className="text-foreground">Multiple export formats:</strong> Download as PNG
            (raster for screens), SVG (vector for print/design), or PDF (document format). SVG is
            infinitely scalable and perfect for professional printing.
          </li>
          <li>
            <strong className="text-foreground">Error correction levels:</strong> Choose L (7%
            recovery), M (15%, recommended), Q (25%), or H (30% recovery for logos/damage). Higher
            levels allow more logo coverage but create larger QR codes.
          </li>
          <li>
            <strong className="text-foreground">Client-side generation:</strong> All processing
            happens in your browser using the Web Crypto API. No data sent to servers. Works offline
            after initial page load. True privacy by design.
          </li>
          <li>
            <strong className="text-foreground">No ads, no tracking:</strong> Clean, fast interface
            with zero advertisements, zero tracking scripts, zero pop-ups. Just you and your QR code.
          </li>
        </ul>
      </section>

      {/* Privacy */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          Privacy & Transparency
        </h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong className="text-foreground">100% client-side generation:</strong> All QR codes
            are created in your browser using JavaScript. Your data (URLs, WiFi passwords, contact
            info, etc.) never leaves your device. No server requests, no data storage, no logging.
          </p>
          <p>
            <strong className="text-foreground">Static QR codes explained:</strong> Static codes
            encode the data directly into the QR pattern. They work forever, even if our website
            goes offline. &quot;Dynamic&quot; codes (used by many competitors) redirect through a server,
            requiring ongoing subscriptions. We only generate static codes.
          </p>
          <p>
            <strong className="text-foreground">No expiration tricks:</strong> Many &quot;free&quot; QR code
            generators create dynamic codes that stop working after 7 days unless you pay. This has
            caused real financial harm to businesses that printed materials. Our codes work forever,
            guaranteed.
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
          <li>Select your <strong>QR code type</strong> (URL, Text, Email, Phone, SMS, WiFi, or vCard).</li>
          <li>Enter your data in the input fields. For WiFi, provide SSID and password. For vCard, fill contact details.</li>
          <li>Customize appearance: adjust colors, upload a logo, change size, select error correction level.</li>
          <li>Preview the QR code in real-time as you type and customize.</li>
          <li>Download as <strong>PNG</strong> (for screens), <strong>SVG</strong> (for print/design), or <strong>PDF</strong> (for documents).</li>
          <li>Test your QR code by scanning it with your phone camera before printing.</li>
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
            question="Will my QR codes expire or stop working?"
            answer="No, never. We generate 100% static QR codes that encode your data directly into the QR pattern. They work forever, even if our website goes offline. Unlike 'dynamic' QR codes that redirect through a server (and can be deactivated), static codes are permanent. Many competitors create dynamic codes that stop working after 7 days unless you pay — we don't do that."
          />
          <FAQItem
            index={2}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What's the difference between static and dynamic QR codes?"
            answer="Static QR codes encode your data directly (like a URL) into the QR pattern itself. They work forever and don't require a server. Dynamic QR codes contain a short redirect URL that points to a server, which then redirects to your actual content. This allows changing the destination URL later, but requires ongoing server costs — hence the subscription model. For permanent uses like business cards or printed materials, always use static codes."
          />
          <FAQItem
            index={3}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Which error correction level should I use?"
            answer="Use Level M (15% recovery) for most cases — it's the best balance. Use Level H (30% recovery) if you're adding a large logo (which covers part of the QR code) or if the code will be in harsh conditions (outdoor weathering, industrial use). Use Level Q (25%) for moderate logo coverage. Use Level L (7%) only in clean environments when you need maximum data capacity. Higher levels create larger/denser QR codes."
          />
          <FAQItem
            index={4}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Can I add my logo to the QR code?"
            answer="Yes. Upload a logo image (PNG, JPG, or SVG up to 2MB). The logo will be centered and automatically sized. We recommend keeping logos at 15-20% of the QR code size and using error correction level H (30%) when adding logos, since the logo covers part of the data. The QR code can still be scanned as long as enough data remains visible."
          />
          <FAQItem
            index={5}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What format should I use for printing?"
            answer="Use SVG for professional printing — it's a vector format that scales infinitely without losing quality. SVG files can be imported into Adobe Illustrator, Inkscape, or sent directly to professional printers. Use PNG for digital displays, websites, or small-scale printing. For documents, PDF embeds the QR code in a standard format. Aim for at least 300 DPI (dots per inch) for print quality."
          />
          <FAQItem
            index={6}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Is my data private when generating QR codes?"
            answer="Yes, completely. All QR code generation happens in your browser using JavaScript. Your URLs, WiFi passwords, contact information, and other data never leave your device. No server requests are made. We don't track what you generate. You can even use this tool offline after the initial page load. This is fundamentally more private than generators that upload your data to servers."
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

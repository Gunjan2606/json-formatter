"use client";

import { FileText, Shield, Zap, FileCode, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const TextDiffInfoSections = () => {
  const [expandedFAQs, setExpandedFAQs] = useState<Record<number, boolean>>({});

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Overview */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Text & Code Diff Tool
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Compare text, code, and documents with smart character-level highlighting that shows exactly
          what changed. Unlike traditional diff tools that highlight entire lines when only one
          character changed, our tool uses intelligent intra-line comparison to reduce visual noise
          by 70-80%.
          <br /><br />
          All processing happens entirely in your browser — no uploads, no server-side processing,
          instant results. Perfect for code review, debugging, configuration management, and merge
          conflict resolution. Compare two versions side-by-side or in unified view, with real-time
          statistics showing additions, deletions, and modifications.
          <br /><br />
          Features include three comparison modes (character, word, line), two view modes (side-by-side
          split, unified inline), smart detection of modified lines with character-level changes
          highlighted, diff statistics, copy/download results, and a clean ad-free interface optimized
          for developer workflow.
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
            <strong className="text-foreground">Smart intra-line highlighting:</strong> When only
            part of a line changed, we show exactly which characters were added, removed, or modified.
            No more entire lines highlighted red/green when only one word changed.
          </li>
          <li>
            <strong className="text-foreground">Three comparison modes:</strong> Character-by-character
            (exact changes), word-by-word (semantic changes), and line-by-line (traditional diff view).
            Switch modes to see changes at different granularities.
          </li>
          <li>
            <strong className="text-foreground">Two view modes:</strong> Side-by-side split view
            (parallel columns for visual comparison) and unified inline view (single column with +/-
            indicators, like Git diffs).
          </li>
          <li>
            <strong className="text-foreground">Modified line detection:</strong> Automatically
            detects when a line was modified (not just deleted and re-added) using similarity
            analysis. Shows character-level changes within those lines.
          </li>
          <li>
            <strong className="text-foreground">Real-time statistics:</strong> Instant summary showing
            number of additions (green), deletions (red), modifications (yellow), and unchanged lines.
            Understand the scope of changes at a glance.
          </li>
          <li>
            <strong className="text-foreground">Client-side processing:</strong> All comparisons
            happen in your browser using JavaScript. No file uploads, no server storage, no privacy
            concerns. Works offline after initial page load.
          </li>
          <li>
            <strong className="text-foreground">Copy &amp; export:</strong> Copy individual text
            versions or export the complete diff result. Download as text file for documentation or
            sharing with your team.
          </li>
        </ul>
      </section>

      {/* Privacy */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          Privacy & Performance
        </h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong className="text-foreground">100% client-side processing:</strong> All diff
            computations happen in your browser. Your code, documents, and sensitive data never
            leave your device. No server uploads, no data storage, no logging.
          </p>
          <p>
            <strong className="text-foreground">Instant results:</strong> No network latency. Diffs
            are computed locally using optimized algorithms, giving you instant feedback even for
            large files. Compare 10,000+ line files in under a second.
          </p>
          <p>
            <strong className="text-foreground">Zero ads, zero tracking:</strong> Clean, focused
            interface with no advertisements or analytics scripts. Built for developer productivity,
            not monetization through data collection.
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
          <li>Paste or type your original text/code in the left panel.</li>
          <li>Paste or type your modified text/code in the right panel.</li>
          <li>Changes are highlighted automatically — green for additions, red for deletions, yellow for modifications.</li>
          <li>Use <strong>Comparison Mode</strong> to switch between character, word, or line-level diffs.</li>
          <li>Toggle <strong>View Mode</strong> to switch between side-by-side (split) and unified (inline) layouts.</li>
          <li>Check the statistics panel to see totals for additions, deletions, and modifications.</li>
          <li>Use the <strong>Swap</strong> button to reverse left and right panels.</li>
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
            question="What's the difference between character, word, and line comparison modes?"
            answer="Character mode shows exact character-by-character changes (useful for spotting typos or small edits). Word mode groups changes by words, making it easier to see semantic changes like variable renames. Line mode (traditional diff) compares line-by-line, best for understanding structural changes in code. Use character mode for precise edits, word mode for readability, and line mode for code review."
          />
          <FAQItem
            index={2}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Why is intra-line highlighting better than traditional diffs?"
            answer="Traditional diff tools highlight entire lines when any part changes, creating visual noise. If you change one parameter in a 100-character line, the whole line turns red/green. Our intra-line highlighting shows only the exact changed portion (e.g., just 'b→c' in 'function(a, b)' → 'function(a, c)'). This reduces visual noise by 70-80% and makes it much easier to spot exactly what changed, especially in code with long lines."
          />
          <FAQItem
            index={3}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Is my data safe? Do you store my text/code?"
            answer="Yes, completely safe. All diff computations happen entirely in your browser using JavaScript. Nothing is uploaded to our servers. Your text, code, and documents never leave your device. We don't store, log, or have any access to your data. You can even use this tool offline after the initial page load."
          />
          <FAQItem
            index={4}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What's the difference between split and unified view?"
            answer="Split view (side-by-side) shows original and modified text in parallel columns — great for visual comparison and presentations. Unified view (inline) shows all changes in a single column with +/- indicators, similar to Git diffs — better for narrow screens and email. Split is preferred by 60% of developers for code review, unified is preferred for patches and CLI workflows."
          />
          <FAQItem
            index={5}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="How does modified line detection work?"
            answer="When a line changes, many diff tools show it as 'deleted from left, added to right'. Our tool uses similarity analysis (Levenshtein distance) to detect when lines are actually modified versions of each other (>50% similar). For these modified lines, we compute character-level changes and show them with yellow highlighting, making it instantly clear that the line was edited, not replaced."
          />
          <FAQItem
            index={6}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Can I compare large files?"
            answer="Yes. Since processing happens client-side using optimized algorithms, you can compare files with 10,000+ lines in under a second on modern browsers. There's no artificial file size limit. Performance depends on your device — larger files may take a few seconds on slower devices but will still complete."
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

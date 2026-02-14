"use client";

import { FileText, Shield, Zap, FileCode, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const WordCounterInfoSections = () => {
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
          Word Counter & Character Counter
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Free online word counter and character counter that works instantly in your browser.
          Count words, characters, sentences, paragraphs, and more in real time as you type
          or paste. Unlike other word counters that are cluttered with ads and send your text
          to external servers, our tool processes everything locally on your device — your text
          never leaves your browser.
          <br /><br />
          Perfect for writers, students, bloggers, SEO professionals, social media managers,
          and developers who need accurate text statistics without compromising privacy.
          Whether you&apos;re checking essay word limits, optimizing meta descriptions, or
          analyzing keyword density for SEO, this tool delivers instant, accurate results with
          a clean, distraction-free interface.
          <br /><br />
          Built for both casual users and developers, it includes advanced stats like UTF-8
          byte count, unique word analysis, and social media character limit tracking — features
          you won&apos;t find in most word counters.
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
            <strong className="text-foreground">Real-time counting:</strong> Word count, character
            count (with and without spaces), sentences, paragraphs, and lines update instantly
            as you type or paste.
          </li>
          <li>
            <strong className="text-foreground">Reading & speaking time:</strong> Estimates based on
            research-backed averages (238 wpm reading, 150 wpm speaking) help you plan
            presentations and content length.
          </li>
          <li>
            <strong className="text-foreground">Social media limits:</strong> Visual progress bars
            show how your text fits within Twitter/X (280), Instagram (2,200), LinkedIn (3,000),
            and Meta description (160) character limits.
          </li>
          <li>
            <strong className="text-foreground">Keyword density analysis:</strong> Identifies your
            top 15 most-used keywords with frequency counts and density percentages — essential
            for SEO content optimization.
          </li>
          <li>
            <strong className="text-foreground">Developer stats:</strong> UTF-8 byte count, unique
            word count, and average word length — metrics developers need for API payloads,
            database fields, and encoding work.
          </li>
          <li>
            <strong className="text-foreground">File upload support:</strong> Upload .txt, .md, .json,
            .csv, .xml, and other text files directly — no need to copy-paste from documents.
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
            Your text never leaves your browser. All word counting, character counting, and
            text analysis happens 100% locally using client-side JavaScript. We don&apos;t send
            your text to any server, and we don&apos;t store, log, or track your content in
            any way.
          </p>
          <p>
            This makes our word counter safe for confidential documents, academic essays,
            business reports, legal text, and any sensitive content. Unlike many online word
            counters that transmit your text to their servers for processing, everything here
            runs in your browser&apos;s memory and is cleared when you close the tab.
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
          <li>Type or paste your text into the editor above. Stats update in real time.</li>
          <li>Alternatively, click <strong>Upload</strong> to load a text file (.txt, .md, .json, etc.).</li>
          <li>View your word count, character count, reading time, and other statistics in the dashboard below the editor.</li>
          <li>Check social media character limits to ensure your text fits within platform requirements.</li>
          <li>Use <strong>Copy Stats</strong> to copy all statistics to your clipboard, or <strong>Download</strong> to save your text as a file.</li>
        </ol>
      </section>

      {/* FAQ Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <FAQItem
            index={1}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="How do I count words online?"
            answer="Simply paste or type your text into the editor above. The word count, character count, and all other statistics update instantly in real time. You can also upload a text file by clicking the Upload button."
          />
          <FAQItem
            index={2}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Is my text safe in this online word counter?"
            answer="Yes, 100% safe. All text processing happens locally in your browser using JavaScript. Your text is never sent to any server, stored, or logged. We have zero access to your content. When you close the tab, everything is gone."
          />
          <FAQItem
            index={3}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What is the difference between characters and characters without spaces?"
            answer='Characters counts every character including spaces, tabs, and newlines. Characters without spaces excludes all whitespace characters, giving you the count of only letters, numbers, and punctuation. For example, "hello world" has 11 characters but only 10 characters without spaces.'
          />
          <FAQItem
            index={4}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="How is reading time calculated?"
            answer="Reading time is calculated by dividing the total word count by 238 words per minute, which is the average adult silent reading speed based on research by Brysbaert (2019). Speaking time uses 150 words per minute, the average conversational speaking pace."
          />
          <FAQItem
            index={5}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What is keyword density and why does it matter?"
            answer="Keyword density shows how frequently specific words appear in your text as a percentage of total words. It's important for SEO — search engines use keyword frequency as one signal to understand what your content is about. A density of 1-3% for target keywords is generally recommended. Our tool automatically filters out common stop words (the, is, and, etc.) to show only meaningful keywords."
          />
          <FAQItem
            index={6}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Why do word counts differ between tools?"
            answer="Different tools define a 'word' differently. Some count hyphenated words as one word, others as two. Some count numbers as words, others don't. Our tool splits text by whitespace (spaces, tabs, newlines) which matches the behavior of most word processors like Microsoft Word and Google Docs."
          />
          <FAQItem
            index={7}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What is UTF-8 byte count and why do developers need it?"
            answer="UTF-8 byte count tells you the actual size of your text in bytes when encoded as UTF-8, which is the most common text encoding on the web. This differs from character count because some characters (like emoji or non-Latin scripts) take 2-4 bytes each. Developers need this for database column limits, API payload sizes, and file size calculations."
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

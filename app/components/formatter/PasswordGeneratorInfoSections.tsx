"use client";

import { KeyRound, Shield, Zap, FileCode, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const PasswordGeneratorInfoSections = () => {
  const [expandedFAQs, setExpandedFAQs] = useState<Record<number, boolean>>({});

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Overview */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-primary" />
          Password Generator
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Generate strong, secure passwords instantly in your browser. Our password
          generator uses the cryptographically secure <code>crypto.getRandomValues()</code> API
          to produce truly random passwords that are impossible to predict. Choose from three
          modes — Random passwords, Passphrases (word-based), and PINs — to match any
          security requirement.
          <br /><br />
          Unlike many online password generators that send data to their servers, our tool
          runs 100% locally in your browser. Your passwords are never transmitted, stored,
          or logged anywhere. With bulk generation, estimated crack time display, and a
          clean ad-free interface, this is the most developer-friendly password generator
          on the web.
          <br /><br />
          Whether you need a single strong password for a new account, a memorable passphrase
          for your master password, or multiple passwords for a batch of test accounts, this
          tool has you covered with full customization and real-time strength analysis.
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
            <strong className="text-foreground">Three generation modes:</strong> Random
            passwords (4-128 characters), memorable passphrases (3-10 words), and numeric
            PINs (4-12 digits) cover every use case.
          </li>
          <li>
            <strong className="text-foreground">Full customization:</strong> Toggle uppercase,
            lowercase, numbers, and symbols. Exclude ambiguous characters (0/O, 1/l/I) to
            avoid confusion when reading passwords.
          </li>
          <li>
            <strong className="text-foreground">Strength analysis:</strong> Real-time entropy
            calculation with a 5-level strength meter and estimated crack time so you know
            exactly how secure your password is.
          </li>
          <li>
            <strong className="text-foreground">Bulk generation:</strong> Generate up to 10
            passwords at once — perfect for setting up test accounts, provisioning users, or
            comparing options.
          </li>
          <li>
            <strong className="text-foreground">Passphrase options:</strong> Customize word
            count, separator character, capitalization, and number inclusion to create
            memorable yet secure passphrases.
          </li>
          <li>
            <strong className="text-foreground">Cryptographically secure:</strong> Uses the
            Web Crypto API (<code>crypto.getRandomValues()</code>) for true randomness, the
            same standard used by password managers and security tools.
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
            Every password is generated entirely in your browser. We use the Web Crypto API,
            the same cryptographic random number generator used by password managers like
            Bitwarden and 1Password. No passwords are ever sent over the network, stored on
            any server, or logged in any analytics system.
          </p>
          <p>
            This approach is fundamentally more secure than server-side generators because
            your passwords never exist outside your own device. When you close the tab, the
            generated passwords are gone from memory. There is no server-side component, no
            database, and no way for anyone — including us — to see what you generated.
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
          <li>Choose your mode: <strong>Random</strong> for maximum security, <strong>Passphrase</strong> for memorability, or <strong>PIN</strong> for numeric codes.</li>
          <li>Adjust the length/word count and character options to match your requirements.</li>
          <li>Click <strong>Generate</strong> or adjust any option to instantly create new passwords.</li>
          <li>Click the copy icon next to any password to copy it to your clipboard.</li>
          <li>Use the <strong>Generate Count</strong> slider to create multiple passwords at once.</li>
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
            question="Are online password generators safe to use?"
            answer="It depends on the tool. Our generator is safe because all passwords are created locally in your browser using cryptographic randomness. Nothing is sent to any server. However, some online generators do transmit passwords to their servers — you should always verify that a tool uses client-side generation before trusting it."
          />
          <FAQItem
            index={2}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="How long should my password be?"
            answer="For maximum security, use at least 16 characters for random passwords or 4+ words for passphrases. A 20-character random password with mixed character types has approximately 130 bits of entropy, which would take billions of years to crack with current technology. For less critical accounts, 12+ characters is a reasonable minimum."
          />
          <FAQItem
            index={3}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What is a passphrase and is it more secure than a random password?"
            answer="A passphrase is a password made from multiple random words (like 'tiger-ocean-maple-frost'). A 4-word passphrase from a 200-word list has about 31 bits of entropy, while a 4-word passphrase from a 7,776-word diceware list has about 51 bits. For equivalent security to a 20-character random password, use 5-6 words. The advantage of passphrases is that they're much easier to remember and type."
          />
          <FAQItem
            index={4}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="What does 'entropy' mean for passwords?"
            answer="Entropy measures the randomness (unpredictability) of a password in bits. Higher entropy means the password is harder to crack. A password with 40 bits of entropy has 2^40 (about 1 trillion) possible combinations. For context: below 28 bits is very weak, 36-59 bits is fair, 60-80 bits is strong, and above 80 bits is very strong."
          />
          <FAQItem
            index={5}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Why should I exclude ambiguous characters?"
            answer="Characters like 0 (zero) and O (letter), or 1 (one) and l (lowercase L) and I (uppercase i) look nearly identical in many fonts. When you need to read or type a password manually (e.g., entering a WiFi password), excluding these characters prevents mistakes. For passwords you'll only copy-paste, this option isn't necessary."
          />
          <FAQItem
            index={6}
            expanded={expandedFAQs}
            toggle={toggleFAQ}
            question="Can I generate multiple passwords at once?"
            answer="Yes — use the 'Generate Count' slider to create up to 10 passwords simultaneously. Each password is independently generated with full cryptographic randomness. You can copy them individually or use 'Copy All' to copy all passwords at once, separated by newlines."
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

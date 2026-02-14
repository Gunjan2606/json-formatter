export const RegexTesterInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free Online Regex Tester & Debugger - 100% Client-Side
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Test, debug, and validate regular expressions online with real-time match highlighting, capture
          group visualization, and find & replace preview. Our regex tester runs 100% in your browser—no
          server uploads, complete privacy. Perfect for developers debugging regex patterns, testing string
          matching, and learning regular expressions with interactive feedback.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Real-Time Testing</h3>
            <p className="text-sm text-muted-foreground">
              See matches update instantly as you type. Visual highlighting shows exactly what your regex
              captures with color-coded groups.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">100% Private</h3>
            <p className="text-sm text-muted-foreground">
              All testing happens locally in your browser. Your regex patterns and test strings never leave
              your device.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Code Export</h3>
            <p className="text-sm text-muted-foreground">
              Copy working regex code for JavaScript, Python, Go, or Java with one click. Ready to paste
              into your project.
            </p>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Key Features</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Visual Match Highlighting</h3>
            <p className="text-muted-foreground mb-4">
              See exactly what your regex matches with color-coded highlighting. Unlike regex101 which shows
              matches in a separate panel, we highlight matches directly in your test string for instant
              visual feedback.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Color-coded match highlighting in test string</li>
              <li>Match table showing all matches with positions</li>
              <li>Capture group extraction with group numbers</li>
              <li>Named capture group support</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Find & Replace Mode</h3>
            <p className="text-muted-foreground mb-4">
              Test find & replace operations with live preview. Use capture group references ($1, $2) in
              replacement text and see results instantly before applying changes to your code.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Live replacement preview as you type</li>
              <li>Capture group references ($1, $2, $3...)</li>
              <li>Named group references ($&lt;name&gt;)</li>
              <li>Copy result with one click</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Test Case Management</h3>
            <p className="text-muted-foreground mb-4">
              Save test cases to validate your regex against multiple strings. Mark each test as &quot;should
              match&quot; or &quot;should not match&quot; and run all tests at once to verify your pattern works correctly
              across all scenarios.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Add unlimited test cases</li>
              <li>Pass/fail indicators for each test</li>
              <li>Run all tests with one click</li>
              <li>Perfect for TDD regex development</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Built-in Cheatsheet</h3>
            <p className="text-muted-foreground mb-4">
              Quick reference sidebar with all regex tokens, quantifiers, anchors, and special characters.
              No need to Google regex syntax—everything you need is right there in the tool.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Character classes (\\w, \\d, \\s)</li>
              <li>Quantifiers (*, +, ?, {'{n,m}'})</li>
              <li>Anchors (^, $, \\b)</li>
              <li>Lookaround assertions</li>
              <li>Groups and alternation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How to Use the Regex Tester</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">1. Enter Your Regex Pattern</h3>
            <p className="text-muted-foreground">
              Type your regular expression in the pattern field. The pattern is automatically wrapped in
              forward slashes (/ /) like in JavaScript. Select flags:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li><strong>g (Global)</strong> - Find all matches, not just the first</li>
              <li><strong>i (Ignore Case)</strong> - Case-insensitive matching</li>
              <li><strong>m (Multiline)</strong> - ^ and $ match line boundaries</li>
              <li><strong>s (Dot All)</strong> - . matches newlines</li>
              <li><strong>u (Unicode)</strong> - Full unicode support</li>
              <li><strong>y (Sticky)</strong> - Match from lastIndex position</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2. Add Test String</h3>
            <p className="text-muted-foreground">
              Paste or type the text you want to test your regex against. Matches will be highlighted in
              real-time as you type. For multiline patterns, press Enter to add line breaks.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3. View Results</h3>
            <p className="text-muted-foreground">
              In <strong>Match mode</strong>, see highlighted matches in your test string and a detailed
              match table showing positions and capture groups. In <strong>Replace mode</strong>, enter
              replacement text (use $1, $2 for capture groups) and see the result instantly.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">4. Export Code</h3>
            <p className="text-muted-foreground">
              Once your regex works, click an export button to copy code for JavaScript, Python, Go, or
              Java. The code includes your pattern, flags, and is ready to paste into your project.
            </p>
          </div>
        </div>
      </section>

      {/* Common Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Regex Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Email Address</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block mb-2">
              \b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{'{2,}'}\b
            </code>
            <p className="text-xs text-muted-foreground">
              Matches most email formats. Add flags: i for case-insensitive.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">URL/Website</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block mb-2">
              https?://[^\s]+
            </code>
            <p className="text-xs text-muted-foreground">
              Matches HTTP and HTTPS URLs. Use with g flag to find all URLs.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Phone Number (US)</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block mb-2">
              \(?\d{'{3}'}\)?[-.\s]?\d{'{3}'}[-.\s]?\d{'{4}'}
            </code>
            <p className="text-xs text-muted-foreground">
              Matches formats: (123) 456-7890, 123-456-7890, 123.456.7890
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Date (YYYY-MM-DD)</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block mb-2">
              \d{'{4}'}-\d{'{2}'}-\d{'{2}'}
            </code>
            <p className="text-xs text-muted-foreground">
              Matches ISO 8601 date format: 2025-02-14
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Hex Color</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block mb-2">
              #[0-9A-Fa-f]{'{6}'}
            </code>
            <p className="text-xs text-muted-foreground">
              Matches 6-digit hex colors: #FF5733, #1a2b3c
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">IP Address (IPv4)</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block mb-2">
              \b\d{'{1,3}'}\.\d{'{1,3}'}\.\d{'{1,3}'}\.\d{'{1,3}'}\b
            </code>
            <p className="text-xs text-muted-foreground">
              Matches IPv4 addresses: 192.168.1.1
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What is a regular expression (regex)?
            </h3>
            <p className="text-muted-foreground">
              A regular expression (regex or regexp) is a sequence of characters that defines a search
              pattern, mainly for use in pattern matching with strings. Regex is used for text searching,
              validation (email, phone numbers), find & replace operations, and data extraction. It&apos;s
              supported in most programming languages including JavaScript, Python, Java, Go, PHP, and more.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What do the regex flags mean?
            </h3>
            <p className="text-muted-foreground">
              Flags modify how the regex pattern behaves. <strong>g (Global)</strong> finds all matches
              instead of stopping after the first. <strong>i (Ignore Case)</strong> makes matching
              case-insensitive. <strong>m (Multiline)</strong> makes ^ and $ match line boundaries instead
              of just string start/end. <strong>s (Dot All)</strong> makes . match newline characters.
              <strong>u (Unicode)</strong> enables full unicode support. <strong>y (Sticky)</strong> matches
              only from the lastIndex position.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How do I use capture groups in regex?
            </h3>
            <p className="text-muted-foreground">
              Capture groups are parts of your regex wrapped in parentheses that extract specific portions
              of matches. For example, in <code className="bg-muted px-1 py-0.5 rounded">(\d{'{3}'})[-.](\d{'{3}'})[-.](\d{'{4}'})</code>
              for phone numbers, the three groups capture area code, prefix, and line number separately.
              In replacements, reference groups with $1, $2, etc. Named groups use
              <code className="bg-muted px-1 py-0.5 rounded">(?&lt;name&gt;pattern)</code> and are referenced
              with $&lt;name&gt;.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What&apos;s the difference between greedy and lazy quantifiers?
            </h3>
            <p className="text-muted-foreground">
              Greedy quantifiers (*, +, {'{n,m}'}) match as much text as possible. For example, <code className="bg-muted px-1 py-0.5 rounded">&lt;.+&gt;</code> on
              &quot;&lt;a&gt;link&lt;/a&gt;&quot; matches the entire string. Lazy quantifiers (*?, +?, {'{n,m}'}?) match as little
              as possible. <code className="bg-muted px-1 py-0.5 rounded">&lt;.+?&gt;</code> matches only &quot;&lt;a&gt;&quot; and &quot;&lt;/a&gt;&quot; separately.
              Use lazy quantifiers when you want to match the shortest possible string.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How do I match special characters literally?
            </h3>
            <p className="text-muted-foreground">
              Special regex characters like . * + ? [ ] {'{}'} ( ) ^ $ | \\ have special meanings. To match
              them literally, escape them with a backslash. For example, to match a literal period, use
              <code className="bg-muted px-1 py-0.5 rounded">\.</code> instead of <code className="bg-muted px-1 py-0.5 rounded">.</code>
              To match &quot;example.com&quot; exactly, use <code className="bg-muted px-1 py-0.5 rounded">example\.com</code>.
              To match parentheses, use <code className="bg-muted px-1 py-0.5 rounded">\(</code> and <code className="bg-muted px-1 py-0.5 rounded">\)</code>.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Why isn&apos;t my regex matching newlines?
            </h3>
            <p className="text-muted-foreground">
              By default, the dot (.) metacharacter doesn&apos;t match newline characters. To make . match newlines,
              enable the <strong>s (Dot All)</strong> flag. Alternatively, use <code className="bg-muted px-1 py-0.5 rounded">[\s\S]</code> or
              <code className="bg-muted px-1 py-0.5 rounded">(.|\n)</code> to explicitly match any character including newlines.
              For multiline matching where ^ and $ should match line boundaries (not just string start/end),
              enable the <strong>m (Multiline)</strong> flag.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Regex Best Practices</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Start simple, iterate:</strong> Begin with a basic
                pattern and refine it as you test. Don&apos;t try to write perfect regex on the first try.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Use test cases:</strong> Create test cases for both
                matches and non-matches to ensure your regex is precise and doesn&apos;t have false positives.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Be specific:</strong> Use \\d instead of ., use \\s instead
                of .*, use character classes [a-z] instead of .+ when possible. Specific patterns are faster
                and more accurate.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Avoid catastrophic backtracking:</strong> Nested quantifiers
                like (a+)+ can cause exponential time complexity. Test your regex on large inputs to ensure
                good performance.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Use non-capturing groups:</strong> If you don&apos;t need to
                extract a group, use (?:pattern) instead of (pattern) for better performance.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Validate, don&apos;t parse:</strong> Regex is great for
                validation (email format, phone format) but not for parsing complex nested structures like
                HTML or JSON. Use proper parsers for those.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

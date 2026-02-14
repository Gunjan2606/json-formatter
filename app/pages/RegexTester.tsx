"use client";

import { useCallback, useState } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { RegexTesterInfoSections } from "../components/formatter/RegexTesterInfoSections";
import { useRegexTester } from "../hooks/useRegexTester";
import {
  Code2,
  Play,
  Copy,
  Check,
  Trash2,
  Plus,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Maximize2,
  Minimize2,
  AlertCircle,
} from "lucide-react";

const RegexTesterComponent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [newTestCase, setNewTestCase] = useState({ name: "", testString: "", shouldMatch: true });

  const {
    pattern,
    setPattern,
    flags,
    toggleFlag,
    testString,
    setTestString,
    replaceText,
    setReplaceText,
    mode,
    setMode,
    error,
    matches,
    replaced,
    highlighted,
    testCases,
    addTestCase,
    removeTestCase,
    runTestCases,
    clear,
    exportCode,
  } = useRegexTester();

  const handleCopy = useCallback((value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleAddTestCase = () => {
    if (newTestCase.name && newTestCase.testString) {
      addTestCase(newTestCase.name, newTestCase.testString, newTestCase.shouldMatch);
      setNewTestCase({ name: "", testString: "", shouldMatch: true });
    }
  };

  return (
    <div
      className={`${isFullscreen ? "h-screen overflow-hidden" : "min-h-screen"} bg-background text-foreground flex flex-col`}
    >
      <Header
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
        title="Regex Tester & Debugger"
        description="Test & debug regular expressions online"
        icon={<Code2 className="w-4 h-4 text-primary-foreground" />}
      />

      <main className={`flex-1 flex ${isFullscreen ? "p-2" : "p-4"} gap-4 w-full max-w-7xl mx-auto`}>
        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => setShowCheatsheet(!showCheatsheet)}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {showCheatsheet ? "Hide" : "Show"} Cheatsheet
            </Button>

            {testCases.length > 0 && (
              <Button onClick={runTestCases} variant="outline" size="sm" className="gap-1.5">
                <Play className="w-3.5 h-3.5" />
                Run Test Cases
              </Button>
            )}

            <Button onClick={clear} variant="ghost" size="sm" className="gap-1.5">
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </Button>

            <div className="flex-1" />

            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Regex Pattern */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <label className="text-sm font-semibold text-muted-foreground">Regular Expression</label>
            <div className="flex items-center gap-2">
              <span className="text-lg text-muted-foreground">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern (e.g., \b\w+@\w+\.\w+\b)"
                className="flex-1 bg-background border border-border rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                spellCheck={false}
              />
              <span className="text-lg text-muted-foreground">/</span>
              <input
                type="text"
                value={flags}
                onChange={(e) => e.target.value}
                readOnly
                className="w-16 bg-background border border-border rounded px-2 py-2 font-mono text-sm text-center"
              />
            </div>

            {/* Flags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">Flags:</span>
              {[
                { flag: "g", label: "Global", desc: "Find all matches" },
                { flag: "i", label: "Ignore Case", desc: "Case insensitive" },
                { flag: "m", label: "Multiline", desc: "^ and $ match line boundaries" },
                { flag: "s", label: "Dot All", desc: ". matches newlines" },
                { flag: "u", label: "Unicode", desc: "Full unicode support" },
                { flag: "y", label: "Sticky", desc: "Match from lastIndex" },
              ].map(({ flag, label, desc }) => (
                <button
                  key={flag}
                  onClick={() => toggleFlag(flag)}
                  className={`px-2 py-1 rounded text-xs border transition-colors ${
                    flags.includes(flag)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-muted-foreground hover:border-primary"
                  }`}
                  title={desc}
                >
                  {flag} - {label}
                </button>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Syntax Error</p>
                  <p className="text-xs mt-1">{error.message}</p>
                </div>
              </div>
            )}
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
            {(["match", "replace"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  mode === m
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "match" ? "Match & Extract" : "Find & Replace"}
              </button>
            ))}
          </div>

          {/* Test String */}
          <div className="bg-card border border-border rounded-lg flex flex-col">
            <div className="p-3 border-b border-border">
              <span className="text-sm font-semibold text-muted-foreground">Test String</span>
            </div>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test against your regex pattern..."
              className="flex-1 w-full bg-background p-3 font-mono text-sm focus:outline-none resize-none min-h-[120px]"
              spellCheck={false}
            />
          </div>

          {/* Replace Text (only in replace mode) */}
          {mode === "replace" && (
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <label className="text-sm font-semibold text-muted-foreground">Replace With</label>
              <input
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Replacement text (use $1, $2 for capture groups)"
                className="w-full bg-background border border-border rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Match Results */}
          {mode === "match" && matches.length > 0 && (
            <div className="bg-card border border-border rounded-lg">
              <div className="p-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-semibold text-emerald-500">
                  {matches.length} Match{matches.length !== 1 ? "es" : ""} Found
                </span>
              </div>

              {/* Highlighted Text */}
              <div className="p-3 border-b border-border">
                <p className="text-xs text-muted-foreground mb-2">Highlighted Text:</p>
                <div className="font-mono text-sm whitespace-pre-wrap break-words bg-background p-3 rounded border border-border">
                  {highlighted.map((part, i) => (
                    <span
                      key={i}
                      className={
                        part.isMatch
                          ? "bg-emerald-500/30 text-emerald-500 font-semibold"
                          : ""
                      }
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Match Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold">#</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold">Match</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold">Position</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold">Groups</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match, i) => (
                      <tr key={i} className="border-t border-border hover:bg-muted/30">
                        <td className="px-3 py-2 text-xs text-muted-foreground">{i + 1}</td>
                        <td className="px-3 py-2 text-sm font-mono font-semibold text-emerald-500">
                          {match.match}
                        </td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">
                          {match.start}-{match.end}
                        </td>
                        <td className="px-3 py-2 text-xs font-mono">
                          {match.groups.length > 0 ? (
                            <div className="space-y-1">
                              {match.groups.map((group, gi) => (
                                <div key={gi} className="text-muted-foreground">
                                  <span className="text-blue-500">Group {gi + 1}:</span> {group || "(empty)"}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground italic">No groups</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Replace Result */}
          {mode === "replace" && testString && (
            <div className="bg-card border border-border rounded-lg">
              <div className="p-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">Result</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleCopy(replaced, "replaced")}
                >
                  {copiedField === "replaced" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
              </div>
              <pre className="p-3 font-mono text-sm whitespace-pre-wrap break-words bg-background">
                {replaced}
              </pre>
            </div>
          )}

          {/* No Matches */}
          {mode === "match" && testString && pattern && !error && matches.length === 0 && (
            <div className="bg-card border border-border rounded-lg p-6 text-center text-muted-foreground">
              No matches found. Try adjusting your regex pattern or test string.
            </div>
          )}

          {/* Export Code */}
          {pattern && (
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Export Code</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(["javascript", "python", "go", "java"] as const).map((lang) => (
                  <Button
                    key={lang}
                    onClick={() => handleCopy(exportCode(lang), `export-${lang}`)}
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                  >
                    {copiedField === `export-${lang}` ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Test Cases */}
          <TestCasesSection
            testCases={testCases}
            newTestCase={newTestCase}
            setNewTestCase={setNewTestCase}
            handleAddTestCase={handleAddTestCase}
            removeTestCase={removeTestCase}
          />
        </div>

        {/* Cheatsheet Sidebar */}
        {showCheatsheet && <CheatsheetSidebar />}
      </main>

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <RegexTesterInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />
    </div>
  );
};

function TestCasesSection({
  testCases,
  newTestCase,
  setNewTestCase,
  handleAddTestCase,
  removeTestCase,
}: {
  testCases: Array<{ id: string; name: string; testString: string; shouldMatch: boolean; passed?: boolean }>;
  newTestCase: { name: string; testString: string; shouldMatch: boolean };
  setNewTestCase: (val: { name: string; testString: string; shouldMatch: boolean }) => void;
  handleAddTestCase: () => void;
  removeTestCase: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-3 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <span className="text-sm font-semibold">
          Test Cases ({testCases.length})
        </span>
        {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="p-4 border-t border-border space-y-4">
          {/* Add Test Case */}
          <div className="space-y-2">
            <input
              type="text"
              value={newTestCase.name}
              onChange={(e) => setNewTestCase({ ...newTestCase, name: e.target.value })}
              placeholder="Test case name"
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              value={newTestCase.testString}
              onChange={(e) => setNewTestCase({ ...newTestCase, testString: e.target.value })}
              placeholder="Test string"
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm font-mono"
            />
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={newTestCase.shouldMatch}
                  onChange={(e) => setNewTestCase({ ...newTestCase, shouldMatch: e.target.checked })}
                />
                Should Match
              </label>
              <Button onClick={handleAddTestCase} size="sm" className="ml-auto gap-1.5">
                <Plus className="w-3 h-3" />
                Add Test Case
              </Button>
            </div>
          </div>

          {/* Test Cases List */}
          {testCases.length > 0 && (
            <div className="space-y-2">
              {testCases.map((tc) => (
                <div
                  key={tc.id}
                  className={`p-3 rounded border ${
                    tc.passed === true
                      ? "bg-emerald-500/10 border-emerald-500"
                      : tc.passed === false
                      ? "bg-red-500/10 border-red-500"
                      : "bg-background border-border"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{tc.name}</p>
                      <p className="text-xs font-mono text-muted-foreground mt-1">
                        {tc.testString}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Should {tc.shouldMatch ? "match" : "not match"}
                        {tc.passed !== undefined && (
                          <span className={tc.passed ? "text-emerald-500" : "text-red-500"}>
                            {" • "}
                            {tc.passed ? "Passed ✓" : "Failed ✗"}
                          </span>
                        )}
                      </p>
                    </div>
                    <Button
                      onClick={() => removeTestCase(tc.id)}
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CheatsheetSidebar() {
  return (
    <div className="w-80 bg-card border border-border rounded-lg p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
      <h3 className="font-semibold">Regex Cheatsheet</h3>

      <CheatsheetSection
        title="Character Classes"
        items={[
          { pattern: ".", desc: "Any character except newline" },
          { pattern: "\\w", desc: "Word character [a-zA-Z0-9_]" },
          { pattern: "\\d", desc: "Digit [0-9]" },
          { pattern: "\\s", desc: "Whitespace" },
          { pattern: "\\W", desc: "Not word character" },
          { pattern: "\\D", desc: "Not digit" },
          { pattern: "\\S", desc: "Not whitespace" },
        ]}
      />

      <CheatsheetSection
        title="Anchors"
        items={[
          { pattern: "^", desc: "Start of string/line" },
          { pattern: "$", desc: "End of string/line" },
          { pattern: "\\b", desc: "Word boundary" },
          { pattern: "\\B", desc: "Not word boundary" },
        ]}
      />

      <CheatsheetSection
        title="Quantifiers"
        items={[
          { pattern: "*", desc: "0 or more" },
          { pattern: "+", desc: "1 or more" },
          { pattern: "?", desc: "0 or 1" },
          { pattern: "{n}", desc: "Exactly n times" },
          { pattern: "{n,}", desc: "n or more times" },
          { pattern: "{n,m}", desc: "Between n and m times" },
        ]}
      />

      <CheatsheetSection
        title="Groups"
        items={[
          { pattern: "(abc)", desc: "Capture group" },
          { pattern: "(?:abc)", desc: "Non-capturing group" },
          { pattern: "(?<name>abc)", desc: "Named capture group" },
          { pattern: "a|b", desc: "Alternation (OR)" },
        ]}
      />

      <CheatsheetSection
        title="Lookaround"
        items={[
          { pattern: "(?=abc)", desc: "Positive lookahead" },
          { pattern: "(?!abc)", desc: "Negative lookahead" },
          { pattern: "(?<=abc)", desc: "Positive lookbehind" },
          { pattern: "(?<!abc)", desc: "Negative lookbehind" },
        ]}
      />

      <CheatsheetSection
        title="Special"
        items={[
          { pattern: "\\", desc: "Escape special character" },
          { pattern: "\\t", desc: "Tab" },
          { pattern: "\\n", desc: "Newline" },
          { pattern: "\\r", desc: "Carriage return" },
        ]}
      />
    </div>
  );
}

function CheatsheetSection({ title, items }: { title: string; items: Array<{ pattern: string; desc: string }> }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">{title}</h4>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-primary flex-shrink-0">
              {item.pattern}
            </code>
            <span className="text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegexTesterComponent;

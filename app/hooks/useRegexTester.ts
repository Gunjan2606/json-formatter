"use client";

import { useState, useCallback, useMemo } from "react";

export interface RegexMatch {
  index: number;
  match: string;
  groups: string[];
  namedGroups?: Record<string, string>;
  start: number;
  end: number;
}

export interface RegexError {
  message: string;
  type: "syntax" | "runtime";
}

export interface TestCase {
  id: string;
  name: string;
  testString: string;
  shouldMatch: boolean;
  passed?: boolean;
}

export function useRegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [mode, setMode] = useState<"match" | "replace">("match");
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  // Parse and validate regex
  const regex = useMemo(() => {
    if (!pattern) return null;
    try {
      return new RegExp(pattern, flags);
    } catch {
      return null;
    }
  }, [pattern, flags]);

  const error = useMemo((): RegexError | null => {
    if (!pattern) return null;
    try {
      new RegExp(pattern, flags);
      return null;
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : "Invalid regex pattern",
        type: "syntax",
      };
    }
  }, [pattern, flags]);

  // Find all matches
  const matches = useMemo((): RegexMatch[] => {
    if (!regex || !testString) return [];

    const results: RegexMatch[] = [];
    const globalRegex = new RegExp(regex.source, flags.includes("g") ? flags : flags + "g");

    let match: RegExpExecArray | null;
    let iteration = 0;
    const maxIterations = 10000; // Prevent infinite loops

    while ((match = globalRegex.exec(testString)) !== null && iteration < maxIterations) {
      results.push({
        index: results.length,
        match: match[0],
        groups: match.slice(1),
        namedGroups: match.groups,
        start: match.index,
        end: match.index + match[0].length,
      });
      iteration++;

      // Prevent infinite loop on zero-length matches
      if (match.index === globalRegex.lastIndex) {
        globalRegex.lastIndex++;
      }
    }

    return results;
  }, [regex, testString, flags]);

  // Replace preview
  const replaced = useMemo(() => {
    if (!regex || !testString || mode !== "replace") return "";
    try {
      return testString.replace(regex, replaceText);
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : "Replace failed"}`;
    }
  }, [regex, testString, replaceText, mode]);

  // Highlighted test string
  const highlighted = useMemo(() => {
    if (!matches.length || !testString) return [];

    const parts: Array<{ text: string; isMatch: boolean; groupIndex?: number }> = [];
    let lastIndex = 0;

    matches.forEach((match) => {
      // Add text before match
      if (match.start > lastIndex) {
        parts.push({
          text: testString.substring(lastIndex, match.start),
          isMatch: false,
        });
      }

      // Add match
      parts.push({
        text: match.match,
        isMatch: true,
        groupIndex: match.index,
      });

      lastIndex = match.end;
    });

    // Add remaining text
    if (lastIndex < testString.length) {
      parts.push({
        text: testString.substring(lastIndex),
        isMatch: false,
      });
    }

    return parts;
  }, [matches, testString]);

  // Flag helpers
  const toggleFlag = useCallback((flag: string) => {
    setFlags((prev) => {
      if (prev.includes(flag)) {
        return prev.replace(flag, "");
      }
      return prev + flag;
    });
  }, []);

  // Test case management
  const addTestCase = useCallback(
    (name: string, testStr: string, shouldMatch: boolean) => {
      const newCase: TestCase = {
        id: `${Date.now()}-${Math.random()}`,
        name,
        testString: testStr,
        shouldMatch,
      };
      setTestCases((prev) => [...prev, newCase]);
    },
    []
  );

  const removeTestCase = useCallback((id: string) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
  }, []);

  const runTestCases = useCallback(() => {
    if (!regex) return;

    setTestCases((prev) =>
      prev.map((testCase) => {
        const testRegex = new RegExp(regex.source, flags);
        const hasMatch = testRegex.test(testCase.testString);
        const passed = hasMatch === testCase.shouldMatch;
        return { ...testCase, passed };
      })
    );
  }, [regex, flags]);

  // Clear all
  const clear = useCallback(() => {
    setPattern("");
    setTestString("");
    setReplaceText("");
  }, []);

  // Export code
  const exportCode = useCallback(
    (language: "javascript" | "python" | "go" | "java") => {
      const escapedPattern = pattern.replace(/\\/g, "\\\\");

      switch (language) {
        case "javascript":
          return `const regex = /${pattern}/${flags};\nconst matches = "${testString}".match(regex);`;

        case "python":
          return `import re\nregex = re.compile(r"${escapedPattern}", ${getPythonFlags(flags)})\nmatches = regex.findall("${testString}")`;

        case "go":
          return `import "regexp"\nregex := regexp.MustCompile(\`${escapedPattern}\`)\nmatches := regex.FindAllString("${testString}", -1)`;

        case "java":
          return `import java.util.regex.*;\nPattern pattern = Pattern.compile("${escapedPattern}");\nMatcher matcher = pattern.matcher("${testString}");`;

        default:
          return "";
      }
    },
    [pattern, flags, testString]
  );

  return {
    pattern,
    setPattern,
    flags,
    setFlags,
    toggleFlag,
    testString,
    setTestString,
    replaceText,
    setReplaceText,
    mode,
    setMode,
    regex,
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
  };
}

function getPythonFlags(flags: string): string {
  const pythonFlags: string[] = [];
  if (flags.includes("i")) pythonFlags.push("re.IGNORECASE");
  if (flags.includes("m")) pythonFlags.push("re.MULTILINE");
  if (flags.includes("s")) pythonFlags.push("re.DOTALL");
  return pythonFlags.length > 0 ? pythonFlags.join(" | ") : "0";
}

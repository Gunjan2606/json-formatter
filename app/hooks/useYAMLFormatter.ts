import { useState, useCallback } from "react";
import { useToast } from "./use-toast";
import * as yaml from "js-yaml";

const DEFAULT_YAML = `name: John Doe
age: 30
email: john@example.com
address:
  street: 123 Main St
  city: New York
  zip: 10001
hobbies:
  - reading
  - coding
  - hiking`;

const formatYAML = (yamlText: string): string => {
  try {
    // Parse and re-stringify to format
    const obj = yaml.load(yamlText);
    return yaml.dump(obj, {
      indent: 2,
      lineWidth: 80,
      noRefs: true,
      sortKeys: false,
    });
  } catch (err) {
    throw err;
  }
};

const minifyYAML = (yamlText: string): string => {
  try {
    // Parse and re-stringify with minimal formatting
    const obj = yaml.load(yamlText);
    
    // Use flowLevel: 0 to use flow style for top-level collections
    // This keeps arrays inline like [item1, item2, item3]
    const result = yaml.dump(obj, {
      flowLevel: 0, // Use flow style for top-level collections
      lineWidth: -1, // Disable line wrapping
      noRefs: true,
      sortKeys: false,
    });
    
    // Clean up: remove extra blank lines and trailing spaces
    return result
      .split('\n')
      .map((line: string) => line.trimEnd())
      .filter((line: string, index: number, arr: string[]) => {
        // Remove consecutive empty lines
        if (line === '' && arr[index + 1] === '') return false;
        return true;
      })
      .join('\n')
      .trim();
  } catch (err) {
    throw err;
  }
};

const validateYAML = (yamlText: string) => {
  try {
    yaml.load(yamlText);
  } catch (err) {
    if (err instanceof yaml.YAMLException) {
      throw new Error(err.message);
    }
    throw err;
  }
};

export const useYAMLFormatter = () => {
  const [input, setInput] = useState(DEFAULT_YAML);
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [isMinified, setIsMinified] = useState(false);
  const { toast } = useToast();

  const processYAML = useCallback(
    (minify = false) => {
      if (!input.trim()) {
        toast({
          title: "No Input",
          description: "Please paste or upload YAML data to format.",
          variant: "destructive",
        });
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        validateYAML(input);
        const result = minify ? minifyYAML(input) : formatYAML(input);
        setOutput(result);
        setIsMinified(minify);
        toast({
          title: minify ? "YAML Minified" : "YAML Formatted",
          description: minify ? "Whitespace removed successfully." : "YAML formatted with proper indentation.",
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid YAML";
        setError({ message });
        toast({
          title: "Invalid YAML",
          description: message,
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [input, toast]
  );

  return {
    input,
    setInput,
    output,
    setOutput,
    isProcessing,
    error,
    setError,
    isMinified,
    processYAML,
  };
};


import { useState, useCallback } from "react";
import { useToast } from "./use-toast";

const DEFAULT_CSV = `name,age,email,city
John Doe,30,john@example.com,New York
Jane Smith,25,jane@example.com,Los Angeles
Bob Johnson,35,bob@example.com,Chicago`;

const parseCSV = (csvText: string): string[][] => {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      currentRow.push(currentField.trim());
      currentField = "";
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      // Row separator
      if (currentField || currentRow.length > 0) {
        currentRow.push(currentField.trim());
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
      }
      // Skip \r\n combination
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
    } else {
      currentField += char;
    }
  }

  // Add last field and row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }

  return rows.filter(row => row.some(cell => cell.length > 0));
};

const formatCSV = (csvText: string): string => {
  try {
    const rows = parseCSV(csvText);
    if (rows.length === 0) return "";

    // Format rows properly - check if cells contain JSON and format them
    return rows.map(row => {
      return row.map(cell => {
        // Try to parse as JSON
        let formattedCell = cell;
        try {
          const parsed = JSON.parse(cell);
          // If it's valid JSON, format it with indentation
          formattedCell = JSON.stringify(parsed, null, 2);
        } catch {
          // Not JSON, leave as plain text
          formattedCell = cell;
        }

        // Determine if quotes are needed (always needed for formatted JSON with newlines)
        const needsQuotes = formattedCell.includes(',') || formattedCell.includes('"') || formattedCell.includes('\n') || formattedCell.trim() !== formattedCell;
        // Escape quotes by doubling them
        const escaped = needsQuotes ? `"${formattedCell.replace(/"/g, '""')}"` : formattedCell;
        return escaped;
      }).join(','); // Use standard CSV separator (comma only, no space)
    }).join('\n');
  } catch (err) {
    throw new Error("Failed to format CSV: " + (err instanceof Error ? err.message : "Unknown error"));
  }
};

const minifyCSV = (csvText: string): string => {
  try {
    const rows = parseCSV(csvText);
    return rows.map(row => {
      return row.map(cell => {
        // Try to parse as JSON and minify it
        let minifiedCell = cell;
        try {
          const parsed = JSON.parse(cell);
          // If it's valid JSON, minify it (remove formatting)
          minifiedCell = JSON.stringify(parsed);
        } catch {
          // Not JSON, leave as plain text
          minifiedCell = cell;
        }

        // Determine if quotes are needed
        const needsQuotes = minifiedCell.includes(',') || minifiedCell.includes('"') || minifiedCell.includes('\n');
        return needsQuotes ? `"${minifiedCell.replace(/"/g, '""')}"` : minifiedCell;
      }).join(',');
    }).join('\n');
  } catch (err) {
    throw new Error("Failed to minify CSV: " + (err instanceof Error ? err.message : "Unknown error"));
  }
};

const validateCSV = (csvText: string) => {
  try {
    parseCSV(csvText);
  } catch (err) {
    throw new Error("Invalid CSV: " + (err instanceof Error ? err.message : "Parse error"));
  }
};

export const useCSVFormatter = () => {
  const [input, setInput] = useState(DEFAULT_CSV);
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [isMinified, setIsMinified] = useState(false);
  const { toast } = useToast();

  const processCSV = useCallback(
    (minify = false) => {
      if (!input.trim()) {
        toast({
          title: "No Input",
          description: "Please paste or upload CSV data to format.",
          variant: "destructive",
        });
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        validateCSV(input);
        const result = minify ? minifyCSV(input) : formatCSV(input);
        setOutput(result);
        setIsMinified(minify);
        toast({
          title: minify ? "CSV Minified" : "CSV Formatted",
          description: minify ? "Whitespace removed successfully." : "CSV formatted with proper alignment.",
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid CSV";
        setError({ message });
        toast({
          title: "Invalid CSV",
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
    processCSV,
  };
};


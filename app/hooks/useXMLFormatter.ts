import { useState, useCallback } from "react";
import { useToast } from "./use-toast";

const DEFAULT_XML = `<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`;

const formatXMLString = (xml: string, indent = "  "): string => {
  const reg = /(>)(<)(\/*)/g;
  let formatted = "";
  let pad = 0;
  xml = xml.replace(/\r\n/g, "\n").replace(reg, "$1\n$2$3");
  const nodes = xml.split("\n").filter((node) => node.trim());

  for (const node of nodes) {
    let indentLevel = pad;

    if (node.match(/^<\/.+>/)) {
      indentLevel = Math.max(pad - 1, 0);
    } else if (node.match(/^<[^!?].*\/>$/)) {
      // self-closing tag, keep indent
    } else if (node.match(/^<[^!?].*>$/) && !node.includes("</")) {
      pad += 1;
    }

    formatted += `${indent.repeat(indentLevel)}${node.trim()}\n`;

    if (node.match(/^<\/.+>/)) {
      pad = Math.max(pad - 1, 0);
    }
  }

  return formatted.trim();
};

const minifyXMLString = (xml: string): string => {
  return xml
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
};

const validateXML = (xml: string) => {
  if (typeof window === "undefined" || typeof window.DOMParser === "undefined") {
    return;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  const errors = doc.getElementsByTagName("parsererror");
  if (errors.length > 0) {
    throw new Error(errors[0].textContent || "Invalid XML structure");
  }
};

export const useXMLFormatter = () => {
  const [input, setInput] = useState(DEFAULT_XML);
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [isMinified, setIsMinified] = useState(false);
  const { toast } = useToast();

  const processXML = useCallback(
    (minify = false) => {
      if (!input.trim()) {
        toast({
          title: "No Input",
          description: "Please paste or upload XML data to format.",
          variant: "destructive",
        });
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        validateXML(input);
        const result = minify ? minifyXMLString(input) : formatXMLString(input);
        setOutput(result);
        setIsMinified(minify);
        toast({
          title: minify ? "XML Minified" : "XML Formatted",
          description: minify ? "Whitespace removed successfully." : "XML formatted with proper indentation.",
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid XML";
        setError({ message });
        toast({
          title: "Invalid XML",
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
    processXML,
  };
};



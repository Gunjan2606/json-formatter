"use client";

import { Code, FileCode, Shield, Zap, ArrowLeftRight } from "lucide-react";

export const JSONCSVInfoSections = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-primary" />
          JSON to CSV Converter
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Convert between JSON and CSV formats instantly with our powerful, browser-based 
          converter. Designed with developers and data engineers in mind, this tool delivers 
          lightning-fast conversion, proper handling of nested data, and 100% client-side 
          processing to keep your data secure. Whether you&apos;re converting API responses 
          to spreadsheets, transforming data exports, or migrating between formats, the 
          converter handles everything smoothly without slowing down your machine.
          <br/>
          Built on the same high-performance core as our industry-leading formatters, the 
          JSON/CSV converter ensures precise conversion, proper handling of nested objects 
          and arrays, and automatic flattening of complex structures. It&apos;s perfect for 
          exporting JSON data to Excel, importing CSV into applications, or transforming 
          data between formats.
          <br/>
          With support for bidirectional conversion, copy/paste input, file uploads, and 
          instant transformation, this JSON/CSV converter becomes an essential part of any 
          developer&apos;s workflow. No installations, no backend requests, no data tracking—just 
          fast, secure, and reliable format conversion right from your browser.
          <br/>
          Optimize your productivity with a clean UI, blazing performance, and robust conversion 
          capabilities—built to handle even the most complex data structures with ease.
        </p>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Key capabilities
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">JSON to CSV:</strong> Convert JSON arrays 
            and objects to CSV format with proper header generation and nested data handling.
          </li>
          <li>
            <strong className="text-foreground">CSV to JSON:</strong> Convert CSV files 
            to JSON arrays with automatic type detection and proper structure.
          </li>
          <li>
            <strong className="text-foreground">Bidirectional:</strong> Easily switch 
            between formats with a single click using the swap button.
          </li>
          <li>
            <strong className="text-foreground">Nested data:</strong> Handles complex nested 
            objects and arrays by flattening or preserving structure as needed.
          </li>
        </ul>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          Privacy & reliability
        </h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            Just like our other formatters, the JSON/CSV converter experience is completely 
            local—no uploads, no external APIs, no telemetry. Your data never leaves your 
            machine, making it safe for sensitive data, confidential exports, or private information.
          </p>
          <p>
            Robust conversion provides accurate transformations so you can confidently convert 
            between formats without data loss.
          </p>
        </div>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          Quick how-to
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Paste or upload JSON or CSV data into the input editor.</li>
          <li>Click <strong>JSON to CSV</strong> or <strong>CSV to JSON</strong> to convert.</li>
          <li>Use the <strong>Swap</strong> button to exchange input and output.</li>
          <li>Copy, download, or save the converted output.</li>
        </ol>
      </section>
    </div>
  );
};


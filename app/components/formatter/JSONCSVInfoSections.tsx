"use client";

import { FileCode, Shield, Zap, ArrowLeftRight } from "lucide-react";

export const JSONCSVInfoSections = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Main Section with Primary Keyword in H2 */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-primary" />
          Free Online JSON to CSV Converter
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Convert between JSON and CSV formats instantly with our powerful, browser-based 
          JSON to CSV converter. Designed with developers and data engineers in mind, this 
          tool delivers lightning-fast conversion, proper handling of nested data, and 
          100% client-side processing to keep your data secure. Whether you&apos;re converting 
          API responses to spreadsheets, transforming data exports, or migrating between 
          formats, the JSON to CSV converter handles everything smoothly without slowing 
          down your machine.
          <br/><br/>
          Built on the same high-performance core as our industry-leading formatters, the 
          JSON/CSV converter ensures precise conversion, proper handling of nested objects 
          and arrays, and automatic flattening of complex structures. It&apos;s perfect for 
          exporting JSON data to Excel, importing CSV into applications, or transforming 
          data between formats.
          <br/><br/>
          With support for bidirectional conversion, copy/paste input, file uploads, and 
          instant transformation, this JSON to CSV converter becomes an essential part of 
          any developer&apos;s workflow. No installations, no backend requests, no data tracking — 
          just fast, secure, and reliable format conversion right from your browser.
          <br/><br/>
          Optimize your productivity with a clean UI, blazing performance, and robust 
          conversion capabilities — built to handle even the most complex data structures 
          with ease. Whether you need to convert large JSON datasets or prepare CSV files 
          for reporting tools, this free online JSON to CSV converter is the fastest and 
          most reliable solution available.
        </p>
      </section>

      {/* Key Capabilities */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Key Capabilities of the JSON to CSV Converter
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">JSON to CSV conversion:</strong> Convert 
            JSON arrays and objects to clean CSV format with proper header generation and 
            smart handling of nested data.
          </li>
          <li>
            <strong className="text-foreground">CSV to JSON conversion:</strong> Transform 
            CSV files back into structured JSON arrays with automatic type detection.
          </li>
          <li>
            <strong className="text-foreground">Bidirectional support:</strong> Switch 
            between JSON and CSV formats instantly with the swap button.
          </li>
          <li>
            <strong className="text-foreground">Nested data handling:</strong> Automatically 
            flattens or preserves complex nested objects and arrays.
          </li>
          <li>
            <strong className="text-foreground">Large file support:</strong> Handles big 
            JSON and CSV files quickly with no performance issues.
          </li>
          <li>
            <strong className="text-foreground">100% client-side:</strong> All processing 
            happens in your browser — no data ever leaves your device.
          </li>
        </ul>
      </section>

      {/* Privacy & Reliability */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          Privacy & Reliability
        </h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            Just like all tools on jsonformatter.gg, the JSON to CSV converter runs completely 
            locally in your browser — no uploads, no external APIs, no telemetry. Your data 
            never leaves your machine, making it safe for sensitive data, confidential exports, 
            or private business information.
          </p>
          <p>
            Every conversion is accurate and lossless, so you can confidently use the output 
            in production workflows without worrying about data corruption or formatting errors.
          </p>
        </div>
      </section>

      {/* Quick How-To */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          How to Use the JSON to CSV Converter
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Paste your JSON or CSV data into the input editor or upload a .json / .csv file.</li>
          <li>Select the direction: <strong>JSON to CSV</strong> or <strong>CSV to JSON</strong>.</li>
          <li>Click the Convert button — results appear instantly.</li>
          <li>Use the <strong>Swap</strong> button to exchange input and output.</li>
          <li>Copy the result, download as a file, or clear the editor to start over.</li>
        </ol>
      </section>
    </div>
  );
};

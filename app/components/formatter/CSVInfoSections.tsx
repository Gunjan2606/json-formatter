"use client";

import { Code, FileCode, Shield, Zap, Table } from "lucide-react";

export const CSVInfoSections = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Table className="w-5 h-5 text-primary" />
          CSV Formatter
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Format, validate, beautify, and minify CSV files instantly with our powerful, browser-based 
          CSV Formatter. Designed with developers and data analysts in mind, this tool delivers 
          lightning-fast performance, clean formatting, and 100% client-side processing to keep your 
          data secure. Whether you&apos;re working with data exports, spreadsheets, or tabular data, 
          the formatter handles everything smoothly without slowing down your machine.
          <br/>
          Built on the same high-performance core as our industry-leading JSON and XML formatters, the 
          CSV tool ensures precise formatting, real-time validation, and automatic column alignment. 
          It&apos;s perfect for cleaning data exports, formatting spreadsheets, analyzing tabular data, 
          or simply making unreadable CSV human-friendly.
          <br/>
          With support for copy/paste input, file uploads, column alignment, and instant beautification, 
          this CSV Formatter becomes an essential part of any developer&apos;s workflow. No installations, 
          no backend requests, no data tracking—just fast, secure, and reliable CSV formatting right from 
          your browser.
          <br/>
          Optimize your productivity with a clean UI, blazing performance, and robust CSV parsing 
          capabilities—built to handle even the largest datasets with ease.
        </p>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Key capabilities
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Smart formatting:</strong> Applies proper column 
            alignment, handles quoted fields, and restructures compact CSV for human-friendly review.
          </li>
          <li>
            <strong className="text-foreground">Lossless minify:</strong> Remove unnecessary whitespace 
            and line breaks for production files without touching data.
          </li>
          <li>
            <strong className="text-foreground">Streaming uploads:</strong> Drag and drop `.csv` files 
            up to 30MB+ and process them entirely in-browser.
          </li>
          <li>
            <strong className="text-foreground">History & downloads:</strong> Save formatted snippets 
            locally, rename them, and re-download in one click.
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
            Just like the JSON, XML, and YAML formatters, the CSV experience is completely local—no 
            uploads, no external APIs, no telemetry. Your CSV data never leaves your machine, making 
            it safe for confidential data, large exports, or sensitive information.
          </p>
          <p>
            Robust validation highlights malformed CSV using friendly error messages so you can resolve 
            issues before processing data.
          </p>
        </div>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          Quick how-to
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Paste or upload CSV into the editor on the left.</li>
          <li>Click <strong>Format</strong> for pretty print or <strong>Minify</strong> to compress.</li>
          <li>Copy, download, or save the output to revisit it later.</li>
        </ol>
      </section>
    </div>
  );
};


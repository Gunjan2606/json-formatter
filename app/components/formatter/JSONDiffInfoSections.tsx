"use client";

import { FileCode, Shield, Zap, GitCompare } from "lucide-react";

export const JSONDiffInfoSections = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-primary" />
          JSON Diff Tool
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Compare and diff JSON objects instantly with our powerful, browser-based 
          diff tool. Designed with developers and data engineers in mind, this tool delivers 
          lightning-fast comparison, visual difference highlighting, and 100% client-side 
          processing to keep your data secure. Whether you&apos;re comparing API responses, 
          configuration files, or data structures, the diff tool handles everything smoothly 
          without slowing down your machine.
          <br/>
          Built on the same high-performance core as our industry-leading JSON formatter, the 
          JSON Diff Tool ensures precise comparison, real-time difference detection, and 
          comprehensive change visualization. It&apos;s perfect for debugging API changes, 
          tracking configuration modifications, reviewing data updates, or identifying 
          discrepancies between JSON documents.
          <br/>
          With support for side-by-side comparison, copy/paste input, file uploads, and 
          detailed change highlighting, this JSON Diff Tool becomes an essential part of any 
          developer&apos;s workflow. No installations, no backend requests, no data tracking—just 
          fast, secure, and reliable JSON comparison right from your browser.
          <br/>
          Optimize your productivity with a clean UI, blazing performance, and robust diff 
          capabilities—built to handle even the most complex JSON structures with ease.
        </p>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Key capabilities
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Visual diff:</strong> Side-by-side comparison 
            with color-coded additions, deletions, and modifications for easy identification.
          </li>
          <li>
            <strong className="text-foreground">Deep comparison:</strong> Compare nested objects 
            and arrays with detailed path information for each difference.
          </li>
          <li>
            <strong className="text-foreground">Change summary:</strong> Get a comprehensive list 
            of all changes including added, removed, and modified properties.
          </li>
          <li>
            <strong className="text-foreground">File support:</strong> Upload JSON files directly, 
            or paste JSON from your clipboard for quick comparison.
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
            Just like our other formatters, the JSON Diff Tool experience is completely local—no 
            uploads, no external APIs, no telemetry. Your JSON data never leaves your machine, 
            making it safe for sensitive configurations, private API responses, or confidential data.
          </p>
          <p>
            Accurate comparison provides clear, actionable insights so you can quickly identify 
            and understand changes between JSON documents.
          </p>
        </div>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          Quick how-to
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Enter or paste your first JSON in the left editor.</li>
          <li>Enter or paste your second JSON in the right editor.</li>
          <li>Click <strong>Compare</strong> to see the differences highlighted.</li>
          <li>Review the diff results and change summary below.</li>
        </ol>
      </section>
    </div>
  );
};


"use client";

import { Code, FileCode, Shield, Zap } from "lucide-react";

export const YAMLInfoSections = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          YAML Formatter
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Format, validate, beautify, and minify YAML instantly with our powerful, browser-based 
          YAML Formatter. Designed with developers and DevOps engineers in mind, this tool delivers 
          lightning-fast performance, clean formatting, and 100% client-side processing to keep your 
          data secure. Whether you&apos;re working with configuration files, CI/CD pipelines, or 
          Kubernetes manifests, the formatter handles everything smoothly without slowing down your machine.
          <br/>
          Built on the same high-performance core as our industry-leading JSON and XML formatters, the 
          YAML tool ensures precise indentation, real-time error detection, syntax highlighting, and 
          automatic structural validation. It&apos;s perfect for debugging configurations, editing large 
          YAML files, analyzing manifests, or simply making unreadable YAML human-friendly.
          <br/>
          With support for copy/paste input, file uploads, collapsible nodes, minification, and instant 
          beautification, this YAML Formatter becomes an essential part of any developer&apos;s workflow. 
          No installations, no backend requests, no data tracking—just fast, secure, and reliable YAML 
          formatting right from your browser.
          <br/>
          Optimize your productivity with a clean UI, blazing performance, and robust YAML parsing 
          capabilities—built to handle even the heaviest datasets with ease.
        </p>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Key capabilities
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Smart formatting:</strong> Applies proper indentation, 
            keeps structure aligned, and restructures compact YAML for human-friendly review.
          </li>
          <li>
            <strong className="text-foreground">Lossless minify:</strong> Remove whitespace and line 
            breaks for production configs without touching data.
          </li>
          <li>
            <strong className="text-foreground">Streaming uploads:</strong> Drag and drop `.yaml` or `.yml` 
            files up to 30MB+ and process them entirely in-browser.
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
            Just like the JSON and XML formatters, the YAML experience is completely local—no uploads, 
            no external APIs, no telemetry. Your YAML never leaves your machine, making it safe for 
            confidential configs, large manifests, or sensitive data.
          </p>
          <p>
            Robust validation highlights malformed YAML using friendly error cards so you can resolve 
            issues before deploying configurations.
          </p>
        </div>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          Quick how-to
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Paste or upload YAML into the editor on the left.</li>
          <li>Click <strong>Format</strong> for pretty print or <strong>Minify</strong> to compress.</li>
          <li>Copy, download, or save the output to revisit it later.</li>
        </ol>
      </section>
    </div>
  );
};


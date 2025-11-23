"use client";

import { Code, FileCode, Shield, Zap, CheckCircle } from "lucide-react";

export const JSONSchemaInfoSections = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          JSON Schema Validator
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Validate JSON data against JSON Schema instantly with our powerful, browser-based 
          validator. Designed with developers and API engineers in mind, this tool delivers 
          lightning-fast validation, detailed error reporting, and 100% client-side processing 
          to keep your data secure. Whether you&apos;re validating API responses, configuration 
          files, or data structures, the validator handles everything smoothly without slowing 
          down your machine.
          <br/>
          Built on the same high-performance core as our industry-leading JSON and XML 
          formatters, the JSON Schema Validator ensures precise validation, real-time error 
          detection, and comprehensive compliance checking. It&apos;s perfect for validating API 
          contracts, ensuring data integrity, testing schema compliance, or debugging validation 
          issues.
          <br/>
          With support for JSON Schema Draft 7, copy/paste input, file uploads, and instant 
          validation results, this JSON Schema Validator becomes an essential part of any 
          developer&apos;s workflow. No installations, no backend requests, no data tracking—just 
          fast, secure, and reliable JSON Schema validation right from your browser.
          <br/>
          Optimize your productivity with a clean UI, blazing performance, and robust validation 
          capabilities—built to handle even the most complex schemas with ease.
        </p>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Key capabilities
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Schema validation:</strong> Validate JSON data 
            against JSON Schema Draft 7 with comprehensive error reporting and detailed messages.
          </li>
          <li>
            <strong className="text-foreground">Dual input:</strong> Separate editors for JSON Schema 
            and JSON data, making it easy to test multiple data sets against the same schema.
          </li>
          <li>
            <strong className="text-foreground">Error details:</strong> Get detailed validation errors 
            with paths, messages, and suggestions for fixing issues.
          </li>
          <li>
            <strong className="text-foreground">File support:</strong> Upload schema and data files 
            directly, or paste JSON from your clipboard.
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
            Just like our other formatters, the JSON Schema Validator experience is completely local—no 
            uploads, no external APIs, no telemetry. Your schemas and data never leave your machine, 
            making it safe for sensitive configurations, private API contracts, or confidential data.
          </p>
          <p>
            Robust validation provides clear, actionable error messages so you can quickly identify 
            and fix schema compliance issues.
          </p>
        </div>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          Quick how-to
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Enter your JSON Schema in the Schema editor (left side).</li>
          <li>Enter the JSON data to validate in the Data editor (right side).</li>
          <li>Click <strong>Validate</strong> to check if the data conforms to the schema.</li>
          <li>Review validation results and fix any errors shown.</li>
        </ol>
      </section>
    </div>
  );
};


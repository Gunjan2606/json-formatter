"use client";

import { FileCode, Shield, Zap, Lock } from "lucide-react";

export const Base64InfoSections = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Base64 Encoder/Decoder
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Encode and decode Base64 strings instantly with our powerful, browser-based 
          Base64 tool. Designed with developers and security professionals in mind, this 
          tool delivers lightning-fast performance, clean encoding/decoding, and 100% 
          client-side processing to keep your data secure. Whether you&apos;re working 
          with small text snippets or large binary files, the encoder handles everything 
          smoothly without slowing down your machine.
          <br/>
          Built on the same high-performance core as our industry-leading JSON and XML 
          formatters, the Base64 tool ensures precise encoding, real-time validation, 
          and automatic error detection. It&apos;s perfect for encoding API credentials, 
          embedding binary data in JSON, preparing data for transmission, or decoding 
          Base64-encoded content from various sources.
          <br/>
          With support for text input, file uploads, copy/paste operations, and instant 
          encoding/decoding, this Base64 Encoder/Decoder becomes an essential part of any 
          developer&apos;s workflow. No installations, no backend requests, no data tracking—just 
          fast, secure, and reliable Base64 operations right from your browser.
          <br/>
          Optimize your productivity with a clean UI, blazing performance, and robust 
          Base64 encoding capabilities—built to handle even the largest datasets with ease.
        </p>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Key capabilities
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Smart encoding:</strong> Convert text, 
            binary files, and data to Base64 format with proper padding and formatting.
          </li>
          <li>
            <strong className="text-foreground">Accurate decoding:</strong> Decode Base64 
            strings back to original text or binary data with automatic validation.
          </li>
          <li>
            <strong className="text-foreground">File support:</strong> Upload files directly 
            and encode them to Base64, or decode Base64 strings back to downloadable files.
          </li>
          <li>
            <strong className="text-foreground">History & downloads:</strong> Save encoded/decoded 
            snippets locally, rename them, and re-download in one click.
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
            Just like our other formatters, the Base64 experience is completely local—no uploads, 
            no external APIs, no telemetry. Your data never leaves your machine, making it safe 
            for sensitive credentials, confidential files, or private data.
          </p>
          <p>
            Robust validation highlights invalid Base64 strings using friendly error messages 
            so you can resolve issues before using the encoded/decoded data.
          </p>
        </div>
      </section>

      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" />
          Quick how-to
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Paste text or upload a file into the editor on the left.</li>
          <li>Click <strong>Encode</strong> to convert to Base64 or <strong>Decode</strong> to convert from Base64.</li>
          <li>Copy, download, or save the output to revisit it later.</li>
        </ol>
      </section>
    </div>
  );
};


import { FileJson, Twitter, Github } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  isFullscreen: boolean;
}

export const Footer = ({ isFullscreen }: FooterProps) => {
  if (isFullscreen) return null;

  return (
    <footer className="border-t border-border bg-card flex-shrink-0">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity group">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-accent group-hover:scale-110 transition-transform">
                <FileJson className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">jsonformatter.gg</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The best free online JSON formatter and developer tools. Format, validate, and process data with privacy-first, client-side tools.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://x.com/json__gg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* JSON & Data Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">JSON & Data</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/json-schema-validator" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  JSON Schema Validator
                </Link>
              </li>
              <li>
                <Link href="/json-diff" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  JSON Diff
                </Link>
              </li>
              <li>
                <Link href="/json-csv-converter" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  JSON to CSV
                </Link>
              </li>
              <li>
                <Link href="/xml-formatter" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  XML Formatter
                </Link>
              </li>
              <li>
                <Link href="/yaml-formatter" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  YAML Formatter
                </Link>
              </li>
              <li>
                <Link href="/csv-formatter" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  CSV Formatter
                </Link>
              </li>
              <li>
                <Link href="/base64-encoder" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Base64 Encoder
                </Link>
              </li>
              <li>
                <Link href="/text-diff" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Text Diff
                </Link>
              </li>
            </ul>
          </div>

          {/* Image & Design Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Image & Design</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/image-compressor" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link href="/watermark-tool" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Watermark Tool
                </Link>
              </li>
              <li>
                <Link href="/device-mockup" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Device Mockup
                </Link>
              </li>
              <li>
                <Link href="/social-media-resizer" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Social Media Resizer
                </Link>
              </li>
              <li>
                <Link href="/color-picker" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Color Picker
                </Link>
              </li>
              <li>
                <Link href="/color-palette" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Color Palette
                </Link>
              </li>
              <li>
                <Link href="/gradient-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Gradient Generator
                </Link>
              </li>
              <li>
                <Link href="/og-image-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  OG Image Generator
                </Link>
              </li>
              <li>
                <Link href="/favicon-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Favicon Generator
                </Link>
              </li>
              <li>
                <Link href="/svg-optimizer" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  SVG Optimizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Utilities */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Developer Tools</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/word-counter" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link href="/lorem-ipsum" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Lorem Ipsum
                </Link>
              </li>
              <li>
                <Link href="/regex-tester" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Regex Tester
                </Link>
              </li>
              <li>
                <Link href="/word-cloud" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Word Cloud
                </Link>
              </li>
              <li>
                <Link href="/password-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/uuid-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  UUID Generator
                </Link>
              </li>
              <li>
                <Link href="/qr-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/jwt-decoder" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  JWT Decoder
                </Link>
              </li>
              <li>
                <Link href="/cron-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Cron Generator
                </Link>
              </li>
              <li>
                <Link href="/meta-tags" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Meta Tags
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Additional Tools - Compact Grid */}
        <div className="mt-12 pt-8 border-t border-border">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-4">More Tools</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-2">
            <Link href="/color-contrast" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Color Contrast
            </Link>
            <Link href="/fake-tweet" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Fake Tweet
            </Link>
            <Link href="/number-converter" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Number Converter
            </Link>
            <Link href="/epoch-converter" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Epoch Converter
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 jsonformatter.gg. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ by Pineapple
          </p>
        </div>
      </div>
    </footer>
  );
};

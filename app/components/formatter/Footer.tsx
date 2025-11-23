import { FileJson, ExternalLink, Twitter } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  isFullscreen: boolean;
}

export const Footer = ({ isFullscreen }: FooterProps) => {
  if (isFullscreen) return null;
  
  return (
    <footer className="border-t border-border bg-card flex-shrink-0">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-accent">
                <FileJson className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">jsonformatter.gg</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The best free online JSON formatter, validator, viewer, editor, and beautifier tool. Format, validate, beautify, minify, and repair JSON data instantly with privacy-first, local processing.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 jsonformatter.gg. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  JSON Validator
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  JSON Beautifier
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  JSON Minifier
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  JSON Repair Tool
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Popular Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/xml-formatter" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  XML Formatter
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="/yaml-formatter" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  YAML Formatter
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="/csv-formatter" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  CSV Formatter
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="/base64-encoder" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Base64 Encoder/Decoder
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="/json-schema-validator" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  JSON Schema Validator
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="/json-diff" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  JSON Diff Tool
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="/json-csv-converter" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  JSON CSV Converter
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* Follow Us & Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://x.com/json__gg" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                <span className="text-sm">Twitter/X</span>
              </a>
             
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-sm">Reddit</span>
              </a>
              <a href="https://dev.to/pineapple_26" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Dev.to</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-end gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Made with ❤️ by Pineapple</span>
            </div>
          </div>
        </div>
    </footer>
  );
};

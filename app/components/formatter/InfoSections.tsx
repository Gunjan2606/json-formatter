"use client";

import { useState } from "react";
import { Code, CheckCircle2,Minimize2, Wand2, FileJson, Lock, Eye, ChevronDown, ChevronUp } from "lucide-react";

export const InfoSections = () => {
  const [expandedFAQs, setExpandedFAQs] = useState<Record<number, boolean>>({});

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-4">
      {/* JSON Formatter Section */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl justify-center font-bold flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          JSON Formatter
        </h2>
        <div className="space-y-2 text-muted-foreground leading-relaxed text-sm">
          <p>
            Free online JSON formatter, validator, viewer, editor & beautifier. Format JSON, validate JSON syntax, beautify JSON code, minify JSON files instantly. Supports large files (30MB+), dark mode, error highlighting, and secure local processing.
          </p>
          <p>
            jsonformatter.gg is a powerful, free online JSON formatter that helps developers format, validate, beautify, minify, and repair JSON data instantly. Our tool processes all data locally in your browser, ensuring complete privacy and security. With support for files up to 30MB+, real-time validation, error highlighting, and auto-fix capabilities, it&apos;s the perfect solution for API development, configuration management, and data analysis.
          </p>
        </div>
      </section>

      {/* JSON Validator Section */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold justify-center flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          JSON Validator
        </h2>
        <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
          <p>
            The JSON Validator at jsonformatter.gg provides real-time syntax checking against RFC 8259 standards. It instantly identifies errors including missing commas, unclosed brackets, invalid characters, malformed structures, and type mismatches. Each error is highlighted with precise line and column numbers, making debugging fast and efficient. Unlike other validators, all processing happens locally in your browser, ensuring your sensitive data never leaves your device.
          </p>
          
          <div className="pt-3 border-t border-border">
            <h3 className="text-base font-semibold mb-2 text-foreground">Key Validation Features</h3>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">Real-time Syntax Checking:</span> Validates JSON as you type or paste
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">RFC 8259 Compliance:</span> Adheres to official JSON specification standards
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">Precise Error Reporting:</span> Shows exact line and column numbers for errors
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">Common Error Detection:</span> Catches missing/trailing commas, unclosed brackets, quote issues
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">Type Validation:</span> Verifies correct data types (strings, numbers, booleans, arrays, objects)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">Structure Validation:</span> Ensures proper nesting and hierarchy
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">Character Encoding:</span> Detects invalid UTF-8 characters and escape sequences
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-center mb-4">Features</h2>
        
        {/* Core Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Core Features :</h3>
          
          {/* Format & Beautify */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              <span className="font-semibold text-base">Format & Beautify</span>
            </div>
            <ul className="ml-6 space-y-1.5 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Smart Indentation:</strong> Configurable 2-space or 4-space indentation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Line Break Optimization:</strong> Proper line breaks for readability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Consistent Spacing:</strong> Uniform spacing throughout JSON structure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Bracket Alignment:</strong> Properly aligned opening and closing brackets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Array & Object Formatting:</strong> Clean formatting for nested structures</span>
              </li>
            </ul>
          </div>

          {/* Validate & Check */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="font-semibold text-base">Validate & Check</span>
            </div>
            <ul className="ml-6 space-y-1.5 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Real-time Validation:</strong> Instant syntax checking as you work</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Error Highlighting:</strong> Visual indicators for syntax errors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Detailed Error Messages:</strong> Clear explanations of what went wrong</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Line Number Reference:</strong> Easy navigation to error locations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">RFC 8259 Compliance:</strong> Industry-standard validation</span>
              </li>
            </ul>
          </div>

          {/* Minify & Compress */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Minimize2 className="w-4 h-4 text-primary" />
              <span className="font-semibold text-base">Minify & Compress</span>
            </div>
            <ul className="ml-6 space-y-1.5 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Whitespace Removal:</strong> Eliminates all unnecessary spaces and line breaks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">File Size Reduction:</strong> Reduces JSON size by 30-60% on average</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Production-Ready Output:</strong> Optimized for web applications and APIs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Fast Processing:</strong> Instant minification even for large files</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Preserves Data Integrity:</strong> No data loss during compression</span>
              </li>
            </ul>
          </div>

          {/* Repair & Auto-Fix */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-primary" />
              <span className="font-semibold text-base">Repair & Auto-Fix</span>
            </div>
            <ul className="ml-6 space-y-1.5 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Missing Comma Detection:</strong> Automatically adds missing commas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Trailing Comma Removal:</strong> Removes invalid trailing commas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Quote Correction:</strong> Fixes single quotes to double quotes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Bracket Matching:</strong> Closes unclosed brackets and braces</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Smart Error Recovery:</strong> Attempts to repair common syntax issues</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold">Advanced Features :</h3>
          
          {/* Large File Support */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileJson className="w-4 h-4 text-primary" />
              <span className="font-semibold text-base">Large File Support</span>
            </div>
            <ul className="ml-6 space-y-1.5 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Handles JSON files up to 30MB+</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Streaming processing</strong> for massive datasets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Performance optimization</strong> for quick processing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Memory-efficient parsing</strong> algorithms</span>
              </li>
            </ul>
          </div>

          {/* Privacy & Security */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <span className="font-semibold text-base">Privacy & Security</span>
            </div>
            <ul className="ml-6 space-y-1.5 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">100% Local Processing:</strong> No data sent to servers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Client-Side Only:</strong> All operations in your browser</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">No Data Storage:</strong> Nothing saved on our servers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">HTTPS Secure:</strong> Encrypted connection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">No Registration Required:</strong> Use anonymously</span>
              </li>
            </ul>
          </div>

          {/* User Experience */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span className="font-semibold text-base">User Experience</span>
            </div>
            <ul className="ml-6 space-y-1.5 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Dark Mode:</strong> Comfortable viewing in low-light environments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Syntax Highlighting:</strong> Color-coded JSON elements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Line Numbers:</strong> Easy reference and navigation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Copy to Clipboard:</strong> One-click copying of formatted JSON</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Download Output:</strong> Save formatted JSON as a file</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Upload Files:</strong> Drag-and-drop or browse to upload</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong className="text-foreground">Keyboard Shortcuts:</strong> Fast navigation and actions</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Know more about JSON */}
      <section className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-bold mb-4">Know more about JSON</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            How to Create JSON File?
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            JSON Full Form
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            What is JSON?
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            JSON Example with all data types including JSON Array
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Python Pretty Print JSON
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Read JSON File Using Python
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Validate JSON using PHP
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Python Load Json From File
          </a>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-3">
          {/* FAQ 1 */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(1)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="font-semibold text-sm pr-4">What is a JSON formatter and why do I need it?</span>
              {expandedFAQs[1] ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {expandedFAQs[1] && (
              <div className="px-4 pb-3 space-y-2 text-muted-foreground text-xs leading-relaxed">
                <p>
                  A JSON formatter is an online tool that formats, validates, beautifies, and minifies JSON (JavaScript Object Notation) data. It helps developers make JSON code more readable and properly structured by adding indentation, line breaks, and proper spacing.
                </p>
                <p className="font-medium text-foreground">You need it because:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Readability:</strong> Raw JSON from APIs is often minified (single line), making it impossible to read</li>
                  <li><strong>Debugging:</strong> Formatted JSON makes it easy to spot errors and understand data structure</li>
                  <li><strong>Development:</strong> Clean JSON improves code reviews and documentation</li>
                  <li><strong>Production:</strong> Minify JSON to reduce file size and improve load times</li>
                </ul>
                <p>
                  Without formatting, JSON can be a single, unreadable line of thousands of characters. A formatter transforms it into clean, organized, easy-to-understand code.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(2)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="font-semibold text-sm pr-4">Is my JSON data secure? Where is it stored?</span>
              {expandedFAQs[2] ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {expandedFAQs[2] && (
              <div className="px-4 pb-3 space-y-2 text-muted-foreground text-xs leading-relaxed">
                <p>
                  <strong className="text-foreground">Yes, your data is 100% secure.</strong> All JSON processing happens locally in your browser using JavaScript. No data is sent to any server, ensuring complete privacy and security for your sensitive information.
                </p>
                <p className="font-medium text-foreground">Where is data stored?</p>
                <p>
                  <strong>Nowhere.</strong> Your JSON is processed in your browser&apos;s memory and is cleared when you close the tab or navigate away. We don&apos;t have servers storing your files, and we don&apos;t collect or track your data.
                </p>
                <p className="font-medium text-foreground">This makes jsonformatter.gg ideal for:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Confidential API responses</li>
                  <li>Configuration files with credentials</li>
                  <li>Proprietary business data</li>
                  <li>Personal information</li>
                  <li>Any sensitive JSON content</li>
                </ul>
                <p className="font-semibold text-foreground">Your data never leaves your device. Period.</p>
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(3)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="font-semibold text-sm pr-4">How do I format and validate JSON online?</span>
              {expandedFAQs[3] ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {expandedFAQs[3] && (
              <div className="px-4 pb-3 space-y-2 text-muted-foreground text-xs leading-relaxed">
                <p className="font-medium text-foreground">Simple 3-step process:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li><strong>Paste or Upload:</strong> Paste your JSON data into the input editor, or click the upload button to select a .json file from your computer</li>
                  <li><strong>Format:</strong> Click the &apos;Format&apos; button to beautify your JSON with proper indentation and line breaks</li>
                  <li><strong>Copy or Download:</strong> Copy the formatted JSON to clipboard with one click, or download it as a file</li>
                </ol>
                <p>
                  <strong className="text-foreground">Validation happens automatically:</strong> The tool validates your JSON syntax in real-time as you format. If there are any errors, they&apos;ll be highlighted with precise line and column numbers to help you fix them quickly.
                </p>
                <p>
                  <strong className="text-foreground">Pro tip:</strong> Enable the auto-fix feature to automatically repair common errors like missing commas, trailing commas, and unclosed brackets.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 4 */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(4)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="font-semibold text-sm pr-4">What&apos;s the difference between formatting and minifying JSON?</span>
              {expandedFAQs[4] ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {expandedFAQs[4] && (
              <div className="px-4 pb-3 space-y-2 text-muted-foreground text-xs leading-relaxed">
                <p className="font-medium text-foreground">Formatting (Beautifying):</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Adds indentation, line breaks, and spacing</li>
                  <li>Expands JSON to make it human-readable</li>
                  <li>Increases file size</li>
                  <li><strong>Use case:</strong> Development, debugging, documentation, code reviews</li>
                </ul>
                <p className="font-medium text-foreground">Minifying (Compressing):</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Removes all whitespace, line breaks, and unnecessary spaces</li>
                  <li>Compresses JSON to the smallest possible size</li>
                  <li>Reduces file size by 30-60%</li>
                  <li><strong>Use case:</strong> Production, APIs, web applications where file size matters</li>
                </ul>
                <p className="font-semibold text-foreground">Rule of thumb:</p>
                <p>Format during development for readability. Minify for production to improve performance.</p>
              </div>
            )}
          </div>

          {/* FAQ 5 */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(5)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="font-semibold text-sm pr-4">Does this tool support large JSON files? What&apos;s the limit?</span>
              {expandedFAQs[5] ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {expandedFAQs[5] && (
              <div className="px-4 pb-3 space-y-2 text-muted-foreground text-xs leading-relaxed">
                <p>
                  <strong className="text-foreground">Yes, jsonformatter.gg supports large files up to 30MB+,</strong> making it one of the best tools for handling massive JSON datasets.
                </p>
                <p className="font-medium text-foreground">File size handling:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Under 30MB:</strong> Full editor display with syntax highlighting and all features</li>
                  <li><strong>Over 30MB:</strong> Files are processed successfully, but won&apos;t display in the editor for performance reasons. You can still download the formatted result.</li>
                </ul>
                <p className="font-medium text-foreground">Performance optimized:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Fast processing even for multi-megabyte files</li>
                  <li>Memory-efficient parsing algorithms</li>
                  <li>No upload delays (local processing)</li>
                  <li>Works smoothly on most modern devices</li>
                </ul>
                <p className="font-medium text-foreground">Perfect for:</p>
                <p className="ml-2">Large API responses, Database exports, Analytics data, Configuration files, Data migration files, Log files in JSON format</p>
              </div>
            )}
          </div>

          {/* FAQ 6 */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(6)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="font-semibold text-sm pr-4">How do I fix JSON syntax errors? What errors does it detect?</span>
              {expandedFAQs[6] ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {expandedFAQs[6] && (
              <div className="px-4 pb-3 space-y-2 text-muted-foreground text-xs leading-relaxed">
                <p className="font-medium text-foreground">Auto-Fix Feature:</p>
                <p>Enable the auto-fix option and click format. The tool will automatically repair common JSON errors.</p>
                <p className="font-medium text-foreground">Errors Detected & Fixed:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>✓ Missing commas between array items or object properties</li>
                  <li>✓ Trailing commas after the last item (not valid in JSON)</li>
                  <li>✓ Unclosed brackets/braces - automatically closes them</li>
                  <li>✓ Single quotes - converts to double quotes (JSON standard)</li>
                  <li>✓ Invalid characters - highlights special characters that break syntax</li>
                  <li>✓ Malformed structures - detects improper nesting</li>
                  <li>✓ Type mismatches - identifies incorrect data types</li>
                  <li>✓ Unescaped characters - finds strings with unescaped quotes or backslashes</li>
                </ul>
                <p className="font-medium text-foreground">Manual Fixing:</p>
                <p>If auto-fix doesn&apos;t work, errors are highlighted with:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Precise line numbers (e.g., &quot;Error on line 15&quot;)</li>
                  <li>Column numbers (e.g., &quot;Column 23&quot;)</li>
                  <li>Clear error messages explaining the issue</li>
                  <li>Red highlighting in the editor</li>
                </ul>
                <p className="font-medium text-foreground">Pro tips:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Copy JSON carefully from sources (avoid invisible characters)</li>
                  <li>Use double quotes, never single quotes</li>
                  <li>Remove comments (JSON doesn&apos;t support comments)</li>
                  <li>Ensure all brackets and braces are closed</li>
                </ul>
              </div>
            )}
          </div>

          {/* FAQ 7 */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(7)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="font-semibold text-sm pr-4">What browsers and devices are supported? Can I use it offline?</span>
              {expandedFAQs[7] ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {expandedFAQs[7] && (
              <div className="px-4 pb-3 space-y-2 text-muted-foreground text-xs leading-relaxed">
                <p className="font-medium text-foreground">Browser Support (all modern browsers):</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>✓ Google Chrome </li>
                  <li>✓ Mozilla Firefox </li>
                  <li>✓ Safari </li>
                  <li>✓ Microsoft Edge </li>
                  <li>✓ Opera </li>
                  <li>✓ Brave, Vivaldi, and other Chromium-based browsers</li>
                </ul>
                <p className="font-medium text-foreground">Mobile Support:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>✓ iOS Safari (iPhone & iPad)</li>
                  <li>✓ Chrome for Android</li>
                  <li>✓ Firefox for Android</li>
                  <li>✓ Samsung Internet</li>
                  <li>✓ Fully responsive design adapts to any screen size</li>
                </ul>
                <p className="font-medium text-foreground">Requirements:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>JavaScript enabled (required for formatting)</li>
                  <li>HTML5 support (all modern browsers have this)</li>
                  <li>No installation needed</li>
                  <li>No browser extensions required</li>
                </ul>
                <p className="font-medium text-foreground">Offline Usage:</p>
                <p>
                  <strong className="text-foreground">Yes, mostly.</strong> While you need an internet connection to load the website initially, all JSON processing happens locally in your browser using JavaScript. Once the page is loaded, you can:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Format JSON without internet</li>
                  <li>Validate and beautify JSON offline</li>
                  <li>Minify and repair JSON offline</li>
                  <li>Copy and download results offline</li>
                </ul>
                <p>The only thing that requires internet is loading the website for the first time. After that, you can even use it on an airplane!</p>
                <p className="font-medium text-foreground">Cross-Platform:</p>
                <p>Works on Windows, macOS, Linux, ChromeOS, and any operating system with a modern browser.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

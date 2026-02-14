"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useOGImageGenerator } from "../hooks/useOGImageGenerator";
import { Image as ImageIcon, Download, RefreshCw } from "lucide-react";
import { useToast } from "../hooks/use-toast";

export default function OGImageGenerator() {
  const { data, updateField, generateImage } = useOGImageGenerator();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // Debounced image generation - wait 300ms after last change for instant feel
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      setIsGenerating(true);
      const url = await generateImage();
      setPreviewUrl(url);
      setIsGenerating(false);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [data, generateImage]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = "og-image.png";
    a.click();
    toast({
      title: "Downloaded!",
      description: "OG image saved as og-image.png",
    });
  };

  const loadTemplate = (template: "tech" | "blog" | "product") => {
    const templates = {
      tech: {
        title: "Building Scalable Web Applications",
        description: "Learn modern architecture patterns and best practices for production-ready systems",
        author: "Tech Blog",
        backgroundType: "gradient" as const,
        gradientStart: "#667eea",
        gradientEnd: "#764ba2",
        textColor: "#ffffff",
        accentColor: "#fbbf24",
        layout: "default" as const,
      },
      blog: {
        title: "10 Tips for Better Writing",
        description: "Simple strategies to improve your content and engage more readers",
        author: "Writing Tips",
        backgroundType: "gradient" as const,
        gradientStart: "#f093fb",
        gradientEnd: "#f5576c",
        textColor: "#ffffff",
        accentColor: "#fef3c7",
        layout: "minimal" as const,
      },
      product: {
        title: "Introducing Our New Feature",
        description: "Save time and boost productivity with automated workflows",
        author: "Product Updates",
        backgroundType: "gradient" as const,
        gradientStart: "#4facfe",
        gradientEnd: "#00f2fe",
        textColor: "#ffffff",
        accentColor: "#34d399",
        layout: "modern" as const,
      },
    };

    const selectedTemplate = templates[template];
    Object.entries(selectedTemplate).forEach(([key, value]) => {
      updateField(key as keyof typeof selectedTemplate, value as string);
    });

    toast({
      title: "Template Loaded!",
      description: `${template.charAt(0).toUpperCase() + template.slice(1)} template applied`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="OG Image Generator"
        icon={<ImageIcon className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* Quick Templates - More visual */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-3">Quick Start - Templates</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => loadTemplate("tech")}
                className="group relative h-20 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 text-white hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl mb-1">💻</div>
                  <div className="text-sm font-semibold">Tech</div>
                </div>
              </button>
              <button
                onClick={() => loadTemplate("blog")}
                className="group relative h-20 rounded-lg overflow-hidden bg-gradient-to-br from-pink-500 to-red-500 text-white hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl mb-1">✍️</div>
                  <div className="text-sm font-semibold">Blog</div>
                </div>
              </button>
              <button
                onClick={() => loadTemplate("product")}
                className="group relative h-20 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl mb-1">🚀</div>
                  <div className="text-sm font-semibold">Product</div>
                </div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Content Settings */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">Content</h3>

              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                  placeholder="Enter your title"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm resize-none"
                  rows={3}
                  placeholder="Enter a brief description"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Author/Brand</label>
                <input
                  type="text"
                  value={data.author}
                  onChange={(e) => updateField("author", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                  placeholder="Enter author or brand name"
                />
              </div>
            </div>

            {/* Layout Settings */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">Layout</h3>

              <div>
                <label className="text-sm font-medium mb-2 block">Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {["default", "minimal", "modern"].map((layout) => (
                    <button
                      key={layout}
                      onClick={() => updateField("layout", layout)}
                      className={`px-3 py-2 rounded text-sm capitalize ${
                        data.layout === layout
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {layout}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Color Settings */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">Colors</h3>

              <div>
                <label className="text-sm font-medium mb-2 block">Background Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {["solid", "gradient"].map((type) => (
                    <button
                      key={type}
                      onClick={() => updateField("backgroundType", type)}
                      className={`px-3 py-2 rounded text-sm capitalize ${
                        data.backgroundType === type
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {data.backgroundType === "solid" ? (
                <div>
                  <label className="text-sm font-medium mb-2 block">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={data.backgroundColor}
                      onChange={(e) => updateField("backgroundColor", e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                    />
                    <input
                      type="text"
                      value={data.backgroundColor}
                      onChange={(e) => updateField("backgroundColor", e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Gradient Start</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={data.gradientStart}
                        onChange={(e) => updateField("gradientStart", e.target.value)}
                        className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                      />
                      <input
                        type="text"
                        value={data.gradientStart}
                        onChange={(e) => updateField("gradientStart", e.target.value)}
                        className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Gradient End</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={data.gradientEnd}
                        onChange={(e) => updateField("gradientEnd", e.target.value)}
                        className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                      />
                      <input
                        type="text"
                        value={data.gradientEnd}
                        onChange={(e) => updateField("gradientEnd", e.target.value)}
                        className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Text Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={data.textColor}
                    onChange={(e) => updateField("textColor", e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                  />
                  <input
                    type="text"
                    value={data.textColor}
                    onChange={(e) => updateField("textColor", e.target.value)}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Accent Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={data.accentColor}
                    onChange={(e) => updateField("accentColor", e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                  />
                  <input
                    type="text"
                    value={data.accentColor}
                    onChange={(e) => updateField("accentColor", e.target.value)}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Live Preview</h3>
                  <p className="text-xs text-muted-foreground">1200×630 pixels</p>
                </div>
                <div className="flex gap-2">
                  {isGenerating && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Updating...
                    </div>
                  )}
                  <Button variant="default" size="lg" onClick={handleDownload} className="shadow-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                </div>
              </div>

              <div className="border-2 border-border rounded-lg overflow-hidden bg-muted shadow-lg">
                {previewUrl ? (
                  <img src={previewUrl} alt="OG Image Preview" className="w-full h-auto" />
                ) : (
                  <div className="w-full aspect-[1200/630] flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                    <div className="text-center">
                      <ImageIcon className="w-16 h-16 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-muted-foreground">Preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">How to use:</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>1. Upload your image and add to &lt;head&gt;:</p>
                  <code className="block bg-background p-2 rounded mt-1 font-mono text-xs">
                    &lt;meta property=&quot;og:image&quot; content=&quot;https://yoursite.com/og-image.png&quot; /&gt;
                  </code>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">What is an OG Image?</h3>
              <p className="text-sm text-muted-foreground">
                Open Graph (OG) images are the preview images that appear when you share links on social media platforms.
                A well-designed OG image can significantly increase click-through rates.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Platform Recommendations:</h4>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                  <li>Facebook/LinkedIn: 1200×630 (aspect ratio 1.91:1)</li>
                  <li>Twitter: 1200×675 or 1200×600</li>
                  <li>Keep text readable at small sizes</li>
                  <li>Use high contrast colors</li>
                  <li>File size under 8MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>

      {!isFullscreen && <Footer isFullscreen={isFullscreen} />}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useMetaTags } from "../hooks/useMetaTags";
import { Tag, Copy, RotateCcw, RefreshCw } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { MetaTagsInfoSections } from "../components/formatter/MetaTagsInfoSections";

type TabType = "basic" | "opengraph" | "twitter" | "preview";

export default function MetaTagsGenerator() {
  const {
    metaTags,
    updateMetaTag,
    htmlCode,
    syncOGFromBasic,
    syncTwitterFromOG,
    reset,
  } = useMetaTags();

  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("basic");

  const copyHTML = () => {
    navigator.clipboard.writeText(htmlCode);
    toast({
      title: "Copied!",
      description: "Meta tags HTML copied to clipboard",
    });
  };

  const getCharCount = (text: string, limit: number) => {
    const length = text.length;
    const color = length > limit ? "text-red-500" : "text-muted-foreground";
    return (
      <span className={`text-xs ${color}`}>
        {length}/{limit}
      </span>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="Meta Tags Generator"
        icon={<Tag className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* HTML Code Output - Always visible at top */}
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-2 border-green-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Generated HTML Code</h3>
                <p className="text-sm text-muted-foreground">Copy and paste this into your &lt;head&gt; section</p>
              </div>
              <Button onClick={copyHTML} size="lg">
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            </div>
            <pre className="bg-background/60 backdrop-blur-sm p-4 rounded-lg text-xs sm:text-sm overflow-x-auto border border-border">
              <code className="font-mono">{htmlCode}</code>
            </pre>
          </div>

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex border-b border-border bg-muted/30">
              <button
                onClick={() => setActiveTab("basic")}
                className={`flex-1 px-6 py-4 font-medium transition-all ${
                  activeTab === "basic"
                    ? "bg-background border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                📝 Basic SEO
              </button>
              <button
                onClick={() => setActiveTab("opengraph")}
                className={`flex-1 px-6 py-4 font-medium transition-all ${
                  activeTab === "opengraph"
                    ? "bg-background border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                📱 Facebook/LinkedIn
              </button>
              <button
                onClick={() => setActiveTab("twitter")}
                className={`flex-1 px-6 py-4 font-medium transition-all ${
                  activeTab === "twitter"
                    ? "bg-background border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                🐦 Twitter
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex-1 px-6 py-4 font-medium transition-all ${
                  activeTab === "preview"
                    ? "bg-background border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                👁️ Preview
              </button>
            </div>

            <div className="p-6">
              {/* Basic Meta Tags Tab */}
              {activeTab === "basic" && (
                <div className="bg-card rounded-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Basic SEO Meta Tags</h3>
                    <Button onClick={syncOGFromBasic} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync to Social Media
                    </Button>
                  </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium">Title</label>
                  {getCharCount(metaTags.title, 60)}
                </div>
                <input
                  type="text"
                  value={metaTags.title}
                  onChange={(e) => updateMetaTag("title", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                  placeholder="My Awesome Website"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 50-60 characters
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium">Description</label>
                  {getCharCount(metaTags.description, 160)}
                </div>
                <textarea
                  value={metaTags.description}
                  onChange={(e) => updateMetaTag("description", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm min-h-[80px]"
                  placeholder="A brief description of your website..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 150-160 characters for Google
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Keywords</label>
                <input
                  type="text"
                  value={metaTags.keywords}
                  onChange={(e) => updateMetaTag("keywords", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Comma-separated keywords (less important for SEO now)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Author</label>
                  <input
                    type="text"
                    value={metaTags.author}
                    onChange={(e) => updateMetaTag("author", e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Canonical URL</label>
                  <input
                    type="text"
                    value={metaTags.canonical}
                    onChange={(e) => updateMetaTag("canonical", e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>
                </div>
              )}

              {/* Open Graph Tab */}
              {activeTab === "opengraph" && (
                <div className="bg-card rounded-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Open Graph - Facebook & LinkedIn</h3>
                    <Button onClick={syncTwitterFromOG} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync to Twitter
                    </Button>
                  </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium">OG Title</label>
                  {getCharCount(metaTags.ogTitle, 60)}
                </div>
                <input
                  type="text"
                  value={metaTags.ogTitle}
                  onChange={(e) => updateMetaTag("ogTitle", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                  placeholder="My Awesome Website"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium">OG Description</label>
                  {getCharCount(metaTags.ogDescription, 200)}
                </div>
                <textarea
                  value={metaTags.ogDescription}
                  onChange={(e) => updateMetaTag("ogDescription", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm min-h-[80px]"
                  placeholder="Description for social media..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">OG Image URL</label>
                  <input
                    type="text"
                    value={metaTags.ogImage}
                    onChange={(e) => updateMetaTag("ogImage", e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended: 1200x630 pixels
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">OG URL</label>
                  <input
                    type="text"
                    value={metaTags.ogUrl}
                    onChange={(e) => updateMetaTag("ogUrl", e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">OG Type</label>
                <select
                  value={metaTags.ogType}
                  onChange={(e) => updateMetaTag("ogType", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                >
                  <option value="website">Website</option>
                  <option value="article">Article</option>
                  <option value="product">Product</option>
                  <option value="profile">Profile</option>
                </select>
              </div>
            </div>
                </div>
              )}

              {/* Twitter Tab */}
              {activeTab === "twitter" && (
                <div className="bg-card rounded-lg">
                  <h3 className="font-semibold text-lg mb-6">Twitter Card</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Card Type</label>
                <select
                  value={metaTags.twitterCard}
                  onChange={(e) => updateMetaTag("twitterCard", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                >
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="app">App</option>
                  <option value="player">Player</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium">Twitter Title</label>
                  {getCharCount(metaTags.twitterTitle, 70)}
                </div>
                <input
                  type="text"
                  value={metaTags.twitterTitle}
                  onChange={(e) => updateMetaTag("twitterTitle", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                  placeholder="My Awesome Website"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium">Twitter Description</label>
                  {getCharCount(metaTags.twitterDescription, 200)}
                </div>
                <textarea
                  value={metaTags.twitterDescription}
                  onChange={(e) => updateMetaTag("twitterDescription", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm min-h-[80px]"
                  placeholder="Description for Twitter..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Twitter Image URL</label>
                  <input
                    type="text"
                    value={metaTags.twitterImage}
                    onChange={(e) => updateMetaTag("twitterImage", e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Twitter Handle</label>
                  <input
                    type="text"
                    value={metaTags.twitterSite}
                    onChange={(e) => updateMetaTag("twitterSite", e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    placeholder="@yourhandle"
                  />
                </div>
              </div>
            </div>
                </div>
              )}

              {/* Preview Tab - Combined Previews */}
              {activeTab === "preview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Social Media Previews</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      See how your content will appear when shared on different platforms
                    </p>
                  </div>

                  {/* Facebook Preview */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <span>📘</span> Facebook & LinkedIn Preview
                    </h4>
                    <div className="border-2 border-border rounded-lg overflow-hidden bg-white max-w-xl shadow-lg">
                      {metaTags.ogImage && (
                        <img
                          src={metaTags.ogImage}
                          alt="OG preview"
                          className="w-full h-64 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' fill='%23e5e7eb'%3E%3Crect width='1200' height='630'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%239ca3af'%3EImage Preview%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      )}
                      <div className="p-4 bg-gray-50">
                        <div className="text-xs text-gray-500 uppercase mb-1">
                          {metaTags.ogUrl || "yoursite.com"}
                        </div>
                        <div className="font-semibold text-gray-900 mb-1 text-lg">
                          {metaTags.ogTitle || "Your Title"}
                        </div>
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {metaTags.ogDescription || "Your description"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Twitter Preview */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <span>🐦</span> Twitter Preview
                    </h4>
                    <div className="border-2 border-border rounded-2xl overflow-hidden bg-white max-w-[500px] shadow-lg">
                      {metaTags.twitterImage && (
                        <img
                          src={metaTags.twitterImage}
                          alt="Twitter preview"
                          className="w-full h-64 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' fill='%23e5e7eb'%3E%3Crect width='1200' height='630'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%239ca3af'%3EImage Preview%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      )}
                      <div className="p-4">
                        <div className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {metaTags.twitterTitle || "Your Title"}
                        </div>
                        <div className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {metaTags.twitterDescription || "Your description"}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <span>🔗</span>
                          {metaTags.ogUrl || "yoursite.com"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Other Settings */}
                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Additional Settings</h4>
                      <Button onClick={reset} variant="outline" size="sm">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset All
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Theme Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={metaTags.themeColor}
                            onChange={(e) => updateMetaTag("themeColor", e.target.value)}
                            className="w-12 h-10 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={metaTags.themeColor}
                            onChange={(e) => updateMetaTag("themeColor", e.target.value)}
                            className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm font-mono"
                            placeholder="#ffffff"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Browser address bar color on mobile
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Viewport</label>
                        <input
                          type="text"
                          value={metaTags.viewport}
                          onChange={(e) => updateMetaTag("viewport", e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded text-sm font-mono"
                          placeholder="width=device-width, initial-scale=1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {!isFullscreen && (
        <>
          <MetaTagsInfoSections />
          <Footer isFullscreen={isFullscreen} />
        </>
      )}
    </div>
  );
}

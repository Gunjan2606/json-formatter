"use client";

import { useState, useRef } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useFakeTweet } from "../hooks/useFakeTweet";
import {
  Twitter,
  Upload,
  Shuffle,
  RotateCcw,
  Download,
  Clock,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { FakeTweetInfoSections } from "../components/formatter/FakeTweetInfoSections";
import { toPng } from "html-to-image";

export default function FakeTweetGenerator() {
  const {
    tweetData,
    profileImageDataUrl,
    updateTweet,
    handleImageUpload,
    generateRandomAvatar,
    formatNumber,
    setCurrentTime,
    reset,
  } = useFakeTweet();

  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const tweetRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadAsImage = async () => {
    if (!tweetRef.current) return;

    try {
      // Run twice — first pass loads fonts/images into the SVG cache, second pass renders cleanly
      await toPng(tweetRef.current, { pixelRatio: 3 });
      const dataUrl = await toPng(tweetRef.current, { pixelRatio: 3 });

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "tweet.png";
      a.click();

      toast({ title: "Downloaded!", description: "Tweet screenshot saved as PNG" });
    } catch {
      toast({ title: "Error", description: "Failed to generate screenshot", variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="Fake Tweet Generator"
        icon={<Twitter className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tweet Preview */}
          <div className="space-y-4 lg:order-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Live Preview</h3>
              <Button onClick={downloadAsImage} size="lg" className="shadow-sm">
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            </div>

            <div className={`rounded-lg p-8 ${
              tweetData.theme === "dark" ? "bg-black" : "bg-[rgb(247,249,249)]"
            }`}>

            <div
              ref={tweetRef}
              className={`rounded-lg ${
                tweetData.theme === "dark"
                  ? "bg-black"
                  : "bg-white"
              } p-6 max-w-[600px] mx-auto`}
              style={{
                boxShadow: tweetData.theme === "dark"
                  ? "0 0 0 1px rgb(47, 51, 54)"
                  : "0 0 0 1px rgb(207, 217, 222)"
              }}
            >
              {/* Tweet Header */}
              <div className="flex items-start gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profileImageDataUrl || tweetData.profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                  crossOrigin="anonymous"
                />
                <div className="flex-1 min-w-0">
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span
                      className={`font-bold ${
                        tweetData.theme === "dark" ? "text-white" : "text-[rgb(15,20,25)]"
                      }`}
                    >
                      {tweetData.displayName}
                    </span>
                    {tweetData.isVerified && (
                      <svg width="20" height="20" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
                        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="#1d9bf0"/>
                      </svg>
                    )}
                  </div>
                  <div
                    className={`text-sm ${
                      tweetData.theme === "dark" ? "text-[rgb(113,118,123)]" : "text-[rgb(83,100,113)]"
                    }`}
                  >
                    @{tweetData.username}
                  </div>
                </div>
              </div>

              {/* Tweet Content */}
              <div
                className={`mb-3 text-[15px] whitespace-pre-wrap break-words ${
                  tweetData.theme === "dark" ? "text-white" : "text-[rgb(15,20,25)]"
                }`}
              >
                {tweetData.tweetText}
              </div>

              {/* Timestamp */}
              <div
                className={`text-sm mb-3 ${
                  tweetData.theme === "dark" ? "text-[rgb(113,118,123)]" : "text-[rgb(83,100,113)]"
                }`}
              >
                {tweetData.timestamp}
              </div>

              {/* Action Icons with Stats */}
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: `1px solid ${tweetData.theme === "dark" ? "rgb(47,51,54)" : "rgb(239,243,244)"}` }}
              >
                {/* Reply */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tweetData.theme === "dark" ? "rgb(113,118,123)" : "rgb(83,100,113)"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span style={{ fontSize: "13px", color: tweetData.theme === "dark" ? "rgb(113,118,123)" : "rgb(83,100,113)", lineHeight: 1 }}>
                    {formatNumber(tweetData.replies)}
                  </span>
                </div>
                {/* Retweet */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tweetData.theme === "dark" ? "rgb(113,118,123)" : "rgb(83,100,113)"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                    <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                  </svg>
                  <span style={{ fontSize: "13px", color: tweetData.theme === "dark" ? "rgb(113,118,123)" : "rgb(83,100,113)", lineHeight: 1 }}>
                    {formatNumber(tweetData.retweets)}
                  </span>
                </div>
                {/* Like */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tweetData.theme === "dark" ? "rgb(113,118,123)" : "rgb(83,100,113)"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span style={{ fontSize: "13px", color: tweetData.theme === "dark" ? "rgb(113,118,123)" : "rgb(83,100,113)", lineHeight: 1 }}>
                    {formatNumber(tweetData.likes)}
                  </span>
                </div>
                {/* Views */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tweetData.theme === "dark" ? "rgb(113,118,123)" : "rgb(83,100,113)"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                  <span style={{ fontSize: "13px", color: tweetData.theme === "dark" ? "rgb(113,118,123)" : "rgb(83,100,113)", lineHeight: 1 }}>
                    {formatNumber(tweetData.views)}
                  </span>
                </div>
                {/* Share */}
                <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tweetData.theme === "dark" ? "rgb(113,118,123)" : "rgb(83,100,113)"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6 lg:order-1">
            {/* Profile Section */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">Profile</h3>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <Button onClick={generateRandomAvatar} variant="outline">
                    <Shuffle className="w-4 h-4" />
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Display Name</label>
                  <input
                    type="text"
                    value={tweetData.displayName}
                    onChange={(e) => updateTweet({ displayName: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Username</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-muted-foreground">@</span>
                    <input
                      type="text"
                      value={tweetData.username}
                      onChange={(e) => updateTweet({ username: e.target.value })}
                      className="w-full pl-7 pr-3 py-2 bg-background border border-border rounded text-sm"
                      placeholder="johndoe"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={tweetData.isVerified}
                    onChange={(e) => updateTweet({ isVerified: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="verified" className="text-sm font-medium cursor-pointer">
                    Verified Badge
                  </label>
                </div>
              </div>
            </div>

            {/* Tweet Content */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">Tweet Content</h3>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Tweet Text</label>
                <textarea
                  value={tweetData.tweetText}
                  onChange={(e) => updateTweet({ tweetText: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded text-sm min-h-[100px] resize-y"
                  placeholder="What's happening?"
                />
                <div className={`text-xs mt-1 font-medium ${
                  tweetData.tweetText.length > 280
                    ? "text-red-500"
                    : tweetData.tweetText.length > 240
                    ? "text-yellow-500"
                    : "text-muted-foreground"
                }`}>
                  {tweetData.tweetText.length} / 280 characters
                  {tweetData.tweetText.length > 280 && " - Tweet is too long!"}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Timestamp</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tweetData.timestamp}
                    onChange={(e) => updateTweet({ timestamp: e.target.value })}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm"
                    placeholder="12:34 PM · Jan 15, 2024"
                  />
                  <Button onClick={setCurrentTime} variant="outline" size="sm">
                    <Clock className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Engagement */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Engagement Stats</h3>
                <Button
                  onClick={() => {
                    updateTweet({
                      likes: 127500,
                      retweets: 8430,
                      replies: 1240,
                      views: 4250000,
                    });
                    toast({
                      title: "Viral numbers applied!",
                      description: "Your tweet is now viral 🔥",
                    });
                  }}
                  variant="outline"
                  size="sm"
                >
                  🔥 Make Viral
                </Button>
              </div>
              <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                💡 Tip: Numbers format automatically (1,234 → 1.2K)
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Replies</label>
                  <input
                    type="number"
                    value={tweetData.replies}
                    onChange={(e) => updateTweet({ replies: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Retweets</label>
                  <input
                    type="number"
                    value={tweetData.retweets}
                    onChange={(e) => updateTweet({ retweets: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Likes</label>
                  <input
                    type="number"
                    value={tweetData.likes}
                    onChange={(e) => updateTweet({ likes: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Views</label>
                  <input
                    type="number"
                    value={tweetData.views}
                    onChange={(e) => updateTweet({ views: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">Settings</h3>

              <div>
                <label className="text-sm font-medium mb-2 block">Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => updateTweet({ theme: "light" })}
                    variant={tweetData.theme === "light" ? "default" : "outline"}
                    size="sm"
                  >
                    Light
                  </Button>
                  <Button
                    onClick={() => updateTweet({ theme: "dark" })}
                    variant={tweetData.theme === "dark" ? "default" : "outline"}
                    size="sm"
                  >
                    Dark
                  </Button>
                </div>
              </div>

              <Button onClick={reset} variant="outline" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Default
              </Button>
            </div>
          </div>
        </div>
      </main>

      {!isFullscreen && (
        <>
          <FakeTweetInfoSections />
          <Footer isFullscreen={isFullscreen} />
        </>
      )}
    </div>
  );
}

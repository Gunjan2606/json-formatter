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
  CheckCircle,
  Heart,
  Repeat2,
  MessageCircle,
  BarChart3,
  Share,
  Clock,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { FakeTweetInfoSections } from "../components/formatter/FakeTweetInfoSections";
import html2canvas from "html2canvas";

export default function FakeTweetGenerator() {
  const {
    tweetData,
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
      const canvas = await html2canvas(tweetRef.current, {
        backgroundColor: tweetData.theme === "dark" ? "#000000" : "#ffffff",
        scale: 2,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "tweet.png";
          a.click();
          URL.revokeObjectURL(url);
          toast({
            title: "Downloaded!",
            description: "Tweet screenshot saved as PNG",
          });
        }
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to generate screenshot",
        variant: "destructive",
      });
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
                <img
                  src={tweetData.profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span
                      className={`font-bold truncate ${
                        tweetData.theme === "dark" ? "text-white" : "text-[rgb(15,20,25)]"
                      }`}
                    >
                      {tweetData.displayName}
                    </span>
                    {tweetData.isVerified && (
                      <CheckCircle className="w-5 h-5 text-blue-500 fill-blue-500" />
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
                className={`flex justify-between pt-2 border-t ${
                  tweetData.theme === "dark" ? "border-[rgb(47,51,54)]" : "border-[rgb(239,243,244)]"
                }`}
              >
                <div className="flex items-center gap-1 group cursor-pointer">
                  <MessageCircle
                    className={`w-5 h-5 ${
                      tweetData.theme === "dark" ? "text-[rgb(113,118,123)]" : "text-[rgb(83,100,113)]"
                    } group-hover:text-blue-500 transition-colors`}
                  />
                  <span
                    className={`text-sm ${
                      tweetData.theme === "dark" ? "text-[rgb(113,118,123)]" : "text-[rgb(83,100,113)]"
                    } group-hover:text-blue-500 transition-colors`}
                  >
                    {formatNumber(tweetData.replies)}
                  </span>
                </div>
                <div className="flex items-center gap-1 group cursor-pointer">
                  <Repeat2
                    className={`w-5 h-5 ${
                      tweetData.theme === "dark" ? "text-[rgb(113,118,123)]" : "text-[rgb(83,100,113)]"
                    } group-hover:text-green-500 transition-colors`}
                  />
                  <span
                    className={`text-sm ${
                      tweetData.theme === "dark" ? "text-[rgb(113,118,123)]" : "text-[rgb(83,100,113)]"
                    } group-hover:text-green-500 transition-colors`}
                  >
                    {formatNumber(tweetData.retweets)}
                  </span>
                </div>
                <div className="flex items-center gap-1 group cursor-pointer">
                  <Heart
                    className={`w-5 h-5 ${
                      tweetData.theme === "dark" ? "text-[rgb(113,118,123)]" : "text-[rgb(83,100,113)]"
                    } group-hover:text-pink-600 transition-colors`}
                  />
                  <span
                    className={`text-sm ${
                      tweetData.theme === "dark" ? "text-[rgb(113,118,123)]" : "text-[rgb(83,100,113)]"
                    } group-hover:text-pink-600 transition-colors`}
                  >
                    {formatNumber(tweetData.likes)}
                  </span>
                </div>
                <div className="flex items-center gap-1 group cursor-pointer">
                  <BarChart3
                    className={`w-5 h-5 ${
                      tweetData.theme === "dark" ? "text-[rgb(113,118,123)]" : "text-[rgb(83,100,113)]"
                    } group-hover:text-blue-500 transition-colors`}
                  />
                  <span
                    className={`text-sm ${
                      tweetData.theme === "dark" ? "text-[rgb(113,118,123)]" : "text-[rgb(83,100,113)]"
                    } group-hover:text-blue-500 transition-colors`}
                  >
                    {formatNumber(tweetData.views)}
                  </span>
                </div>
                <Share
                  className={`w-5 h-5 ${
                    tweetData.theme === "dark" ? "text-[rgb(113,118,123)]" : "text-[rgb(83,100,113)]"
                  } hover:text-blue-500 transition-colors cursor-pointer`}
                />
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

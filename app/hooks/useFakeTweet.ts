"use client";

import { useState, useCallback } from "react";

export interface TweetData {
  profileImage: string;
  displayName: string;
  username: string;
  isVerified: boolean;
  tweetText: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  theme: "light" | "dark";
}

const defaultTweet: TweetData = {
  profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  displayName: "Sarah Chen",
  username: "sarahchen",
  isVerified: true,
  tweetText: "Just shipped a new feature that reduces load time by 40%! 🚀 The team crushed it this sprint. #WebDev #Performance",
  timestamp: "2:47 PM · Feb 14, 2026",
  likes: 2847,
  retweets: 421,
  replies: 156,
  views: 187500,
  theme: "light",
};

export function useFakeTweet() {
  const [tweetData, setTweetData] = useState<TweetData>(defaultTweet);
  const [, setCustomImage] = useState<string | null>(null);

  const updateTweet = useCallback((updates: Partial<TweetData>) => {
    // Validate tweet text length (Twitter limit is 280 characters)
    if (updates.tweetText !== undefined && updates.tweetText.length > 280) {
      updates.tweetText = updates.tweetText.slice(0, 280);
    }

    // Ensure numbers are non-negative
    if (updates.likes !== undefined && updates.likes < 0) updates.likes = 0;
    if (updates.retweets !== undefined && updates.retweets < 0) updates.retweets = 0;
    if (updates.replies !== undefined && updates.replies < 0) updates.replies = 0;
    if (updates.views !== undefined && updates.views < 0) updates.views = 0;

    setTweetData((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleImageUpload = useCallback((file: File) => {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCustomImage(result);
      setTweetData((prev) => ({ ...prev, profileImage: result }));
    };
    reader.readAsDataURL(file);
  }, []);

  const generateRandomAvatar = useCallback(() => {
    const seed = Math.random().toString(36).substring(7);
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    setCustomImage(null);
    setTweetData((prev) => ({ ...prev, profileImage: avatar }));
  }, []);

  const formatNumber = useCallback((num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  }, []);

  const formatTimestamp = useCallback((date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${displayHours}:${displayMinutes} ${ampm} · ${month} ${day}, ${year}`;
  }, []);

  const setCurrentTime = useCallback(() => {
    const now = new Date();
    setTweetData((prev) => ({ ...prev, timestamp: formatTimestamp(now) }));
  }, [formatTimestamp]);

  const reset = useCallback(() => {
    setTweetData(defaultTweet);
    setCustomImage(null);
  }, []);

  return {
    tweetData,
    updateTweet,
    handleImageUpload,
    generateRandomAvatar,
    formatNumber,
    formatTimestamp,
    setCurrentTime,
    reset,
  };
}

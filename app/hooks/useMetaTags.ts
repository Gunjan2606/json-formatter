"use client";

import { useState, useCallback, useMemo } from "react";

export interface MetaTagData {
  title: string;
  description: string;
  keywords: string;
  author: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  themeColor: string;
  viewport: string;
}

const defaultMetaTags: MetaTagData = {
  title: "My Awesome Website - Best Product Ever",
  description: "Discover the best product that solves all your problems. High quality, affordable, and trusted by thousands of customers.",
  keywords: "product, service, awesome, best",
  author: "",
  canonical: "https://example.com",
  ogTitle: "My Awesome Website - Best Product Ever",
  ogDescription: "Discover the best product that solves all your problems. High quality, affordable, and trusted by thousands of customers.",
  ogImage: "https://example.com/og-image.jpg",
  ogUrl: "https://example.com",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "My Awesome Website - Best Product Ever",
  twitterDescription: "Discover the best product that solves all your problems. High quality, affordable, and trusted by thousands of customers.",
  twitterImage: "https://example.com/og-image.jpg",
  twitterSite: "@yourhandle",
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1",
};

export function useMetaTags() {
  const [metaTags, setMetaTags] = useState<MetaTagData>(defaultMetaTags);

  const updateMetaTag = useCallback((key: keyof MetaTagData, value: string) => {
    setMetaTags((prev) => ({ ...prev, [key]: value }));
  }, []);

  const htmlCode = useMemo(() => {
    const tags: string[] = [];

    // Basic meta tags
    if (metaTags.title) {
      tags.push(`<title>${metaTags.title}</title>`);
    }
    if (metaTags.description) {
      tags.push(`<meta name="description" content="${metaTags.description}">`);
    }
    if (metaTags.keywords) {
      tags.push(`<meta name="keywords" content="${metaTags.keywords}">`);
    }
    if (metaTags.author) {
      tags.push(`<meta name="author" content="${metaTags.author}">`);
    }
    if (metaTags.canonical) {
      tags.push(`<link rel="canonical" href="${metaTags.canonical}">`);
    }

    // Viewport and theme
    if (metaTags.viewport) {
      tags.push(`<meta name="viewport" content="${metaTags.viewport}">`);
    }
    if (metaTags.themeColor) {
      tags.push(`<meta name="theme-color" content="${metaTags.themeColor}">`);
    }

    // Open Graph tags
    if (metaTags.ogTitle) {
      tags.push(`<meta property="og:title" content="${metaTags.ogTitle}">`);
    }
    if (metaTags.ogDescription) {
      tags.push(`<meta property="og:description" content="${metaTags.ogDescription}">`);
    }
    if (metaTags.ogImage) {
      tags.push(`<meta property="og:image" content="${metaTags.ogImage}">`);
    }
    if (metaTags.ogUrl) {
      tags.push(`<meta property="og:url" content="${metaTags.ogUrl}">`);
    }
    if (metaTags.ogType) {
      tags.push(`<meta property="og:type" content="${metaTags.ogType}">`);
    }

    // Twitter Card tags
    if (metaTags.twitterCard) {
      tags.push(`<meta name="twitter:card" content="${metaTags.twitterCard}">`);
    }
    if (metaTags.twitterTitle) {
      tags.push(`<meta name="twitter:title" content="${metaTags.twitterTitle}">`);
    }
    if (metaTags.twitterDescription) {
      tags.push(`<meta name="twitter:description" content="${metaTags.twitterDescription}">`);
    }
    if (metaTags.twitterImage) {
      tags.push(`<meta name="twitter:image" content="${metaTags.twitterImage}">`);
    }
    if (metaTags.twitterSite) {
      tags.push(`<meta name="twitter:site" content="${metaTags.twitterSite}">`);
    }

    return tags.join("\n");
  }, [metaTags]);

  const syncOGFromBasic = useCallback(() => {
    setMetaTags((prev) => ({
      ...prev,
      ogTitle: prev.title,
      ogDescription: prev.description,
      ogUrl: prev.canonical,
    }));
  }, []);

  const syncTwitterFromOG = useCallback(() => {
    setMetaTags((prev) => ({
      ...prev,
      twitterTitle: prev.ogTitle,
      twitterDescription: prev.ogDescription,
      twitterImage: prev.ogImage,
    }));
  }, []);

  const reset = useCallback(() => {
    setMetaTags(defaultMetaTags);
  }, []);

  return {
    metaTags,
    updateMetaTag,
    htmlCode,
    syncOGFromBasic,
    syncTwitterFromOG,
    reset,
  };
}

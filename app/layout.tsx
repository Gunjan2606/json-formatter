import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "../app/components/ui/toaster";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Global metadata for jsonformatter.gg
export const metadata: Metadata = {
  // Default title (overridden by page-specific titles)
  title: {
    default: "JSON Formatter – Free Online Formatter & Tools",
    template: "%s | JSON Formatter", // Page-specific titles will append this
  },
  description:
    "Free online JSON formatter and validator. Format, validate, beautify, minify, and repair JSON instantly in your browser – no signup, no data logging.",
  metadataBase: new URL("https://jsonformatter.gg"),

  // Authors
  authors: [{ name: "JSON Formatter" }],

  // Open Graph (good defaults for homepage & fallback)
  openGraph: {
    title: "JSON Formatter – Free JSON Formatter & Validator Tools",
    description:
      "Fast, privacy-first JSON tools to format, validate, beautify, minify, convert to CSV, validate schema, and more.",
    url: "https://jsonformatter.gg",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png", 
        width: 1200,
        height: 630,
        alt: "jsonformatter.gg – Free JSON Tools",
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    site: "@json__gg", // your actual handle
    title: "JSON Formatter – Free Online JSON Tools",
    description:
      "Fast, secure, client-side JSON tools: formatter, validator, converter, schema validator, and more.",
    images: ["/og-image/default.png"],
  },

  // Other SEO essentials
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minifier",
    "json to csv converter",
    "free json tools",
    "online json editor",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical for homepage
  alternates: {
    canonical: "https://jsonformatter.gg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JSON Formatter",
    url: "https://jsonformatter.gg",
    description:
      "Free online JSON formatter and validator. Format, validate, beautify, minify, and repair JSON instantly in your browser.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://jsonformatter.gg/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Favicon & PWA icons */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="jsonformatter.gg" />
        <meta
          name="apple-mobile-web-app-title"
          content="jsonformatter.gg"
        />
        {/* Viewport for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Theme color (optional) */}
        <meta name="theme-color" content="#ffffff" />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
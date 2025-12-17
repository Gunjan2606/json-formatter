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
    default: "jsonformatter.gg – Free Online JSON Formatter & Tools",
    template: "%s | jsonformatter.gg", // Page-specific titles will append this
  },
  description:
    "Free online JSON formatter, validator, beautifier, minifier, and converter tools. Secure, fast, 100% client-side processing – no data leaves your browser.",
  
  // Authors
  authors: [{ name: "jsonformatter.gg" }],

  // Open Graph (good defaults for homepage & fallback)
  openGraph: {
    title: "jsonformatter.gg – Free JSON Formatter & Validator Tools",
    description:
      "Powerful, privacy-first online tools for JSON: format, validate, beautify, minify, convert to CSV, validate schema, and more.",
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
    title: "jsonformatter.gg – Free JSON Formatter & Tools",
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
  return (
    <html lang="en">
      <head>
        {/* Favicon & icons – add your actual paths */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        {/* Viewport for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Theme color (optional) */}
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
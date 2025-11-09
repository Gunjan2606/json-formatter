import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "../app/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSON Formatter - Fast & Beautiful JSON Tool",
  description: "A lightning-fast JSON formatter and validator. Format, minify, and beautify JSON with error detection, theme support, and handles large files effortlessly.",
  authors: [{ name: "JSON Formatter" }],
  openGraph: {
    title: "JSON Formatter - Fast & Beautiful JSON Tool",
    description: "Format and validate JSON instantly with our powerful, beautiful tool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Lovable",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

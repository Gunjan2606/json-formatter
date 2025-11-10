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
  title: "JSON Formatter & Validator Online | Format, Beautify & Minify JSON - jsonformatter.gg",
  description: "Free online JSON Formatter and Validator by jsonformatter.gg. Instantly format, validate, beautify, or minify JSON data. Supports large files, dark mode, error highlighting, and secure local processing.",
  authors: [{ name: "jsonformatter.gg" }],
  openGraph: {
    title: "JSON Formatter & Validator Online | Format, Beautify & Minify JSON",
    description: "Use jsonformatter.gg to quickly format, validate, beautify, and compress JSON. Handles large files with speed, privacy, and modern UI.",
    url: "https://jsonformatter.gg",
    siteName: "jsonformatter.gg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jsonformattergg",
    title: "JSON Formatter & Validator Online | jsonformatter.gg",
    description: "Fast, free JSON formatter and validator. Format, beautify, minify, and check JSON instantly — with support for large files and dark mode.",
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

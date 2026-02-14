import { Metadata } from "next";
import RegexTester from "../pages/RegexTester";

export const metadata: Metadata = {
  title: "Regex Tester & Debugger - Test Regular Expressions Online | Free Tool",
  description:
    "Free online regex tester with real-time match highlighting, capture groups, and find & replace. 100% client-side, works offline. Test JavaScript, Python, Go, Java regex patterns. Built-in cheatsheet, test cases, code export.",
  keywords: [
    "regex tester",
    "regular expression tester",
    "regex debugger",
    "test regex online",
    "regex validator",
    "regex match",
    "regex find and replace",
    "regex101 alternative",
    "regular expression online",
    "regex checker",
    "regex tool",
    "javascript regex",
    "python regex",
    "regex capture groups",
  ],
  openGraph: {
    title: "Regex Tester & Debugger - Test Regular Expressions Online",
    description:
      "Free regex tester with real-time highlighting, test cases, find & replace. 100% client-side. Export code for JS, Python, Go, Java. Built-in cheatsheet.",
    url: "https://jsonformatter.gg/regex-tester",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Regex Tester Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Tester & Debugger | jsonformatter.gg",
    description:
      "Test & debug regex online with real-time highlighting. Match, replace, test cases, code export. 100% client-side, works offline.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/regex-tester",
  },
};

export default function RegexTesterPage() {
  return <RegexTester />;
}

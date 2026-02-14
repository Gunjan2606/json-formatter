import { Metadata } from "next";
import WordCounter from "../pages/WordCounter";

export const metadata: Metadata = {
  title: "Word Counter & Character Counter Online - Free Tool",
  description:
    "Free online word counter and character counter. Count words, characters, sentences, paragraphs, reading time, and more instantly. 100% private, client-side processing. No ads.",
  keywords: [
    "word counter",
    "character counter",
    "word count online",
    "character count online",
    "letter counter",
    "reading time calculator",
    "word counter tool",
    "online word counter",
    "free word counter",
    "text counter",
    "sentence counter",
    "paragraph counter",
  ],
  openGraph: {
    title: "Word Counter & Character Counter Online - Free Tool",
    description:
      "Count words, characters, sentences, paragraphs, and reading time instantly. Privacy-first, ad-free, 100% client-side.",
    url: "https://jsonformatter.gg/word-counter",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Word Counter & Character Counter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Counter & Character Counter Online | jsonformatter.gg",
    description:
      "Free word counter with reading time, keyword density, social media limits, and developer stats. No ads, 100% private.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/word-counter",
  },
};

export default function WordCounterPage() {
  return <WordCounter />;
}

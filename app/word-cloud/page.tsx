import { Metadata } from "next";
import WordCloudGenerator from "../pages/WordCloudGenerator";

export const metadata: Metadata = {
  title: "Word Cloud Generator - Create Beautiful Text Visualizations | Free Online Tool",
  description:
    "Generate stunning word clouds from text instantly. Custom shapes (circle, rectangle, triangle), color schemes, fonts. Perfect for presentations, analysis, and data visualization. Export as PNG.",
  keywords: [
    "word cloud generator",
    "word cloud",
    "text visualization",
    "word frequency",
    "tag cloud generator",
    "text cloud",
    "word art generator",
    "free word cloud",
    "online word cloud",
    "word cloud maker",
  ],
  openGraph: {
    title: "Word Cloud Generator | Free Text Visualization Tool",
    description:
      "Create beautiful word clouds from text. Custom shapes, colors, fonts. Perfect for presentations and analysis.",
    url: "https://jsonformatter.gg/word-cloud",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Word Cloud Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Cloud Generator | jsonformatter.gg",
    description:
      "Generate word clouds from text. Custom shapes, colors, fonts. Export as PNG. Free online tool.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/word-cloud",
  },
};

export default function WordCloudPage() {
  return <WordCloudGenerator />;
}

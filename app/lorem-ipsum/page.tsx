import { Metadata } from "next";
import LoremIpsumGenerator from "../pages/LoremIpsumGenerator";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Free Placeholder Text | Multiple Styles & Formats",
  description:
    "Free Lorem Ipsum generator with 5 text styles (Classic, Hipster, Tech, Corporate, Pirate) and 3 formats (HTML, Markdown, Plain). Custom word/character limits, headings, lists. Instant dummy text for mockups and prototypes.",
  keywords: [
    "lorem ipsum generator",
    "lorem ipsum",
    "placeholder text",
    "dummy text generator",
    "lorem generator",
    "lipsum generator",
    "fake text generator",
    "sample text",
    "filler text",
    "lorem ipsum html",
    "lorem ipsum markdown",
    "hipster ipsum",
    "tech ipsum",
    "text generator online",
  ],
  openGraph: {
    title: "Lorem Ipsum Generator - 5 Styles, HTML & Markdown Support",
    description:
      "Generate placeholder text with Classic, Hipster, Tech, Corporate, or Pirate styles. Export as HTML, Markdown, or plain text. Custom limits, headings, lists.",
    url: "https://jsonformatter.gg/lorem-ipsum",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Lorem Ipsum Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorem Ipsum Generator | jsonformatter.gg",
    description:
      "Free placeholder text generator. 5 styles, HTML/Markdown formats, custom limits. Perfect for mockups and prototypes.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/lorem-ipsum",
  },
};

export default function LoremIpsumPage() {
  return <LoremIpsumGenerator />;
}

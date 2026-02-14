import { Metadata } from "next";
import TextDiff from "../pages/TextDiff";

export const metadata: Metadata = {
  title: "Text Diff Tool - Compare Text & Code Online | Smart Line Comparison",
  description:
    "Compare text and code with smart intra-line highlighting. Character, word, and line-level diffs. Side-by-side and unified views. 100% client-side, no uploads, instant results. Free, no ads.",
  keywords: [
    "text diff",
    "code diff",
    "text compare",
    "diff checker",
    "file compare",
    "text comparison",
    "code comparison",
    "diff tool online",
    "text difference",
    "merge conflict",
    "side by side diff",
    "unified diff",
  ],
  openGraph: {
    title: "Text Diff Tool - Smart Code & Text Comparison",
    description:
      "Compare text and code with intelligent character-level highlighting. Side-by-side and unified views. 100% client-side, instant results.",
    url: "https://jsonformatter.gg/text-diff",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Text Diff Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Diff Tool | jsonformatter.gg",
    description:
      "Free text & code diff with smart highlighting. Character/word/line modes, split/unified views. No uploads, instant results.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/text-diff",
  },
};

export default function TextDiffPage() {
  return <TextDiff />;
}

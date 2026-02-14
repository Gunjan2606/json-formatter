import { Metadata } from "next";
import MetaTagsGenerator from "../pages/MetaTagsGenerator";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Meta Tags Generator - Free SEO & Social Media Meta Tags | Open Graph, Twitter Cards",
  description:
    "Free meta tags generator with live previews for Facebook, Twitter, and Google. Create Open Graph tags, Twitter Cards, and SEO meta tags. Copy HTML code instantly.",
  keywords: [
    "meta tags generator",
    "meta tags",
    "open graph generator",
    "twitter card generator",
    "seo meta tags",
    "og tags",
    "social media meta tags",
    "meta description generator",
    "html meta tags",
  ],
  openGraph: {
    title: "Meta Tags Generator | Free SEO & Social Media Tool",
    description:
      "Generate meta tags for SEO and social media. Live previews for Facebook, Twitter, Google. Copy HTML code instantly.",
    url: "https://jsonformatter.gg/meta-tags",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Meta Tags Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meta Tags Generator | jsonformatter.gg",
    description:
      "Generate SEO and social media meta tags with live previews. Open Graph, Twitter Cards, and more.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/meta-tags",
  },
};

export default function MetaTagsPage() {
  return <MetaTagsGenerator />;
}

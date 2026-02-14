import { Metadata } from "next";
import OGImageGenerator from "../pages/OGImageGenerator";

export const metadata: Metadata = {
  title: "OG Image Generator - Create Open Graph Images Online | Free Tool",
  description:
    "Free Open Graph (OG) image generator. Create stunning social media preview images for Facebook, Twitter, LinkedIn. Download 1200×630 images instantly.",
  keywords: ["og image generator", "open graph image", "social media preview", "facebook image", "twitter card", "og image maker", "social preview"],
  openGraph: {
    title: "OG Image Generator | Free Online Tool",
    description: "Create beautiful Open Graph images for social media. Perfect for blog posts, websites, and social sharing.",
    url: "https://jsonformatter.gg/og-image-generator",
    siteName: "jsonformatter.gg",
    type: "website",
  },
  alternates: {
    canonical: "https://jsonformatter.gg/og-image-generator",
  },
};

export default function OGImageGeneratorPage() {
  return <OGImageGenerator />;
}

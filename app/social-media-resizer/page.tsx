import { Metadata } from "next";
import SocialMediaResizer from "../pages/SocialMediaResizer";

export const metadata: Metadata = {
  title: "Social Media Image Resizer - Resize for Instagram, Twitter, LinkedIn, Facebook | Free Tool",
  description:
    "Upload 1 image, get all social media sizes instantly. Instagram post/story, Twitter, LinkedIn, Facebook, YouTube, Pinterest, TikTok. Download individually or as ZIP. Free online resizer.",
  keywords: [
    "social media resizer",
    "image resizer",
    "instagram image size",
    "twitter image size",
    "linkedin image size",
    "facebook image size",
    "social media image dimensions",
    "resize for social media",
    "batch image resize",
    "social media tool",
  ],
  openGraph: {
    title: "Social Media Image Resizer | All Platform Sizes Instantly",
    description:
      "Upload once, resize for all platforms. Instagram, Twitter, LinkedIn, Facebook, YouTube, Pinterest, TikTok. Download ZIP.",
    url: "https://jsonformatter.gg/social-media-resizer",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Social Media Image Resizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Image Resizer | jsonformatter.gg",
    description:
      "1 image → all social media sizes. Instagram, Twitter, LinkedIn, FB, YouTube, Pinterest. Download ZIP.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/social-media-resizer",
  },
};

export default function SocialMediaResizerPage() {
  return <SocialMediaResizer />;
}

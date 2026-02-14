import { Metadata } from "next";
import WatermarkTool from "../pages/WatermarkTool";

export const metadata: Metadata = {
  title: "Watermark Tool - Add Text & Logo Watermarks to Images | Batch Processing",
  description:
    "Add watermarks to images online. Text or logo watermarks with custom position, opacity, rotation. Batch process multiple images. Free watermark tool for photographers and content creators.",
  keywords: [
    "add watermark online",
    "watermark tool",
    "image watermark",
    "logo watermark",
    "text watermark",
    "batch watermark",
    "watermark images",
    "photo watermark",
    "copyright watermark",
    "watermark generator",
  ],
  openGraph: {
    title: "Watermark Tool | Add Watermarks to Images Online",
    description:
      "Add text or logo watermarks to images. Custom position, opacity, rotation. Batch processing. Free online tool.",
    url: "https://jsonformatter.gg/watermark-tool",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Watermark Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watermark Tool | jsonformatter.gg",
    description:
      "Add watermarks to images. Text/logo, custom position, batch processing. Free online.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/watermark-tool",
  },
};

export default function WatermarkToolPage() {
  return <WatermarkTool />;
}

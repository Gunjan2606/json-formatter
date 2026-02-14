import { Metadata } from "next";
import ImageCompressor from "../pages/ImageCompressor";

export const metadata: Metadata = {
  title: "Image Compressor - Compress PNG, JPG, WebP Online | Unlimited & Free",
  description:
    "Free unlimited image compressor with no file size limits. Compress PNG, JPG, WebP, GIF, AVIF & SVG by up to 80%. 100% client-side, complete privacy. No 20-image limit like TinyPNG. Batch download, quality control, before/after preview.",
  keywords: [
    "image compressor",
    "compress image",
    "image optimizer",
    "reduce image size",
    "compress png",
    "compress jpg",
    "compress jpeg",
    "webp converter",
    "image compression online",
    "tinypng alternative",
    "free image compressor",
    "batch image compression",
    "unlimited image compressor",
    "compress photo online",
  ],
  openGraph: {
    title: "Image Compressor - Unlimited, Free, 100% Private | No Limits",
    description:
      "Compress PNG, JPG, WebP, GIF, AVIF & SVG with no file size limits. Up to 80% smaller. 100% client-side processing. Free alternative to TinyPNG without restrictions.",
    url: "https://jsonformatter.gg/image-compressor",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Image Compressor Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor | Unlimited & Free | jsonformatter.gg",
    description:
      "Compress images online with no limits. PNG, JPG, WebP, GIF support. 100% private, client-side processing. Free TinyPNG alternative.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/image-compressor",
  },
};

export default function ImageCompressorPage() {
  return <ImageCompressor />;
}

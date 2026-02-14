import { Metadata } from "next";
import GradientGenerator from "../pages/GradientGenerator";

export const metadata: Metadata = {
  title: "CSS Gradient Generator - Free Online Tool | Linear, Radial, Conic",
  description:
    "Free CSS gradient generator with real-time preview. Create linear, radial, and conic gradients with unlimited color stops. Copy CSS code, download PNG/SVG. 8 beautiful presets included.",
  keywords: [
    "css gradient generator",
    "gradient generator",
    "linear gradient",
    "radial gradient",
    "conic gradient",
    "css gradient",
    "gradient maker",
    "gradient background",
    "gradient tool",
    "css background generator",
    "color gradient",
    "gradient designer",
    "gradient creator",
    "css gradient code",
  ],
  openGraph: {
    title: "CSS Gradient Generator | Free Tool with Linear, Radial, Conic Support",
    description:
      "Create stunning CSS gradients with real-time preview. Unlimited color stops, 8 presets, export as CSS/PNG/SVG. 100% free online gradient generator.",
    url: "https://jsonformatter.gg/gradient-generator",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "CSS Gradient Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Gradient Generator | jsonformatter.gg",
    description:
      "Free CSS gradient generator. Create linear, radial, conic gradients. Copy CSS, download PNG/SVG. Real-time preview with unlimited colors.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/gradient-generator",
  },
};

export default function GradientGeneratorPage() {
  return <GradientGenerator />;
}

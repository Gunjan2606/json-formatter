import { Metadata } from "next";
import UUIDGenerator from "../pages/UUIDGenerator";

export const metadata: Metadata = {
  title: "UUID Generator & Validator - v1, v4, v7 | Free Online Tool",
  description:
    "Generate UUIDs (Universally Unique Identifiers) instantly. Supports v1, v4, v7 with bulk generation, decoder, timestamp extractor, and validator. Multiple formats, 100% client-side, no ads.",
  keywords: [
    "uuid generator",
    "guid generator",
    "uuid v4 generator",
    "uuid v7 generator",
    "uuid validator",
    "generate uuid online",
    "unique identifier generator",
    "uuid decoder",
    "bulk uuid generator",
    "uuid timestamp extractor",
    "random uuid",
    "guid online",
  ],
  openGraph: {
    title: "UUID Generator & Validator - v1, v4, v7",
    description:
      "Generate, validate, and decode UUIDs instantly. Supports v1, v4, v7 with bulk generation and timestamp extraction. No ads, 100% private.",
    url: "https://jsonformatter.gg/uuid-generator",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "UUID Generator Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator & Validator | jsonformatter.gg",
    description:
      "Free UUID generator with v1, v4, v7 support, decoder, validator, and bulk generation. No ads, 100% private.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/uuid-generator",
  },
};

export default function UUIDGeneratorPage() {
  return <UUIDGenerator />;
}

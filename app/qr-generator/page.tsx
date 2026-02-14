import { Metadata } from "next";
import QRGenerator from "../pages/QRGenerator";

export const metadata: Metadata = {
  title: "QR Code Generator - Free, No Expiration | Create QR Codes Online",
  description:
    "Generate static QR codes that work forever — no subscriptions, no expiration. Supports URL, text, email, phone, WiFi, vCard. Client-side generation, 100% private, no ads. Download as PNG, SVG, PDF.",
  keywords: [
    "qr code generator",
    "free qr code",
    "qr code maker",
    "generate qr code",
    "qr code online",
    "static qr code",
    "qr code no expiration",
    "wifi qr code",
    "vcard qr code",
    "qr code generator free",
    "custom qr code",
    "qr code with logo",
  ],
  openGraph: {
    title: "QR Code Generator - Free, No Expiration, No Tricks",
    description:
      "Generate static QR codes that work forever. Supports URL, WiFi, vCard, and more. Client-side generation, no ads, completely free.",
    url: "https://jsonformatter.gg/qr-generator",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "QR Code Generator Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator | jsonformatter.gg",
    description:
      "Free QR code generator with no expiration. Static codes, client-side generation, no ads. Download PNG, SVG, PDF.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/qr-generator",
  },
};

export default function QRGeneratorPage() {
  return <QRGenerator />;
}

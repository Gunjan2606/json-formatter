import { Metadata } from "next";
import DeviceMockupGenerator from "../pages/DeviceMockupGenerator";

export const metadata: Metadata = {
  title: "Device Mockup Generator - Free iPhone & MacBook Screenshot Frames | Mockup Tool",
  description:
    "Create stunning device mockups instantly. Wrap your screenshots in iPhone 15 Pro, MacBook Pro, iPad frames. Custom backgrounds, colors, and shadows. Export high-res PNG for free.",
  keywords: [
    "device mockup generator",
    "mockup generator",
    "iphone mockup",
    "macbook mockup",
    "screenshot mockup",
    "device frame generator",
    "mockup tool",
    "product mockup",
    "app mockup",
    "website mockup",
    "free mockup generator",
  ],
  openGraph: {
    title: "Device Mockup Generator | Free iPhone & MacBook Frames",
    description:
      "Create professional device mockups instantly. iPhone 15 Pro, MacBook Pro, iPad frames. Custom backgrounds and high-res export.",
    url: "https://jsonformatter.gg/device-mockup",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Device Mockup Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Device Mockup Generator | jsonformatter.gg",
    description:
      "Wrap screenshots in iPhone, MacBook, iPad frames. Custom backgrounds, colors, shadows. Export high-res PNG.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/device-mockup",
  },
};

export default function DeviceMockupPage() {
  return <DeviceMockupGenerator />;
}

import { Metadata } from "next";
import FakeTweetGenerator from "../pages/FakeTweetGenerator";

export const metadata: Metadata = {
  title: "Fake Tweet Generator - Create Realistic Twitter Screenshots | Free Tool",
  description:
    "Free fake tweet generator with realistic Twitter/X UI. Customize profile, username, verified badge, tweet text, engagement stats. Download as PNG with light/dark mode. Perfect for mockups, tutorials, presentations.",
  keywords: [
    "fake tweet generator",
    "tweet generator",
    "fake twitter post",
    "twitter screenshot",
    "tweet mockup",
    "fake tweet maker",
    "twitter generator",
    "tweet screenshot generator",
    "fake x post",
    "twitter mockup",
    "fake social media post",
    "tweet creator",
  ],
  openGraph: {
    title: "Fake Tweet Generator | Create Realistic Twitter Screenshots",
    description:
      "Generate realistic fake tweets with custom profile, text, engagement stats. Download PNG with light/dark mode. 100% free online tool for mockups and tutorials.",
    url: "https://jsonformatter.gg/fake-tweet",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Fake Tweet Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fake Tweet Generator | jsonformatter.gg",
    description:
      "Create realistic fake tweets with custom profile, verified badge, engagement stats. Download PNG. Perfect for mockups and tutorials.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/fake-tweet",
  },
};

export default function FakeTweetPage() {
  return <FakeTweetGenerator />;
}

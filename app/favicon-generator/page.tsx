import { Metadata } from "next";
import FaviconGenerator from "../pages/FaviconGenerator";

export const metadata: Metadata = {
  title: "Favicon Generator - Create Favicons from Text or Image | Free Online Tool",
  description:
    "Free favicon generator. Create favicons from text or upload images. Generate all sizes (16x16 to 512x512) for web, iOS, Android. Download as ZIP with HTML code.",
  keywords: ["favicon generator", "favicon", "ico generator", "favicon maker", "icon generator"],
  openGraph: {
    title: "Favicon Generator | Free Online Tool",
    description: "Generate favicons from text or image. All sizes included. Download ZIP with HTML code.",
    url: "https://jsonformatter.gg/favicon-generator",
    siteName: "jsonformatter.gg",
    type: "website",
  },
  alternates: {
    canonical: "https://jsonformatter.gg/favicon-generator",
  },
};

export default function FaviconGeneratorPage() {
  return <FaviconGenerator />;
}

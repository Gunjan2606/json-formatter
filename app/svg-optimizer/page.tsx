import { Metadata } from "next";
import SVGOptimizer from "../pages/SVGOptimizer";

export const metadata: Metadata = {
  title: "SVG Optimizer - Compress & Minify SVG Files Online | Free Tool",
  description:
    "Free online SVG optimizer. Reduce SVG file size by removing unnecessary code, comments, and metadata. Optimize SVG for web with instant results and download.",
  keywords: ["svg optimizer", "svg compressor", "minify svg", "svg minifier", "optimize svg", "compress svg", "svg file size reducer"],
  openGraph: {
    title: "SVG Optimizer | Free Online Tool",
    description: "Optimize and compress SVG files instantly. Remove unnecessary code and reduce file size while keeping visual quality.",
    url: "https://jsonformatter.gg/svg-optimizer",
    siteName: "jsonformatter.gg",
    type: "website",
  },
  alternates: {
    canonical: "https://jsonformatter.gg/svg-optimizer",
  },
};

export default function SVGOptimizerPage() {
  return <SVGOptimizer />;
}

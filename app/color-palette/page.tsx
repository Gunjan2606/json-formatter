import { Metadata } from "next";
import ColorPalette from "../pages/ColorPalette";

export const metadata: Metadata = {
  title: "Color Palette Generator - Free Online Tool with WCAG Contrast Checker",
  description:
    "Free color palette generator with 5 harmony modes (complementary, analogous, triadic, monochromatic). Lock colors, check WCAG contrast ratios, export as PNG/SVG/CSS. Generate beautiful, accessible color schemes instantly.",
  keywords: [
    "color palette generator",
    "color scheme generator",
    "color palette",
    "color harmony",
    "complementary colors",
    "analogous colors",
    "triadic colors",
    "monochromatic colors",
    "wcag contrast checker",
    "color contrast",
    "accessibility checker",
    "color theory",
    "hex color generator",
    "css color palette",
  ],
  openGraph: {
    title: "Color Palette Generator | Free Tool with WCAG Contrast Checker",
    description:
      "Generate stunning color palettes with color harmony modes. Lock favorite colors, check WCAG accessibility, export as PNG/SVG/CSS. 100% free online color generator.",
    url: "https://jsonformatter.gg/color-palette",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Color Palette Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Palette Generator | jsonformatter.gg",
    description:
      "Free color palette generator with 5 harmony modes. Lock colors, check WCAG contrast, export PNG/SVG/CSS. Create accessible color schemes.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/color-palette",
  },
};

export default function ColorPalettePage() {
  return <ColorPalette />;
}

import { Metadata } from "next";
import ColorPicker from "../pages/ColorPicker";

export const metadata: Metadata = {
  title: "Color Picker & Palette Generator - CSS, Tailwind, Design Tokens",
  description:
    "Developer-first color picker with instant export to CSS variables, Tailwind config, Sass, JS, JSON. Generate shade scales, check WCAG contrast, create color harmonies. Free, no ads.",
  keywords: [
    "color picker",
    "color palette generator",
    "hex color picker",
    "rgb color picker",
    "hsl color picker",
    "css color generator",
    "tailwind color generator",
    "design tokens",
    "wcag contrast checker",
    "color harmony generator",
    "shade generator",
    "color converter",
  ],
  openGraph: {
    title: "Color Picker & Palette Generator - Developer Tools",
    description:
      "Generate color systems with CSS variables, Tailwind config, shade scales, and WCAG contrast checking. Free, no ads.",
    url: "https://jsonformatter.gg/color-picker",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Color Picker Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Picker & Palette Generator | jsonformatter.gg",
    description:
      "Free color picker with CSS variables, Tailwind config, shade scales, and WCAG contrast checking. No ads, 100% free.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/color-picker",
  },
};

export default function ColorPickerPage() {
  return <ColorPicker />;
}

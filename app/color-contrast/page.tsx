import { Metadata } from "next";
import ColorContrastChecker from "../pages/ColorContrastChecker";

export const metadata: Metadata = {
  title: "Color Contrast Checker - WCAG Accessibility Tester | Free Online Tool",
  description:
    "Free WCAG color contrast checker. Test foreground and background color combinations for AA and AAA compliance. Ensure accessible text with live preview and contrast ratio.",
  keywords: ["color contrast checker", "wcag contrast", "accessibility", "color accessibility", "contrast ratio", "aa compliance", "aaa compliance"],
  openGraph: {
    title: "Color Contrast Checker | Free Online Tool",
    description: "Test color combinations for WCAG compliance. Check AA/AAA accessibility standards with live preview.",
    url: "https://jsonformatter.gg/color-contrast",
    siteName: "jsonformatter.gg",
    type: "website",
  },
  alternates: {
    canonical: "https://jsonformatter.gg/color-contrast",
  },
};

export default function ColorContrastCheckerPage() {
  return <ColorContrastChecker />;
}

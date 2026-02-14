import { Metadata } from "next";
import EpochConverter from "../pages/EpochConverter";

export const metadata: Metadata = {
  title: "Epoch & Unix Timestamp Converter - Free Online Tool",
  description:
    "Convert Unix timestamps to dates and dates to timestamps instantly. Supports seconds, milliseconds, microseconds with auto-detection. Multiple timezones, relative time, quick presets. 100% client-side, no ads.",
  keywords: [
    "epoch converter",
    "unix timestamp converter",
    "timestamp to date",
    "epoch to date",
    "unix time converter",
    "milliseconds to date",
    "timestamp converter online",
    "epoch time converter",
    "unix epoch converter",
    "date to timestamp",
    "timestamp calculator",
    "current unix timestamp",
  ],
  openGraph: {
    title: "Epoch & Unix Timestamp Converter - Instant Date Conversion",
    description:
      "Convert Unix timestamps to human-readable dates instantly. Auto-detects seconds/milliseconds/microseconds. Multiple formats, timezones, no ads.",
    url: "https://jsonformatter.gg/epoch-converter",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Epoch Timestamp Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Epoch & Unix Timestamp Converter | jsonformatter.gg",
    description:
      "Free epoch converter with auto-detection, timezone support, relative time, and quick presets. No ads, 100% private.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/epoch-converter",
  },
};

export default function EpochConverterPage() {
  return <EpochConverter />;
}

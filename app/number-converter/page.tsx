import { Metadata } from "next";
import NumberConverter from "../pages/NumberConverter";

export const metadata: Metadata = {
  title: "Number Base Converter - Hex, Binary, Decimal, Octal | Free Online Tool",
  description:
    "Convert between hexadecimal, binary, decimal, and octal instantly. Supports big numbers (BigInt), live conversion, digit grouping, and bit-length display. 100% client-side, free, no ads.",
  keywords: [
    "hex to decimal",
    "binary to decimal",
    "decimal to hex",
    "decimal to binary",
    "hex to binary",
    "octal to decimal",
    "number base converter",
    "hex converter",
    "binary converter",
    "base converter online",
    "hexadecimal converter",
    "number system converter",
  ],
  openGraph: {
    title: "Number Base Converter - Hex, Binary, Decimal, Octal",
    description:
      "Convert between hex, binary, decimal, and octal instantly. Big number support, live conversion, no ads.",
    url: "https://jsonformatter.gg/number-converter",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Number Base Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Number Base Converter | jsonformatter.gg",
    description:
      "Free hex/binary/decimal/octal converter with BigInt support, live conversion, and digit grouping. No ads, 100% private.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/number-converter",
  },
};

export default function NumberConverterPage() {
  return <NumberConverter />;
}

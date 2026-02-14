import { Metadata } from "next";
import PasswordGenerator from "../pages/PasswordGenerator";

export const metadata: Metadata = {
  title: "Password Generator Online - Free & Secure",
  description:
    "Generate strong, secure passwords instantly in your browser. Random passwords, passphrases, and PINs with strength analysis. 100% client-side, no data sent to servers.",
  keywords: [
    "password generator",
    "random password generator",
    "strong password generator",
    "secure password generator",
    "passphrase generator",
    "password generator online",
    "free password generator",
    "bulk password generator",
  ],
  openGraph: {
    title: "Password Generator Online - Free & Secure",
    description:
      "Generate strong passwords, passphrases, and PINs instantly. Cryptographically secure, 100% client-side, ad-free.",
    url: "https://jsonformatter.gg/password-generator",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Password Generator Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator Online | jsonformatter.gg",
    description:
      "Free secure password generator with strength analysis, bulk generation, and passphrase mode. No ads, 100% private.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/password-generator",
  },
};

export default function PasswordGeneratorPage() {
  return <PasswordGenerator />;
}

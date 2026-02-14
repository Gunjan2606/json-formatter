import { Metadata } from "next";
import JWTDecoder from "../pages/JWTDecoder";

export const metadata: Metadata = {
  title: "JWT Decoder & Validator - Decode, Verify & Generate JSON Web Tokens Online",
  description:
    "Free online JWT decoder with security analysis. Decode, verify, and generate JWTs with 9 algorithm support. 100% client-side, no uploads, instant results. Debug authentication flows with automatic security warnings.",
  keywords: [
    "jwt decoder",
    "jwt validator",
    "json web token decoder",
    "jwt debugger",
    "jwt verify",
    "jwt generator",
    "decode jwt online",
    "jwt parser",
    "jwt security",
    "jwt signature verification",
    "jwt.io alternative",
    "token decoder",
    "jwt claims",
    "jwt header payload",
  ],
  openGraph: {
    title: "JWT Decoder & Validator - Decode & Verify JSON Web Tokens",
    description:
      "Free JWT decoder with automatic security analysis. Decode headers & payloads, verify signatures, generate tokens. 9 algorithms, 100% client-side, instant results.",
    url: "https://jsonformatter.gg/jwt-decoder",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "JWT Decoder & Validator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Decoder & Validator | jsonformatter.gg",
    description:
      "Decode, verify & generate JWTs with security analysis. HS256/384/512, RS256/384/512, ES256/384/512 support. No uploads, instant results.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/jwt-decoder",
  },
};

export default function JWTDecoderPage() {
  return <JWTDecoder />;
}

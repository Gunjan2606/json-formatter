// app/json-csv-converter/page.tsx  

import { Metadata } from 'next';
import JSONCSVConverter from '../pages/JSONCSVConverter'; 

// Page-specific metadata (overrides root layout defaults)
export const metadata: Metadata = {
  title: 'JSON - CSV Converter Online - Free & Secure Tool',
  description:
    'Convert JSON to CSV or CSV to JSON instantly with our free online JSON to CSV converter. Fast, secure, client-side processing with nested data support.',
  keywords: [
    'json to csv converter',
    'csv to json converter',
    'free json csv converter',
    'online json to csv',
    'json to excel converter',
    'convert json to csv',
  ],
  openGraph: {
    title: 'JSON - CSV Converter Online - Free Tool',
    description:
      'Use our JSON - CSV converter for quick, secure conversions. Handles large files, nested objects, and bidirectional formatting.',
    url: 'https://jsonformatter.gg/json-csv-converter',
    siteName: 'jsonformatter.gg',
    type: 'website',
    images: [
      {
        url: '/og-image/json-csv.png', // optional: create a 1200x630 image
        width: 1200,
        height: 630,
        alt: 'JSON - CSV Converter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON - CSV Converter Online | jsonformatter.gg',
    description:
      'Fast and free JSON - CSV converter tool. Validate, format, and convert data securely in your browser.',
    images: ['/og-image/json-csv.png'],
  },
  // Optional: Canonical URL to avoid duplicate content issues
  alternates: {
    canonical: 'https://jsonformatter.gg/json-csv-converter',
  },
};

export default function JSONCSVConverterRoute() {
  return <JSONCSVConverter />;
}

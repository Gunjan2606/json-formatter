// app/csv-formatter/page.tsx

import { Metadata } from 'next';
import CSVFormatter from '../pages/CSVFormatter'; // Adjust the import path to your actual component

export const metadata: Metadata = {
  title: 'CSV Formatter Online - Beautify & Validate CSV Files',
  description:
    'Free online CSV formatter, beautifier, and validator. Instantly format, clean, and validate CSV data with secure, client-side processing.',
  openGraph: {
    title: 'CSV Formatter Online - Free Tool',
    description:
      'Format, beautify, and validate CSV files instantly. No uploads, 100% client-side, perfect for data cleaning and analysis.',
    url: 'https://jsonformatter.gg/csv-formatter',
    siteName: 'jsonformatter.gg',
    type: 'website',
    images: [
      {
        url: '/og-image/csv-formatter.png',
        width: 1200,
        height: 630,
        alt: 'CSV Formatter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSV Formatter Online | jsonformatter.gg',
    description:
      'Free CSV formatter and validator. Beautify, clean, and check CSV data instantly in your browser.',
    images: ['/og-image/csv-formatter.png'],
  },
  alternates: {
    canonical: 'https://jsonformatter.gg/csv-formatter',
  },
};

export default function CSVFormatterRoute() {
  return <CSVFormatter />;
}
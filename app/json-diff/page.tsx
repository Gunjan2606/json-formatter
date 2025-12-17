import { Metadata } from 'next';
import JSONDiffTool from '../pages/JSONDiffTool';

export const metadata: Metadata = {
  title: 'JSON Diff Tool Online - Compare & Highlight Differences',
  description:
    'Compare two JSON objects or files instantly with our free online JSON diff tool. Highlights changes clearly.',
  openGraph: {
    title: 'JSON Diff Tool Online - Free Tool',
    description:
      'See differences between JSON files or objects with clear visual highlighting. No uploads, fully private.',
    url: 'https://jsonformatter.gg/json-diff',
    images: [{ url: '/og-image/json-diff.png', width: 1200, height: 630, alt: 'JSON Diff Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Diff Tool Online | jsonformatter.gg',
    description:
      'Free JSON diff tool. Compare and highlight changes between two JSON objects instantly.',
    images: ['/og-image/json-diff.png'],
  },
  alternates: {
    canonical: 'https://jsonformatter.gg/json-diff',
  },
};
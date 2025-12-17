import { Metadata } from 'next';
import XMLFormatter from '../pages/XmlFormatter'; 

export const metadata: Metadata = {
  title: 'XML Formatter Online - Beautify & Validate XML',
  description:
    'Free online XML formatter, beautifier, and validator. Instantly format, indent, and validate XML with secure local processing.',
  openGraph: {
    title: 'XML Formatter Online - Free Tool',
    description:
      'Beautify, format, and validate XML files instantly. No uploads, 100% client-side, perfect for developers.',
    url: 'https://jsonformatter.gg/xml-formatter',
    images: [{ url: '/og-image/xml-formatter.png', width: 1200, height: 630, alt: 'XML Formatter Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XML Formatter Online | jsonformatter.gg',
    description:
      'Free XML formatter and validator. Format, indent, and check XML instantly in your browser.',
    images: ['/og-image/xml-formatter.png'],
  },
  alternates: {
    canonical: 'https://jsonformatter.gg/xml-formatter',
  },
};
export default function XMLFormatterPage() {
  return <XMLFormatter />;
};
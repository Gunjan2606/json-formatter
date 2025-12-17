import { Metadata } from 'next';
import Base64Formatter from '../pages/Base64Formatter';

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder Online',
  description:
    'Encode or decode Base64 strings instantly with our free online tool. Secure, client-side processing.',
  openGraph: {
    title: 'Base64 Encoder/Decoder Online - Free Tool',
    description:
      'Convert text to Base64 or Base64 to text quickly and privately in your browser.',
    url: 'https://jsonformatter.gg/base64-encoder',
    images: [{ url: '/og-image/base64.png', width: 1200, height: 630, alt: 'Base64 Encoder/Decoder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder/Decoder Online | jsonformatter.gg',
    description:
      'Free online Base64 encoder and decoder. Fast, secure, and no data leaves your device.',
    images: ['/og-image/base64.png'],
  },
  alternates: {
    canonical: 'https://jsonformatter.gg/base64-encoder',
  },
};
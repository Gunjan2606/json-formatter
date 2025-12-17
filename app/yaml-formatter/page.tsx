import { Metadata } from 'next';
import YAMLFormatter from '../pages/YAMLFormatter';

export const metadata: Metadata = {
  title: 'YAML Formatter & Validator Online',
  description:
    'Instantly format, beautify, and validate YAML files online. No uploads, 100% client-side, secure processing.',
  openGraph: {
    title: 'YAML Formatter Online - Free Tool',
    description:
      'Format, indent, and validate YAML instantly. Perfect for developers and DevOps workflows.',
    url: 'https://jsonformatter.gg/yaml-formatter',
    images: [{ url: '/og-image/yaml-formatter.png', width: 1200, height: 630, alt: 'YAML Formatter Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YAML Formatter Online | jsonformatter.gg',
    description:
      'Free YAML formatter and validator. Beautify and check YAML files instantly in your browser.',
    images: ['/og-image/yaml-formatter.png'],
  },
  alternates: {
    canonical: 'https://jsonformatter.gg/yaml-formatter',
  },
};
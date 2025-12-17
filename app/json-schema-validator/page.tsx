import { Metadata } from 'next';
import JSONSchemaValidator from '../pages/JSONSchemaValidator';

export const metadata: Metadata = {
  title: 'JSON Schema Validator Online',
  description:
    'Validate JSON against a schema instantly. Supports draft 4–2020-12, secure, client-side processing.',
  openGraph: {
    title: 'JSON Schema Validator Online - Free Tool',
    description:
      'Check your JSON against any schema with our free validator. No data leaves your browser.',
    url: 'https://jsonformatter.gg/json-schema-validator',
    images: [{ url: '/og-image/json-schema-validator.png', width: 1200, height: 630, alt: 'JSON Schema Validator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Schema Validator Online | jsonformatter.gg',
    description:
      'Free online JSON schema validator. Validate JSON instantly with secure local processing.',
    images: ['/og-image/json-schema-validator.png'],
  },
  alternates: {
    canonical: 'https://jsonformatter.gg/json-schema-validator',
  },
};
import { Metadata } from 'next';

/**
 * Scalable metadata helper for Dark Easterner Collections.
 * Supports SEO, OpenGraph, and dynamic product/collection tagging.
 */

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = 'Dark Easterner Collections | Luxury Afro-Luxe Couture',
  description = 'Confidence, elegance, and African luxury. Curated fashion for men and women who command presence effortlessly.',
  image = '/og-image.jpg', // Placeholder
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    title: {
      template: '%s | Dark Easterner Collections',
      default: title,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      type: 'website',
      siteName: 'Dark Easterner Collections',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@darkeasterner', // Placeholder
    },
    icons: {
      icon: '/favicon.ico',
    },
    metadataBase: new URL('https://darkeasterner.com'), // Placeholder
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

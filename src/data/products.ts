/**
 * Dark Easterner Collections - Product Data Architecture
 * Scalable static data structure for Phase 2.
 * Aggressive curation: Scarcity > Clutter.
 */

export type Category = 
  | 'female-fashion' 
  | 'male-fashion' 
  | 'wigs' 
  | 'perfumes' 
  | 'shoes';

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price?: number;
  category: Category;
  images: string[];
  featured?: boolean;
  metadata?: Record<string, string>;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'royal-blue-couture-masterpiece',
    title: 'The Royal Presence',
    description: 'A masterpiece of confidence and couture. Designed for individuals who love to stand out effortlessly with regal sophistication.',
    category: 'female-fashion',
    images: ['/assets/images/female-fashion/luxury-couture-blue.jpg'],
    featured: true,
  },
  {
    id: '2',
    slug: 'emerald-luxury-statement',
    title: 'Emerald Statement Gown',
    description: 'Elegance woven into every thread. A high-glamour silhouette that commands attention through deep tones and intentional tailoring.',
    category: 'female-fashion',
    images: ['/assets/images/female-fashion/emerald-statement.jpg'],
    featured: true,
  },
  {
    id: '3',
    slug: 'pink-tiered-couture-mini',
    title: 'The Pink Radiance',
    description: 'Feminine, bold, and expressive. A tiered couture piece designed for the modern woman who embraces her power through vibrant elegance.',
    category: 'female-fashion',
    images: ['/assets/images/female-fashion/pink-tiered-dress.jpg'],
    featured: true,
  },
  {
    id: '4',
    slug: 'luxury-hair-collection-01',
    title: 'Signature Luxury Tresses',
    description: 'Premium quality meets effortless glamour. Curated for those who understand that confidence begins with detail.',
    category: 'wigs',
    images: ['/assets/images/editorial/wig-dominant.png'],
    featured: true,
  },
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getProductsByCategory = (category: Category) => products.filter(p => p.category === category);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);

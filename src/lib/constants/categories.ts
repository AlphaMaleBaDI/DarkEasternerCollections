export type ProductCategory = 'men' | 'women' | 'hair' | 'perfumes';

export interface CategoryConfig {
  label: string;
  slug: string;
  heroCopy: string;
  editorialStatement: string;
  mood: 'strong' | 'elegant' | 'intimate' | 'mysterious';
  accentColor: string;
}

export const CATEGORY_CONFIGS: Record<ProductCategory, CategoryConfig> = {
  men: {
    label: 'The Gentlemen',
    slug: 'men',
    heroCopy: 'Men of Class',
    editorialStatement: 'A study in power, precision, and masculine restraint. The house of Dark Easterner defines the modern patriarch through sharp silhouettes and uncompromising quality.',
    mood: 'strong',
    accentColor: 'text-zinc-100',
  },
  women: {
    label: 'The Matriarchs',
    slug: 'women',
    heroCopy: 'The Elegant Woman',
    editorialStatement: 'Fluidity meets authority. Our feminine collections explore the intersection of ethereal elegance and structural power, crafted for the woman who commands every room.',
    mood: 'elegant',
    accentColor: 'text-luxury-gold',
  },
  hair: {
    label: 'The Crown',
    slug: 'hair',
    heroCopy: 'Her Crown Collection',
    editorialStatement: 'The ultimate expression of identity. Sourced from the finest origins, our raw hair collections are curated for those who view their crown as an extension of their soul.',
    mood: 'intimate',
    accentColor: 'text-zinc-300',
  },
  perfumes: {
    label: 'The Aura',
    slug: 'perfumes',
    heroCopy: 'Signature Fragrances',
    editorialStatement: 'Scent is the most intimate form of memory. Our fragrances are atmospheric compositions designed to linger long after the presence has left the room.',
    mood: 'mysterious',
    accentColor: 'text-luxury-gold',
  },
};

export type ProductStatus = 'draft' | 'published' | 'archived';
export type ProductCategory = 'men' | 'women' | 'hair' | 'perfumes';

export interface Product {
  id: string;
  title: string;
  sku?: string | null;
  slug: string;
  description: string;
  category: ProductCategory;
  price: number | null;
  show_price: boolean;
  stock_quantity: number;
  in_stock: boolean;
  inventory_status: 'available' | 'coming_soon' | 'out_of_stock';
  featured: boolean;
  status: ProductStatus;
  main_image_url: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: ProductCategory;
}

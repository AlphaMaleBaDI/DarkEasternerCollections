-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL,
  price NUMERIC,
  show_price BOOLEAN DEFAULT false,
  stock_quantity INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',
  main_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- 3. Seed Categories
INSERT INTO categories (name) VALUES 
  ('men'),
  ('women'),
  ('hair'),
  ('perfumes')
ON CONFLICT (name) DO NOTHING;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies (Public Read, Admin Write)
CREATE POLICY "Public products are viewable by everyone." ON products FOR SELECT USING (true);
CREATE POLICY "Anyone can insert products." ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update products." ON products FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete products." ON products FOR DELETE USING (true);

CREATE POLICY "Public categories are viewable by everyone." ON categories FOR SELECT USING (true);
CREATE POLICY "Anyone can insert categories." ON categories FOR INSERT WITH CHECK (true);

-- 6. Create Storage Bucket for Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage Policies
CREATE POLICY "Product images are publicly accessible." 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'product-images' );

CREATE POLICY "Anyone can upload product images." 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'product-images' );
import { supabase } from '@/lib/supabase/client'
import { Product, ProductCategory } from '@/types/database'

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .eq('status', 'published')
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
  return data || []
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(`Error fetching products for category ${category}:`, error)
    return []
  }
  return data || []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
  return data
}

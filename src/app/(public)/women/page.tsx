import React from 'react'
import { getProductsByCategory } from '@/lib/products/queries'
import { CATEGORY_CONFIGS } from '@/lib/constants/categories'
import CategoryHeader from '@/components/commerce/CategoryHeader'
import ProductGrid from '@/components/commerce/ProductGrid'

export const dynamic = 'force-dynamic'

export default async function WomenCategoryPage() {
  const category = 'women' as const
  const config = CATEGORY_CONFIGS[category]
  const products = await getProductsByCategory(category)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <CategoryHeader config={config} />
      
      <section className="px-6 md:px-12 lg:px-24 pb-20 md:pb-24">
        <div className="mb-24 flex items-center gap-8">
          <h2 className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-medium">
            Curated Elegance
          </h2>
          <div className="h-px flex-1 bg-zinc-800/50" />
        </div>
        
        {products.length > 0 ? (
          <div>
            <ProductGrid products={products} />
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="text-zinc-500 font-light italic">This collection is currently being curated.</p>
          </div>
        )}
      </section>
    </div>
  )
}

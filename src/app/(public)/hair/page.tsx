import React from 'react'
import { getProductsByCategory } from '@/lib/products/queries'
import { CATEGORY_CONFIGS } from '@/lib/constants/categories'
import CategoryHeader from '@/components/commerce/CategoryHeader'
import ProductGrid from '@/components/commerce/ProductGrid'

export const dynamic = 'force-dynamic'

export default async function HairCategoryPage() {
  const category = 'hair' as const
  const config = CATEGORY_CONFIGS[category]
  const products = await getProductsByCategory(category)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <CategoryHeader config={config} />
      
      <section className="px-6 md:px-12 lg:px-24 pb-32">
        <div className="mb-20 flex flex-col gap-4">
          <h2 className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-medium">
            The Crown Archives
          </h2>
          <p className="text-zinc-600 text-sm font-light italic max-w-sm">
            Sourced from the finest origins, crafted for the soul.
          </p>
        </div>
        
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="py-32 text-center">
            <p className="text-zinc-500 font-light italic">This collection is currently being curated.</p>
          </div>
        )}
      </section>
    </div>
  )
}

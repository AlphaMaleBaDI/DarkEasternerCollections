import React from 'react'
import { getProductsByCategory } from '@/lib/products/queries'
import { CATEGORY_CONFIGS } from '@/lib/constants/categories'
import CategoryHeader from '@/components/commerce/CategoryHeader'
import ProductGrid from '@/components/commerce/ProductGrid'

export const dynamic = 'force-dynamic'

export default async function MenCategoryPage() {
  const category = 'men' as const
  const config = CATEGORY_CONFIGS[category]
  const products = await getProductsByCategory(category)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <CategoryHeader config={config} />
      
      <section className="px-6 md:px-12 lg:px-24 pb-20 md:pb-24">
        <div className="mb-24 flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <h2 className="text-zinc-500 text-xs uppercase tracking-[0.3em] font-medium">
              Sovereign Selection
            </h2>
            <div className="h-px w-24 bg-zinc-800" />
          </div>
          <p className="hidden md:block text-zinc-600 text-xs italic max-w-xs text-right">
            Disciplined tailoring for the modern patriarch.
          </p>
        </div>
        
        {products.length > 0 ? (
          <div className="grid-container-men">
            <ProductGrid products={products} />
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="text-zinc-500 font-light italic tracking-wide">This collection is currently being curated.</p>
          </div>
        )}
      </section>
    </div>
  )
}

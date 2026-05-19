import React from 'react'
import { getProductsByCategory } from '@/lib/products/queries'
import { CATEGORY_CONFIGS } from '@/lib/constants/categories'
import CategoryHeader from '@/components/commerce/CategoryHeader'
import ProductCard from '@/components/commerce/ProductCard'

export default async function PerfumeCategoryPage() {
  const category = 'perfumes' as const
  const config = CATEGORY_CONFIGS[category]
  const products = await getProductsByCategory(category)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <CategoryHeader config={config} />
      
      <section className="px-6 md:px-12 lg:px-24 pb-32">
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <p className="text-gold-500 text-xs uppercase tracking-[0.3em] mb-6">The Alchemical Study</p>
          <h2 className="text-2xl font-serif italic text-white mb-8">
            Our fragrances are a conversation between shadow and light, crafted to linger in the consciousness.
          </h2>
          <div className="w-12 h-px bg-gold-600 mx-auto" />
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col gap-6">
                <ProductCard product={product} />
                <div className="px-4">
                  <h3 className="text-white font-serif italic text-xl">{product.title}</h3>
                  <p className="text-zinc-500 text-sm font-light leading-relaxed mt-2">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-zinc-500 font-light italic">The scents are being composed.</p>
          </div>
        )}
      </section>
    </div>
  )
}

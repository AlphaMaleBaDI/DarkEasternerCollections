"use client"

import React, { useState, useEffect } from 'react'
import { Product } from '@/types/database'
import ProductCard from './ProductCard'

export default function FeaturedShowcase() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { supabase } = await import('@/lib/supabase/client')
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true)
          .eq('status', 'published')
          .limit(3)
          .order('created_at', { ascending: false })
        
        if (data) setProducts(data as Product[])
      } catch (err) {
        console.error("Error fetching featured products:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <section className="pt-32 pb-16 md:pb-24 bg-zinc-950 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <div className="luxury-shimmer h-3 w-32 mx-auto mb-4" />
            <div className="luxury-shimmer h-10 w-64 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="relative overflow-hidden bg-zinc-950 border border-zinc-900/60">
                <div className="relative aspect-[3/4] w-full luxury-shimmer" />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-2 w-2/3">
                      <div className="luxury-shimmer h-2 w-1/2" />
                      <div className="luxury-shimmer h-5 w-full" />
                    </div>
                    <div className="luxury-shimmer h-4 w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) return null

  return (
    <section className="pt-32 pb-16 md:pb-24 bg-zinc-950 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <p className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] mb-4">
            The Curated Selection
          </p>
          <h2 className="text-3xl md:text-5xl font-serif italic text-white">
            Signature <span className="text-zinc-500">Pieces</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
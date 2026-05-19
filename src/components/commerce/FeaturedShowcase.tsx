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

  if (isLoading) return null

  if (products.length === 0) return null

  return (
    <section className="py-32 bg-zinc-950 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <p className="text-gold-500 text-[10px] uppercase tracking-[0.4em] mb-4">
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
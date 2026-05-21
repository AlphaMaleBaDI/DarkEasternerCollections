"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/types/database'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden cursor-pointer bg-zinc-950 border border-zinc-900/60 transition-all duration-700 ease-luxury hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85)] hover:border-zinc-800"
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image 
            src={product.main_image_url || '/assets/placeholder-product.jpg'} 
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-1000 ease-luxury scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-700 ease-luxury" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-luxury z-10">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-zinc-400 text-[10px] uppercase tracking-widest mb-1.5 font-medium">
                {product.category}
              </p>
              <h3 className="text-white text-lg font-serif italic">
                {product.title}
              </h3>
            </div>
            {product.show_price && (
              <div className="text-luxury-gold font-light tracking-wide">
                {product.price?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

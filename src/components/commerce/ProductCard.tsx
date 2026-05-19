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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative overflow-hidden cursor-pointer bg-zinc-900"
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image 
            src={product.main_image_url || '/assets/placeholder-product.jpg'} 
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-all duration-700 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">
                {product.category}
              </p>
              <h3 className="text-white text-lg font-serif italic">
                {product.title}
              </h3>
            </div>
            {product.show_price && (
              <div className="text-gold-500 font-light">
                {product.price?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

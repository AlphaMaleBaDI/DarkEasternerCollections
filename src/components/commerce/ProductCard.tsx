"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/types/database'
import Link from 'next/link'
import { useInquiry } from '@/context/InquiryContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToInquiry, inquiryItems } = useInquiry()
  
  const isCurated = inquiryItems.some((item) => item.id === product.id)

  const handleCurate = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isCurated) return

    addToInquiry({
      id: product.id,
      title: product.title,
      slug: product.slug,
      sku: product.sku,
      category: product.category,
      price: product.price,
      show_price: product.show_price,
      main_image_url: product.main_image_url
    }, false) // Pass false to prevent auto-opening the drawer
  }

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
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-700 ease-luxury" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-0 md:translate-y-8 group-hover:translate-y-0 opacity-95 group-hover:opacity-100 transition-all duration-700 ease-luxury z-10">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-zinc-400 text-[10px] uppercase tracking-widest mb-1.5 font-medium">
                {product.category}
              </p>
              <h3 className="text-white text-base md:text-lg font-serif italic leading-tight">
                {product.title}
              </h3>
            </div>
            {product.show_price && (
              <div className="text-luxury-gold text-xs md:text-sm font-light tracking-wide mb-0.5 whitespace-nowrap ml-4">
                {product.price?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
              </div>
            )}
          </div>
          
          <div className="mt-4 pt-3 border-t border-zinc-900/60 flex justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-luxury">
            {/* Visual layout placeholder to preserve height and design rhythm inside Link */}
            <div className="px-4 py-1.5 text-[10px] uppercase tracking-widest border border-transparent font-medium invisible select-none">
              {isCurated ? 'Curated' : 'Curate'}
            </div>
          </div>
        </div>
      </Link>

      {/* Clickable Curation Button Overlay (outside Link to guarantee touch zone isolation) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-0 md:translate-y-8 group-hover:translate-y-0 opacity-95 group-hover:opacity-100 transition-all duration-700 ease-luxury z-20 pointer-events-none">
        <div className="mt-4 pt-3 border-t border-transparent flex justify-end">
          <button
            onClick={handleCurate}
            disabled={isCurated}
            className={`pointer-events-auto px-4 py-1.5 text-[10px] uppercase tracking-widest transition-all duration-500 ease-luxury border font-medium ${
              isCurated
                ? 'bg-luxury-gold/15 border-luxury-gold/30 text-luxury-gold cursor-not-allowed pointer-events-none'
                : 'bg-transparent border-zinc-800 hover:border-luxury-gold/50 text-zinc-300 hover:text-white cursor-pointer'
            }`}
          >
            {isCurated ? 'Curated' : 'Curate'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

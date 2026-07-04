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
  const isComingSoon = product.inventory_status === 'coming_soon'
  const isOutOfStock = product.inventory_status === 'out_of_stock'
  const isUnavailable = isComingSoon || isOutOfStock

  const handleCurate = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isCurated || isUnavailable) return

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
      {/* Availability / Selected Badges */}
      {isCurated ? (
        <div className="absolute top-3 right-3 z-30 bg-black/85 text-luxury-gold/90 border border-luxury-gold/20 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg select-none pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
          <span className="text-[8px] uppercase tracking-[0.15em] font-semibold">In Inquiry</span>
        </div>
      ) : isComingSoon ? (
        <div className="absolute top-3 right-3 z-30 bg-black/85 text-blue-400 border border-blue-900/35 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg select-none pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-[8px] uppercase tracking-[0.15em] font-semibold">Coming Soon</span>
        </div>
      ) : isOutOfStock ? (
        <div className="absolute top-3 right-3 z-30 bg-black/85 text-red-400 border border-red-900/35 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg select-none pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span className="text-[8px] uppercase tracking-[0.15em] font-semibold">Out of Stock</span>
        </div>
      ) : null}

      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          {product.main_image_url ? (
            <>
              <Image 
                src={product.main_image_url} 
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-1000 ease-luxury scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-700 ease-luxury" />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 border border-zinc-900/40">
              <div className="w-8 h-px bg-luxury-gold/30 mb-4" />
              <p className="text-zinc-600 text-[9px] uppercase tracking-[0.3em]">Photography</p>
              <p className="text-zinc-700 text-[9px] uppercase tracking-[0.3em] mt-1">Coming Soon</p>
              <div className="w-8 h-px bg-luxury-gold/30 mt-4" />
            </div>
          )}
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
              {isCurated ? 'In Inquiry' : isComingSoon ? 'Coming Soon' : isOutOfStock ? 'Out of Stock' : 'Curate'}
            </div>
          </div>
        </div>
      </Link>

      {/* Clickable Curation Button Overlay (outside Link to guarantee touch zone isolation) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-0 md:translate-y-8 group-hover:translate-y-0 opacity-95 group-hover:opacity-100 transition-all duration-700 ease-luxury z-20 pointer-events-none">
        <div className="mt-4 pt-3 border-t border-transparent flex justify-end">
          <button
            onClick={handleCurate}
            aria-disabled={isCurated || isUnavailable}
            className={`pointer-events-auto px-4 py-1.5 text-[10px] uppercase tracking-widest transition-all duration-500 ease-luxury border font-medium ${
              isCurated
                ? 'bg-luxury-gold/15 border-luxury-gold/30 text-luxury-gold cursor-not-allowed'
                : isUnavailable
                ? 'bg-zinc-900/50 border-zinc-900/80 text-zinc-600 cursor-not-allowed'
                : 'bg-transparent border-zinc-800 hover:border-luxury-gold/50 text-zinc-300 hover:text-white cursor-pointer'
            }`}
          >
            {isCurated 
              ? 'In Inquiry' 
              : isComingSoon 
              ? 'Coming Soon' 
              : isOutOfStock 
              ? 'Out of Stock' 
              : 'Curate'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ProductCategory } from '@/lib/constants/categories'
import { CATEGORY_CONFIGS } from '@/lib/constants/categories'
import { CATEGORY_IMAGES } from '@/lib/constants/category-imagery'
import Image from 'next/image'

interface CategoryPortalProps {
  category: ProductCategory
}

export default function CategoryPortal({ category }: CategoryPortalProps) {
  const config = CATEGORY_CONFIGS[category];
  const imageUrl = CATEGORY_IMAGES[category];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative h-[60vh] md:h-[80vh] overflow-hidden cursor-pointer"
    >
      <Link href={`/${category}`} className="absolute inset-0 z-20">
        <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors duration-700 z-10" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-20">
          <p className="text-gold-500 text-[10px] uppercase tracking-[0.4em] mb-4 transition-all duration-500 group-hover:tracking-[0.5em]">
            {config.label}
          </p>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white mb-6 opacity-90">
            {config.heroCopy}
          </h3>
          <div className="w-12 h-px bg-gold-600 transition-all duration-500 group-hover:w-24" />
          <span className="mt-8 text-zinc-400 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
            Step Inside →
          </span>
        </div>
      </Link>
      
      <div className="absolute inset-0 z-0">
<Image 
           src={imageUrl} 
           alt={config.label} 
           fill 
           sizes="(max-width: 768px) 100vw, 50vw"
           priority
           className="object-cover transition-transform duration-1000 scale-105 group-hover:scale-100 opacity-60"
         />
      </div>
    </motion.div>
  )
}

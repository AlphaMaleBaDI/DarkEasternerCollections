'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditorialFrame } from '@/components/ui/EditorialFrame';
import { getFeaturedProducts } from '@/data/products';
import { createWhatsAppInquiry } from '@/lib/whatsapp';
import { theme } from '@/styles/theme';

/**
 * FeaturedCollections Section
 * Refined for Phase 3: Experience Refinement.
 */

export const FeaturedCollections: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section id="collections" className="py-24 md:py-32 lg:py-48 bg-deep-black">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: theme.motion.duration.slow }}
            className="max-w-xl"
          >
            <h2 className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium mb-6">
              The Curated Gallery
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading text-soft-white leading-tight">
              Signature <span className="italic">Exclusives</span>
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: theme.motion.duration.slow, delay: theme.motion.stagger.luxury }}
          >
            <Link 
              href="/collections" 
              className="group flex items-center gap-4 text-soft-white/40 hover:text-luxury-gold transition-colors duration-500 uppercase tracking-[0.2em] text-[10px] font-medium"
            >
              Enter Showroom
              <span className="w-8 h-px bg-soft-white/20 group-hover:bg-luxury-gold group-hover:w-12 transition-all duration-500" />
            </Link>
          </motion.div>
        </div>

        {/* Editorial Layout - Asymmetrical Rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12 lg:gap-x-20">
          {featuredProducts.map((product, index) => {
            const isWide = index === 0;
            const gridSpan = isWide ? 'md:col-span-12' : 'md:col-span-6';
            const offset = index === 1 ? 'lg:translate-y-12' : '';
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: theme.motion.duration.slow, delay: index * theme.motion.stagger.normal }}
                className={`${gridSpan} ${offset} group`}
              >
                <EditorialFrame
                  src={product.images[0]}
                  alt={product.title}
                  aspectRatio={isWide ? 'landscape' : 'portrait'}
                  overlay
                  vignette
                  grayscaleHover
                />
                
                <div className="mt-8 space-y-4">
                  <p className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-medium">
                    {product.category.replace('-', ' ')}
                  </p>
                  
                  <h4 className="text-soft-white text-2xl md:text-3xl font-heading leading-tight group-hover:text-luxury-gold transition-colors duration-500">
                    {product.title}
                  </h4>
                  
                  <p className="text-soft-white/40 text-sm font-light leading-relaxed max-w-sm line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="pt-4">
                    <a
                      href={createWhatsAppInquiry({ type: 'collection', productName: product.title, category: product.category })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-soft-white/60 text-[10px] uppercase tracking-[0.2em] font-medium hover:text-luxury-gold transition-colors duration-300"
                    >
                      Private Inquiry
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Add missing import for Link
import Link from 'next/link';

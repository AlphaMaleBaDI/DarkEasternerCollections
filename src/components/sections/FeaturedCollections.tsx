'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditorialFrame } from '@/components/ui/EditorialFrame';
import { ShowroomTressesGallery } from '@/components/ui/ShowroomTressesGallery';
import { getFeaturedProducts } from '@/data/products';
import { createWhatsAppInquiry } from '@/lib/whatsapp';
import { theme } from '@/styles/theme';
import Link from 'next/link';

/**
 * FeaturedCollections Section
 * Refined for Phase 3: Experience Refinement.
 */

export const FeaturedCollections: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section id="collections" className="py-24 md:py-28 lg:py-32 bg-deep-black overflow-hidden">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-24 gap-8">
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24 lg:gap-x-20">
          {featuredProducts.map((product, index) => {
            const isHero = index === 0;
            const isEven = index % 2 === 0;
            
            // Hero item is full-width, others are full-width with split layout on desktop
            const gridSpan = 'md:col-span-12';
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: theme.motion.duration.slow, delay: index * theme.motion.stagger.normal }}
                className={`${gridSpan} group`}
              >
                <div className={`flex flex-col ${isHero ? '' : isEven ? 'xl:flex-row-reverse xl:gap-24' : 'xl:flex-row xl:gap-24'} lg:items-center xl:items-start`}>
                  <div className={`${isHero ? 'w-full' : 'w-full xl:w-[60%] lg:max-w-4xl lg:mx-auto xl:mx-0'} shrink-0`}>
                    <EditorialFrame
                      src={product.images[0]}
                      alt={product.title}
                      aspectRatio={isHero ? 'landscape' : 'portrait'}
                      overlay
                      vignette
                      grayscaleHover
                    />
                  </div>
                  
                  <div className={`${isHero ? 'mt-8' : 'mt-8 xl:mt-0 xl:pt-12'} space-y-4 max-w-xl lg:text-center xl:text-left lg:mx-auto xl:mx-0`}>
                    <p className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-medium">
                      {product.category.replace('-', ' ')}
                    </p>
                    
                    <h4 className="text-soft-white text-3xl md:text-4xl lg:text-5xl font-heading leading-tight group-hover:text-luxury-gold transition-colors duration-500">
                      {product.title}
                    </h4>
                    
                    <p className="text-soft-white/40 text-lg font-light leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="pt-6">
                      <a
                        href={createWhatsAppInquiry({ type: 'collection', productName: product.title, category: product.category })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center text-soft-white uppercase tracking-[0.2em] text-[10px] font-medium pb-2 border-b border-soft-white/10 hover:border-luxury-gold transition-colors duration-500"
                      >
                        Private Inquiry
                        <span className="ml-4 text-luxury-gold transform group-hover:translate-x-2 transition-transform duration-500">→</span>
                      </a>
                    </div>

                    {/* Showroom Expansion for Tresses - Dedicated Editorial Depth */}
                    {product.category === 'wigs' && (
                      <ShowroomTressesGallery />
                    )}
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

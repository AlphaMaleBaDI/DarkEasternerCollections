'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditorialFrame } from '@/components/ui/EditorialFrame';
import { products } from '@/data/products';
import { createWhatsAppInquiry } from '@/lib/whatsapp';
import { theme } from '@/styles/theme';

/**
 * Collections Page
 * Refined for Phase 3: Experience Refinement.
 */

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-deep-black pt-32 pb-24">
      <div className="container">
        
        {/* Editorial Header */}
        <header className="mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: theme.motion.duration.slow, ease: theme.motion.ease.cinematic }}
            className="max-w-2xl"
          >
            <h2 className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium mb-6">
              The Digital Showroom
            </h2>
            <h1 className="text-5xl md:text-7xl font-heading text-soft-white leading-tight">
              Curated <br />
              <span className="italic">Collections</span>
            </h1>
            <p className="mt-8 text-soft-white/50 text-lg leading-relaxed max-w-md font-light">
              Explore our hand-selected couture pieces and luxury essentials. 
              Each item is chosen to elevate presence and celebrate individuality.
            </p>
          </motion.div>
        </header>

        {/* Staggered Editorial Gallery */}
        <div className="space-y-32 lg:space-y-64">
          {products.map((product, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <section 
                key={product.id} 
                className={`grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-24 items-center`}
              >
                {/* Visual Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: theme.motion.duration.cinematic, ease: theme.motion.ease.cinematic }}
                  className={`xl:col-span-7 ${isEven ? 'xl:order-1' : 'xl:order-2'}`}
                >
                  <EditorialFrame
                    src={product.images[0]}
                    alt={product.title}
                    aspectRatio={index === 0 ? 'portrait' : 'landscape'}
                    overlay
                    vignette
                    grayscaleHover
                  />
                </motion.div>

                {/* Narrative Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: theme.motion.duration.slow, delay: theme.motion.stagger.luxury }}
                  className={`xl:col-span-5 flex flex-col space-y-8 ${isEven ? 'xl:order-2' : 'xl:order-1 xl:items-end xl:text-right'}`}
                >
                  <div>
                    <p className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-medium mb-4">
                      {product.category.replace('-', ' ')}
                    </p>
                    <h3 className="text-4xl md:text-5xl font-heading text-soft-white leading-tight">
                      {product.title}
                    </h3>
                  </div>
                  
                  <p className="text-soft-white/60 text-lg font-light leading-relaxed max-w-sm">
                    {product.description}
                  </p>

                  <div className="pt-4">
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
                </motion.div>
              </section>
            );
          })}
        </div>

        {/* Editorial Conclusion */}
        <section className="mt-64 text-center">
          <div className="max-w-2xl mx-auto space-y-12">
            <div className="w-px h-32 bg-luxury-gold/20 mx-auto" />
            <p className="text-soft-white/40 text-sm uppercase tracking-[0.4em] font-light">
              Experience the Unforgettable
            </p>
            <a 
              href={createWhatsAppInquiry({ type: 'general' })}
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft-white text-3xl md:text-5xl font-heading hover:text-luxury-gold transition-colors duration-500 block"
            >
              Consult with Our <br />
              <span className="italic">Couture Experts</span>
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}

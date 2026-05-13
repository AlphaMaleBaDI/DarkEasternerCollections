'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { philosophy } from '@/data/editorial';
import { theme } from '@/styles/theme';
import { EditorialWigGallery } from '@/components/ui/EditorialWigGallery';

/**
 * Philosophy Section
 * Refined for luxury editorial storytelling.
 * Transitioned from centered layout to asymmetrical grid with wig gallery.
 */

export const Philosophy: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-deep-black relative overflow-hidden">
      {/* Subtle Atmospheric Light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40%] h-[40%] bg-luxury-gold/5 blur-[150px] pointer-events-none" />

      <div className="container relative z-10 lg:px-12 xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 xl:gap-24 items-center">
          
          {/* Brand Vision Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: theme.motion.duration.slow, ease: theme.motion.ease.cinematic }}
            className="lg:col-span-12 xl:col-span-5 space-y-10 xl:space-y-12 lg:text-center xl:text-left lg:flex lg:flex-col lg:items-center xl:items-start"
          >
            <h2 className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-medium">
              The Brand Philosophy
            </h2>
            
            <div className="space-y-6">
              <h3 className="text-soft-white text-4xl md:text-5xl xl:text-7xl font-heading leading-tight text-left lg:text-center xl:text-left">
                {philosophy.statement} <br />
                <span className="italic text-luxury-gold/80">{philosophy.italicWord}</span>
              </h3>
              
              <p className="text-soft-white/40 text-base md:text-lg xl:text-xl font-light leading-relaxed italic text-left lg:text-center xl:text-left max-w-lg xl:max-w-xl">
                &ldquo;{philosophy.description}&rdquo;
              </p>
            </div>

            {/* Editorial Metadata Row */}
            <div className="flex items-start gap-8 pt-4 xl:pt-8">
              <div className="w-px h-24 xl:h-32 bg-luxury-gold/20" />
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-luxury-gold uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-medium opacity-80">
                    <span>100% Human Hair</span>
                    <span className="opacity-30">|</span>
                    <span>Wholesale & Retail</span>
                    <span className="opacity-30">|</span>
                    <span>Braided Wig Editions</span>
                  </div>
                  <p className="text-soft-white/30 text-xs md:text-sm font-light italic leading-relaxed max-w-xs xl:max-w-sm">
                    Curated textures for women who understand that confidence begins in the details.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Gallery Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: theme.motion.duration.slow, ease: theme.motion.ease.cinematic, delay: 0.2 }}
            className="lg:col-span-12 xl:col-span-7 lg:max-w-3xl lg:mx-auto xl:max-w-none"
          >
            <EditorialWigGallery />
          </motion.div>

        </div>
      </div>

      {/* Cinematic Transition Anchor */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-px h-24 bg-gradient-to-b from-luxury-gold to-transparent" />
      </motion.div>
    </section>
  );
};

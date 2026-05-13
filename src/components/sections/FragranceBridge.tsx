'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';

/**
 * FragranceBridge Section (The Fragrance Feature)
 * Refactored into a full cinematic editorial feature takeover.
 * Focus: Immersive campaign experience and brand universe expansion.
 */

export const FragranceBridge: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[85vh] w-full flex items-center justify-center bg-deep-black overflow-hidden">
      {/* Immersive Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden max-w-full">
        <Image
          src="/assets/images/atmosphere/perfume-silhouette.png" // User explicitly requested the ORIGINAL full image
          alt="Dark Easterner Fragrance Atelier Campaign"
          fill
          className="object-cover transition-transform duration-[15000ms] ease-out scale-105"
          priority
        />
        
        {/* Cinematic Depth Layering - Protecting typography while preserving the atelier environment */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10" />
        
        {/* Soft Luxury Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,0.7)] z-10" />
      </div>

      {/* Editorial Campaign Content */}
      <div className="container relative z-20 text-center flex flex-col items-center justify-center space-y-16">
        
        {/* Typography Header */}
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.8em' }}
            whileInView={{ opacity: 1, letterSpacing: '1.2em' }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: theme.motion.ease.cinematic }}
            className="text-luxury-gold uppercase text-[10px] md:text-xs font-medium tracking-[1.2em] ml-[1.2em]"
          >
            Fragrance Atelier
          </motion.p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 0.5 }}
            className="h-px w-20 bg-luxury-gold/30 mx-auto origin-center" 
          />
        </div>

        {/* Narrative Anchor */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 0.8, ease: theme.motion.ease.cinematic }}
          className="text-soft-white text-4xl md:text-6xl lg:text-7xl font-heading leading-tight max-w-5xl drop-shadow-[0_4px_16px_rgba(0,0,0,1)] px-4"
          suppressHydrationWarning
        >
          &ldquo;Crafted for those remembered long after departure.&rdquo;
        </motion.h2>

        {/* Secondary Details */}
        <div className="flex flex-col items-center space-y-3 pt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1.8 }}
            className="flex flex-col items-center space-y-3"
          >
            <p className="text-luxury-gold uppercase text-[10px] tracking-[0.5em] font-medium">
              Signature Collection
            </p>
            <div className="flex items-center gap-4 text-soft-white/40 uppercase text-[9px] tracking-[0.6em] font-light">
              <span>Eau de Parfum</span>
              <span className="w-1 h-1 bg-luxury-gold/30 rounded-full" />
              <span>In Development</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Editorial Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-luxury-gold/40 uppercase text-[8px] tracking-[0.8em] font-medium ml-[0.8em]">Scroll to Discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-luxury-gold/40 to-transparent" />
        </motion.div>
      </div>

      {/* Cinematic Taper - Ensuring smooth transition into Editorial Notes */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />
    </section>
  );
};

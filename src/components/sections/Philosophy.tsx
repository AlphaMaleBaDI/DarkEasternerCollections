'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { philosophy } from '@/data/editorial';
import { theme } from '@/styles/theme';

/**
 * Philosophy Section
 * High-impact brand world-building.
 * Focus: Aspirational language and intentional whitespace.
 */

export const Philosophy: React.FC = () => {
  return (
    <section className="py-24 md:py-48 bg-deep-black text-center relative overflow-hidden">
      {/* Subtle Atmospheric Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-luxury-gold/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: theme.motion.duration.slower, ease: theme.motion.ease.cinematic }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <h2 className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-medium mb-8">
            The Brand Philosophy
          </h2>
          
          <div className="space-y-4">
            <h3 className="text-soft-white text-4xl md:text-7xl font-heading leading-tight">
              {philosophy.statement} <br />
              <span className="italic text-luxury-gold/80">{philosophy.italicWord}</span>
            </h3>
          </div>

          <p className="text-soft-white/40 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto italic">
            &ldquo;{philosophy.description}&rdquo;
          </p>

          {/* Decorative Atelier Line */}
          <div className="pt-12">
            <div className="w-px h-24 bg-luxury-gold/20 mx-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

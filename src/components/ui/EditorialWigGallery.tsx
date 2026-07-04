'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { theme } from '@/styles/theme';

/**
 * EditorialWigGallery Component
 * An asymmetrical editorial composition for showcasing wig assets.
 * Focus: High-status atmosphere and quiet storytelling.
 */

export const EditorialWigGallery: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: theme.motion.duration.slower, ease: theme.motion.ease.cinematic }}
      className="w-full"
    >
      <div className="relative w-full aspect-[3/4] border border-luxury-gold/15 bg-black/40 flex flex-col items-center justify-center text-center p-6 group overflow-hidden">
        {/* Subtle gold design details in corners */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-luxury-gold/40" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-luxury-gold/40" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-luxury-gold/40" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-luxury-gold/40" />
        
        <p className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium mb-3">
          Tresses Showcase
        </p>
        <h4 className="text-soft-white/80 font-heading text-xl italic mb-3">
          Coming Soon
        </h4>
        <p className="text-soft-white/30 text-xs font-light max-w-sm mx-auto leading-relaxed">
          Premium collection assets are currently being prepared for the atelier.
        </p>
      </div>
    </motion.div>
  );
};

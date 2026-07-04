'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { theme } from '@/styles/theme';

/**
 * ShowroomTressesGallery
 * An asymmetrical editorial expansion for the hair showroom.
 * Focus: Texture, craftsmanship, and luxury atmosphere.
 */

const tressesAssets = [
  { src: '/assets/images/editorial/wig-straight.png', alt: 'Premium Straight Texture', ratio: 'landscape' as const, span: 'md:col-span-8' },
  { src: '/assets/images/editorial/wig-curls.png', alt: 'Glossy Curly Volume', ratio: 'portrait' as const, span: 'md:col-span-6 md:col-start-7 md:-mt-6 xl:-mt-24' },
];

export const ShowroomTressesGallery: React.FC = () => {
  return (
    <div className="mt-16 md:mt-24 relative max-w-full overflow-hidden px-1">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 relative z-10 items-start">
        {tressesAssets.map((asset, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: theme.motion.duration.slow, 
              delay: index * 0.15,
              ease: theme.motion.ease.cinematic
            }}
            className={`${asset.span} relative z-10`}
          >
            <div className={`relative w-full ${asset.ratio === 'landscape' ? 'aspect-[4/3]' : 'aspect-[3/4]'} border border-luxury-gold/10 bg-black/40 flex flex-col items-center justify-center text-center p-6 group overflow-hidden`}>
              {/* Subtle gold design details in corners */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-luxury-gold/30" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-luxury-gold/30" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-luxury-gold/30" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-luxury-gold/30" />
              
              <p className="text-luxury-gold uppercase tracking-[0.4em] text-[9px] font-medium mb-2">
                {asset.alt}
              </p>
              <h5 className="text-soft-white/60 font-heading text-lg italic mb-2">
                Coming Soon
              </h5>
              <p className="text-soft-white/20 text-[10px] font-light max-w-[200px] leading-relaxed">
                Premium crown selections are currently in preparation.
              </p>
            </div>
          </motion.div>
        ))}
      </div>
        
      {/* Floating Atmospheric Element - Contained */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-luxury-gold/[0.03] blur-[120px] pointer-events-none z-0 overflow-hidden" />
    </div>
  );
};

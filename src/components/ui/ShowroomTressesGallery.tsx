'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditorialFrame } from './EditorialFrame';
import { theme } from '@/styles/theme';

/**
 * ShowroomTressesGallery
 * An asymmetrical editorial expansion for the hair showroom.
 * Focus: Texture, craftsmanship, and luxury atmosphere.
 */

const tressesAssets = [
  { src: '/assets/images/editorial/wig-straight.png', alt: 'Premium Straight Texture', ratio: 'landscape' as const, span: 'md:col-span-8' },
  { src: '/assets/images/editorial/wig-braided.png', alt: 'Frontal Craftsmanship', ratio: 'portrait' as const, span: 'md:col-span-4' },
  { src: '/assets/images/atmosphere/braided-study.png', alt: 'Sculptural Braided Study', ratio: 'square' as const, span: 'md:col-span-6 md:col-start-1 md:-mt-12 xl:-mt-32' },
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
            <div className="group">
              <EditorialFrame
                src={asset.src}
                alt={asset.alt}
                aspectRatio={asset.ratio}
                vignette
                grayscaleHover
              />
              
              {/* Subtle Editorial Label */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <p className="text-[8px] text-luxury-gold/40 uppercase tracking-[0.4em] font-medium">
                  {asset.alt}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
        
      {/* Floating Atmospheric Element - Contained */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-luxury-gold/[0.03] blur-[120px] pointer-events-none z-0 overflow-hidden" />
    </div>
  );
};

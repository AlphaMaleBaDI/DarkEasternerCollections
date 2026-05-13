'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';

/**
 * EditorialFrame Component
 * The signature visual engine for Dark Easterner Collections.
 * Focuses on "Quiet Confidence" and editorial magazine aesthetics.
 */

interface EditorialFrameProps extends Omit<ImageProps, 'className'> {
  overlay?: boolean;
  glow?: boolean;
  vignette?: boolean;
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'cinematic';
  hoverZoom?: boolean;
  grayscaleHover?: boolean;
  blurBackdrop?: boolean;
  priority?: boolean;
}

const aspectRatios = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  cinematic: 'aspect-[21/9]',
};

export const EditorialFrame: React.FC<EditorialFrameProps> = ({
  src,
  alt,
  overlay = false,
  glow = false,
  vignette = false,
  aspectRatio = 'portrait',
  hoverZoom = true,
  grayscaleHover = false,
  blurBackdrop = false,
  priority = false,
  ...props
}) => {
  return (
    <div 
      className={`relative overflow-hidden group ${aspectRatios[aspectRatio]} ${glow ? 'gold-glow' : ''} bg-deep-black`}
    >
      {/* Blur Backdrop Mode */}
      {blurBackdrop && (
        <div className="absolute inset-0 scale-110 blur-2xl opacity-30 select-none">
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Main Image */}
      <motion.div
        className={`relative w-full h-full ${
          grayscaleHover 
            ? 'transition-[filter] duration-[800ms] lg:grayscale lg:hover:grayscale-0' 
            : ''
        }`}
        whileHover={hoverZoom ? { scale: 1.05 } : {}}
        transition={{ duration: theme.motion.duration.slow, ease: theme.motion.ease.cinematic }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover transition-all duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          {...props}
        />
      </motion.div>

      {/* Luxury Overlay Layer */}
      {overlay && (
        <div className="absolute inset-0 pointer-events-none cinematic-overlay opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
      )}

      {/* Soft Vignette Option */}
      {vignette && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-70" />
      )}

      {/* Subtle Gold Edge Glow Overlay (Optional) */}
      {glow && (
        <div className="absolute inset-0 pointer-events-none border border-luxury-gold/10 mix-blend-overlay" />
      )}
    </div>
  );
};

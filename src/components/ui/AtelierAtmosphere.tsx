'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * AtelierAtmosphere Component
 * Subtle visual punctuation for "Atmospheric Continuity".
 * Uses desaturated, low-opacity imagery hidden in shadow.
 */

interface AtelierAtmosphereProps {
  src: string;
  alt: string;
  position?: 'left' | 'right';
  className?: string;
  opacity?: number;
}

export const AtelierAtmosphere: React.FC<AtelierAtmosphereProps> = ({
  src,
  alt,
  position = 'right',
  className = '',
  opacity = 0.15,
}) => {
  return (
    <div className={`relative w-full h-0 pointer-events-none select-none z-0 ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute top-0 ${
          position === 'right' ? 'right-0 translate-x-[20%]' : 'left-0 -translate-x-[20%]'
        } w-[300px] md:w-[500px] aspect-square lg:aspect-[4/5]`}
      >
        {/* Layered Shadow Masks to blend with deep black background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
        <div className="absolute inset-0 shadow-[inset_0_0_100px_50px_rgba(0,0,0,1)] z-10" />
        
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover grayscale brightness-75 contrast-125 blur-[1px]"
        />
      </motion.div>
    </div>
  );
};

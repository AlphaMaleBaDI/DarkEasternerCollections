'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditorialFrame } from './EditorialFrame';
import { theme } from '@/styles/theme';

/**
 * EditorialWigGallery Component
 * An asymmetrical editorial composition for showcasing wig assets.
 * Focus: High-status atmosphere and quiet storytelling.
 */

const wigAssets = [
  { id: 'dominant', src: '/assets/images/editorial/wig-dominant.png', alt: 'Dominant Wig Editorial', size: 'large' },
  { id: 'braided', src: '/assets/images/editorial/wig-braided.png', alt: 'Braided Wig Detail', size: 'small' },
  { id: 'straight', src: '/assets/images/editorial/wig-straight.png', alt: 'Straight Wig Detail', size: 'small' },
  { id: 'curls', src: '/assets/images/editorial/wig-curls.png', alt: 'Curly Wig Detail', size: 'small' },
];

export const EditorialWigGallery: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: theme.motion.duration.slower, ease: theme.motion.ease.cinematic }}
      className="w-full"
    >
      <EditorialFrame
        src="/assets/images/editorial/wig-straight.png"
        alt="Signature Luxury Tresses — Straight Edition"
        aspectRatio="portrait"
        overlay
        glow
        priority
      />
    </motion.div>
  );
};

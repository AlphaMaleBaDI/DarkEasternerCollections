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
        alt="Signature Luxury Tresses - Straight Edition"
        aspectRatio="portrait"
        overlay
        glow
        priority
      />
    </motion.div>
  );
};

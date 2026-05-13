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
  const dominant = wigAssets.find(w => w.id === 'dominant');
  const smallerOnes = wigAssets.filter(w => w.id !== 'dominant');

  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-6">
      {/* Dominant Image */}
      {dominant && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: theme.motion.duration.slow, ease: theme.motion.ease.cinematic }}
          className="col-span-12 lg:col-span-9"
        >
          <EditorialFrame
            src={dominant.src}
            alt={dominant.alt}
            aspectRatio="portrait"
            overlay
            glow
            priority
          />
        </motion.div>
      )}

      {/* Supporting Stacked Images */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 lg:gap-6">
        {smallerOnes.map((wig, index) => (
          <motion.div
            key={wig.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: theme.motion.duration.slow, 
              delay: 0.2 + (index * 0.1),
              ease: theme.motion.ease.cinematic 
            }}
            className="flex-1"
          >
            <EditorialFrame
              src={wig.src}
              alt={wig.alt}
              aspectRatio="square"
              overlay
              hoverZoom={false}
              grayscaleHover={true}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

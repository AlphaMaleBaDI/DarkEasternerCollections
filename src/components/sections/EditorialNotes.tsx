'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';
import { editorialNotes } from '@/data/editorial';

/**
 * EditorialNotes Section
 * Refined for Phase 4: Brand Legitimacy.
 * Uses abstracted editorial data for future CMS integration.
 */

export const EditorialNotes: React.FC = () => {
  return (
    <section className="py-32 lg:py-48 bg-deep-black border-y border-soft-white/5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-32">
          {editorialNotes.map((note, index) => (
            <motion.div
              key={note.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: theme.motion.duration.slow, 
                delay: index * theme.motion.stagger.luxury 
              }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <p className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium">
                {note.label}
              </p>
              <h4 className="text-soft-white text-xl md:text-2xl font-heading leading-tight italic">
                &ldquo;{note.content}&rdquo;
              </h4>
              <div className="w-px h-12 bg-luxury-gold/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

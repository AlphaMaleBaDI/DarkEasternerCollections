'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditorialFrame } from '@/components/ui/EditorialFrame';
import { clientMoments } from '@/data/editorial';
import { theme } from '@/styles/theme';

/**
 * ClientMoments Section
 * Atmosphere-based validation.
 * Focus: visual storytelling over generic reviews.
 */

export const ClientMoments: React.FC = () => {
  return (
    <section className="py-24 md:py-28 lg:py-32 bg-deep-black overflow-hidden">
      <div className="container">
        
        {/* Section Header */}
        <div className="max-w-xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: theme.motion.duration.slow }}
          >
            <h2 className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium mb-6">
              The Collective Presence
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading text-soft-white leading-tight">
              Client <span className="italic text-luxury-gold/70">Moments</span>
            </h3>
            <p className="mt-8 text-soft-white/40 text-lg font-light leading-relaxed">
              Witness the power of presence through the eyes of our global client base. High-status validation through visual storytelling.
            </p>
          </motion.div>
        </div>

        {/* Staggered Visual Strip - Flexible Grid */}
        <div className="flex flex-wrap -mx-4 lg:-mx-8">
          {clientMoments.map((moment, index) => {
            // Stagger offsets: neutralized on tablet landscape for visual balance
            const isFirstRow = index < 3;
            const widthClass = isFirstRow ? 'w-full md:w-1/3 xl:w-1/3' : 'w-full md:w-1/2 lg:w-1/2 max-w-2xl mx-auto';
            const offsetClass = index % 3 === 1 ? 'xl:translate-y-24 lg:translate-y-0 md:translate-y-12' : '';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: theme.motion.duration.slow, 
                  delay: (index % 3) * theme.motion.stagger.luxury,
                  ease: theme.motion.ease.cinematic
                }}
                className={`px-4 lg:px-8 mb-24 ${widthClass} group`}
              >
                <div className={offsetClass}>
                  <EditorialFrame
                    src={moment.image}
                    alt={moment.title}
                    aspectRatio="portrait"
                    vignette
                    grayscaleHover
                  />
                  <div className="mt-8 flex flex-col space-y-2">
                    <p className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-medium">
                      {moment.context}
                    </p>
                    <h4 className="text-soft-white text-2xl font-heading group-hover:text-luxury-gold transition-colors duration-500">
                      {moment.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

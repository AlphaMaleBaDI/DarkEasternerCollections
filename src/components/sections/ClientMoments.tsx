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
    <section className="py-12 md:py-16 lg:py-20 bg-deep-black overflow-hidden">
      <div className="container">
        
        {/* Section Header */}
        <div className="max-w-xl mb-10 md:mb-12">
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

        {clientMoments.length > 0 ? (
          <div className="flex flex-wrap -mx-4 lg:-mx-8">
            {clientMoments.map((moment, index) => {
              // Stagger offsets: neutralized on tablet landscape for visual balance
              const isFirstRow = index < 3;
              const widthClass = isFirstRow ? 'w-full md:w-1/3 xl:w-1/3' : 'w-full md:w-1/2 lg:w-1/2 max-w-2xl mx-auto';
              const offsetClass = '';
              
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
                  className={`px-4 lg:px-8 mb-16 md:mb-24 last:mb-0 ${widthClass} group`}
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
        ) : (
          <div className="border border-luxury-gold/10 bg-black/40 py-16 px-6 text-center max-w-xl mx-auto relative overflow-hidden">
            {/* Subtle gold design details in corners */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-luxury-gold/30" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-luxury-gold/30" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-luxury-gold/30" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-luxury-gold/30" />
            
            <p className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium mb-3">
              Atelier Archive
            </p>
            <h4 className="text-soft-white/80 font-heading text-xl italic mb-3">
              Memories In Formulation
            </h4>
            <p className="text-soft-white/30 text-xs font-light max-w-sm mx-auto leading-relaxed">
              Authentic client moments and fitting diaries are currently being curated for the collective.
            </p>
          </div>
        )}


      </div>
    </section>
  );
};

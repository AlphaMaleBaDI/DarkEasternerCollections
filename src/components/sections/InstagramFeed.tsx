'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditorialFrame } from '@/components/ui/EditorialFrame';
import { theme } from '@/styles/theme';

/**
 * InstagramFeed Section
 * Curated editorial social proof.
 * Focus: social presence without clutter.
 */

const instaPosts = [
  { id: 1, src: '/assets/images/female-fashion/emerald-statement.jpg' },
  { id: 2, src: '/assets/images/female-fashion/pink-tiered-dress.jpg' },
  { id: 3, src: '/assets/images/wigs/luxury-hair-v2.jpg' },
  { id: 4, src: '/assets/images/female-fashion/luxury-couture-blue.jpg' },
];

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-24 bg-deep-black overflow-hidden border-t border-soft-white/5">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: theme.motion.duration.slow }}
          >
            <h2 className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium mb-4">
              Social Presence
            </h2>
            <h3 className="text-3xl font-heading text-soft-white">
              Inside <span className="italic">the House</span>
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: theme.motion.duration.slow }}
          >
            <a 
              href="https://www.instagram.com/darkeasternercollections" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-soft-white/40 hover:text-luxury-gold transition-colors duration-500 uppercase tracking-[0.2em] text-[10px] font-medium pb-1 border-b border-soft-white/10"
            >
              @darkeasternercollections
            </a>
          </motion.div>
        </div>

        {/* Horizontal Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {instaPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: theme.motion.duration.slow, 
                delay: index * theme.motion.stagger.normal 
              }}
              className="relative aspect-square grayscale hover:grayscale-0 transition-all duration-1000"
            >
              <EditorialFrame
                src={post.src}
                alt={`Instagram post ${post.id}`}
                aspectRatio="square"
                overlay
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

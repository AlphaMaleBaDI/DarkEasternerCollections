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
    <section className="pt-12 pb-10 md:pb-16 md:pt-24 bg-deep-black overflow-hidden border-t border-soft-white/5">
      <div className="container">
        
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
            className="flex flex-wrap justify-end gap-4 md:gap-6"
          >
            <a 
              href="https://www.instagram.com/darkeasterner_styles" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-soft-white/40 hover:text-luxury-gold transition-colors duration-500 uppercase tracking-[0.2em] text-[10px] font-medium pb-1 border-b border-soft-white/10"
            >
              @darkeasterner_styles
            </a>
            <a 
              href="https://www.instagram.com/darkeasterner_hairs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-soft-white/40 hover:text-luxury-gold transition-colors duration-500 uppercase tracking-[0.2em] text-[10px] font-medium pb-1 border-b border-soft-white/10"
            >
              @darkeasterner_hairs
            </a>
            <a 
              href="https://vm.tiktok.com/ZS9YfsAJ7Xxdj-QBIL5/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-soft-white/40 hover:text-luxury-gold transition-colors duration-500 uppercase tracking-[0.2em] text-[10px] font-medium pb-1 border-b border-soft-white/10"
            >
              TikTok
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
              className="relative aspect-square lg:grayscale lg:hover:grayscale-0 transition-all duration-1000"
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

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: theme.motion.duration.slow, delay: 0.4 }}
          className="mt-16 flex flex-col items-center gap-8"
        >
          <span className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium">
            FOLLOW THE HOUSE
          </span>
          <span className="text-soft-white/40 text-[11px] md:text-xs italic tracking-wider font-light -mt-6 max-w-md text-center">
            Explore the rhythm of couture, hair, and editorial presence.
          </span>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <a 
              href="https://www.instagram.com/darkeasterner_styles" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <span className="text-soft-white/40 group-hover:text-soft-white text-lg md:text-xl font-heading tracking-[0.2em] transition-all duration-700 italic">
                @darkeasterner_styles
              </span>
              <div className="w-8 h-[1px] bg-luxury-gold/20 group-hover:w-16 group-hover:bg-luxury-gold/50 transition-all duration-700" />
            </a>
            <a 
              href="https://www.instagram.com/darkeasterner_hairs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <span className="text-soft-white/40 group-hover:text-soft-white text-lg md:text-xl font-heading tracking-[0.2em] transition-all duration-700 italic">
                @darkeasterner_hairs
              </span>
              <div className="w-8 h-[1px] bg-luxury-gold/20 group-hover:w-16 group-hover:bg-luxury-gold/50 transition-all duration-700" />
            </a>
            <a 
              href="https://vm.tiktok.com/ZS9YfsAJ7Xxdj-QBIL5/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <span className="text-soft-white/40 group-hover:text-soft-white text-lg md:text-xl font-heading tracking-[0.2em] transition-all duration-700 italic">
                TikTok
              </span>
              <div className="w-8 h-[1px] bg-luxury-gold/20 group-hover:w-16 group-hover:bg-luxury-gold/50 transition-all duration-700" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

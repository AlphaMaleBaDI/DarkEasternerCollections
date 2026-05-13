'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * FragranceBridge Section
 * An editorial transition chamber between Wigs/Couture and Fragrance.
 * Focus: Sensory atmosphere, intentional silence, and narrative bridge.
 */

export const FragranceBridge: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-deep-black relative overflow-hidden">
      {/* Cinematic Atmosphere Layer - Soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-luxury-gold/5 blur-[140px] pointer-events-none opacity-40 select-none" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Dominant Fragrance Silhouette - Scaled for presence */}
          <div className="lg:col-span-8 relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] lg:aspect-[16/10] w-full max-w-4xl mx-auto"
            >
              {/* Layered Shadow Masks - High-status discovery lighting */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/90 z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 z-10" />
              <div className="absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.85)] z-10" />
              
              <Image
                src="/assets/images/atmosphere/perfume-silhouette.png"
                alt="Fragrance Atelier Silhouette"
                fill
                className="object-cover grayscale brightness-[1.15] contrast-[1.6] saturate-[0.9] blur-[0.3px]"
              />
            </motion.div>

            {/* Editorial Whisper Typography - Centered within the bottle's aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center space-y-6 pointer-events-none">
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.4em' }}
                whileInView={{ opacity: 0.9, letterSpacing: '0.8em' }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1 }}
                className="text-luxury-gold uppercase text-[10px] md:text-[11px] font-medium"
              >
                Fragrance Atelier
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1.5 }}
                className="text-soft-white text-sm md:text-base font-light italic tracking-widest max-w-xs mx-auto leading-relaxed"
              >
                &ldquo;Crafted for those remembered long after departure.&rdquo;
              </motion.p>
            </div>
          </div>

          {/* Supporting Texture Anchor - Offset for asymmetrical rhythm */}
          <div className="lg:col-span-4 relative order-1 lg:order-2 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 0.18 }}
              viewport={{ once: true }}
              transition={{ duration: 4, delay: 0.5 }}
              className="relative aspect-[3/4] w-72 ml-auto -mr-16"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
              
              <Image
                src="/assets/images/atmosphere/braided-study.png"
                alt="Couture Texture Study"
                fill
                className="object-cover grayscale blur-[1.5px]"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

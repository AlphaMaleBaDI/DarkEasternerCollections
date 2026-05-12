'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';

export const FragranceTeaser: React.FC = () => {
  return (
    <section className="py-32 lg:py-48 bg-deep-black relative overflow-hidden">
      {/* Olfactory Atmosphere - Very subtle blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-luxury-gold/5 blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: theme.motion.duration.slower, ease: theme.motion.ease.cinematic }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <div className="space-y-4">
            <h2 className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium">
              Fragrance Atelier
            </h2>
            <h3 className="text-4xl md:text-6xl font-heading text-soft-white leading-tight">
              Beyond couture <br />
              <span className="italic">lies memory</span>.
            </h3>
          </div>

          <div className="w-px h-16 bg-luxury-gold/20 mx-auto" />

          <p className="text-soft-white/40 text-lg md:text-xl font-light leading-relaxed italic max-w-lg mx-auto">
            &ldquo;Our inaugural fragrance expressions are currently in development.&rdquo;
          </p>

          <p className="text-[10px] text-luxury-gold/60 uppercase tracking-[0.3em] font-medium pt-8">
            Launching Soon
          </p>
        </motion.div>
      </div>
    </section>
  );
};

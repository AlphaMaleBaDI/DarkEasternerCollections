'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditorialFrame } from '@/components/ui/EditorialFrame';
import { createWhatsAppInquiry } from '@/lib/whatsapp';
import { theme } from '@/styles/theme';

/**
 * Hero Section
 * Refined for Phase 3: Experience Refinement.
 * Uses unified motion tokens and luxury microcopy.
 */

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden bg-deep-black pt-16 lg:pt-0">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[5%] lg:top-[10%] right-[5%] lg:right-[10%] w-[70%] lg:w-[50%] h-[50%] rounded-full bg-luxury-gold/5 blur-[80px] lg:blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-0 items-center">
          
          {/* Asymmetrical Text Composition */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col items-start xl:pr-12 order-2 lg:order-2 xl:order-1 relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: theme.motion.duration.slow, ease: theme.motion.ease.cinematic }}
              className="space-y-6 md:space-y-8 max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-none lg:mt-12 xl:mt-0"
            >
              <div>
                <h2 className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-medium mb-4 md:mb-6">
                  Dark Easterner Collections
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-heading leading-[1] lg:leading-[1.1] xl:leading-[0.95] tracking-tight">
                  Confidence <br /> 
                  <span className="italic pl-4 md:pl-8 lg:pl-0 xl:pl-8">Tailored</span> <br />
                  to <span className="text-luxury-gold">Presence</span>.
                </h1>
              </div>

              <p className="text-soft-white/50 text-lg md:text-xl lg:text-2xl xl:text-xl max-w-sm lg:max-w-md xl:max-w-sm leading-relaxed font-light">
                Luxury Afro-Luxe couture for individuals who love to stand out effortlessly.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 pt-4">
                <a
                  href="#collections"
                  className="group relative text-soft-white uppercase tracking-[0.2em] text-xs font-medium pb-2 overflow-hidden"
                >
                  Enter Showroom
                  <span className="absolute bottom-0 left-0 w-full h-px bg-luxury-gold transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                </a>
                <a
                  href={createWhatsAppInquiry({ type: 'general' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-soft-white/60 hover:text-soft-white uppercase tracking-[0.2em] text-xs font-medium pb-2 transition-colors duration-500"
                >
                  Private Inquiry
                </a>
              </div>
            </motion.div>
          </div>

          {/* Cinematic Hero Portrait */}
          <div className="lg:col-span-12 xl:col-span-7 xl:pl-12 order-1 lg:order-1 xl:order-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: theme.motion.duration.cinematic, ease: theme.motion.ease.cinematic }}
              className="relative lg:translate-y-12"
            >
              <div className="max-w-[550px] ml-auto">
                <EditorialFrame
                  src="/assets/images/founder/cynthia-hero.png"
                  alt="Cynthia Nwaigbo - Founder of Dark Easterner Collections"
                  priority
                  aspectRatio="portrait"
                  overlay
                  vignette
                  hoverZoom={false}
                />
              </div>
              
              <div className="absolute -bottom-10 -right-4 w-px h-40 bg-luxury-gold/20 hidden lg:block" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

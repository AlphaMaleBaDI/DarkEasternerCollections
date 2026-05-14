'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditorialFrame } from '@/components/ui/EditorialFrame';
import { theme } from '@/styles/theme';

/**
 * Founder Section
 * Refined for Phase 3: Experience Refinement.
 */

export const Founder: React.FC = () => {
  return (
    <section id="about" className="pt-24 pb-12 md:pb-32 lg:py-48 bg-deep-black overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Founder Cinematic Portrait */}
          <div className="xl:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: theme.motion.duration.slower, ease: theme.motion.ease.cinematic }}
              className="relative z-10 max-w-2xl mx-auto xl:mx-0"
            >
              <EditorialFrame
                src="/assets/images/founder/cynthia-hero.png"
                alt="Cynthia Nwaigbo - Creative Director, Dark Easterner Collections"
                aspectRatio="portrait"
                glow
                vignette
              />
            </motion.div>
            
            <div className="absolute -top-10 -left-10 w-full h-full border border-luxury-gold/5 hidden xl:block -z-0" />
          </div>

          {/* Couture Storytelling */}
          <div className="xl:col-span-6 flex flex-col space-y-12 mt-16 xl:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: theme.motion.duration.slow }}
            >
              <h2 className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium mb-6">
                The Creative Director
              </h2>
              <h3 className="text-4xl md:text-6xl font-heading text-soft-white leading-[1.1]">
                Cynthia <br /> 
                <span className="italic pl-6 md:pl-12">Nwaigbo</span>
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: theme.motion.duration.slow, delay: theme.motion.stagger.luxury }}
              className="space-y-8 text-soft-white/60 text-lg md:text-xl font-light leading-relaxed"
            >
              <p>
                At Dark Easterner Collections, fashion is an exploration of identity. 
                We believe that every piece should be a statement of <span className="text-soft-white font-medium">confidence and unparalleled elegance</span>.
              </p>
              
              <p>
                Founded and directed by Cynthia Nwaigbo, the house is dedicated to curating luxury Afro-Luxe couture for individuals who command presence effortlessly.
              </p>

              <div className="pt-12 border-t border-soft-white/10">
                <p className="text-soft-white font-heading text-3xl italic leading-tight">
                  &ldquo;Your confidence is our priority.&rdquo;
                </p>
                <p className="text-luxury-gold mt-4 tracking-[0.3em] uppercase text-[10px] font-medium">
                  — Cynthia Nwaigbo
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

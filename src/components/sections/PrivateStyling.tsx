'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditorialFrame } from '@/components/ui/EditorialFrame';
import { createWhatsAppInquiry } from '@/lib/whatsapp';
import { theme } from '@/styles/theme';

/**
 * PrivateStyling Section
 * Elevates brand perception through service world-building.
 * Focus: Concierge-level styling and personalized fittings.
 */

export const PrivateStyling: React.FC = () => {
  return (
    <section className="py-24 md:py-32 lg:py-48 bg-deep-black border-y border-soft-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Service Narrative */}
          <div className="lg:col-span-6 flex flex-col space-y-12 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: theme.motion.duration.slow, ease: theme.motion.ease.cinematic }}
            >
              <h2 className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium mb-6">
                Concierge Services
              </h2>
              <h3 className="text-4xl md:text-6xl font-heading text-soft-white leading-tight">
                Private <span className="italic">Styling</span> <br /> 
                Experience
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: theme.motion.duration.slow, delay: theme.motion.stagger.luxury }}
              className="space-y-8"
            >
              <p className="text-soft-white/60 text-lg md:text-xl font-light leading-relaxed">
                Experience the art of couture in its most personal form. Our Private Styling sessions offer tailored guidance to ensure your selection perfectly mirrors your presence.
              </p>

              <ul className="space-y-4 text-soft-white/80 text-sm md:text-base font-light tracking-wide">
                <li className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold/40" />
                  Personalized Atelier Fittings
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold/40" />
                  Couture Event Consultations
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold/40" />
                  Curated Luxury Wig Selection
                </li>
              </ul>

              <div className="pt-8">
                <a
                  href={createWhatsAppInquiry({ type: 'styling' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center text-soft-white uppercase tracking-[0.3em] text-[10px] font-medium pb-2 border-b border-luxury-gold/30 hover:border-luxury-gold transition-colors duration-500"
                >
                  Book Private Styling
                  <span className="ml-4 text-luxury-gold transform group-hover:translate-x-2 transition-transform duration-500">→</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Atmospheric Visual */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: theme.motion.duration.slower, ease: theme.motion.ease.cinematic }}
            >
              <EditorialFrame
                src="/assets/images/female-fashion/luxury-couture-blue.jpg" // Using an elite piece as the service anchor
                alt="Private Styling Experience - Dark Easterner Collections"
                aspectRatio="portrait"
                vignette
                glow
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

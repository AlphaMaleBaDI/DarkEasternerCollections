'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { conciergeFaqs } from '@/data/editorial';
import { theme } from '@/styles/theme';
import { createWhatsAppInquiry } from '@/lib/whatsapp';

/**
 * ConciergeFAQ Component
 * "Private Client Guidance" - Refined operational trust.
 * Focus: Accordion interaction with cinematic motion.
 */

export const ConciergeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="pt-24 pb-12 md:pb-32 lg:py-48 bg-deep-black">
      <div className="container max-w-4xl">
        
        {/* Section Header */}
        <div className="mb-20 text-center lg:text-left">
          <h2 className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium mb-6">
            Showroom Guidance
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading text-soft-white">
            Private Client <span className="italic">Inquiries</span>
          </h3>
        </div>

        {/* Accordion System */}
        <div className="space-y-4">
          {conciergeFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-soft-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-8 flex items-center justify-between text-left group focus:outline-none"
              >
                <span className={`text-xl md:text-2xl font-heading transition-colors duration-500 ${openIndex === index ? 'text-luxury-gold' : 'text-soft-white group-hover:text-soft-white/80'}`}>
                  {faq.question}
                </span>
                <span className={`text-luxury-gold transition-transform duration-500 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                  +
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: theme.motion.duration.normal, ease: theme.motion.ease.cinematic }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pr-12 text-soft-white/50 text-lg font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Private Stylist Invitation */}
        <div className="mt-12 pt-8 md:mt-24 md:pt-12 border-t border-luxury-gold/10 text-center">
          <p className="text-soft-white/40 text-sm tracking-widest mb-8">
            Require further bespoke assistance?
          </p>
          <a
            href={createWhatsAppInquiry({ type: 'general' })}
            target="_blank"
            rel="noopener noreferrer"
            className="text-soft-white text-xl md:text-2xl font-heading hover:text-luxury-gold transition-colors duration-500 underline underline-offset-8 decoration-luxury-gold/30"
          >
            Consult with a Private Stylist
          </a>
        </div>

      </div>
    </section>
  );
};

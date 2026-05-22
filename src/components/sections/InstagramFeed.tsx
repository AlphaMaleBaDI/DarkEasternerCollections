'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EditorialFrame } from '@/components/ui/EditorialFrame';
import { theme } from '@/styles/theme';

const InstagramIcon: React.FC<{ className?: string; strokeWidth?: number }> = ({ className = "w-6 h-6", strokeWidth = 1.75 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string; strokeWidth?: number }> = ({ className = "w-6 h-6", strokeWidth = 1.75 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const YouTubeIcon: React.FC<{ className?: string; strokeWidth?: number }> = ({ className = "w-6 h-6", strokeWidth = 1.75 }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

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
      {/* Shared SVG Gradients for social icons on mobile */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="insta-grad-strip" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C13584" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#833AB4" stopOpacity={0.55} />
          </linearGradient>
        </defs>
      </svg>
      
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
              Styles
            </a>
            <a 
              href="https://www.instagram.com/darkeasterner_hairs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-soft-white/40 hover:text-luxury-gold transition-colors duration-500 uppercase tracking-[0.2em] text-[10px] font-medium pb-1 border-b border-soft-white/10"
            >
              Hair Atelier
            </a>
            <a 
              href="https://www.instagram.com/easterner_scents" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-soft-white/40 hover:text-luxury-gold transition-colors duration-500 uppercase tracking-[0.2em] text-[10px] font-medium pb-1 border-b border-soft-white/10"
            >
              Scents
            </a>
            <a 
              href="https://vm.tiktok.com/ZS9YfsAJ7Xxdj-QBIL5/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-soft-white/40 hover:text-luxury-gold transition-colors duration-500 uppercase tracking-[0.2em] text-[10px] font-medium pb-1 border-b border-soft-white/10"
            >
              TikTok
            </a>
            <a 
              href="https://www.youtube.com/@darkeasterner" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-soft-white/40 hover:text-luxury-gold transition-colors duration-500 uppercase tracking-[0.2em] text-[10px] font-medium pb-1 border-b border-soft-white/10"
            >
              YouTube
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
          <div className="flex flex-row flex-wrap items-center justify-center gap-8 md:gap-16">
            <a 
              href="https://www.instagram.com/darkeasterner_styles" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              aria-label="Visit Dark Easterner Styles Instagram"
            >
              <div className="flex items-center gap-3 text-soft-white/40 group-hover:text-luxury-gold transition-colors duration-500">
                <InstagramIcon className="w-6.5 h-6.5 social-icon-insta" strokeWidth={1.75} />
                <span className="text-sm md:text-base font-heading tracking-[0.2em] transition-all duration-500 italic">
                  Styles
                </span>
              </div>
              <div className="w-6 h-[1px] bg-luxury-gold/20 group-hover:w-12 group-hover:bg-luxury-gold/50 transition-all duration-700" />
            </a>
            <a 
              href="https://www.instagram.com/darkeasterner_hairs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              aria-label="Visit Dark Easterner Hairs Instagram"
            >
              <div className="flex items-center gap-3 text-soft-white/40 group-hover:text-luxury-gold transition-colors duration-500">
                <InstagramIcon className="w-6.5 h-6.5 social-icon-insta" strokeWidth={1.75} />
                <span className="text-sm md:text-base font-heading tracking-[0.2em] transition-all duration-500 italic">
                  Hair Atelier
                </span>
              </div>
              <div className="w-6 h-[1px] bg-luxury-gold/20 group-hover:w-12 group-hover:bg-luxury-gold/50 transition-all duration-700" />
            </a>
            <a 
              href="https://www.instagram.com/easterner_scents" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              aria-label="Visit Dark Easterner Scents Instagram"
            >
              <div className="flex items-center gap-3 text-soft-white/40 group-hover:text-luxury-gold transition-colors duration-500">
                <InstagramIcon className="w-6.5 h-6.5 social-icon-insta" strokeWidth={1.75} />
                <span className="text-sm md:text-base font-heading tracking-[0.2em] transition-all duration-500 italic">
                  Scents
                </span>
              </div>
              <div className="w-6 h-[1px] bg-luxury-gold/20 group-hover:w-12 group-hover:bg-luxury-gold/50 transition-all duration-700" />
            </a>
            <a 
              href="https://vm.tiktok.com/ZS9YfsAJ7Xxdj-QBIL5/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              aria-label="Visit Dark Easterner TikTok"
            >
              <div className="flex items-center gap-3 text-soft-white/40 group-hover:text-luxury-gold transition-colors duration-500">
                <TikTokIcon className="w-6.5 h-6.5 social-icon-tiktok" strokeWidth={1.75} />
                <span className="text-sm md:text-base font-heading tracking-[0.2em] transition-all duration-500 italic">
                  TikTok
                </span>
              </div>
              <div className="w-6 h-[1px] bg-luxury-gold/20 group-hover:w-12 group-hover:bg-luxury-gold/50 transition-all duration-700" />
            </a>
            <a 
              href="https://www.youtube.com/@darkeasterner" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
              aria-label="Visit Dark Easterner YouTube"
            >
              <div className="flex items-center gap-3 text-soft-white/40 group-hover:text-luxury-gold transition-colors duration-500">
                <YouTubeIcon className="w-6.5 h-6.5 social-icon-youtube" strokeWidth={1.75} />
                <span className="text-sm md:text-base font-heading tracking-[0.2em] transition-all duration-500 italic">
                  YouTube
                </span>
              </div>
              <div className="w-6 h-[1px] bg-luxury-gold/20 group-hover:w-12 group-hover:bg-luxury-gold/50 transition-all duration-700" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { theme } from '@/styles/theme';
import { createWhatsAppInquiry } from '@/lib/whatsapp';
import { Logo } from './Logo';

/**
 * Navbar Component - "Couture Navigation"
 * Minimal, intelligent, and breathable.
 * Desktop: Transparent to blur on scroll.
 * Mobile: Fullscreen Luxury Suite.
 */

const navLinks = [
  { name: 'Showroom', href: '/collections' },
  { name: 'The House', href: '/about' },
  { name: 'Private Inquiry', href: createWhatsAppInquiry({ type: 'general' }) },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: theme.motion.duration.slow, ease: theme.motion.ease.cinematic }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          isScrolled ? 'py-4 bg-deep-black/80 backdrop-blur-xl border-b border-soft-white/5' : 'py-8 bg-transparent'
        }`}
      >
        <div className="container flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link href="/" className="relative z-[110] flex items-center gap-3">
            <Logo size={22} className="opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.span 
              className="text-soft-white font-heading text-xl md:text-2xl tracking-tighter"
              whileHover={{ color: theme.colors.luxuryGold }}
            >
              Dark Easterner
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => {
              const isExternal = link.href.includes('wa.me');

              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group relative text-soft-white/60 hover:text-soft-white uppercase tracking-[0.3em] text-[10px] font-medium transition-colors duration-500"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-gold transition-all duration-500 group-hover:w-full" />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative z-[110] w-8 h-8 flex flex-col items-end justify-center gap-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-8 h-px bg-soft-white block origin-center transition-transform duration-500" 
            />
            <motion.span 
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-px bg-soft-white block transition-opacity duration-500" 
            />
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="w-8 h-px bg-soft-white block origin-center transition-transform duration-500" 
            />
          </button>

        </div>
      </motion.nav>

      {/* Mobile Fullscreen Suite */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: theme.motion.duration.normal }}
            className="fixed inset-0 z-[105] bg-deep-black flex flex-col items-center justify-center"
          >
            {/* Background Atmosphere */}
            <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />

            <div className="flex flex-col items-center gap-12 relative z-10">
              {navLinks.map((link, index) => {
                const isExternal = link.href.includes('wa.me');
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: theme.motion.duration.slow, 
                      delay: 0.1 + index * 0.1,
                      ease: theme.motion.ease.cinematic 
                    }}
                  >
                    <Link 
                      href={link.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-soft-white font-heading text-4xl md:text-6xl hover:text-luxury-gold transition-colors duration-500"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-medium"
              >
                Couture House
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

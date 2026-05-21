'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { theme } from '@/styles/theme';
import { createWhatsAppInquiry } from '@/lib/whatsapp';
import { Logo } from './Logo';
import { useInquiry } from '@/context/InquiryContext';

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
  { name: 'Curator Access', href: '/admin' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { inquiryItems, setIsOpen } = useInquiry();
  const pathname = usePathname();

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
              const isActive = pathname === link.href;

              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={`group relative uppercase tracking-[0.3em] text-[10px] font-medium transition-colors duration-500 ${
                    isActive ? 'text-soft-white' : 'text-soft-white/60 hover:text-soft-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-px bg-luxury-gold transition-all duration-500 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Action Actions (Bag + Menu trigger) */}
          <div className="flex items-center gap-6 relative z-[110]">
            {/* Inquiry Bag Toggle Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-soft-white/80 hover:text-soft-white transition-colors cursor-pointer"
              aria-label="View Inquiry Bag"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {inquiryItems.length > 0 && (
                <motion.span
                  key={inquiryItems.length}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-luxury-gold text-deep-black text-[9px] font-bold rounded-full flex items-center justify-center font-mono"
                >
                  {inquiryItems.length}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-8 h-8 flex flex-col items-end justify-center gap-1.5 focus:outline-none cursor-pointer"
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

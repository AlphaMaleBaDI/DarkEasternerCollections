'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { theme } from '@/styles/theme';

/**
 * PageTransition Component
 * Cinematic "fade-through-black" for emotional continuity.
 * Enhanced for stability to prevent navigation freezes.
 */

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence 
      mode="wait" 
      onExitComplete={() => {
        if (!window.location.hash) {
          window.scrollTo(0, 0);
        }
      }}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: theme.motion.duration.normal, // Slightly faster for responsiveness
          ease: theme.motion.ease.cinematic 
        }}
        className="min-h-screen w-full relative overflow-x-hidden pointer-events-auto"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

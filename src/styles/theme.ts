/**
 * Dark Easterner Collections - Theme Token System
 * Centralized design tokens for consistent luxury aesthetics.
 */

import { motionTokens } from './motion';

export const theme = {
  colors: {
    deepBlack: '#0A0A0A',
    softWhite: '#F5F5F5',
    luxuryGold: '#D4AF37',
    mutedGold: '#C5A028',
    emeraldAccent: '#043927',
    charcoal: '#1A1A1A',
  },
  typography: {
    heading: 'var(--font-playfair)',
    body: 'var(--font-inter)',
    letterSpacing: {
      widest: '0.4em',
      wide: '0.2em',
      normal: '0',
    }
  },
  spacing: {
    sectionPadding: 'py-32 md:py-48 lg:py-64',
    containerMax: 'max-w-7xl',
  },
  motion: motionTokens,
  zIndex: {
    navbar: 100,
    modal: 200,
    dropdown: 50,
  }
};

export { motionTokens };

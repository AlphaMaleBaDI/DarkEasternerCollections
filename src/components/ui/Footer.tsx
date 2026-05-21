'use client';

import React from 'react';
import Link from 'next/link';
import { BrandCrest } from './BrandCrest';
import { createWhatsAppInquiry } from '@/lib/whatsapp';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-black border-t border-soft-white/5 pt-12 md:pt-24 pb-12">
      <div className="container px-6 md:px-10 lg:px-14 xl:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 md:gap-x-8 lg:gap-x-10 xl:gap-x-24">
          
          {/* Brand Philosophy column */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-6 group">
              <div className="rounded-full border border-luxury-gold/30 p-1.5 overflow-hidden bg-deep-black group-hover:border-luxury-gold transition-colors duration-500">
                <BrandCrest size={48} className="opacity-90" />
              </div>
              <span className="text-soft-white font-heading text-2xl tracking-tighter">Dark Easterner</span>
            </Link>
            <p className="text-soft-white/40 text-sm font-light leading-relaxed max-w-sm italic">
              &ldquo;Confidence is Power. Presence is Personal. Dark Easterner Collections curates luxury Afro-Luxe couture for the unapologetically bold.&rdquo;
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-medium">The House</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">Atelier</Link></li>
              <li><Link href="/#about" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">Philosophy</Link></li>
              <li><Link href="/#about" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">Founder</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-medium">Showroom</h4>
            <ul className="space-y-4">
              <li><Link href="/collections" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">All Pieces</Link></li>
              <li><Link href="/collections" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">Wig Editions</Link></li>
              <li><Link href="/collections" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">Signature Collection</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-medium">Concierge</h4>
            <ul className="space-y-4">
              <li><a href={createWhatsAppInquiry({ type: 'general' })} target="_blank" rel="noopener noreferrer" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">Private Inquiry</a></li>
              <li><a href={createWhatsAppInquiry({ type: 'styling' })} target="_blank" rel="noopener noreferrer" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">Styling Consultation</a></li>
              <li><Link href="/#faq" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">Acquisition FAQ</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-medium">Presence</h4>
            <ul className="space-y-4">
              <li><a href="https://www.instagram.com/darkeasterner_styles" target="_blank" rel="noopener noreferrer" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">Instagram (Styles)</a></li>
              <li><a href="https://www.instagram.com/darkeasterner_hairs" target="_blank" rel="noopener noreferrer" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">Instagram (Hairs)</a></li>
              <li><a href="https://vm.tiktok.com/ZS9YfsAJ7Xxdj-QBIL5/" target="_blank" rel="noopener noreferrer" className="text-soft-white/60 hover:text-soft-white text-xs tracking-wide transition-colors">TikTok</a></li>
            </ul>
          </div>
        </div>

        {/* Legal & Social Bar */}
        <div className="mt-24 pt-12 border-t border-soft-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-soft-white/20 text-[10px] uppercase tracking-[0.2em] font-light">
            © {currentYear} Dark Easterner Collections. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-soft-white/20 hover:text-luxury-gold text-[10px] uppercase tracking-[0.2em] font-light transition-colors">Curator Access</Link>
            <Link href="/" className="text-soft-white/20 hover:text-luxury-gold text-[10px] uppercase tracking-[0.2em] font-light transition-colors">Privacy Policy</Link>
            <Link href="/" className="text-soft-white/20 hover:text-luxury-gold text-[10px] uppercase tracking-[0.2em] font-light transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

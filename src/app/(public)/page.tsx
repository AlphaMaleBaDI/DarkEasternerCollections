'use client';

import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { PrivateStyling } from '@/components/sections/PrivateStyling';
import { ClientMoments } from '@/components/sections/ClientMoments';
import { ConciergeFAQ } from '@/components/sections/ConciergeFAQ';
import HeritageStrip from '@/components/sections/HeritageStrip';
import CategoryPortal from '@/components/commerce/CategoryPortal';
import FeaturedShowcase from '@/components/commerce/FeaturedShowcase';

export default function HomePage() {
  const categories: ['men', 'women', 'hair', 'perfumes'] = ['men', 'women', 'hair', 'perfumes'];

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      {/* 1. Hero - The Emotional Threshold */}
      <Hero />

      {/* 2. Philosophy - World-Building */}
      {/* (Heritage Strip removed - was too much duplication) */}

      {/* 3. Category Portals - The Discovery Layer */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {categories.map((cat) => (
          <CategoryPortal key={cat} category={cat} />
        ))}
      </section>

      {/* 4. Controlled Product Validation - Evidence of Commerce */}
      <FeaturedShowcase />

      {/* 5. Editorial Narrative */}
      <div className="py-16 md:py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto text-center">
        <p className="text-gold-500 text-xs uppercase tracking-widest mb-8">Curated Editorial</p>
        <h2 className="text-3xl md:text-5xl font-serif italic text-white leading-relaxed">
          &ldquo;True luxury is not about a product, but the silence between the stitches, the aura of the wearer, and the legacy of the House.&rdquo;
        </h2>
      </div>

      {/* 6. Visual Validation */}
      <ClientMoments />

      {/* 7. Private Styling - Concierge Pathway */}
      <PrivateStyling />

      {/* 9. Guidance */}
      <ConciergeFAQ />
    </main>
  );
}

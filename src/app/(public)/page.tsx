'use client';

import { Hero } from '@/components/sections/Hero';
import { Founder } from '@/components/sections/Founder';
import { FeaturedCollections } from '@/components/sections/FeaturedCollections';
import { FragranceBridge } from '@/components/sections/FragranceBridge';
import { EditorialNotes } from '@/components/sections/EditorialNotes';
import { Philosophy } from '@/components/sections/Philosophy';
import { PrivateStyling } from '@/components/sections/PrivateStyling';
import { ClientMoments } from '@/components/sections/ClientMoments';
import { InstagramFeed } from '@/components/sections/InstagramFeed';
import { ConciergeFAQ } from '@/components/sections/ConciergeFAQ';

/**
 * Dark Easterner Collections - Homepage
 * Engineered for Brand Legitimacy & Editorial Authority.
 */

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-deep-black">
      {/* 1. Hero - Atmospheric Anchor */}
      <Hero />

      {/* 2. Philosophy - World-Building Legitimacy */}
      <Philosophy />

      {/* 3. Featured Collections - Product Showcase */}
      <FeaturedCollections />

      {/* 3.5 Fragrance Feature - Immersive Campaign Takeover */}
      <FragranceBridge />

      {/* 4. Editorial Notes - Status & Authority */}
      <EditorialNotes />

      {/* 6. Client Moments - Visual Validation */}
      <ClientMoments />

      {/* 6. Private Styling - Concierge Pathway */}
      <PrivateStyling />

      {/* 7. Founder Section - Brand Story & Trust */}
      <Founder />

      {/* 8. Concierge FAQ - Guidance & Clarity */}
      <ConciergeFAQ />

      {/* 9. Social Atmosphere - Instagram Strip */}
      <InstagramFeed />
    </main>
  );
}

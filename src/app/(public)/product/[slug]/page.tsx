import React from 'react'
import { getProductBySlug } from '@/lib/products/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AddToInquiryButton } from '@/components/commerce/AddToInquiryButton'
import { ProductHeroImage } from '@/components/commerce/ProductHeroImage'

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const getEditorialPersuasion = (category: string) => {
    const cat = category?.toLowerCase();
    if (cat === 'men' || cat === 'women') {
      return [
        'Tailored for presence.',
        'Designed for distinction.',
        'Built for unforgettable arrival.'
      ]
    }
    if (cat === 'hair') {
      return [
        'Crafted for elegance in motion.',
        'Presence begins with detail.',
        'Styled to complete the House rhythm.'
      ]
    }
    if (cat === 'perfumes') {
      return [
        'Composed to linger beyond presence.',
        'Crafted for quiet impact.',
        'Designed to leave memory behind.'
      ]
    }
    return [
      'Designed for the House presence.',
      'Crafted with uncompromising detail.',
      'Expressed through timeless form.'
    ]
  }

  const persuasionLines = getEditorialPersuasion(product.category);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-3/5 h-[60vh] lg:min-h-screen overflow-hidden">
          <ProductHeroImage 
            src={product.main_image_url} 
            alt={product.title} 
            category={product.category}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative w-full lg:w-2/5 px-5 py-8 md:p-16 flex flex-col justify-center bg-zinc-950">
          <div className="animate-fade-in">
            <p className="text-luxury-gold text-xs uppercase tracking-[0.25em] mb-4 font-medium">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mb-3 md:mb-4 leading-[1.15]">
              {product.title}
            </h1>
            <div className="h-px w-16 bg-luxury-gold/30 mb-4 md:mb-6" />
            
            <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed mb-5 md:mb-6 italic">
              {product.description}
            </p>

            {/* House Status Indicators */}
            <div className="flex flex-wrap gap-2.5 mb-4 md:mb-8">
              <span className="text-[9px] uppercase tracking-[0.15em] text-luxury-gold/60 font-light border border-luxury-gold/10 px-2.5 py-1 bg-zinc-950/40">
                Curated on Request
              </span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-luxury-gold/60 font-light border border-luxury-gold/10 px-2.5 py-1 bg-zinc-950/40">
                Limited House Availability
              </span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-luxury-gold/60 font-light border border-luxury-gold/10 px-2.5 py-1 bg-zinc-950/40">
                Private Styling Guidance
              </span>
            </div>

            {/* Dynamic Editorial Persuasion Block */}
            <div className="border-l border-luxury-gold/25 pl-6 py-1 my-4 md:my-8 space-y-2 md:space-y-2.5">
              {persuasionLines.map((line, idx) => (
                <p 
                  key={idx} 
                  className="text-[10px] md:text-xs uppercase tracking-[0.18em] md:tracking-[0.24em] text-zinc-400 font-light"
                >
                  {line}
                </p>
              ))}
            </div>

            {product.show_price && (
              <div className="mb-5 md:mb-8">
                <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] block mb-1.5">Investment</span>
                <span className="text-white text-2xl font-light tracking-wide">
                  {product.price?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <AddToInquiryButton 
                product={{
                  id: product.id,
                  title: product.title,
                  slug: product.slug,
                  sku: product.sku,
                  category: product.category,
                  price: product.price,
                  show_price: product.show_price,
                  main_image_url: product.main_image_url,
                }}
              />
              <p className="text-center text-zinc-500 text-[9px] uppercase tracking-[0.15em] mt-3">
                Inquiries are non-binding &middot; Curate multiple pieces for a single inquiry
              </p>

              {/* Luxury Reassurance Band */}
              <div className="mt-6 pt-5 md:mt-8 md:pt-6 border-t border-zinc-900 flex flex-col gap-4">
                <div className="flex items-start gap-3.5">
                  <span className="w-1.5 h-[1px] bg-luxury-gold/40 mt-2 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-white font-medium">Bespoke Fitting &amp; Sizing</h4>
                    <p className="text-[9px] text-zinc-500 tracking-[0.08em] font-light mt-0.5 uppercase leading-normal">
                      Every piece is custom verified by a House curator to guarantee correct measurements before handoff.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="w-1.5 h-[1px] bg-luxury-gold/40 mt-2 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-white font-medium">House Authenticity</h4>
                    <p className="text-[9px] text-zinc-500 tracking-[0.08em] font-light mt-0.5 uppercase leading-normal">
                      Sourced directly from Atelier Archives. Delivered with official certification of genuine provenance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="w-1.5 h-[1px] bg-luxury-gold/40 mt-2 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-white font-medium">Non-Binding Consultation</h4>
                    <p className="text-[9px] text-zinc-500 tracking-[0.08em] font-light mt-0.5 uppercase leading-normal">
                      Curate items for private review. Complete handoff occurs via WhatsApp with zero immediate obligation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Internal Cross-Link */}
              <div className="mt-6 pt-6 border-t border-zinc-900">
                {/hair/i.test(product.category) ? (
                  <Link 
                    href="/hair"
                    className="text-luxury-gold hover:text-white uppercase tracking-[0.2em] text-[10px] font-medium transition-colors duration-500 pb-1 border-b border-luxury-gold/20 hover:border-white/30 inline-block"
                  >
                    View Hair Atelier
                  </Link>
                ) : (
                  <Link 
                    href="/collections"
                    className="text-luxury-gold hover:text-white uppercase tracking-[0.2em] text-[10px] font-medium transition-colors duration-500 pb-1 border-b border-luxury-gold/20 hover:border-white/30 inline-block"
                  >
                    Explore House Styles
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

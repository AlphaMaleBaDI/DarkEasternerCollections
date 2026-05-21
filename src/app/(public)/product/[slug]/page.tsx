import React from 'react'
import { getProductBySlug } from '@/lib/products/queries'
import { notFound } from 'next/navigation'
import { AddToInquiryButton } from '@/components/commerce/AddToInquiryButton'
import { ProductHeroImage } from '@/components/commerce/ProductHeroImage'

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-3/5 h-[60vh] lg:h-full overflow-hidden">
          <ProductHeroImage 
            src={product.main_image_url} 
            alt={product.title} 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative w-full lg:w-2/5 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-zinc-950">
          <div className="animate-fade-in">
            <p className="text-gold-500 text-xs uppercase tracking-widest mb-4">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-6xl font-serif italic text-white mb-6 leading-tight">
              {product.title}
            </h1>
            <div className="h-px w-12 bg-gold-600 mb-8" />
            
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-12 italic">
              {product.description}
            </p>

            {product.show_price && (
              <div className="mb-12">
                <span className="text-zinc-500 text-sm uppercase tracking-widest block mb-1">Investment</span>
                <span className="text-white text-2xl font-light">
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
              <p className="text-center text-zinc-600 text-[10px] uppercase tracking-wider mt-4">
                Curate multiple pieces for a single inquiry
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

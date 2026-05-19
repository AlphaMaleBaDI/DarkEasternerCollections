import React from 'react'
import { getProductBySlug } from '@/lib/products/queries'
import { getWhatsAppLink } from '@/lib/constants/contact'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const whatsappLink = getWhatsAppLink(product.title, product.category);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-3/5 h-[60vh] lg:h-full overflow-hidden">
          <Image 
            src={product.main_image_url} 
            alt={product.title} 
            fill 
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative w-full lg:w-2/5 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-zinc-950">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
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
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-black text-center text-sm uppercase tracking-widest hover:bg-gold-500 transition-colors duration-500 font-medium"
              >
                {product.category === 'hair' ? 'Consult The Atelier' : 
                 product.category === 'perfumes' ? 'Experience This Scent' : 
                 'Reserve This Piece'}
              </a>
              <p className="text-center text-zinc-600 text-xs italic mt-4">
                Private inquiry via WhatsApp
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

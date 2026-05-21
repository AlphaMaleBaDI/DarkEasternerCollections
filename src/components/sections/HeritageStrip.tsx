"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeritageStrip() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] mb-6">
            Designed from Heritage
          </p>
          <h2 className="text-2xl md:text-4xl font-serif italic text-white mb-8 leading-relaxed">
            Dark Easterner fuses African craftsmanship, tailored luxury, and timeless identity into pieces made for presence.
          </h2>
          <Link 
            href="/about" 
            className="inline-flex items-center gap-3 text-zinc-400 hover:text-luxury-gold transition-colors duration-500 text-sm uppercase tracking-widest"
          >
            Discover Our Story <span className="text-luxury-gold">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
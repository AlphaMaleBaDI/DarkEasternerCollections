"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { CategoryConfig } from '@/lib/constants/categories'

interface CategoryHeaderProps {
  config: CategoryConfig
}

export default function CategoryHeader({ config }: CategoryHeaderProps) {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 overflow-hidden">
      <div className="relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-luxury-gold text-xs uppercase tracking-[0.3em] mb-4 font-medium">
            {config.label}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-white mb-8 leading-tight">
            {config.heroCopy}
          </h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="max-w-xl"
          >
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed italic">
              {config.editorialStatement}
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Atmospheric Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900/50 via-transparent to-transparent pointer-events-none" />
    </section>
  )
}
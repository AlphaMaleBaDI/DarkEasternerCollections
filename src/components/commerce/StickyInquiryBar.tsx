"use client"

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useInquiry } from '@/context/InquiryContext'

export function StickyInquiryBar() {
  const pathname = usePathname()
  const { inquiryItems, isOpen, setIsOpen } = useInquiry()
  
  const [isVisibleScroll, setIsVisibleScroll] = useState(true)
  const count = inquiryItems.length
  const [prevCount, setPrevCount] = useState(count)
  const [pulse, setPulse] = useState(false)

  // Track additions to trigger a one-off concierge-grade pulse/glow feedback
  useEffect(() => {
    if (count > prevCount) {
      setPulse(true)
      const timer = setTimeout(() => setPulse(false), 1500)
      setPrevCount(count)
      return () => clearTimeout(timer)
    } else if (count < prevCount) {
      setPrevCount(count)
    }
  }, [count, prevCount])

  // Scroll listener to hide the bar when close to the footer to prevent visual competition
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return
      
      const threshold = 180 // Dist from bottom in px
      const totalHeight = document.documentElement.scrollHeight
      const scrollPosition = window.scrollY + window.innerHeight
      
      if (totalHeight - scrollPosition < threshold) {
        setIsVisibleScroll(false)
      } else {
        setIsVisibleScroll(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Trigger once on mount to set correct state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Visibility conditions
  const count = inquiryItems.length
  const shouldRender = 
    count > 0 && 
    !isOpen && 
    isVisibleScroll && 
    !pathname?.startsWith('/admin') && 
    !pathname?.startsWith('/login') &&
    !pathname?.startsWith('/product')

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ y: 100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: 100, x: '-50%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-1/2 z-[90] w-[calc(100%-2rem)] max-w-xl bg-black/90 backdrop-blur-md border border-luxury-gold/30 shadow-2xl rounded-full px-6 py-3.5 flex items-center justify-between gap-4"
        >
          {/* Left Cluster: Confidence Cue & Luxury Reassurance */}
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-white italic text-xs md:text-sm truncate">
              {count} Curated {count === 1 ? 'Piece' : 'Pieces'} Ready for Review
            </span>
            <span className="text-[8px] md:text-[9px] text-zinc-400 tracking-wider font-light mt-0.5 truncate uppercase">
              No payment required &middot; Styling confirmation via WhatsApp
            </span>
          </div>

          {/* Right Action: CTA */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-white hover:bg-luxury-gold text-black text-[10px] md:text-xs uppercase tracking-widest font-semibold px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap"
            >
              Begin Private Inquiry
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

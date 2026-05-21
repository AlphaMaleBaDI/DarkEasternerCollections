"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInquiry } from '@/context/InquiryContext'
import { supabase } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

const luxuryEase = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function InquiryTray() {
  const router = useRouter()
  const { 
    inquiryItems, 
    isOpen, 
    setIsOpen, 
    removeFromInquiry, 
    updateItemNote, 
    clearInquiry 
  } = useInquiry()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleNoteChange = (id: string, text: string) => {
    updateItemNote(id, text)
  }

  const handleNavigate = (path: string) => {
    setIsOpen(false)
    router.push(path)
  }

  // Prepares the final submission to Supabase and routes to WhatsApp
  const executeInquiry = async (isAnonymous: boolean) => {
    if (!isAnonymous && !name.trim()) {
      setNameError(true)
      return
    }
    
    setIsSubmitting(true)
    setNameError(false)

    const customerName = isAnonymous ? 'Anonymous Client' : name.trim()
    const customerEmail = isAnonymous ? null : email.trim()
    const customerPhone = isAnonymous ? null : phone.trim()

    // 1. Log the inquiry in Supabase database
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert({
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          items: inquiryItems.map(item => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            sku: item.sku || null,
            category: item.category,
            notes: item.notes || null,
            size: item.size || null,
          })),
          source: 'whatsapp',
        })

      if (error) {
        console.error('Error logging inquiry to Supabase:', error)
      }
    } catch (err) {
      console.error('Database connection failed for inquiry submission:', err)
    }

    // 2. Build WhatsApp deep link URL and redirect
    // Determine the WhatsApp contact number based on product category rules
    const hasCouture = inquiryItems.some(item => item.category !== 'hair')
    const whatsappNumber = hasCouture ? '2347083794965' : '2349151024440'

    // Determine if any item has a price that Cynthia has explicitly enabled for display
    const hasVisiblePrice = inquiryItems.some(
      item => item.show_price === true && typeof item.price === 'number' && item.price > 0
    )

    // Formulate luxury copy message
    let msg = `Hello ${hasCouture ? "Cynthia's House" : "The Atelier"},\n\n`
    if (!isAnonymous) {
      msg += `My name is ${customerName}.\n`
    }

    if (hasVisiblePrice) {
      msg += `I would like to inquire about the following curated selections:\n\n`
    } else {
      msg += `I am interested in exploring the details, sizing, and availability for the following curated pieces:\n\n`
    }

    inquiryItems.forEach((item, index) => {
      msg += `${index + 1}. ${item.title}`
      if (item.sku) {
        msg += ` (SKU: ${item.sku})`
      }
      // Only append price if Cynthia has explicitly enabled Show Pricing for this product
      if (item.show_price === true && typeof item.price === 'number' && item.price > 0) {
        msg += ` – ₦${item.price.toLocaleString('en-US')}`
      }
      msg += `\n`
      if (item.notes && item.notes.trim()) {
        msg += `   - Note: ${item.notes.trim()}\n`
      }
    })

    if (hasVisiblePrice) {
      msg += `\nPlease assist with sizing, customization options, availability, and next steps.`
    } else {
      msg += `\nPlease assist with pricing, sizing, and availability.`
    }

    const encodedMsg = encodeURIComponent(msg)
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`

    // Clear client-side cart memory and redirect
    clearInquiry()
    setIsOpen(false)
    setIsSubmitting(false)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[200] flex justify-end"
        >
          {/* Backdrop */}
          <motion.div 
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 }
            }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <motion.div 
            variants={{
              initial: { x: '100%' },
              animate: { x: 0 },
              exit: { x: '100%' }
            }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            className="relative w-full max-w-md h-full bg-deep-black border-l border-zinc-900 flex flex-col shadow-2xl justify-between z-10"
          >
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-900 space-y-4">
          {/* Top Row: Continue Curating | Close Button */}
          <div className="flex items-center justify-between">
            {/* Left: Continue Curating */}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gold-500 hover:text-white text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Curating
            </button>

            {/* Right: Close Icon */}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-white p-2 -mr-2 cursor-pointer"
              aria-label="Close tray"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Title Row */}
          <div>
            <h2 className="font-serif text-lg text-white italic">Curated Selections</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">
              {inquiryItems.length} {inquiryItems.length === 1 ? 'piece' : 'pieces'} curated
            </p>
          </div>

          {/* Category Nav Strip */}
          <div className="flex gap-4 border-t border-zinc-900/60 pt-3">
            {[
              { name: 'Men', href: '/men' },
              { name: 'Women', href: '/women' },
              { name: 'Hair', href: '/hair' },
              { name: 'Scents', href: '/perfumes' }
            ].map((cat) => (
              <button
                key={cat.href}
                onClick={() => handleNavigate(cat.href)}
                className="text-[9px] uppercase tracking-widest text-zinc-500 hover:text-gold-500 transition-colors cursor-pointer"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {inquiryItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <svg className="w-12 h-12 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs">No curated selections yet.</p>
                <p className="text-zinc-650 text-[9px] uppercase tracking-wider mt-1.5">Explore our exclusive house categories</p>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-[220px] pt-1">
                {[
                  { name: 'Men Collections', href: '/men' },
                  { name: 'Women Collections', href: '/women' },
                  { name: 'Hair Atelier', href: '/hair' },
                  { name: 'House Scents', href: '/perfumes' }
                ].map((cat) => (
                  <button
                    key={cat.href}
                    onClick={() => handleNavigate(cat.href)}
                    className="py-3 px-4 border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/60 text-[10px] text-zinc-400 hover:text-white uppercase tracking-widest transition-all text-center cursor-pointer rounded-sm"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {inquiryItems.map((item) => (
                <div key={item.id} className="p-4 border border-zinc-900 bg-zinc-950/40 rounded-none space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {item.main_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={item.main_image_url} 
                          alt={item.title} 
                          className="w-12 h-16 object-cover border border-zinc-900"
                        />
                      ) : (
                        <div className="w-12 h-16 bg-zinc-900 border border-zinc-900 flex items-center justify-center text-[8px] uppercase tracking-wider text-zinc-700">
                          No Img
                        </div>
                      )}
                      <div>
                        <h4 className="font-serif text-white text-sm">{item.title}</h4>
                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">
                          {item.category} {item.sku && `• ${item.sku}`}
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeFromInquiry(item.id)}
                      className="text-zinc-600 hover:text-red-500 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Note Area */}
                  <div>
                    <span className="block text-[10px] uppercase text-zinc-500 tracking-wider mb-1">
                      Styling Notes &amp; Fit Preferences
                    </span>
                    <textarea 
                      placeholder="Specify sizing details, custom adjustments, or styling questions..."
                      value={item.notes || ''}
                      onChange={(e) => handleNoteChange(item.id, e.target.value)}
                      className="w-full bg-deep-black border border-zinc-900 focus:border-zinc-700 text-xs p-2 text-white outline-none rounded-sm resize-none h-14"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area with Form and CTA */}
        {inquiryItems.length > 0 && (
          <div className="p-6 border-t border-zinc-900 bg-zinc-950/20 space-y-4">
            {/* Trust Reassurance Line */}
            <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-500 text-center font-light leading-relaxed mb-1">
              Curated on Request &middot; Private Styling Guidance &middot; Response Within House Hours
            </p>
            
            {/* Lead capture drawer overlay */}
            {showForm ? (
              <div className="space-y-4 border-b border-zinc-900 pb-4 animate-fade-in">
                <h3 className="font-serif text-sm italic text-white">Concierge Details</h3>
                
                <div>
                  <label className="block text-[10px] uppercase text-zinc-500 tracking-widest mb-1">Name *</label>
                  <input 
                    type="text" 
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (e.target.value.trim()) setNameError(false)
                    }}
                    className={`w-full bg-deep-black border text-xs p-2.5 outline-none rounded-sm text-white ${
                      nameError ? 'border-red-900 focus:border-red-500' : 'border-zinc-900 focus:border-zinc-700'
                    }`}
                  />
                  {nameError && (
                    <span className="text-[10px] text-red-500 mt-1 block">Your name is required to personalize your greeting.</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-zinc-500 tracking-widest mb-1">Email (Optional)</label>
                    <input 
                      type="email" 
                      placeholder="client@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-deep-black border border-zinc-900 focus:border-zinc-700 text-xs p-2.5 outline-none rounded-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-zinc-500 tracking-widest mb-1">Phone (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="+234..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-deep-black border border-zinc-900 focus:border-zinc-700 text-xs p-2.5 outline-none rounded-sm text-white"
                    />
                  </div>
                </div>

                <p className="text-[9px] text-zinc-500 text-center font-light leading-relaxed">
                  Your private inquiry is non-binding. A House curator will guide fit, styling, and availability details via WhatsApp before any order is confirmed.
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    disabled={isSubmitting}
                    onClick={() => executeInquiry(false)}
                    className="flex-1 py-3 bg-white text-black text-center text-[10px] uppercase tracking-widest font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50 rounded-sm cursor-pointer"
                  >
                    {isSubmitting ? 'Securing...' : 'Begin Private Inquiry'}
                  </button>
                  <button
                    disabled={isSubmitting}
                    onClick={() => executeInquiry(true)}
                    className="px-4 py-3 border border-zinc-800 text-zinc-400 text-center text-[10px] uppercase tracking-widest hover:text-white transition-colors rounded-sm cursor-pointer"
                  >
                    Send Instantly
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[9px] text-zinc-500 text-center font-light leading-relaxed mb-1">
                  Your private inquiry is non-binding. A House curator will guide fit, styling, and availability details via WhatsApp before any order is confirmed.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-4 bg-white text-black text-center text-xs uppercase tracking-widest font-semibold hover:bg-gold-500 transition-all duration-300 shadow-xl rounded-sm cursor-pointer"
                >
                  Begin Private Inquiry
                </button>
                <button
                  onClick={() => executeInquiry(true)}
                  className="w-full py-2.5 text-center text-[10px] uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Send Instantly
                </button>
              </div>
            )}
            
          </div>
        )}

      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  )
}

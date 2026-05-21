"use client"

import React, { useState } from 'react'
import { useInquiry } from '@/context/InquiryContext'

interface AddToInquiryButtonProps {
  product: {
    id: string
    title: string
    slug: string
    sku?: string | null
    category: string
    price?: number | null
    show_price?: boolean | null
    main_image_url?: string | null
  }
}

export function AddToInquiryButton({ product }: AddToInquiryButtonProps) {
  const { addToInquiry, inquiryItems } = useInquiry()
  const [isAdded, setIsAdded] = useState(false)

  const hasBeenAdded = inquiryItems.some(item => item.id === product.id)

  const handleAdd = () => {
    addToInquiry({
      id: product.id,
      title: product.title,
      slug: product.slug,
      sku: product.sku,
      category: product.category,
      price: product.price,
      show_price: product.show_price,
      main_image_url: product.main_image_url,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-4 text-center uppercase tracking-widest text-xs font-semibold transition-all duration-500 ${
        hasBeenAdded 
          ? 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white' 
          : 'bg-white text-black hover:bg-luxury-gold hover:text-black transition-colors duration-500'
      } shadow-xl`}
    >
      {isAdded ? 'Curated' : hasBeenAdded ? 'In Private Inquiry (Open Tray)' : 'Curate Private Inquiry'}
    </button>
  )
}

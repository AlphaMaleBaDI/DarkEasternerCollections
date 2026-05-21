"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface InquiryItem {
  id: string
  title: string
  slug: string
  sku?: string | null
  category: string
  price?: number | null
  show_price?: boolean | null
  main_image_url?: string | null
  quantity: number
  notes?: string
  size?: string
}

interface InquiryContextType {
  inquiryItems: InquiryItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  addToInquiry: (item: Omit<InquiryItem, 'quantity'>, openDrawer?: boolean) => void
  removeFromInquiry: (id: string) => void
  updateItemNote: (id: string, notes: string) => void
  updateItemSize: (id: string, size: string) => void
  clearInquiry: () => void
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined)

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const initialize = async () => {
      await Promise.resolve()
      try {
        const stored = localStorage.getItem('dark_easterner_inquiry')
        if (stored) {
          setInquiryItems(JSON.parse(stored))
        }
      } catch (e) {
        console.warn('Failed to load inquiry items from localStorage:', e)
      } finally {
        setIsInitialized(true)
      }
    }
    initialize()
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (!isInitialized) return
    try {
      localStorage.setItem('dark_easterner_inquiry', JSON.stringify(inquiryItems))
    } catch (e) {
      console.warn('Failed to save inquiry items to localStorage:', e)
    }
  }, [inquiryItems, isInitialized])

  const addToInquiry = (newItem: Omit<InquiryItem, 'quantity'>, openDrawer: boolean = true) => {
    setInquiryItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id)
      if (existing) {
        // If already exists, we keep it as is (no need to increment for couture, just display once)
        return prev
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
    if (openDrawer) {
      setIsOpen(true) // Automatically slide open the drawer for immediate feedback
    }
  }

  const removeFromInquiry = (id: string) => {
    setInquiryItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateItemNote = (id: string, notes: string) => {
    setInquiryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    )
  }

  const updateItemSize = (id: string, size: string) => {
    setInquiryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, size } : item))
    )
  }

  const clearInquiry = () => {
    setInquiryItems([])
    localStorage.removeItem('dark_easterner_inquiry')
  }

  return (
    <InquiryContext.Provider
      value={{
        inquiryItems,
        isOpen,
        setIsOpen,
        addToInquiry,
        removeFromInquiry,
        updateItemNote,
        updateItemSize,
        clearInquiry,
      }}
    >
      {children}
    </InquiryContext.Provider>
  )
}

export function useInquiry() {
  const context = useContext(InquiryContext)
  if (context === undefined) {
    throw new Error('useInquiry must be used within an InquiryProvider')
  }
  return context
}

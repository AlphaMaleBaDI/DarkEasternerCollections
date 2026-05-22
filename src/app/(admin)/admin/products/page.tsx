"use client"

import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import { Product, ProductCategory, ProductStatus } from '@/types/database'
import { toggleProductArchive, deleteProduct } from '@/app/actions/product-actions'

const CATEGORY_MAP: Record<ProductCategory, string> = {
  men: 'Sovereign Tailoring',
  women: 'Editorial Grace',
  hair: 'The Atelier',
  perfumes: 'Invisible Presence'
}

export default function AdminProductsList() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching inventory:', error)
      showToast('error', 'Failed to retrieve House archives.')
    } else {
      setProducts(data || [])
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const initialize = async () => {
      await Promise.resolve()
      fetchProducts()
    }
    initialize()
  }, [fetchProducts])

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message })
    setTimeout(() => setToast(null), 4000)
  }

  // Soft archive toggle action handler
  async function handleToggleArchive(id: string, currentStatus: ProductStatus) {
    setProcessingId(id)
    const result = await toggleProductArchive(id, currentStatus)
    
    if (result.success) {
      // Instantly update local state for premium responsiveness
      setProducts(prev => 
        prev.map(p => p.id === id ? { ...p, status: result.newStatus as ProductStatus } : p)
      )
      showToast('success', result.message)
    } else {
      showToast('error', result.message)
    }
    setProcessingId(null)
  }

  // Permanent destructive delete handler
  async function handleDeleteProduct(id: string) {
    const confirmed = window.confirm("Are you sure you want to permanently delete this product? This will also remove its associated image asset.")
    if (!confirmed) return

    setProcessingId(id)
    const result = await deleteProduct(id)

    if (result.success) {
      setProducts(prev => prev.filter(p => p.id !== id))
      showToast('success', result.message)
    } else {
      showToast('error', result.message)
    }
    setProcessingId(null)
  }

  // Filter products based on search, category, and status
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (product.sku && product.sku.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 px-6 py-3 border text-sm uppercase tracking-widest font-medium ${
              toast.type === 'success' ? 'border-gold-800 text-gold-400 bg-zinc-950' : 'border-red-800 text-red-400 bg-zinc-950'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif text-white italic">House Archives</h1>
          <p className="text-zinc-500 text-sm mt-2">Manage couture availability and editorial statuses.</p>
        </div>
        <Link 
          href="/admin/upload" 
          className="px-6 py-3 bg-white text-black uppercase tracking-widest text-xs font-semibold hover:bg-gold-500 transition-all duration-300 self-start md:self-auto animate-fade-in"
        >
          Curate New Asset
        </Link>
      </header>

      {/* Control Bar: Search & Filter Tabs */}
      <div className="mb-8 space-y-6">
        {/* Search Input */}
        <div className="relative">
          <input 
            type="text"
            placeholder="Search by Title or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/40 border border-zinc-800 p-4 pl-12 text-white placeholder:text-zinc-600 focus:border-gold-500 outline-none transition-colors"
          />
          <svg 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-between gap-6 border-b border-zinc-900 pb-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                selectedCategory === 'all' ? 'text-gold-500 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              All Categories
            </button>
            {Object.entries(CATEGORY_MAP).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                  selectedCategory === key ? 'text-gold-500 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 bg-zinc-900/20 p-1 border border-zinc-900">
            {['all', 'published', 'draft', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors ${
                  selectedStatus === status 
                    ? 'bg-zinc-800 text-white font-medium' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory List Grid */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-24 bg-zinc-900/30 border border-zinc-900 animate-pulse flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded"></div>
                <div className="space-y-2">
                  <div className="w-48 h-4 bg-zinc-800 rounded"></div>
                  <div className="w-24 h-3 bg-zinc-800 rounded"></div>
                </div>
              </div>
              <div className="w-16 h-8 bg-zinc-800 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-zinc-900 bg-zinc-900/10">
          <p className="text-zinc-600 uppercase tracking-widest text-xs">No assets match your current selection.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-all duration-300 gap-6"
              >
                {/* Details Section */}
                <div className="flex items-center gap-5">
                  {/* Product Thumbnail */}
                  <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 overflow-hidden relative flex-shrink-0">
                    {product.main_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={product.main_image_url} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] uppercase text-zinc-700 tracking-wider">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Title / SKU / Category details */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-white text-lg group-hover:text-gold-500 transition-colors duration-300">
                      {product.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      {product.sku ? (
                        <span className="font-mono text-zinc-500 uppercase tracking-wider">{product.sku}</span>
                      ) : (
                        <span className="text-zinc-600 italic">No SKU Assigned</span>
                      )}
                      <span className="text-zinc-700">•</span>
                      <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
                        {CATEGORY_MAP[product.category] || product.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status / Stock / Actions */}
                <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 md:gap-8 border-t border-zinc-900/60 pt-4 md:border-0 md:pt-0 w-full md:w-auto">
                  {/* Stock count */}
                  <div className="text-left md:text-right">
                    <div className="text-xs text-zinc-500 uppercase tracking-widest">Availability Status</div>
                    <div className={`text-sm mt-0.5 ${
                      product.inventory_status === 'out_of_stock' 
                        ? 'text-red-500' 
                        : product.inventory_status === 'coming_soon'
                        ? 'text-blue-400 font-medium'
                        : product.stock_quantity === 0 
                        ? 'text-red-500' 
                        : 'text-zinc-300'
                    }`}>
                      {product.inventory_status === 'out_of_stock' 
                        ? 'Out of Stock' 
                        : product.inventory_status === 'coming_soon'
                        ? 'Coming Soon'
                        : product.stock_quantity === 0 
                        ? 'Out of Stock' 
                        : `${product.stock_quantity} units`}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="text-center w-24">
                    <span className={`inline-block px-2.5 py-1 text-[9px] uppercase tracking-widest font-semibold border ${
                      product.status === 'published' 
                        ? 'border-gold-800 text-gold-500 bg-gold-950/10'
                        : product.status === 'archived'
                        ? 'border-zinc-800 text-zinc-500 bg-zinc-900/20'
                        : 'border-zinc-700 text-zinc-400 bg-zinc-800/10'
                    }`}>
                      {product.status}
                    </span>
                  </div>

                  {/* Archival & Purge Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="px-4 py-2 text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 border border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white"
                    >
                      Edit
                    </Link>

                    <button
                      disabled={processingId === product.id}
                      onClick={() => handleToggleArchive(product.id, product.status)}
                      className={`px-4 py-2 text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 border ${
                        product.status === 'archived'
                          ? 'border-gold-800 text-gold-500 hover:bg-gold-500 hover:text-black hover:border-gold-500'
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white'
                      } disabled:opacity-30`}
                    >
                      {processingId === product.id ? '...' : product.status === 'archived' ? 'Restore' : 'Archive'}
                    </button>

                    <button
                      disabled={processingId === product.id}
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-4 py-2 text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 border border-red-950 text-red-500 hover:bg-red-950/20 hover:text-red-400 disabled:opacity-30"
                    >
                      {processingId === product.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

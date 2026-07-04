"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { uploadProduct } from '@/app/actions/product-actions'

type UploadResult = { success: boolean; message: string }

export default function ProductUpload() {
  const [isLoading, setIsLoading] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setSelectedFileName(file ? file.name : null)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setStatusMsg(null)

    const formData = new FormData(e.currentTarget)
    const result: UploadResult = await uploadProduct(formData)

    if (result.success) {
      setStatusMsg({ type: 'success', text: result.message })
      ;(e.target as HTMLFormElement).reset()
      setSelectedFileName(null)
    } else {
      setStatusMsg({ type: 'error', text: result.message })
    }
    setIsLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-serif text-white italic">Curate Collection</h1>
        <p className="text-zinc-500 text-sm mt-2">Add a new piece to the house archives.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Product Title</label>
            <input name="title" required className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Category</label>
            <select name="category" className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none transition-colors">
              <option value="men">Men of Class</option>
              <option value="women">The Elegant Woman</option>
              <option value="hair">Her Crown Collection</option>
              <option value="perfumes">Signature Fragrances</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-zinc-400 text-xs uppercase tracking-widest">Editorial Description</label>
          <textarea name="description" rows={4} className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none transition-colors" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">SKU Code</label>
            <input 
              name="sku" 
              placeholder="e.g. DE-COUTURE-01" 
              className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none uppercase placeholder:text-zinc-700 transition-colors" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Price (NGN)</label>
            <input name="price" type="number" className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Stock Quantity</label>
            <input name="stock" type="number" defaultValue="1" className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Image Asset</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label 
                htmlFor="image-upload"
                className="bg-zinc-900 border border-zinc-800 px-4 py-3 text-zinc-300 text-xs uppercase tracking-widest hover:text-white hover:border-zinc-650 transition-all cursor-pointer rounded-sm text-center font-semibold"
              >
                Upload Asset
              </label>
              <input 
                id="image-upload"
                name="image" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden" 
                required
              />
              <span className="text-xs text-zinc-500 truncate max-w-[200px] font-mono sm:mt-0 mt-1">
                {selectedFileName || 'No asset selected'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 pt-6 border-t border-zinc-900">
          {/* Checkboxes */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" name="featured" className="accent-gold-500 w-4 h-4" />
              <span className="text-zinc-400 text-sm">Feature on Home</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" name="showPrice" className="accent-gold-500 w-4 h-4" />
              <span className="text-zinc-400 text-sm">Show Pricing</span>
            </label>
          </div>

          {/* Status Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono">Availability Status</span>
              <select name="inventoryStatus" defaultValue="available" className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-zinc-400 text-xs uppercase tracking-widest outline-none focus:border-gold-500">
                <option value="available">Available</option>
                <option value="coming_soon">Coming Soon</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono">Publication Status</span>
              <select name="status" defaultValue="draft" className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-zinc-400 text-xs uppercase tracking-widest outline-none focus:border-gold-500">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <button 
            disabled={isLoading}
            type="submit"
            className="w-full py-4 bg-white text-black uppercase tracking-widest text-sm font-medium hover:bg-gold-500 transition-all duration-500 disabled:opacity-50"
          >
            {isLoading ? 'Recording Asset...' : 'Add to Archive'}
          </button>
        </div>

        {statusMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded border text-sm text-center flex flex-col gap-2 items-center ${statusMsg.type === 'success' ? 'border-gold-800 text-gold-400 bg-gold-900/10' : 'border-red-800 text-red-400 bg-red-900/10'}`}
          >
            <span>{statusMsg.text}</span>
            {statusMsg.type === 'success' && (
              <Link 
                href="/admin/products" 
                className="mt-1 text-xs uppercase tracking-widest text-white border-b border-white hover:text-gold-500 hover:border-gold-500 transition-colors pb-0.5"
              >
                View House Availability
              </Link>
            )}
          </motion.div>
        )}
      </form>
    </div>
  )
}
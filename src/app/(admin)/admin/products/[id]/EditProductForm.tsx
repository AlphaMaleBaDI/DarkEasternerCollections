"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { updateProduct } from '@/app/actions/product-actions'
import { Product } from '@/types/database'

type EditProductFormProps = {
  product: Product
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(product.main_image_url)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setStatusMsg(null)

    const formData = new FormData(e.currentTarget)
    const result = await updateProduct(product.id, formData)

    if (result.success) {
      setStatusMsg({ type: 'success', text: result.message })
    } else {
      setStatusMsg({ type: 'error', text: result.message })
    }
    setIsLoading(false)
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setSelectedFileName(null)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-white italic">Edit Archive Asset</h1>
          <p className="text-zinc-500 text-sm mt-2">Update product details, pricing, and statuses.</p>
        </div>
        <Link 
          href="/admin/products"
          className="px-4 py-2 border border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white uppercase tracking-widest text-[10px] font-semibold transition-all duration-300"
        >
          Back to Archives
        </Link>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest font-mono">Product Title</label>
            <input 
              name="title" 
              required 
              defaultValue={product.title}
              className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none transition-colors" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest font-mono">Category</label>
            <select 
              name="category" 
              defaultValue={product.category}
              className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none transition-colors"
            >
              <option value="men">Men of Class</option>
              <option value="women">The Elegant Woman</option>
              <option value="hair">Her Crown Collection</option>
              <option value="perfumes">Signature Fragrances</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-zinc-400 text-xs uppercase tracking-widest font-mono">Editorial Description</label>
          <textarea 
            name="description" 
            rows={4} 
            defaultValue={product.description || ''}
            className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none transition-colors" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest font-mono">SKU Code</label>
            <input 
              name="sku" 
              defaultValue={product.sku || ''}
              placeholder="e.g. DE-COUTURE-01" 
              className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none uppercase placeholder:text-zinc-700 transition-colors" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest font-mono">Price (NGN)</label>
            <input 
              name="price" 
              type="number" 
              defaultValue={product.price || ''}
              className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none transition-colors" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest font-mono">Stock Quantity</label>
            <input 
              name="stock" 
              type="number" 
              defaultValue={product.stock_quantity || 0}
              className="bg-zinc-900 border border-zinc-800 p-3 text-white focus:border-gold-500 outline-none transition-colors" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs uppercase tracking-widest font-mono">Image Asset</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label 
                htmlFor="image-upload"
                className="bg-zinc-900 border border-zinc-800 px-4 py-3 text-zinc-300 text-xs uppercase tracking-widest hover:text-white hover:border-zinc-650 transition-all cursor-pointer rounded-sm text-center font-semibold"
              >
                Upload New Asset
              </label>
              <input 
                id="image-upload"
                name="image" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="hidden" 
              />
              <span className="text-xs text-zinc-500 truncate max-w-[200px] font-mono sm:mt-0 mt-1">
                {selectedFileName || 'No replacement selected'}
              </span>
            </div>
          </div>
        </div>

        {/* Image Preview Window */}
        {imagePreview && (
          <div className="flex flex-col gap-3 p-4 bg-zinc-950 border border-zinc-900 max-w-sm rounded">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Active Image Asset</span>
            <img 
              src={imagePreview} 
              alt="Asset preview" 
              className="w-full h-48 object-cover rounded border border-zinc-850" 
            />
          </div>
        )}



        <div className="flex flex-col gap-6 pt-6 border-t border-zinc-900">
          {/* Checkboxes Group */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                name="featured" 
                defaultChecked={product.featured}
                className="accent-gold-500 w-4 h-4" 
              />
              <span className="text-zinc-400 text-sm">Feature on Home</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                name="showPrice" 
                defaultChecked={product.show_price}
                className="accent-gold-500 w-4 h-4" 
              />
              <span className="text-zinc-400 text-sm">Show Pricing</span>
            </label>
          </div>

          {/* Status Dropdowns Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-zinc-400 text-xs uppercase tracking-widest font-mono">Availability Status</span>
              <select 
                name="inventoryStatus" 
                defaultValue={product.inventory_status || 'available'}
                className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white text-sm outline-none focus:border-gold-500 transition-colors"
              >
                <option value="available">Available</option>
                <option value="coming_soon">Coming Soon</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-zinc-400 text-xs uppercase tracking-widest font-mono">Publication Status</span>
              <select 
                name="status" 
                defaultValue={product.status}
                className="w-full bg-zinc-900 border border-zinc-800 p-3 text-white text-sm outline-none focus:border-gold-500 transition-colors"
              >
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
            {isLoading ? 'Updating Asset...' : 'Save Modifications'}
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

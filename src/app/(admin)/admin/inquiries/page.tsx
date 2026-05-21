"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

interface InquiryItem {
  id: string
  title: string
  slug: string
  sku?: string | null
  category: string
  notes?: string | null
  size?: string | null
}

interface Inquiry {
  id: string
  customer_name: string
  customer_email?: string | null
  customer_phone?: string | null
  items: InquiryItem[]
  status: 'pending' | 'responded' | 'completed'
  source: string
  created_at: string
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  // Fetch all inquiries from Supabase
  const fetchInquiries = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching inquiries:', error)
      showToast('error', 'Failed to retrieve inquiries.')
    } else {
      setInquiries(data || [])
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const initialize = async () => {
      await Promise.resolve()
      fetchInquiries()
    }
    initialize()
  }, [fetchInquiries])

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message })
    setTimeout(() => setToast(null), 4000)
  }

  // Update Status in database
  async function handleStatusChange(id: string, newStatus: 'pending' | 'responded' | 'completed') {
    setProcessingId(id)
    const { error } = await supabase
      .from('inquiries')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      console.error('Error updating status:', error)
      showToast('error', 'Failed to update inquiry status.')
    } else {
      setInquiries(prev => 
        prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq)
      )
      showToast('success', `Status updated to ${newStatus}.`)
    }
    setProcessingId(null)
  }

  // Delete inquiry
  async function handleDelete(id: string) {
    const confirmed = window.confirm("Are you sure you want to permanently delete this inquiry record?")
    if (!confirmed) return

    setProcessingId(id)
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting inquiry:', error)
      showToast('error', 'Failed to delete inquiry.')
    } else {
      setInquiries(prev => prev.filter(inq => inq.id !== id))
      showToast('success', 'Inquiry deleted successfully.')
    }
    setProcessingId(null)
  }

  const filteredInquiries = inquiries.filter(inq => {
    if (selectedStatus === 'all') return true
    return inq.status === selectedStatus
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
          <h1 className="text-3xl font-serif text-white italic">Client Inquiries</h1>
          <p className="text-zinc-500 text-sm mt-2">Manage customer leads, sizing requirements, and conversational flows.</p>
        </div>
      </header>

      {/* Control Bar: Status Filter Tabs */}
      <div className="mb-8 border-b border-zinc-900 pb-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'responded', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                selectedStatus === status 
                  ? 'text-gold-500 font-semibold' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {status} {status !== 'all' && `(${inquiries.filter(i => i.status === status).length})`}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2].map(n => (
            <div key={n} className="h-44 bg-zinc-900/30 border border-zinc-900 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="text-center py-20 border border-zinc-900 bg-zinc-900/10">
          <p className="text-zinc-600 uppercase tracking-widest text-xs">No inquiries logged under this filter.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredInquiries.map((inq) => (
            <div 
              key={inq.id}
              className="p-6 border border-zinc-900 bg-zinc-950 rounded-lg space-y-6 hover:border-zinc-800 transition-colors"
            >
              {/* Header Info */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900/60 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-lg text-white font-medium">{inq.customer_name}</h3>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                      via {inq.source}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-1 flex flex-wrap gap-x-4">
                    {inq.customer_email && <span>Email: {inq.customer_email}</span>}
                    {inq.customer_phone && <span>Phone: {inq.customer_phone}</span>}
                    <span>Received: {new Date(inq.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  {/* Status Dropdown/Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase text-zinc-500 font-mono">Status:</span>
                    <select
                      disabled={processingId === inq.id}
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as 'pending' | 'responded' | 'completed')}
                      className={`text-xs p-1.5 border bg-deep-black text-white outline-none ${
                        inq.status === 'pending' ? 'border-gold-800 text-gold-500' :
                        inq.status === 'responded' ? 'border-zinc-700 text-zinc-300' :
                        'border-zinc-800 text-zinc-600'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="responded">Responded</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <button
                    disabled={processingId === inq.id}
                    onClick={() => handleDelete(inq.id)}
                    className="p-2 border border-red-950 text-red-500 hover:bg-red-950/20 hover:text-red-400 text-xs rounded transition-colors"
                    title="Delete Record"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <h4 className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono">Curated Pieces Inquired:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inq.items.map((item, idx) => (
                    <div key={idx} className="p-4 border border-zinc-900 bg-zinc-900/10 rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-serif text-white text-sm block">{item.title}</span>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 block">
                            {item.category} {item.sku && `• ${item.sku}`}
                          </span>
                        </div>
                      </div>

                      {/* Customization Details Note */}
                      {item.notes && item.notes.trim() ? (
                        <div className="mt-3 p-2 bg-deep-black/60 border-l border-gold-600 rounded text-xs text-zinc-300">
                          <span className="text-[9px] uppercase text-gold-500 font-mono block mb-1">Client Sizing/Note:</span>
                          <p className="italic leading-relaxed">{item.notes}</p>
                        </div>
                      ) : (
                        <div className="mt-3 text-xs text-zinc-600 italic">No notes provided for this piece.</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

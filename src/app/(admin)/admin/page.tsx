"use client"

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    publishedProducts: 0,
    draftProducts: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
    respondedInquiries: 0,
    completedInquiries: 0,
    menCount: 0,
    womenCount: 0,
    hairCount: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoading(true)
        
        // Fetch products stats
        const { data: products, error: pError } = await supabase
          .from('products')
          .select('status, category')

        if (pError) throw pError

        const totalP = products?.length || 0
        const publishedP = products?.filter(p => p.status === 'published').length || 0
        const draftP = products?.filter(p => p.status === 'draft').length || 0
        const men = products?.filter(p => p.category === 'men').length || 0
        const women = products?.filter(p => p.category === 'women').length || 0
        const hair = products?.filter(p => p.category === 'hair').length || 0

        // Fetch inquiries stats
        let totalI = 0
        let pendingI = 0
        let respondedI = 0
        let completedI = 0

        try {
          const { data: inquiries, error: iError } = await supabase
            .from('inquiries')
            .select('status')

          if (!iError && inquiries) {
            totalI = inquiries.length
            pendingI = inquiries.filter(i => i.status === 'pending').length
            respondedI = inquiries.filter(i => i.status === 'responded').length
            completedI = inquiries.filter(i => i.status === 'completed').length
          }
        } catch (err) {
          console.warn('Inquiries table not yet initialized or read permission denied', err)
        }

        setStats({
          totalProducts: totalP,
          publishedProducts: publishedP,
          draftProducts: draftP,
          totalInquiries: totalI,
          pendingInquiries: pendingI,
          respondedInquiries: respondedI,
          completedInquiries: completedI,
          menCount: men,
          womenCount: women,
          hairCount: hair,
        })
      } catch (err) {
        console.error('Error fetching admin dashboard stats:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <header className="mb-10">
        <h1 className="text-3xl font-serif text-white italic">Welcome, Cynthia&apos;s House</h1>
        <p className="text-zinc-500 text-sm mt-2">Manage the House&apos;s digital showroom and private inquiries.</p>
      </header>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="h-32 rounded-xl border border-zinc-900 bg-zinc-950 p-6">
              <div className="w-24 h-4 bg-zinc-900 rounded mb-4"></div>
              <div className="w-12 h-8 bg-zinc-900 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-10 animate-fade-in">
          {/* Main Inventory & Inquiry Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/admin/products" className="p-6 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-colors group">
              <div className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-mono">Total Assets</div>
              <div className="text-4xl font-light text-white group-hover:text-gold-500 transition-colors duration-300">{stats.totalProducts}</div>
              <div className="text-xs text-zinc-600 mt-2">{stats.publishedProducts} Published • {stats.draftProducts} Drafts</div>
            </Link>

            <Link href="/admin/inquiries" className="p-6 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-colors group">
              <div className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-mono">Pending Inquiries</div>
              <div className={`text-4xl font-light ${stats.pendingInquiries > 0 ? 'text-gold-500 font-normal' : 'text-white'}`}>
                {stats.pendingInquiries}
              </div>
              <div className="text-xs text-zinc-600 mt-2">{stats.totalInquiries} Total Inquiries logged</div>
            </Link>

            <div className="p-6 rounded-xl border border-zinc-900 bg-zinc-950">
              <div className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-mono">Inquiry Statuses</div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div>
                  <span className="block text-zinc-500 text-[10px] uppercase font-mono tracking-wider">Pending</span>
                  <span className="text-lg font-light text-white">{stats.pendingInquiries}</span>
                </div>
                <div>
                  <span className="block text-zinc-500 text-[10px] uppercase font-mono tracking-wider">Responded</span>
                  <span className="text-lg font-light text-zinc-400">{stats.respondedInquiries}</span>
                </div>
                <div>
                  <span className="block text-zinc-500 text-[10px] uppercase font-mono tracking-wider">Done</span>
                  <span className="text-lg font-light text-zinc-600">{stats.completedInquiries}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Category Curation Splits */}
          <div className="border-t border-zinc-900 pt-10">
            <h2 className="text-xl font-serif text-white italic mb-6">Curation Distribution</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 border border-zinc-900 bg-zinc-950/40">
                <span className="text-zinc-500 text-xs uppercase tracking-widest block font-mono">Sovereign Tailoring (Men)</span>
                <span className="text-2xl font-light text-white block mt-2">{stats.menCount} pieces</span>
              </div>
              <div className="p-5 border border-zinc-900 bg-zinc-950/40">
                <span className="text-zinc-500 text-xs uppercase tracking-widest block font-mono">Editorial Grace (Women)</span>
                <span className="text-2xl font-light text-white block mt-2">{stats.womenCount} pieces</span>
              </div>
              <div className="p-5 border border-zinc-900 bg-zinc-950/40">
                <span className="text-zinc-500 text-xs uppercase tracking-widest block font-mono">The Atelier (Hair)</span>
                <span className="text-2xl font-light text-white block mt-2">{stats.hairCount} products</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const navItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Products', href: '/admin/products' },
    { label: 'Inquiries', href: '/admin/inquiries' },
    { label: 'Upload New', href: '/admin/upload' },
    { label: 'Return to Showroom', href: '/' },
  ]

  async function handleSignOut() {
    setIsSigningOut(true)
    setErrorMsg(null)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.replace('/')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign out failed.'
      console.error('Sign out error:', message)
      setErrorMsg(message)
      setIsSigningOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-900/50 p-6 flex flex-col md:justify-between gap-6">
        <div className="flex flex-row md:flex-col justify-between items-center md:items-start gap-0 md:gap-8">
          <div className="text-lg md:text-xl font-serif italic text-gold-500">House Admin</div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-col gap-2 w-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-white font-medium'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Sign Out Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-mono text-zinc-500 hover:text-red-400 border border-zinc-850 hover:border-red-900/30 rounded transition-all duration-300 disabled:opacity-30"
            >
              {isSigningOut ? '...' : 'Sign Out'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <nav className="flex md:hidden flex-wrap gap-2 border-t border-zinc-900/40 pt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 px-3 text-xs rounded transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-zinc-850 text-white font-medium'
                    : 'text-zinc-400 bg-zinc-900/40 hover:bg-zinc-850 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Sign Out Footer */}
        <div className="hidden md:flex flex-col gap-2 pt-4 border-t border-zinc-900/60">
          {errorMsg && (
            <div className="text-[10px] text-red-400 bg-red-950/10 border border-red-950/40 p-2 text-center font-mono">
              {errorMsg}
            </div>
          )}
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="w-full px-4 py-2 text-left text-xs uppercase tracking-widest font-mono text-zinc-500 hover:bg-red-950/20 hover:text-red-400 border border-transparent hover:border-red-900/30 rounded-md transition-all duration-300 disabled:opacity-30"
          >
            {isSigningOut ? 'Leaving...' : 'Sign Out'}
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

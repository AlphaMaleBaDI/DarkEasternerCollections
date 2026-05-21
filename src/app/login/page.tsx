"use client"

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import { ADMIN_EMAILS } from '@/lib/auth'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // 1. Session Check & Auto-Kick Loop
  useEffect(() => {
    async function checkActiveSession() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const userEmail = session.user.email?.toLowerCase() || ''
        if (ADMIN_EMAILS.includes(userEmail)) {
          // Sovereign Curator already logged in, redirect directly to dashboard
          const targetRedirect = searchParams.get('redirect') || '/admin'
          router.replace(targetRedirect)
          return
        }
      }
      setIsCheckingSession(false)
    }
    checkActiveSession()
  }, [router, searchParams])

  // 2. Form Submission Handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    setErrorMsg(null)

    try {
      // Step A: Supabase Sign In
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        throw new Error(error.message)
      }

      // Step B: Fetch User & Strict Admin Allowlist Verification
      const user = data.user
      const userEmail = user?.email?.toLowerCase() || ''

      if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
        // Log out immediately to clear unprivileged session
        await supabase.auth.signOut()
        throw new Error('Access denied. This gate is reserved for the Sovereign Curator.')
      }

      // Step C: Route to memory target or default admin dashboard
      const targetRedirect = searchParams.get('redirect') || '/admin'
      router.replace(targetRedirect)

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred during entry.'
      console.error('Authentication gate error:', message)
      setErrorMsg(message)
      setIsLoading(false)
    }
  }

  if (isCheckingSession) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black min-h-screen">
        <div className="w-6 h-6 border border-gold-800 border-t-transparent animate-spin rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-black min-h-screen px-6 py-12 relative overflow-hidden">
      {/* Visual Restraint Core Grid Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-zinc-950/60 border border-zinc-900 p-8 md:p-10 shadow-2xl relative"
        style={{
          boxShadow: '0 0 40px rgba(212, 175, 55, 0.02)'
        }}
      >
        {/* Sleek Golden Indicator Ring */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>

        {/* Heading */}
        <header className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-serif text-white italic tracking-wide">
            The House Entrance
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-3 font-mono">
            Sovereign Admin Panel
          </p>
        </header>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 border border-red-950/60 bg-red-950/10 text-red-400 text-xs text-center font-medium tracking-wide"
            >
              {errorMsg}
            </motion.div>
          )}

          {/* Email field */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
              Curator Identity (Email)
            </label>
            <input
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="curator@darkeasterner.com"
              className="bg-zinc-900/30 border border-zinc-900 p-3 text-sm text-white placeholder:text-zinc-700 focus:border-gold-500/40 focus:ring-1 focus:ring-gold-500/10 outline-none transition-all duration-300"
            />
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
              Access Cipher (Password)
            </label>
            <input
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-zinc-900/30 border border-zinc-900 p-3 text-sm text-white placeholder:text-zinc-700 focus:border-gold-500/40 focus:ring-1 focus:ring-gold-500/10 outline-none transition-all duration-300"
            />
          </div>

          {/* Sign In CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 border border-gold-800 text-gold-400 bg-transparent hover:bg-gold-500 hover:text-black hover:border-gold-500 font-semibold tracking-widest uppercase text-xs transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none active:scale-[0.98]"
          >
            {isLoading ? 'Entering the House...' : 'Enter the House'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-black min-h-screen">
        <div className="w-6 h-6 border border-gold-800 border-t-transparent animate-spin rounded-full"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}

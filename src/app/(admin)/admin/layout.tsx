"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Products', href: '/admin/products' },
    { label: 'Upload New', href: '/admin/upload' },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 p-6 flex flex-col gap-8">
        <div className="text-xl font-serif italic text-gold-500">House Admin</div>
        <nav className="flex flex-col gap-2">
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
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}

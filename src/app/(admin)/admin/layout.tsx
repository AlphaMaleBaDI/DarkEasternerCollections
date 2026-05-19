import React from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 p-6 flex flex-col gap-8">
        <div className="text-xl font-serif italic text-gold-500">House Admin</div>
        <nav className="flex flex-col gap-2">
          <a href="/admin" className="px-4 py-2 rounded-md bg-zinc-800 text-white transition-colors">
            Dashboard
          </a>
          <a href="/admin/products" className="px-4 py-2 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
            Products
          </a>
          <a href="/admin/upload" className="px-4 py-2 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
            Upload New
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}

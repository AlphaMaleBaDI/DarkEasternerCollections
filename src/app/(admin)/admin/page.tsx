import React from 'react'

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-white">Welcome, Cynthia&apos;s House</h1>
        <p className="text-zinc-400">Manage the House&apos;s digital showroom.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
          <div className="text-zinc-500 text-sm uppercase tracking-wider mb-2">Total Products</div>
          <div className="text-4xl font-light">0</div>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
          <div className="text-zinc-500 text-sm uppercase tracking-wider mb-2">Live Collections</div>
          <div className="text-4xl font-light">4</div>
        </div>
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
          <div className="text-zinc-500 text-sm uppercase tracking-wider mb-2">Drafts</div>
          <div className="text-4xl font-light">0</div>
        </div>
      </div>
    </div>
  )
}

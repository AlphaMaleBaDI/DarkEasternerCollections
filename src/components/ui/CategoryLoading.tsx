import React from 'react'

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Category Header Skeleton */}
      <div className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 overflow-hidden border-b border-zinc-900/10">
        <div className="relative z-10 max-w-5xl w-full">
          {/* Label skeleton */}
          <div className="luxury-shimmer h-4 w-32 mb-4" />
          {/* Title skeleton */}
          <div className="luxury-shimmer h-16 md:h-20 lg:h-24 w-3/4 mb-8" />
          {/* Subtitle skeleton */}
          <div className="space-y-2">
            <div className="luxury-shimmer h-4 w-1/2" />
            <div className="luxury-shimmer h-4 w-1/3" />
          </div>
        </div>
      </div>
      
      {/* Grid List Skeleton */}
      <section className="px-6 md:px-12 lg:px-24 pb-40">
        <div className="mb-24 flex justify-between items-end">
          <div className="flex flex-col gap-2 w-48">
            <div className="luxury-shimmer h-3 w-32" />
            <div className="h-px bg-zinc-800 w-24" />
          </div>
          <div className="hidden md:block w-64">
            <div className="luxury-shimmer h-3 w-48 ml-auto" />
          </div>
        </div>
        
        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="relative overflow-hidden bg-zinc-950 border border-zinc-900/60">
              <div className="relative aspect-[3/4] w-full luxury-shimmer" />
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-2 w-2/3">
                    <div className="luxury-shimmer h-2 w-1/2" />
                    <div className="luxury-shimmer h-5 w-full" />
                  </div>
                  <div className="luxury-shimmer h-4 w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

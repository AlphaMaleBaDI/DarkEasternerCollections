import React from 'react'

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col lg:flex-row">
      {/* Left: Image Shimmer Frame (Sharp) */}
      <div className="relative w-full lg:w-3/5 h-[60vh] lg:min-h-screen luxury-shimmer" />

      {/* Right: Info Shimmer Grid */}
      <div className="relative w-full lg:w-2/5 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-zinc-950">
        <div className="space-y-8 max-w-md w-full">
          {/* Category breadcrumb */}
          <div className="luxury-shimmer h-3 w-24" />
          
          {/* Title */}
          <div className="space-y-3">
            <div className="luxury-shimmer h-12 w-full" />
            <div className="luxury-shimmer h-12 w-2/3" />
          </div>
          
          {/* Line separator */}
          <div className="h-px w-12 bg-zinc-900" />
          
          {/* Description paragraphs */}
          <div className="space-y-3">
            <div className="luxury-shimmer h-4 w-full" />
            <div className="luxury-shimmer h-4 w-11/12" />
            <div className="luxury-shimmer h-4 w-4/5" />
          </div>

          {/* Price or custom detail placeholder */}
          <div className="space-y-2 pt-4">
            <div className="luxury-shimmer h-3 w-16" />
            <div className="luxury-shimmer h-8 w-32" />
          </div>

          {/* CTA Button Skeleton */}
          <div className="pt-8">
            {/* CTA button should be slightly softened according to user corner guidelines */}
            <div className="luxury-shimmer h-14 w-full rounded-sm" />
            <div className="luxury-shimmer h-3 w-48 mx-auto mt-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

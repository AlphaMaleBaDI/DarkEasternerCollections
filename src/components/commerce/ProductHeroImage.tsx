"use client"

import React, { useState } from 'react'
import Image from 'next/image'

interface ProductHeroImageProps {
  src: string
  alt: string
  category?: string
  priority?: boolean
}

export function ProductHeroImage({ src, alt, category, priority = false }: ProductHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [aspectRatio, setAspectRatio] = useState<number | null>(null)

  const getObjectPositionClass = (catName?: string) => {
    const cat = catName?.toLowerCase()
    if (cat === 'hair') return 'object-[center_20%]'
    if (cat === 'men') return 'object-[center_25%]'
    if (cat === 'women') return 'object-[center_25%]'
    if (cat === 'perfumes') return 'object-center'
    return 'object-center'
  }

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget
    if (img.naturalWidth && img.naturalHeight) {
      setAspectRatio(img.naturalWidth / img.naturalHeight)
    }
    setIsLoaded(true)
  }

  // Portrait-ish images (aspectRatio < 0.95 or not loaded yet) use the category crop.
  // Square, landscape, or atypical images fallback to object-center.
  const isPortrait = aspectRatio === null || aspectRatio < 0.95
  const positionClass = isPortrait ? getObjectPositionClass(category) : 'object-center'

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      <Image 
        src={src} 
        alt={alt} 
        fill 
        sizes="(max-width: 1024px) 100vw, 60vw"
        priority={priority}
        onLoad={handleLoad}
        className={`object-cover ${positionClass} transition-all duration-[1500ms] ease-luxury ${
          isLoaded 
            ? 'opacity-90 blur-0 scale-100' 
            : 'opacity-0 blur-md scale-110'
        }`}
      />
    </div>
  )
}

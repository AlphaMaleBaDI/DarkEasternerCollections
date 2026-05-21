"use client"

import React, { useState } from 'react'
import Image from 'next/image'

interface ProductHeroImageProps {
  src: string
  alt: string
  priority?: boolean
}

export function ProductHeroImage({ src, alt, priority = false }: ProductHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      <Image 
        src={src} 
        alt={alt} 
        fill 
        sizes="(max-width: 1024px) 100vw, 60vw"
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className={`object-cover transition-all duration-[1500ms] ease-luxury ${
          isLoaded 
            ? 'opacity-90 blur-0 scale-100' 
            : 'opacity-0 blur-md scale-110'
        }`}
      />
    </div>
  )
}

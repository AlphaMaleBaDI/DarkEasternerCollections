'use client';

import React from 'react';
import Image from 'next/image';

interface BrandCrestProps {
  size?: number;
  className?: string;
}

export const BrandCrest: React.FC<BrandCrestProps> = ({ size = 120, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/icon.jpg"
        alt="Dark Easterner Collections Master Crest"
        fill
        className="object-contain rounded-full"
        priority
      />
    </div>
  );
};

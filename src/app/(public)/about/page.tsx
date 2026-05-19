import React from 'react'
import { Founder } from '@/components/sections/Founder'
import { InstagramFeed } from '@/components/sections/InstagramFeed'

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      <Founder />
      <InstagramFeed />
    </main>
  )
}

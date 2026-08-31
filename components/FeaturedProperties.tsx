'use client'

import { useEffect, useState } from 'react'
import FadeIn from './FadeIn'
import PropertyCard from './PropertyCard'
import { properties as dummyProperties } from '@/lib/dummyData'

type Property = {
  id: number | string
  tag: string
  tagColor: string
  image: string
  price: string
  bhk: string
  location: string
  area: string
}

export default function FeaturedProperties() {
  const [realProperties, setRealProperties] = useState<Property[]>([])

  useEffect(() => {
    fetch('/api/properties/public')
      .then((res) => res.json())
      .then((data) => setRealProperties(data.properties || []))
      .catch(() => {})
  }, [])

  // Show real listings first, fill remaining slots with dummy data, max 4 total
  const combined = [...realProperties, ...dummyProperties].slice(0, 4)

  return (
    <section className="bg-brand-sky/40 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl md:text-2xl font-bold text-brand-slate">
            Featured Properties
          </h2>
          <a href="/search" className="text-sm font-medium text-brand-blue hover:underline">
            View All Properties →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {combined.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1}>
              <PropertyCard property={p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
'use client'

import { useEffect, useState } from 'react'
import PropertyCard from '@/components/PropertyCard'

type SavedItem = {
  id: string
  property: {
    id: string
    title: string
    price: number
    bhk: number | null
    type: string
    city: string
    locality: string
    images: string[]
    status: string
  }
}

export default function SavedPage() {
  const [saved, setSaved] = useState<SavedItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/saved')
      .then((res) => res.json())
      .then((data) => {
        setSaved(data.saved || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const formatted = saved.map((s) => ({
    id: s.property.id,
    tag: s.property.status === 'APPROVED' ? 'Verified' : 'Pending Review',
    tagColor: s.property.status === 'APPROVED' ? 'bg-brand-teal' : 'bg-brand-amber',
    image: s.property.images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    price: `₹${s.property.price.toLocaleString('en-IN')}`,
    bhk: s.property.bhk ? `${s.property.bhk} BHK` : s.property.type,
    location: `${s.property.locality}, ${s.property.city}`,
    area: '—',
  }))

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-xl md:text-2xl font-bold text-brand-slate mb-6">
        Saved Properties
      </h1>

      {loading && <p className="text-gray-500 text-sm">Loading...</p>}

      {!loading && formatted.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
          <p className="text-gray-500">You haven&apos;t saved any properties yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {formatted.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </main>
  )
}
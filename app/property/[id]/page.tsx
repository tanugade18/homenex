'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { properties as dummyProperties } from '@/lib/dummyData'
import { MapPin, Maximize, Heart, Phone, MessageCircle, Share2, Check } from 'lucide-react'
import Image from 'next/image'

type DisplayProperty = {
  id: string
  image: string
  tag: string
  tagColor: string
  price: string
  bhk: string
  location: string
  area: string
  description?: string
}

export default function PropertyDetailsPage() {
  const params = useParams()
  const rawId = params.id as string

  const [property, setProperty] = useState<DisplayProperty | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFoundFlag, setNotFoundFlag] = useState(false)

  const [contacted, setContacted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // If it's a plain number, treat it as dummy data (from homepage/search demo cards)
    if (/^\d+$/.test(rawId)) {
      const dummy = dummyProperties.find((p) => p.id === Number(rawId))
      if (dummy) {
        setProperty({
          id: String(dummy.id),
          image: dummy.image,
          tag: dummy.tag,
          tagColor: dummy.tagColor,
          price: dummy.price,
          bhk: dummy.bhk,
          location: dummy.location,
          area: dummy.area,
        })
      } else {
        setNotFoundFlag(true)
      }
      setLoading(false)
      return
    }

    // Otherwise, it's a real database ID — fetch from API
    fetch(`/api/properties/${rawId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((data) => {
        const p = data.property
        setProperty({
          id: p.id,
          image: p.images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
          tag: p.status === 'APPROVED' ? 'Verified' : 'Pending Review',
          tagColor: p.status === 'APPROVED' ? 'bg-brand-teal' : 'bg-brand-amber',
          price: `₹${p.price.toLocaleString('en-IN')}`,
          bhk: p.bhk ? `${p.bhk} BHK` : p.type,
          location: `${p.locality}, ${p.city}`,
          area: p.carpetArea ? `${p.carpetArea} sq.ft` : '—',
          description: p.description,
        })
        setLoading(false)
      })
      .catch(() => {
        setNotFoundFlag(true)
        setLoading(false)
      })
  }, [rawId])

  if (notFoundFlag) {
    notFound()
  }

  if (loading || !property) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-400">
        Loading property...
      </main>
    )
  }

  const handleContact = async () => {
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          message: 'Interested in this property. Please share more details.',
        }),
      })
      if (res.ok) {
        setContacted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Failed to send lead:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Image + basic info */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        {/* Left: Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
          <Image
            src={property.image}
            alt={property.bhk}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
          <span className={`absolute top-4 left-4 ${property.tagColor} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
            {property.tag}
          </span>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-white/90 rounded-full p-2 hover:bg-white">
              <Heart size={18} className="text-brand-coral" />
            </button>
            <button className="bg-white/90 rounded-full p-2 hover:bg-white">
              <Share2 size={18} className="text-brand-slate" />
            </button>
          </div>
        </div>

        {/* Right: Contact card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 h-fit space-y-4">
          <div>
            <div className="font-display text-2xl font-bold text-brand-slate">
              {property.price}
            </div>
            <div className="text-gray-600 mt-1">{property.bhk}</div>
            <div className="flex items-center gap-1 text-sm text-gray-400 mt-2">
              <MapPin size={14} />
              {property.location}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 border-t border-gray-100 pt-4">
            <Maximize size={16} />
            {property.area}
          </div>

          <div className="space-y-2 pt-2">
            {contacted ? (
              <div className="w-full bg-teal-50 text-brand-teal font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                <Check size={18} />
                Request Sent!
              </div>
            ) : (
              <button
                onClick={handleContact}
                disabled={sending}
                className="w-full bg-brand-blue text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-60"
              >
                <Phone size={18} />
                {sending ? 'Sending...' : 'Contact Owner'}
              </button>
            )}
            {error && <p className="text-xs text-brand-coral text-center">{error}</p>}
            <button className="w-full border border-brand-blue text-brand-blue font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-sky transition">
              <MessageCircle size={18} />
              Chat Now
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6">
        <h2 className="font-display text-lg font-bold text-brand-slate mb-3">
          About this property
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {property.description ||
            `This ${property.bhk.toLowerCase()} is located in ${property.location}, offering ${property.area} of space. A great option for families looking for a comfortable and well-connected home.`}
        </p>
      </div>

      {/* Schedule visit CTA */}
      <div className="mt-6 bg-brand-sky rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-brand-slate">Want to see it in person?</h3>
          <p className="text-sm text-gray-600 mt-1">Schedule a free site visit at your convenience.</p>
        </div>
        <button className="bg-brand-amber text-brand-navy font-semibold px-6 py-3 rounded-xl hover:brightness-105 transition shrink-0">
          Schedule Site Visit
        </button>
      </div>
    </main>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { MapPin, Check, X } from 'lucide-react'

const ADMIN_EMAILS = ['homenexestate@gmail.com', 'tanuja.webcreators@gmail.com']
type Property = {
  id: string
  title: string
  price: number
  city: string
  locality: string
  status: string
  images: string[]
  owner: { name: string; email: string }
}

export default function AdminPropertiesPage() {
  const { user, isLoaded } = useUser()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  const isAdmin = user?.primaryEmailAddress?.emailAddress
    ? ADMIN_EMAILS.includes(user.primaryEmailAddress.emailAddress)
    : false

  useEffect(() => {
    if (isAdmin) {
      fetch('/api/admin/properties')
        .then((res) => res.json())
        .then((data) => {
          setProperties(data.properties || [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else if (isLoaded) {
      setLoading(false)
    }
  }, [isAdmin, isLoaded])

  const updateStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    await fetch(`/api/admin/properties/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setProperties((prev) => prev.filter((p) => p.id !== id))
  }

  if (isLoaded && !isAdmin) {
    return (
      <main className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">You don&apos;t have access to this page.</p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-xl md:text-2xl font-bold text-brand-slate mb-6">
        Pending Property Approvals
      </h1>

      {loading && <p className="text-gray-500 text-sm">Loading...</p>}
      {!loading && properties.length === 0 && (
        <p className="text-gray-500 text-sm">No properties pending review.</p>
      )}

      <div className="space-y-4">
        {properties.map((p) => (
          <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-40 h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
              {p.images[0] ? (
                <Image src={p.images[0]} alt={p.title} fill sizes="160px" className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No photo</div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-brand-slate">{p.title}</h3>
              <div className="text-brand-blue font-bold mt-1">₹{p.price.toLocaleString('en-IN')}</div>
              <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                <MapPin size={14} />
                {p.locality}, {p.city}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Posted by {p.owner.name} ({p.owner.email})
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => updateStatus(p.id, 'APPROVED')}
                  className="flex items-center gap-1 bg-teal-50 text-brand-teal text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-teal-100"
                >
                  <Check size={14} />
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(p.id, 'REJECTED')}
                  className="flex items-center gap-1 bg-red-50 text-brand-coral text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-100"
                >
                  <X size={14} />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
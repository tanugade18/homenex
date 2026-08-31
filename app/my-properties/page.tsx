'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Plus, Clock, CheckCircle2, XCircle } from 'lucide-react'

type Property = {
  id: string
  title: string
  price: number
  city: string
  locality: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
  images: string[]
  createdAt: string
}

const statusConfig = {
  PENDING: { label: 'Under Review', color: 'bg-amber-50 text-brand-amber', icon: Clock },
  APPROVED: { label: 'Live', color: 'bg-teal-50 text-brand-teal', icon: CheckCircle2 },
  REJECTED: { label: 'Rejected', color: 'bg-red-50 text-brand-coral', icon: XCircle },
  SUSPENDED: { label: 'Suspended', color: 'bg-gray-100 text-gray-500', icon: XCircle },
}

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-brand-slate">
          My Properties
        </h1>
        <Link
          href="/post-property"
          className="flex items-center gap-1.5 bg-brand-blue text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:brightness-110 transition"
        >
          <Plus size={16} />
          Post New Property
        </Link>
      </div>

      {loading && <p className="text-gray-500 text-sm">Loading your properties...</p>}

      {!loading && properties.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
          <p className="text-gray-500">You haven&apos;t posted any properties yet.</p>
          <Link
            href="/post-property"
            className="inline-block mt-4 bg-brand-amber text-brand-navy font-semibold px-5 py-2.5 rounded-xl"
          >
            Post Your First Property
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {properties.map((p) => {
          const status = statusConfig[p.status]
          const StatusIcon = status.icon
          return (
            <Link
              key={p.id}
              href={`/property/${p.id}`}
              className="block bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition"
            >
              <div className="relative w-full sm:w-40 h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                {p.images[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                    No photo
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-brand-slate">{p.title}</h3>
                  <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${status.color}`}>
                    <StatusIcon size={12} />
                    {status.label}
                  </span>
                </div>
                <div className="text-brand-blue font-bold mt-1">₹{p.price.toLocaleString('en-IN')}</div>
                <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                  <MapPin size={14} />
                  {p.locality}, {p.city}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Mail, Phone, Calendar } from 'lucide-react'

type Visit = {
  id: string
  scheduledAt: string
  status: string
  property: { title: string; city: string; locality: string }
  user: { name: string; email: string; phone: string | null }
}

export default function SiteVisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/site-visits')
      .then((res) => res.json())
      .then((data) => {
        setVisits(data.visits || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-xl md:text-2xl font-bold text-brand-slate mb-6">
        Site Visit Requests
      </h1>

      {loading && <p className="text-gray-500 text-sm">Loading visit requests...</p>}

      {!loading && visits.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
          <p className="text-gray-500">No visit requests yet.</p>
        </div>
      )}

      <div className="space-y-4">
        {visits.map((v) => (
          <div key={v.id} className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-brand-slate">{v.user.name}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Mail size={14} />
                    {v.user.email}
                  </span>
                  {v.user.phone && (
                    <span className="flex items-center gap-1">
                      <Phone size={14} />
                      {v.user.phone}
                    </span>
                  )}
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs font-medium bg-brand-sky text-brand-blue px-2.5 py-1 rounded-full shrink-0">
                <Calendar size={12} />
                {new Date(v.scheduledAt).toLocaleString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-sm font-medium text-brand-slate">{v.property.title}</div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <MapPin size={12} />
                {v.property.locality}, {v.property.city}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
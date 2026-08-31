'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Mail, Phone, Clock } from 'lucide-react'

type Lead = {
  id: string
  message: string | null
  createdAt: string
  property: { id: string; title: string; price: number; city: string; locality: string }
  user: { name: string; email: string; phone: string | null }
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.leads || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-xl md:text-2xl font-bold text-brand-slate mb-6">
        Leads
      </h1>

      {loading && <p className="text-gray-500 text-sm">Loading leads...</p>}

      {!loading && leads.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
          <p className="text-gray-500">No leads yet. Once buyers show interest in your properties, they&apos;ll appear here.</p>
        </div>
      )}

      <div className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-brand-slate">{lead.user.name}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Mail size={14} />
                    {lead.user.email}
                  </span>
                  {lead.user.phone && (
                    <span className="flex items-center gap-1">
                      <Phone size={14} />
                      {lead.user.phone}
                    </span>
                  )}
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                <Clock size={12} />
                {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <Link
                href={`/property/${lead.property.id}`}
                className="text-sm font-medium text-brand-blue hover:underline"
              >
                {lead.property.title}
              </Link>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <MapPin size={12} />
                {lead.property.locality}, {lead.property.city} · ₹{lead.property.price.toLocaleString('en-IN')}
              </div>
            </div>

            {lead.message && (
              <p className="mt-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                &quot;{lead.message}&quot;
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
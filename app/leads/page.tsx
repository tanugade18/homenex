'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Mail, Phone, Clock } from 'lucide-react'

type Lead = {
  id: string
  message: string | null
  status: string
  notes: string | null
  createdAt: string
  property: { id: string; title: string; price: number; city: string; locality: string }
  user: { name: string; email: string; phone: string | null }
}

const statusOptions = ['NEW', 'CONTACTED', 'VISIT_SCHEDULED', 'NEGOTIATION', 'CLOSED', 'LOST']

const statusColors: Record<string, string> = {
  NEW: 'bg-brand-sky text-brand-blue',
  CONTACTED: 'bg-amber-50 text-brand-amber',
  VISIT_SCHEDULED: 'bg-purple-50 text-purple-600',
  NEGOTIATION: 'bg-orange-50 text-orange-600',
  CLOSED: 'bg-teal-50 text-brand-teal',
  LOST: 'bg-red-50 text-brand-coral',
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.leads || [])
        const drafts: Record<string, string> = {}
        ;(data.leads || []).forEach((l: Lead) => {
          drafts[l.id] = l.notes || ''
        })
        setNotesDraft(drafts)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const updateLead = async (id: string, data: { status?: string; notes?: string }) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, ...data } : l))
        )
      }
    } catch (err) {
      console.error('Failed to update lead:', err)
    }
  }

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

            {/* Status + Notes management */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Status</label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => updateLead(lead.id, { status: opt })}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full transition ${
                        lead.status === opt
                          ? statusColors[opt]
                          : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {opt.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Notes</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={notesDraft[lead.id] ?? ''}
                    onChange={(e) =>
                      setNotesDraft((prev) => ({ ...prev, [lead.id]: e.target.value }))
                    }
                    placeholder="Add a follow-up note..."
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
                  />
                  <button
                    onClick={() => updateLead(lead.id, { notes: notesDraft[lead.id] })}
                    className="text-xs font-medium bg-brand-blue text-white px-3 py-1.5 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
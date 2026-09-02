'use client'

import { useState } from 'react'
import {
  Truck,
  Sparkles,
  PaintBucket,
  Sofa,
  Zap,
  Wrench,
  Bug,
  ClipboardCheck,
  Check,
} from 'lucide-react'

const services = [
  { id: 'PACKERS_MOVERS', label: 'Packers & Movers', icon: Truck },
  { id: 'CLEANING', label: 'Home Cleaning', icon: Sparkles },
  { id: 'PAINTING', label: 'Painting', icon: PaintBucket },
  { id: 'INTERIOR_DESIGN', label: 'Interior Design', icon: Sofa },
  { id: 'ELECTRICAL', label: 'Electrical Work', icon: Zap },
  { id: 'PLUMBING', label: 'Plumbing', icon: Wrench },
  { id: 'PEST_CONTROL', label: 'Pest Control', icon: Bug },
  { id: 'PROPERTY_INSPECTION', label: 'Property Inspection', icon: ClipboardCheck },
]

export default function ServicesPage() {
  const [selected, setSelected] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    if (!selected || !city || !phone) return
    setSending(true)
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceType: selected, city, phone, notes }),
      })
      if (res.ok) setSent(true)
    } catch (err) {
      console.error('Failed to submit service request:', err)
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <main className="max-w-lg mx-auto px-4 py-20 text-center">
        <Check size={48} className="text-brand-teal mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-brand-slate">Request Received!</h1>
        <p className="text-gray-500 mt-2">
          Our team will connect you with a verified service provider shortly.
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-brand-slate mb-1">Home Services</h1>
      <p className="text-gray-500 mb-6">Moving in, moving out, or need a repair? We'll connect you with trusted local professionals.</p>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-brand-slate mb-2 block">What do you need?</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {services.map((s) => {
              const Icon = s.icon
              const isActive = selected === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition ${
                    isActive ? 'border-brand-blue bg-brand-sky' : 'border-gray-200 hover:border-brand-blue/40'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-brand-blue' : 'text-gray-500'} />
                  <span className="text-xs text-center text-brand-slate">{s.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-brand-slate mb-1.5 block">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Mumbai"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-brand-slate mb-1.5 block">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-brand-slate mb-1.5 block">Additional Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Any specific requirements..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selected || !city || !phone || sending}
          className="w-full bg-brand-blue text-white font-semibold py-3 rounded-xl disabled:opacity-50"
        >
          {sending ? 'Submitting...' : 'Request Service'}
        </button>
      </div>
    </main>
  )
}
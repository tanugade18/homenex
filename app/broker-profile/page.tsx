'use client'

import { useEffect, useState } from 'react'
import { User, Phone, Briefcase, MapPin, FileText, Check } from 'lucide-react'

export default function BrokerProfilePage() {
  const [form, setForm] = useState({
    phone: '',
    experience: '',
    specialization: '',
    areasCovered: '',
    bio: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setForm({
            phone: data.profile.phone || '',
            experience: data.profile.experience?.toString() || '',
            specialization: data.profile.specialization || '',
            areasCovered: data.profile.areasCovered || '',
            bio: data.profile.bio || '',
          })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSaved(true)
    } catch (err) {
      console.error('Failed to save profile:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <main className="max-w-2xl mx-auto px-4 py-16 text-center text-gray-400">Loading...</main>
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display text-xl md:text-2xl font-bold text-brand-slate mb-6">
        Broker Profile
      </h1>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-brand-slate flex items-center gap-1.5 mb-1.5">
            <Phone size={14} /> Phone Number
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-brand-slate flex items-center gap-1.5 mb-1.5">
            <Briefcase size={14} /> Years of Experience
          </label>
          <input
            type="number"
            value={form.experience}
            onChange={(e) => update('experience', e.target.value)}
            placeholder="e.g. 5"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-brand-slate flex items-center gap-1.5 mb-1.5">
            <User size={14} /> Specialization
          </label>
          <input
            type="text"
            value={form.specialization}
            onChange={(e) => update('specialization', e.target.value)}
            placeholder="e.g. Residential, Commercial, Luxury Homes"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-brand-slate flex items-center gap-1.5 mb-1.5">
            <MapPin size={14} /> Areas Covered
          </label>
          <input
            type="text"
            value={form.areasCovered}
            onChange={(e) => update('areasCovered', e.target.value)}
            placeholder="e.g. Andheri, Bandra, Powai"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-brand-slate flex items-center gap-1.5 mb-1.5">
            <FileText size={14} /> About You
          </label>
          <textarea
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
            rows={4}
            placeholder="Tell customers about your experience and approach..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-brand-blue text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-60"
        >
          {saved ? <Check size={18} /> : null}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Profile'}
        </button>
      </div>
    </main>
  )
}
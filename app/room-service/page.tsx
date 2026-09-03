'use client'

import { useEffect, useState } from 'react'
import {
  Sparkles,
  Wrench,
  Sofa,
  X,
  MapPin,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Smartphone,
} from 'lucide-react'
import Link from 'next/link'
import RoomServiceSidebar from '@/components/RoomServiceSidebar'
import { serviceCategories, statusLabels, statusStages } from '@/lib/roomServiceCatalog'

type RoomServiceRequest = {
  id: string
  category: string
  subService: string
  status: string
  address: string
  notes: string | null
  scheduledDate: string | null
  createdAt: string
  technicianName: string | null
  technicianRating: number | null
}

const categoryStyles: Record<string, { icon: typeof Sparkles; bg: string; color: string }> = {
  CLEANING_HOUSEKEEPING: { icon: Sparkles, bg: 'bg-brand-sky', color: 'text-brand-blue' },
  ON_DEMAND_REPAIR: { icon: Wrench, bg: 'bg-teal-50', color: 'text-brand-teal' },
  CONCIERGE_LIFESTYLE: { icon: Sofa, bg: 'bg-purple-50', color: 'text-purple-600' },
}

export default function RoomServicePage() {
  const [requests, setRequests] = useState<RoomServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [form, setForm] = useState({ subService: '', address: '', notes: '', scheduledDate: '' })
  const [submitting, setSubmitting] = useState(false)

  const loadRequests = () => {
    fetch('/api/room-services')
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.requests || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    loadRequests()
  }, [])

  const activeRequests = requests.filter((r) =>
    ['RECEIVED', 'ASSIGNED', 'ON_THE_WAY', 'IN_PROGRESS'].includes(r.status)
  )
  const scheduledCount = requests.filter((r) => r.scheduledDate && r.status !== 'COMPLETED').length
  const openMaintenanceCount = requests.filter(
    (r) => r.category === 'ON_DEMAND_REPAIR' && r.status !== 'COMPLETED'
  ).length
  const completedCount = requests.filter((r) => r.status === 'COMPLETED').length

  const openBooking = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setForm({ subService: '', address: '', notes: '', scheduledDate: '' })
    setBookingOpen(true)
  }

  const handleSubmit = async () => {
    if (!selectedCategory || !form.subService || !form.address) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/room-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory, ...form }),
      })
      if (res.ok) {
        setBookingOpen(false)
        loadRequests()
      }
    } catch (err) {
      console.error('Failed to submit request:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const activeCategory = serviceCategories.find((c) => c.id === selectedCategory)
  const mostRecentActive = activeRequests[0]

  return (
    <div className="flex">
      <RoomServiceSidebar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold text-brand-slate">
              Room Service Hub
            </h1>
            <p className="text-gray-500 text-sm">All your home services at one place.</p>
          </div>
          <Link
            href="/my-properties"
            className="hidden sm:flex items-center gap-1.5 border border-gray-200 text-brand-slate text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-50"
          >
            My Property
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="text-xl font-bold text-brand-blue">
              {String(activeRequests.length).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Active Services</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="text-xl font-bold text-brand-teal">
              {String(scheduledCount).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Scheduled</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="text-xl font-bold text-brand-amber">
              {String(openMaintenanceCount).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Open Maintenance</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="text-xl font-bold text-purple-600">
              {String(completedCount).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Completed</div>
          </div>
        </div>

        <h2 className="font-display font-bold text-brand-slate mb-3">Service Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {serviceCategories.map((cat) => {
            const style = categoryStyles[cat.id]
            const Icon = style.icon
            return (
              <div key={cat.id} className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center mb-3`}>
                  <Icon size={20} className={style.color} />
                </div>
                <h3 className="font-semibold text-brand-slate text-sm">{cat.label}</h3>
                <p className="text-xs text-gray-500 mt-1 mb-3">{cat.description}</p>
                <ul className="text-xs text-gray-400 space-y-1 mb-4">
                  {cat.subServices.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <button
                  onClick={() => openBooking(cat.id)}
                  className="w-full bg-brand-blue text-white text-sm font-semibold py-2 rounded-xl hover:brightness-110 transition"
                >
                  Book Service
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-brand-slate">Service Request Dashboard</h2>
          <span className="text-xs text-brand-blue">View All Requests</span>
        </div>

        {loading && <p className="text-gray-500 text-sm">Loading...</p>}
        {!loading && requests.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-gray-500 text-sm mb-6">
            No service requests yet. Book one above to get started.
          </div>
        )}

        {mostRecentActive && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="font-semibold text-brand-slate text-sm">{mostRecentActive.subService}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                  <MapPin size={12} />
                  {mostRecentActive.address}
                </div>
              </div>
              <span className="text-xs font-medium bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full shrink-0">
                {statusLabels[mostRecentActive.status]}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4 px-1">
              {statusStages.map((stage, i) => {
                const currentIndex = statusStages.indexOf(mostRecentActive.status)
                const isDone = i <= currentIndex
                return (
                  <div key={stage} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center gap-1">
                      {isDone ? (
                        <CheckCircle2 size={20} className="text-brand-teal" />
                      ) : (
                        <Circle size={20} className="text-gray-300" />
                      )}
                      <span
                        className={
                          isDone
                            ? 'text-[10px] text-center text-brand-slate font-medium'
                            : 'text-[10px] text-center text-gray-400'
                        }
                      >
                        {statusLabels[stage]}
                      </span>
                    </div>
                    {i < statusStages.length - 1 && (
                      <div
                        className={
                          i < currentIndex
                            ? 'flex-1 h-0.5 mx-1 mb-4 bg-brand-teal'
                            : 'flex-1 h-0.5 mx-1 mb-4 bg-gray-200'
                        }
                      />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="bg-brand-sky/40 rounded-xl p-4 flex items-center gap-3">
              <Clock size={18} className="text-brand-blue shrink-0" />
              <p className="text-xs text-gray-600">
                A technician will be assigned shortly. Live tracking and technician details will appear here once assigned.
              </p>
            </div>
          </div>
        )}

        <div className="bg-brand-sky rounded-2xl p-5 flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
            <Smartphone size={18} className="text-brand-blue" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-brand-slate text-sm">Need something fixed or cleaned?</h3>
            <p className="text-xs text-gray-500">Raise a new service request and we will take care of the rest.</p>
          </div>
          <button
            onClick={() => openBooking('ON_DEMAND_REPAIR')}
            className="bg-brand-blue text-white text-sm font-semibold px-4 py-2 rounded-xl shrink-0 hover:brightness-110 transition"
          >
            Raise New Request
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h3 className="text-xs font-semibold text-brand-blue mb-4">ROOM SERVICE FLOW</h3>
          <div className="flex items-center justify-between overflow-x-auto gap-2">
            {[
              { icon: MapPin, label: 'Select Category' },
              { icon: Wrench, label: 'Choose Service' },
              { icon: Calendar, label: 'Pick Date & Time' },
              { icon: CheckCircle2, label: 'Confirm Price' },
              { icon: Sparkles, label: 'Track Professional' },
            ].map((step, i, arr) => {
              const Icon = step.icon
              return (
                <div key={step.label} className="flex items-center shrink-0">
                  <div className="flex flex-col items-center gap-1.5 w-24">
                    <div className="w-9 h-9 rounded-full bg-brand-sky flex items-center justify-center">
                      <Icon size={16} className="text-brand-blue" />
                    </div>
                    <span className="text-[10px] text-gray-500 text-center">{step.label}</span>
                  </div>
                  {i < arr.length - 1 && <div className="w-8 h-px bg-gray-200 mx-1" />}
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {bookingOpen && activeCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-brand-slate">{activeCategory.label}</h3>
              <button onClick={() => setBookingOpen(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Select service</label>
                <div className="grid grid-cols-1 gap-2">
                  {activeCategory.subServices.map((s) => (
                    <button
                      key={s}
                      onClick={() => setForm((prev) => ({ ...prev, subService: s }))}
                      className={
                        form.subService === s
                          ? 'text-left px-3 py-2 rounded-xl border-2 text-sm border-brand-blue bg-brand-sky'
                          : 'text-left px-3 py-2 rounded-xl border-2 text-sm border-gray-200'
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
              />

              <input
                type="date"
                value={form.scheduledDate}
                onChange={(e) => setForm((prev) => ({ ...prev, scheduledDate: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
              />

              <textarea
                placeholder="Additional notes (optional)"
                value={form.notes}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue resize-none"
              />

              <button
                onClick={handleSubmit}
                disabled={!form.subService || !form.address || submitting}
                className="w-full bg-brand-blue text-white font-semibold py-3 rounded-xl disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Confirm Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
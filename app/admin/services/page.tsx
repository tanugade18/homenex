'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Phone, MapPin, Clock } from 'lucide-react'

const ADMIN_EMAILS = ['homenexestate@gmail.com']

type ServiceRequest = {
  id: string
  serviceType: string
  city: string
  phone: string
  notes: string | null
  status: string
  createdAt: string
  user: { name: string; email: string }
}

const serviceLabels: Record<string, string> = {
  PACKERS_MOVERS: 'Packers & Movers',
  CLEANING: 'Home Cleaning',
  PAINTING: 'Painting',
  INTERIOR_DESIGN: 'Interior Design',
  ELECTRICAL: 'Electrical Work',
  PLUMBING: 'Plumbing',
  PEST_CONTROL: 'Pest Control',
  PROPERTY_INSPECTION: 'Property Inspection',
}

export default function AdminServicesPage() {
  const { user, isLoaded } = useUser()
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)

  const isAdmin = user?.primaryEmailAddress?.emailAddress
    ? ADMIN_EMAILS.includes(user.primaryEmailAddress.emailAddress)
    : false

  useEffect(() => {
    if (isAdmin) {
      fetch('/api/services')
        .then((res) => res.json())
        .then((data) => {
          setRequests(data.requests || [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else if (isLoaded) {
      setLoading(false)
    }
  }, [isAdmin, isLoaded])

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
        Service Requests
      </h1>

      {loading && <p className="text-gray-500 text-sm">Loading...</p>}
      {!loading && requests.length === 0 && (
        <p className="text-gray-500 text-sm">No service requests yet.</p>
      )}

      <div className="space-y-4">
        {requests.map((r) => (
          <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-brand-slate">
                  {serviceLabels[r.serviceType] || r.serviceType}
                </h3>
                <div className="text-sm text-gray-500 mt-1">{r.user.name} ({r.user.email})</div>
              </div>
              <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                <Clock size={12} />
                {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {r.city}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={14} />
                {r.phone}
              </span>
            </div>

            {r.notes && (
              <p className="mt-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-3">{r.notes}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
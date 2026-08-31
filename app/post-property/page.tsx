'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary'
import { MapPin, Home, Building2, Users, Trees, Briefcase, IndianRupee, Image as ImageIcon, Check } from 'lucide-react'

const propertyTypes = [
  { id: 'BUY', label: 'Buy', icon: Home },
  { id: 'RENT', label: 'Rent', icon: Building2 },
  { id: 'PG', label: 'PG / Co-living', icon: Users },
  { id: 'PLOT', label: 'Plot / Land', icon: Trees },
  { id: 'COMMERCIAL', label: 'Commercial', icon: Briefcase },
]

const steps = ['Location', 'Property Type', 'Price & Details', 'Photos']

export default function PostPropertyPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    city: '',
    locality: '',
    address: '',
    type: '',
    title: '',
    description: '',
    price: '',
    bhk: '',
    carpetArea: '',
    images: [] as string[],
  })

  const update = (field: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    if (step === 0) return form.city.trim() && form.locality.trim()
    if (step === 1) return form.type !== ''
    if (step === 2) return form.title.trim() && form.price.trim()
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          bhk: form.bhk ? Number(form.bhk) : null,
          carpetArea: form.carpetArea ? Number(form.carpetArea) : null,
        }),
      })
      if (res.ok) {
        router.push('/post-property/success')
      }
    } catch (err) {
      console.error('Failed to submit property:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={`h-1.5 rounded-full ${
                i <= step ? 'bg-brand-blue' : 'bg-gray-200'
              }`}
            />
            <div className="text-xs mt-1.5 text-gray-500">{s}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8">
        {/* Step 0: Location */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-brand-slate flex items-center gap-2">
              <MapPin size={22} className="text-brand-blue" />
              Where is your property?
            </h2>
            <input
              type="text"
              placeholder="City (e.g. Mumbai)"
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-blue"
            />
            <input
              type="text"
              placeholder="Locality (e.g. Andheri West)"
              value={form.locality}
              onChange={(e) => update('locality', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-blue"
            />
            <input
              type="text"
              placeholder="Full address (optional)"
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-blue"
            />
          </div>
        )}

        {/* Step 1: Property Type */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-brand-slate">
              What type of property is this?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {propertyTypes.map((t) => {
                const Icon = t.icon
                const isActive = form.type === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => update('type', t.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition ${
                      isActive
                        ? 'border-brand-blue bg-brand-sky'
                        : 'border-gray-200 hover:border-brand-blue/40'
                    }`}
                  >
                    <Icon size={22} className={isActive ? 'text-brand-blue' : 'text-gray-500'} />
                    <span className="text-sm font-medium text-brand-slate">{t.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 2: Price & Details */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-brand-slate flex items-center gap-2">
              <IndianRupee size={22} className="text-brand-blue" />
              Price & Details
            </h2>
            <input
              type="text"
              placeholder="Property title (e.g. Spacious 2 BHK near station)"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-blue"
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={form.price}
              onChange={(e) => update('price', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-blue"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="BHK (e.g. 2)"
                value={form.bhk}
                onChange={(e) => update('bhk', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-blue"
              />
              <input
                type="number"
                placeholder="Carpet area (sq.ft)"
                value={form.carpetArea}
                onChange={(e) => update('carpetArea', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-blue resize-none"
            />
          </div>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-brand-slate flex items-center gap-2">
              <ImageIcon size={22} className="text-brand-blue" />
              Add Photos
            </h2>

            <CldUploadWidget
              uploadPreset="homenex_properties"
              onSuccess={(result) => {
                const info = result.info as { secure_url: string }
                update('images', [...form.images, info.secure_url])
              }}
            >
              {({ open }) => (
                <button
                  onClick={() => open()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl py-8 text-sm text-gray-500 hover:border-brand-blue hover:text-brand-blue transition"
                >
                  + Upload Photos
                </button>
              )}
            </CldUploadWidget>

            {form.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {form.images.map((url) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={url} src={url} alt="Uploaded" className="rounded-lg h-24 w-full object-cover" />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="text-sm text-gray-500 disabled:opacity-0"
          >
            ← Back
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="bg-brand-blue text-white font-semibold text-sm px-6 py-2.5 rounded-xl disabled:opacity-40"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-brand-amber text-brand-navy font-semibold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 disabled:opacity-60"
            >
              <Check size={16} />
              {submitting ? 'Submitting...' : 'Submit Property'}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
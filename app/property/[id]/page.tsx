import { properties } from '@/lib/dummyData'
import { MapPin, Maximize, Heart, Phone, MessageCircle, Share2 } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = properties.find((p) => p.id === Number(id))

  if (!property) {
    notFound()
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Image + basic info */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        {/* Left: Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
          <Image
            src={property.image}
            alt={property.bhk}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
          <span className={`absolute top-4 left-4 ${property.tagColor} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
            {property.tag}
          </span>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-white/90 rounded-full p-2 hover:bg-white">
              <Heart size={18} className="text-brand-coral" />
            </button>
            <button className="bg-white/90 rounded-full p-2 hover:bg-white">
              <Share2 size={18} className="text-brand-slate" />
            </button>
          </div>
        </div>

        {/* Right: Contact card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 h-fit space-y-4">
          <div>
            <div className="font-display text-2xl font-bold text-brand-slate">
              {property.price}
            </div>
            <div className="text-gray-600 mt-1">{property.bhk}</div>
            <div className="flex items-center gap-1 text-sm text-gray-400 mt-2">
              <MapPin size={14} />
              {property.location}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 border-t border-gray-100 pt-4">
            <Maximize size={16} />
            {property.area}
          </div>

          <div className="space-y-2 pt-2">
            <button className="w-full bg-brand-blue text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition">
              <Phone size={18} />
              Contact Owner
            </button>
            <button className="w-full border border-brand-blue text-brand-blue font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-sky transition">
              <MessageCircle size={18} />
              Chat Now
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6">
        <h2 className="font-display text-lg font-bold text-brand-slate mb-3">
          About this property
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          This {property.bhk.toLowerCase()} is located in {property.location}, offering{' '}
          {property.area} of space. A great option for families looking for a comfortable
          and well-connected home. Schedule a visit today to explore this property in person.
        </p>
      </div>

      {/* Schedule visit CTA */}
      <div className="mt-6 bg-brand-sky rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-brand-slate">Want to see it in person?</h3>
          <p className="text-sm text-gray-600 mt-1">Schedule a free site visit at your convenience.</p>
        </div>
        <button className="bg-brand-amber text-brand-navy font-semibold px-6 py-3 rounded-xl hover:brightness-105 transition shrink-0">
          Schedule Site Visit
        </button>
      </div>
    </main>
  )
}
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Maximize } from 'lucide-react'

type Property = {
  id: number | string
  tag: string
  tagColor: string
  image: string
  price: string
  bhk: string
  location: string
  area: string
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/property/${property.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group h-full">
        <div className="relative h-44 w-full">
          <Image
            src={property.image}
            alt={property.bhk}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          <span className={`absolute top-3 left-3 ${property.tagColor} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
            {property.tag}
          </span>
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 hover:bg-white"
          >
            <Heart size={16} className="text-brand-coral" />
          </button>
        </div>

        <div className="p-4">
          <div className="font-display font-bold text-brand-slate text-base">
            {property.price}
          </div>
          <div className="text-sm text-gray-600 mt-1">{property.bhk}</div>

          <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
            <MapPin size={14} />
            {property.location}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Maximize size={14} />
              {property.area}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
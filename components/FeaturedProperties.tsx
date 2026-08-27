import Image from 'next/image'
import { Heart, MapPin, BedDouble, Maximize } from 'lucide-react'
import FadeIn from './FadeIn'
const properties = [
  {
    id: 1,
    tag: 'Verified',
    tagColor: 'bg-brand-teal',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    price: '₹72 L - ₹1.85 Cr',
    bhk: '2, 3 & 4 BHK Apartments',
    location: 'Multiple Locations',
    area: '1,100 - 2,300 sq.ft',
  },
  {
    id: 2,
    tag: 'Premium',
    tagColor: 'bg-purple-600',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    price: '₹55 L - ₹90 L',
    bhk: '2 & 3 BHK Apartments',
    location: 'Multiple Locations',
    area: '990 - 1,450 sq.ft',
  },
  {
    id: 3,
    tag: 'Open House',
    tagColor: 'bg-brand-amber',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    price: '₹1.10 Cr - ₹2.10 Cr',
    bhk: '3 & 4 BHK Luxury Homes',
    location: 'Multiple Locations',
    area: '2,000 - 3,600 sq.ft',
  },
  {
    id: 4,
    tag: 'New Launch',
    tagColor: 'bg-brand-coral',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    price: '₹35 L - ₹70 L',
    bhk: '1 & 2 BHK Apartments',
    location: 'Multiple Locations',
    area: '600 - 1,000 sq.ft',
  },
]

export default function FeaturedProperties() {
  return (
    <section className="bg-brand-sky/40 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl md:text-2xl font-bold text-brand-slate">
            Featured Properties
          </h2>
          <button className="text-sm font-medium text-brand-blue hover:underline">
            View All Properties →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
  {properties.map((p, i) => (
    <FadeIn key={p.id} delay={i * 0.1}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group h-full">
        <div className="relative h-44 w-full">
          <Image
            src={p.image}
            alt={p.bhk}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          <span className={`absolute top-3 left-3 ${p.tagColor} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
            {p.tag}
          </span>
          <button className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 hover:bg-white">
            <Heart size={16} className="text-brand-coral" />
          </button>
        </div>

        <div className="p-4">
          <div className="font-display font-bold text-brand-slate text-base">
            {p.price}
          </div>
          <div className="text-sm text-gray-600 mt-1">{p.bhk}</div>

          <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
            <MapPin size={14} />
            {p.location}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Maximize size={14} />
              {p.area}
            </span>
          </div>
        </div>
      </div>
    </FadeIn>
  ))}
</div>
      </div>
    </section>
  )
}
import FadeIn from './FadeIn'
import { Building, Home, Bed, Briefcase, Building2, Trees, Factory, Gem } from 'lucide-react'

const categories = [
  { label: 'Buy', sub: 'Residential', icon: Building, bg: 'bg-brand-sky', color: 'text-brand-blue' },
  { label: 'Rent', sub: 'Residential', icon: Home, bg: 'bg-teal-50', color: 'text-brand-teal' },
  { label: 'PG / Co-living', sub: 'For Everyone', icon: Bed, bg: 'bg-orange-50', color: 'text-brand-amber' },
  { label: 'Commercial', sub: 'Office Spaces', icon: Briefcase, bg: 'bg-brand-sky', color: 'text-brand-blue' },
  { label: 'New Projects', sub: 'By Top Builders', icon: Building2, bg: 'bg-red-50', color: 'text-brand-coral' },
  { label: 'Plots / Land', sub: 'For Sale', icon: Trees, bg: 'bg-teal-50', color: 'text-brand-teal' },
  { label: 'Industrial', sub: 'Sheds & Warehouses', icon: Factory, bg: 'bg-orange-50', color: 'text-brand-amber' },
  { label: 'Luxury Homes', sub: 'Premium Living', icon: Gem, bg: 'bg-purple-50', color: 'text-purple-600' },
]

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <FadeIn>
        <h2 className="font-display text-xl md:text-2xl font-bold text-brand-slate mb-6">
          Explore by Category
        </h2>
      </FadeIn>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {categories.map((cat, i) => {
          const Icon = cat.icon
          return (
            <FadeIn key={cat.label} delay={i * 0.05}>
              <button className="w-full flex flex-col items-center gap-2 p-4 md:p-5 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center ${cat.bg}`}>
                  <Icon size={22} className={cat.color} />
                </div>
                <div className="text-center">
                  <div className="text-sm md:text-base font-semibold text-brand-slate">{cat.label}</div>
                  <div className="text-xs text-gray-400">{cat.sub}</div>
                </div>
              </button>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
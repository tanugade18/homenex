import FadeIn from './FadeIn'
import PropertyCard from './PropertyCard'
import { properties } from '@/lib/dummyData'

export default function FeaturedProperties() {
  const featured = properties.slice(0, 4)

  return (
    <section className="bg-brand-sky/40 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl md:text-2xl font-bold text-brand-slate">
            Featured Properties
          </h2>
          <a href="/search" className="text-sm font-medium text-brand-blue hover:underline">
            View All Properties →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1}>
              <PropertyCard property={p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
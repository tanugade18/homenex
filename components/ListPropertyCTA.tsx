import { Building2 } from 'lucide-react'
import FadeIn from './FadeIn'

export default function ListPropertyCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-12 md:pb-16">
      <FadeIn>
        <div className="relative overflow-hidden bg-brand-sky rounded-3xl px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* decorative icon pattern */}
          <div className="absolute -right-6 -top-6 opacity-10">
            <Building2 size={160} className="text-brand-blue" />
          </div>

          <div className="relative text-center md:text-left">
            <h3 className="font-display text-xl md:text-2xl font-bold text-brand-slate">
              List Your Property for Free
            </h3>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              Reach thousands of genuine buyers and tenants across India.
            </p>
          </div>

          <button className="relative shrink-0 bg-brand-amber text-brand-navy font-semibold px-6 py-3 rounded-xl hover:brightness-105 transition">
            Post Property Now
          </button>
        </div>
      </FadeIn>
    </section>
  )
}
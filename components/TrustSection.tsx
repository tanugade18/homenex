import { Building2, MapPinned, Home, Users2, ShieldCheck, Search, HeadphonesIcon, LayoutGrid } from 'lucide-react'
import FadeIn from './FadeIn'
const stats = [
  { icon: Building2, value: '500+', label: 'Cities Covered' },
  { icon: MapPinned, value: '50,000+', label: 'Localities' },
  { icon: Home, value: '12 Lakh+', label: 'Properties' },
  { icon: Users2, value: '25 Lakh+', label: 'Happy Customers' },
]

const reasons = [
  {
    icon: ShieldCheck,
    color: 'bg-brand-sky text-brand-blue',
    title: 'Trusted & Transparent',
    desc: 'Every listing is verified for your peace of mind.',
  },
  {
    icon: Search,
    color: 'bg-orange-50 text-brand-amber',
    title: 'Smart Search',
    desc: 'AI-powered search to find the right property.',
  },
  {
    icon: HeadphonesIcon,
    color: 'bg-teal-50 text-brand-teal',
    title: 'Expert Support',
    desc: 'Get help from property experts at every step.',
  },
  {
    icon: LayoutGrid,
    color: 'bg-red-50 text-brand-coral',
    title: 'Everything in One Place',
    desc: 'Buy, rent, finance, legal, manage & more.',
  },
]

export default function TrustSection() {
  return (
    <>
      {/* Stats bar */}
      <section className="bg-brand-navy py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
  {stats.map((s, i) => {
    const Icon = s.icon
    return (
      <FadeIn key={s.label} delay={i * 0.1}>
        <div className="flex flex-col items-center gap-2">
          <Icon size={26} className="text-brand-amber" />
          <div className="font-display text-xl md:text-2xl font-bold text-white">
            {s.value}
          </div>
          <div className="text-xs md:text-sm text-white/70">{s.label}</div>
        </div>
      </FadeIn>
    )
  })}
</div>
      </section>

      {/* Why choose us */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="font-display text-xl md:text-2xl font-bold text-brand-slate text-center mb-10">
          Why Choose HomeNex?
        </h2>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {reasons.map((r, i) => {
    const Icon = r.icon
    return (
      <FadeIn key={r.title} delay={i * 0.1}>
        <div className="text-center">
          <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center ${r.color}`}>
            <Icon size={26} />
          </div>
          <h3 className="mt-4 font-semibold text-brand-slate">{r.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{r.desc}</p>
        </div>
      </FadeIn>
    )
  })}
</div>
      </section>
    </>
  )
}
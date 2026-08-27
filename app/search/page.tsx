'use client'

import { useState } from 'react'
import { properties } from '@/lib/dummyData'
import PropertyCard from '@/components/PropertyCard'
import FilterSidebar from '@/components/FilterSidebar'
import { SlidersHorizontal, X } from 'lucide-react'

export default function SearchPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-brand-slate">
            Properties in India
          </h1>
          <p className="text-sm text-gray-500 mt-1">{properties.length} results found</p>
        </div>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <FilterSidebar />
        </aside>

        {/* Property grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-brand-sky/40 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-brand-slate">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}
    </main>
  )
}
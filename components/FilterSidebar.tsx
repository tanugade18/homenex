'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const filterGroups = [
  {
    title: 'Property Type',
    key: 'type',
    options: [
      { label: 'Buy', value: 'BUY' },
      { label: 'Rent', value: 'RENT' },
      { label: 'PG / Co-living', value: 'PG' },
      { label: 'Commercial', value: 'COMMERCIAL' },
      { label: 'Plot / Land', value: 'PLOT' },
    ],
  },
  {
    title: 'BHK',
    key: 'bhk',
    options: [
      { label: '1 BHK', value: '1' },
      { label: '2 BHK', value: '2' },
      { label: '3 BHK', value: '3' },
      { label: '4+ BHK', value: '4' },
    ],
  },
  {
    title: 'Budget',
    key: 'budget',
    options: [
      { label: 'Under ₹50L', value: '0-5000000' },
      { label: '₹50L - ₹1Cr', value: '5000000-10000000' },
      { label: '₹1Cr - ₹2Cr', value: '10000000-20000000' },
      { label: 'Above ₹2Cr', value: '20000000-999999999' },
    ],
  },
]

export type Filters = {
  type: string[]
  bhk: string[]
  budget: string[]
}

export default function FilterSidebar({
  filters,
  onChange,
}: {
  filters: Filters
  onChange: (filters: Filters) => void
}) {
  const [openGroups, setOpenGroups] = useState<string[]>(filterGroups.map((g) => g.key))

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const toggleOption = (groupKey: keyof Filters, value: string) => {
    const current = filters[groupKey]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ ...filters, [groupKey]: updated })
  }

  const clearAll = () => {
    onChange({ type: [], bhk: [], budget: [] })
  }

  const totalSelected = filters.type.length + filters.bhk.length + filters.budget.length

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-brand-slate">Filters</h3>
        {totalSelected > 0 && (
          <button onClick={clearAll} className="text-xs text-brand-blue hover:underline">
            Clear all
          </button>
        )}
      </div>

      {filterGroups.map((group) => {
        const isOpen = openGroups.includes(group.key)
        return (
          <div key={group.key} className="border-t border-gray-100 pt-4">
            <button
              onClick={() => toggleGroup(group.key)}
              className="w-full flex items-center justify-between text-sm font-semibold text-brand-slate"
            >
              {group.title}
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOpen && (
              <div className="mt-3 space-y-2">
                {group.options.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters[group.key as keyof Filters].includes(opt.value)}
                      onChange={() => toggleOption(group.key as keyof Filters, opt.value)}
                      className="accent-brand-blue w-4 h-4"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
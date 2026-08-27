'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const filterGroups = [
  {
    title: 'Property Type',
    options: ['Apartment', 'Villa', 'Plot', 'Commercial', 'PG'],
  },
  {
    title: 'BHK',
    options: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'],
  },
  {
    title: 'Budget',
    options: ['Under ₹50L', '₹50L - ₹1Cr', '₹1Cr - ₹2Cr', 'Above ₹2Cr'],
  },
  {
    title: 'Furnishing',
    options: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
  },
]

export default function FilterSidebar() {
  const [openGroups, setOpenGroups] = useState<string[]>(filterGroups.map((g) => g.title))
  const [selected, setSelected] = useState<string[]>([])

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )
  }

  const toggleOption = (opt: string) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-brand-slate">Filters</h3>
        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            className="text-xs text-brand-blue hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {filterGroups.map((group) => {
        const isOpen = openGroups.includes(group.title)
        return (
          <div key={group.title} className="border-t border-gray-100 pt-4">
            <button
              onClick={() => toggleGroup(group.title)}
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
                    key={opt}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(opt)}
                      onChange={() => toggleOption(opt)}
                      className="accent-brand-blue w-4 h-4"
                    />
                    {opt}
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
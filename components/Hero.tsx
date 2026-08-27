'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  Search,
  MapPin,
  Home,
  Building2,
  Users,
  Trees,
  ChevronDown,
} from 'lucide-react'

const cities = [
  'All Cities',
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Pune',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
]

const tabs = [
  {
    id: 'buy',
    label: 'Buy',
    icon: Home,
    placeholder: 'Search by locality, project or landmark...',
    filterLabel: 'Budget',
    filterOptions: [
      'Any Budget',
      'Under ₹50L',
      '₹50L - ₹1Cr',
      '₹1Cr - ₹2Cr',
      'Above ₹2Cr',
    ],
  },
  {
    id: 'rent',
    label: 'Rent',
    icon: Building2,
    placeholder: 'Search by locality for rental homes...',
    filterLabel: 'Monthly Rent',
    filterOptions: [
      'Any Rent',
      'Under ₹15k',
      '₹15k - ₹30k',
      '₹30k - ₹50k',
      'Above ₹50k',
    ],
  },
  {
    id: 'pg',
    label: 'PG / Co-living',
    icon: Users,
    placeholder: 'Search PG or co-living near you...',
    filterLabel: 'Sharing Type',
    filterOptions: [
      'Any',
      'Single',
      'Double Sharing',
      'Triple Sharing',
    ],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    icon: Building2,
    placeholder: 'Search office, shop or warehouse space...',
    filterLabel: 'Space Type',
    filterOptions: [
      'Any Type',
      'Office',
      'Shop',
      'Warehouse',
      'Showroom',
    ],
  },
  {
    id: 'plots',
    label: 'Plots / Land',
    icon: Trees,
    placeholder: 'Search plots or land by locality...',
    filterLabel: 'Plot Size',
    filterOptions: [
      'Any Size',
      'Under 1000 sq.ft',
      '1000-3000 sq.ft',
      'Above 3000 sq.ft',
    ],
  },
]

export default function Hero() {
  const [activeTab, setActiveTab] = useState('buy')
  const [city, setCity] = useState('All Cities')
  const [cityOpen, setCityOpen] = useState(false)

  const [filter, setFilter] = useState(
    tabs[0].filterOptions[0]
  )

  const [filterOpen, setFilterOpen] = useState(false)

  const currentTab =
    tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)

    const selectedTab =
      tabs.find((tab) => tab.id === tabId) ?? tabs[0]

    setFilter(selectedTab.filterOptions[0])
    setFilterOpen(false)
  }

  return (
    <section className="relative">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&q=80"
          alt="Modern residential buildings"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Main overlay */}
        <div className="absolute inset-0 bg-brand-navy/40" />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />

        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-brand-amber/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto px-4 pt-14 pb-16 md:pt-20 md:pb-24 text-center">

        {/* Heading */}
        <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-sm">
          Find Your Perfect Property,
          <br />
          <span className="text-brand-amber">
            Anywhere in India
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-white/85 text-sm md:text-lg">
          Search, compare and connect — all in one place.
        </p>

        {/* Search Box */}
        <div className="mt-8 md:mt-10 bg-white rounded-2xl shadow-2xl p-2 md:p-3 text-left">

          {/* Tabs */}
          <div className="flex overflow-x-auto gap-1 px-2 pt-1 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm whitespace-nowrap transition ${
                    isActive
                      ? 'bg-brand-blue text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Search Fields */}
          <div className="flex flex-col md:flex-row gap-2 p-2">

            {/* City Dropdown */}
            <div className="relative md:w-44">

              <button
                type="button"
                onClick={() => {
                  setCityOpen(!cityOpen)
                  setFilterOpen(false)
                }}
                className="w-full flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 hover:border-gray-300 transition"
              >
                <MapPin
                  size={18}
                  className="text-gray-400 shrink-0"
                />

                <span className="text-sm text-gray-700 truncate">
                  {city}
                </span>

                <ChevronDown
                  size={16}
                  className="text-gray-400 ml-auto shrink-0"
                />
              </button>

              {cityOpen && (
                <div className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-30 max-h-56 overflow-y-auto">
                  {cities.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setCity(item)
                        setCityOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-brand-sky transition"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 flex-1">
              <Search
                size={18}
                className="text-gray-400 shrink-0"
              />

              <input
                key={currentTab.id}
                type="text"
                placeholder={currentTab.placeholder}
                className="text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full bg-transparent"
              />
            </div>

            {/* Dynamic Filter */}
            <div className="relative md:w-40">

              <button
                type="button"
                onClick={() => {
                  setFilterOpen(!filterOpen)
                  setCityOpen(false)
                }}
                className="w-full flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 hover:border-gray-300 transition"
              >
                <span className="text-sm text-gray-700 truncate">
                  {filter}
                </span>

                <ChevronDown
                  size={16}
                  className="text-gray-400 ml-auto shrink-0"
                />
              </button>

              {filterOpen && (
                <div className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-30 max-h-56 overflow-y-auto">
                  {currentTab.filterOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setFilter(option)
                        setFilterOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-brand-sky transition"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <Link
              href="/search"
              className="shrink-0 whitespace-nowrap bg-brand-amber text-brand-navy font-semibold text-sm px-6 py-2.5 rounded-xl hover:brightness-105 transition flex items-center justify-center"
            >
              Search
            </Link>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/85 text-xs md:text-sm">
          <span>✓ 100% Verified Listings</span>
          <span>✓ Pan-India Coverage</span>
          <span>✓ Direct Owner Contact</span>
        </div>

      </div>
    </section>
  )
}
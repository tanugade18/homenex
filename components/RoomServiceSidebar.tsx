'use client'

import Link from 'next/link'
import {
  LayoutDashboard,
  Home,
  Wrench,
  Palette,
  CreditCard,
  Calendar,
  MessageSquare,
  User,
  Settings,
  HelpCircle,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/room-service' },
  { label: 'My Property', icon: Home, href: '/my-properties' },
  { label: 'Room Service', icon: Wrench, href: '/room-service', active: true },
  { label: 'Design & Customize', icon: Palette, href: '/design' },
  { label: 'Payments', icon: CreditCard, href: '#' },
  { label: 'Bookings', icon: Calendar, href: '/site-visits' },
  { label: 'Messages', icon: MessageSquare, href: '/leads' },
  { label: 'Profile', icon: User, href: '/broker-profile' },
  { label: 'Settings', icon: Settings, href: '#' },
]

export default function RoomServiceSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-white border-r border-gray-100 min-h-screen py-6 px-3">
      <div className="px-3 mb-6">
        <div className="font-display font-bold text-brand-blue text-lg">HomeNex</div>
        <div className="text-xs text-gray-400">Live your way.</div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                item.active
                  ? 'bg-brand-blue text-white font-medium'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50">
          <HelpCircle size={18} />
          Help & Support
        </Link>
      </div>
    </aside>
  )
}
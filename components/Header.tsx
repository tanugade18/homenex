'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Heart, Menu } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { label: 'Buy', href: '/buy' },
  { label: 'Rent', href: '/rent' },
  { label: 'PG / Co-living', href: '/pg' },
  { label: 'Commercial', href: '/commercial' },
  { label: 'New Projects', href: '/new-projects' },
  { label: 'Plots / Land', href: '/plots' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-brand-blue font-body">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center h-24 w-54 relative">
          <Image
            src="/images/homenex-logo-removebg.png"
            alt="HomeNex"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/85 hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-1 text-white/85 hover:text-white text-sm">
            <Heart size={18} />
            Saved
          </button>

          <Show when="signed-out">
            <SignInButton>
              <button className="text-sm text-white/90 hover:text-white">Sign In</button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-brand-amber text-brand-blue font-semibold text-sm px-4 py-2 rounded-full hover:brightness-105 transition">
                Post Property
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <button className="bg-brand-amber text-brand-blue font-semibold text-sm px-4 py-2 rounded-full hover:brightness-105 transition">
              Post Property
            </button>
            <UserButton />
          </Show>

          <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden bg-brand-blue border-t border-white/10 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/85 hover:text-white text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
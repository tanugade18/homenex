import Link from 'next/link'
import Image from 'next/image'

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const exploreLinks = [
  { label: 'Buy', href: '/buy' },
  { label: 'Rent', href: '/rent' },
  { label: 'PG / Co-living', href: '/pg' },
  { label: 'Commercial', href: '/commercial' },
  { label: 'New Projects', href: '/new-projects' },
  { label: 'Plots / Land', href: '/plots' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Press', href: '/press' },
  { label: 'Contact Us', href: '/contact' },
]

const supportLinks = [
  { label: 'Help Center', href: '/help' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Site Map', href: '/sitemap' },
]

const socialIcons = [
  {
    icon: FaFacebookF,
    label: 'Facebook',
    href: '#',
  },
  {
    icon: FaInstagram,
    label: 'Instagram',
    href: '#',
  },
  {
    icon: FaXTwitter,
    label: 'X',
    href: '#',
  },
  {
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    href: '#',
  },
  {
    icon: FaYoutube,
    label: 'YouTube',
    href: '#',
  },
]

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white/80">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <Link
            href="/"
            className="relative block w-52 h-40"
          >
            <Image
              src="/images/homenex-logo-removebg.png"
              alt="HomeNex"
              fill
              className="object-contain object-left"
            />
          </Link>

          <p className="text-sm text-white/65 leading-6 max-w-xs">
            Find your perfect property with HomeNex.
            Discover trusted homes, apartments, plots and
            commercial spaces with ease.
          </p>

          {/* Social Media */}
          <div className="flex gap-3 mt-6">
            {socialIcons.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-amber hover:text-brand-blue transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-display text-white font-semibold mb-4">
            Explore
          </h4>

          <ul className="space-y-3 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/65 hover:text-white transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-display text-white font-semibold mb-4">
            Company
          </h4>

          <ul className="space-y-3 text-sm">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/65 hover:text-white transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-display text-white font-semibold mb-4">
            Support
          </h4>

          <ul className="space-y-3 text-sm">
            {supportLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/65 hover:text-white transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact */}
          <div className="mt-6">
            <p className="text-xs text-white/45 mb-1">
              Need help?
            </p>

            <a
              href="mailto:info@homenex.com"
              className="text-sm text-white hover:text-brand-amber transition"
            >
              homenexestate@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} HomeNex. All rights reserved.
          </p>

          <p>
            Your trusted real estate platform
          </p>
        </div>
      </div>

    </footer>
  )
}
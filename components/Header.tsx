"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useUser,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { Heart, Menu, Building2, Users, User, Calendar, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "PG / Co-living", href: "/pg" },
  { label: "Commercial", href: "/commercial" },
  { label: "New Projects", href: "/new-projects" },
  { label: "Plots / Land", href: "/plots" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 font-body">
      {/* Row 1: Logo + account actions */}
      <div className="bg-brand-blue">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center h-24 w-54 relative">
            <Image
              src="/images/homenex-logo-removebg.png"
              alt="HomeNex"
              fill
              sizes="176px"
              className="object-contain object-left"
              priority
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            <button className="hidden lg:flex items-center gap-1 text-white/85 hover:text-white text-sm">
              <Heart size={18} />
              Saved
            </button>

            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="text-sm text-white/90 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-brand-amber text-brand-blue font-semibold text-sm px-4 py-2 rounded-full hover:brightness-105 transition"
              >
                Post Property
              </Link>
            </Show>

            <Show when="signed-in">
              <Link
                href="/my-properties"
                className="hidden lg:flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-3.5 py-2 rounded-full hover:bg-white/20 transition"
              >
                <Building2 size={16} />
                My Properties
              </Link>

              <Link
                href="/leads"
                className="hidden lg:flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-3.5 py-2 rounded-full hover:bg-white/20 transition"
              >
                <Users size={16} />
                Leads
              </Link>

              <Link
                href="/site-visits"
                className="hidden lg:flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-3.5 py-2 rounded-full hover:bg-white/20 transition"
              >
                <Calendar size={16} />
                Visits
              </Link>

              <Link
                href="/broker-profile"
                className="hidden lg:flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-3.5 py-2 rounded-full hover:bg-white/20 transition"
              >
                <User size={16} />
                Profile
              </Link>

              <Link
                href="/post-property"
                className="bg-brand-amber text-brand-blue font-semibold text-sm px-4 py-2 rounded-full hover:brightness-105 transition"
              >
                Post Property
              </Link>
              <UserButton />
            </Show>

            <button
              className="lg:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Category nav links */}
      <div className="hidden lg:block bg-brand-navy">
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 h-11">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu — combines nav links + dashboard actions */}
      {menuOpen && (
        <nav className="lg:hidden bg-brand-navy border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
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
          </div>

          <Show when="signed-in">
            <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
              <Link
                href="/my-properties"
                className="text-white/85 hover:text-white text-sm"
                onClick={() => setMenuOpen(false)}
              >
                My Properties
              </Link>
              <Link
                href="/leads"
                className="text-white/85 hover:text-white text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Leads
              </Link>
              <Link
                href="/site-visits"
                className="text-white/85 hover:text-white text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Visits
              </Link>
              <Link
                href="/broker-profile"
                className="text-white/85 hover:text-white text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </Show>
        </nav>
      )}
    </header>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Heart, Menu, Building2, Users, User, Calendar } from "lucide-react";
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
  const role = user?.publicMetadata?.role as string | undefined;

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
              <button className="text-sm text-white/90 hover:text-white">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-brand-amber text-brand-blue font-semibold text-sm px-4 py-2 rounded-full hover:brightness-105 transition">
                Post Property
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/my-properties"
              className="hidden md:flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-3.5 py-2 rounded-full hover:bg-white/20 transition"
            >
              <Building2 size={16} />
              My Properties
            </Link>

            <Link
              href="/leads"
              className="hidden md:flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-3.5 py-2 rounded-full hover:bg-white/20 transition"
            >
              <Users size={16} />
              Leads
            </Link>

            <Link
  href="/site-visits"
  className="hidden md:flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-3.5 py-2 rounded-full hover:bg-white/20 transition"
>
  <Calendar size={16} />
  Visits
</Link>

            {role === "BROKER" && (
              <Link
                href="/broker-profile"
                className="hidden md:flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-3.5 py-2 rounded-full hover:bg-white/20 transition"
              >
                <User size={16} />
                Profile
              </Link>
            )}

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
  );
}
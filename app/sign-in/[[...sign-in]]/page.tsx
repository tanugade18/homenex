import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function SignInPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: branded image panel */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80"
          alt="City skyline"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-blue/70 to-brand-blue/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h1 className="font-display text-3xl font-bold leading-tight">
            Welcome back to
            <br />
            HomeNex
          </h1>
          <p className="mt-3 text-white/80 max-w-sm">
            Continue your search for the perfect property, anywhere in India.
          </p>
        </div>
      </div>

      {/* Right: sign-in form */}
      <div className="flex items-center justify-center px-4 py-12 bg-brand-sky/30">
        <SignIn
          appearance={{
            elements: {
              rootBox: 'w-full max-w-sm',
              card: 'shadow-xl rounded-2xl',
              headerTitle: 'font-display text-brand-slate',
              formButtonPrimary: 'bg-brand-blue hover:brightness-110 text-sm',
              footerActionLink: 'text-brand-blue hover:text-brand-blue/80',
            },
          }}
        />
      </div>
    </div>
  )
}
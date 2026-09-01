import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: branded image panel */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
          alt="Modern residential building"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-blue/70 to-brand-blue/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h1 className="font-display text-3xl font-bold leading-tight">
            Find your perfect
            <br />
            property with HomeNex
          </h1>
          <p className="mt-3 text-white/80 max-w-sm">
            Search, compare and connect with verified owners and brokers across India.
          </p>
        </div>
      </div>

      {/* Right: sign-up form */}
      <div className="flex items-center justify-center px-4 py-12 bg-brand-sky/30">
        <SignUp
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
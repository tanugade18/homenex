import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function PostPropertySuccessPage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-20 text-center">
      <CheckCircle2 size={56} className="text-brand-teal mx-auto mb-4" />
      <h1 className="font-display text-2xl font-bold text-brand-slate">
        Property Submitted!
      </h1>
      <p className="text-gray-500 mt-2">
        Your listing is under review. It will go live once verified by our team.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 bg-brand-blue text-white font-semibold px-6 py-3 rounded-xl"
      >
        Back to Home
      </Link>
    </main>
  )
}
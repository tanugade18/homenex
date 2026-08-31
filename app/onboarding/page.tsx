'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
const roles = [
  { id: 'BUYER', label: 'Customer', desc: 'I want to buy or rent a property' },
  { id: 'OWNER', label: 'Owner', desc: 'I want to list my property' },
  { id: 'BROKER', label: 'Broker / Agent', desc: 'I help clients buy, sell or rent' },
]

export default function OnboardingPage() {
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { getToken } = useAuth()

  const handleContinue = async () => {
  if (!selected) return
  setLoading(true)
  try {
    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: selected }),
    })
    if (res.ok) {
      await getToken({ skipCache: true }) // force fresh token with updated role
      window.location.href = '/' // full page reload so middleware sees the new session
    } else {
      setLoading(false)
    }
  } catch (err) {
    console.error('Onboarding failed:', err)
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Welcome to HomeNex</h1>
        <p className="text-gray-500 mb-6">Tell us who you are, so we can personalize your experience.</p>

        <div className="space-y-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelected(role.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition ${
                selected === role.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="font-semibold text-gray-800">{role.label}</div>
              <div className="text-sm text-gray-500">{role.desc}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selected || loading}
          className="w-full mt-6 bg-blue-700 text-white py-3 rounded-xl font-medium disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
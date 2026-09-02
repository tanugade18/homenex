'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'

export default function AgreementPage() {
  const [form, setForm] = useState({
    ownerName: '',
    ownerAddress: '',
    tenantName: '',
    tenantAddress: '',
    propertyAddress: '',
    monthlyRent: '',
    securityDeposit: '',
    startDate: '',
    durationMonths: '11',
    noticePeriod: '1',
  })

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    const { generateAgreementPdf } = await import('@/lib/generateAgreementPdf')
    generateAgreementPdf(form)
  }

  const isValid =
    form.ownerName && form.tenantName && form.propertyAddress &&
    form.monthlyRent && form.securityDeposit && form.startDate

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 mb-1">
        <FileText size={22} className="text-brand-blue" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-brand-slate">
          Rent Agreement Generator
        </h1>
      </div>
      <p className="text-gray-500 mb-6 text-sm">
        Fill in the details below to generate a basic rental agreement. This is a template only — please have it reviewed by a legal professional before use.
      </p>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-brand-slate mb-3">Owner Details</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Owner full name"
              value={form.ownerName}
              onChange={(e) => update('ownerName', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
            />
            <input
              type="text"
              placeholder="Owner address"
              value={form.ownerAddress}
              onChange={(e) => update('ownerAddress', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-brand-slate mb-3">Tenant Details</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Tenant full name"
              value={form.tenantName}
              onChange={(e) => update('tenantName', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
            />
            <input
              type="text"
              placeholder="Tenant address"
              value={form.tenantAddress}
              onChange={(e) => update('tenantAddress', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-brand-slate mb-3">Property & Terms</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Property address"
              value={form.propertyAddress}
              onChange={(e) => update('propertyAddress', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Monthly rent (₹)"
                value={form.monthlyRent}
                onChange={(e) => update('monthlyRent', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
              />
              <input
                type="number"
                placeholder="Security deposit (₹)"
                value={form.securityDeposit}
                onChange={(e) => update('securityDeposit', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Start date</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => update('startDate', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Duration (months)</label>
                <input
                  type="number"
                  value={form.durationMonths}
                  onChange={(e) => update('durationMonths', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Notice period (months)</label>
              <input
                type="number"
                value={form.noticePeriod}
                onChange={(e) => update('noticePeriod', e.target.value)}
                className="w-full sm:w-1/2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!isValid}
          className="w-full bg-brand-blue text-white font-semibold py-3 rounded-xl disabled:opacity-50"
        >
          Generate Agreement PDF
        </button>
      </div>
    </main>
  )
}
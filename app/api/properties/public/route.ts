import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const approved = await prisma.property.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
  })

  const formatted = approved.map((p) => ({
    id: p.id,
    tag: 'Verified',
    tagColor: 'bg-brand-teal',
    image: p.images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    price: `₹${p.price.toLocaleString('en-IN')}`,
    bhk: p.bhk ? `${p.bhk} BHK` : p.type,
    location: `${p.locality}, ${p.city}`,
    area: p.carpetArea ? `${p.carpetArea} sq.ft` : '—',
    rawType: p.type,
    rawBhk: p.bhk,
    rawPrice: p.price,
  }))

  return NextResponse.json({ properties: formatted })
}
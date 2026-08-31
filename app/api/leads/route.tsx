import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { propertyId, message } = await req.json()

  const user = await prisma.user.findUnique({ where: { selfiamId: userId } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const lead = await prisma.lead.create({
    data: {
      propertyId,
      userId: user.id,
      message: message || null,
    },
  })

  return NextResponse.json({ success: true, leadId: lead.id })
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const owner = await prisma.user.findUnique({ where: { selfiamId: userId } })
  if (!owner) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Get all leads for properties owned by this user
  const leads = await prisma.lead.findMany({
    where: {
      property: { ownerId: owner.id },
    },
    include: {
      property: { select: { id: true, title: true, price: true, city: true, locality: true } },
      user: { select: { name: true, email: true, phone: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ leads })
}
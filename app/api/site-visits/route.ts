import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { propertyId, scheduledAt } = await req.json()

  const user = await prisma.user.findUnique({ where: { selfiamId: userId } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const visit = await prisma.siteVisit.create({
    data: {
      propertyId,
      userId: user.id,
      scheduledAt: new Date(scheduledAt),
    },
  })

  return NextResponse.json({ success: true, visitId: visit.id })
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

  const visits = await prisma.siteVisit.findMany({
    where: { property: { ownerId: owner.id } },
    include: {
      property: { select: { title: true, city: true, locality: true } },
      user: { select: { name: true, email: true, phone: true } },
    },
    orderBy: { scheduledAt: 'asc' },
  })

  return NextResponse.json({ visits })
}
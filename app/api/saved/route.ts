import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// List all saved properties for the logged-in user
export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { selfiamId: userId } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const saved = await prisma.savedProperty.findMany({
    where: { userId: user.id },
    include: { property: true },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ saved })
}

// Toggle save/unsave for a property
export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { propertyId } = await req.json()

  const user = await prisma.user.findUnique({ where: { selfiamId: userId } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const existing = await prisma.savedProperty.findUnique({
    where: { userId_propertyId: { userId: user.id, propertyId } },
  })

  if (existing) {
    await prisma.savedProperty.delete({ where: { id: existing.id } })
    return NextResponse.json({ saved: false })
  } else {
    await prisma.savedProperty.create({
      data: { userId: user.id, propertyId },
    })
    return NextResponse.json({ saved: true })
  }
}
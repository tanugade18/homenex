import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const property = await prisma.property.findUnique({
    where: { id },
    include: { owner: { select: { name: true, phone: true } } },
  })

  if (!property) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ property })
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { id } = await params
  const { price } = await req.json()

  const owner = await prisma.user.findUnique({ where: { selfiamId: userId } })
  const property = await prisma.property.findUnique({ where: { id } })

  if (!property || !owner || property.ownerId !== owner.id) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  const priceDropped = price < property.price

  const updated = await prisma.property.update({
    where: { id },
    data: { price },
  })

  // If price dropped, notify everyone who saved this property
  if (priceDropped) {
    const savers = await prisma.savedProperty.findMany({
      where: { propertyId: id },
      select: { userId: true },
    })

    if (savers.length > 0) {
      await prisma.notification.createMany({
        data: savers.map((s) => ({
          userId: s.userId,
          title: 'Price Drop!',
          message: `"${property.title}" is now ₹${price.toLocaleString('en-IN')} — down from ₹${property.price.toLocaleString('en-IN')}.`,
        })),
      })
    }
  }

  return NextResponse.json({ success: true, property: updated })
}
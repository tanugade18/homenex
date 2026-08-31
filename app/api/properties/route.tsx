import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const data = await req.json()

  const owner = await prisma.user.findUnique({ where: { selfiamId: userId } })
  if (!owner) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const property = await prisma.property.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      price: data.price,
      bhk: data.bhk || null,
      carpetArea: data.carpetArea || null,
      city: data.city,
      locality: data.locality,
      address: data.address || null,
      images: data.images || [],
      ownerId: owner.id,
    },
  })

  return NextResponse.json({ success: true, propertyId: property.id })
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

  const myProperties = await prisma.property.findMany({
    where: { ownerId: owner.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ properties: myProperties })
}
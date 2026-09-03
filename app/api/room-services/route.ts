import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { selfiamId: userId } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const requests = await prisma.roomServiceRequest.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ requests })
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { category, subService, address, notes, scheduledDate } = await req.json()

  const user = await prisma.user.findUnique({ where: { selfiamId: userId } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const request = await prisma.roomServiceRequest.create({
    data: {
      category,
      subService,
      address,
      notes,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      userId: user.id,
    },
  })

  return NextResponse.json({ success: true, requestId: request.id })
}
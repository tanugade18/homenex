import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { serviceType, city, phone, notes } = await req.json()

  const user = await prisma.user.findUnique({ where: { selfiamId: userId } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const request = await prisma.serviceRequest.create({
    data: { serviceType, city, phone, notes, userId: user.id },
  })

  return NextResponse.json({ success: true, requestId: request.id })
}

export async function GET() {
  const requests = await prisma.serviceRequest.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ requests })
}
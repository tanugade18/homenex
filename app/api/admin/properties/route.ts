import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const properties = await prisma.property.findMany({
    where: { status: 'PENDING' },
    include: { owner: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json({ properties })
}
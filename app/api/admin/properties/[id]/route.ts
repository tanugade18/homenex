import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { status } = await req.json()

  await prisma.property.update({
    where: { id },
    data: { status },
  })

  return NextResponse.json({ success: true })
}
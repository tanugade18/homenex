import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { id } = await params
  const { status, notes } = await req.json()

  const me = await prisma.user.findUnique({ where: { selfiamId: userId } })
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { property: true },
  })

  if (!lead || !me || lead.property.ownerId !== me.id) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  const updated = await prisma.lead.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(notes !== undefined && { notes }),
    },
  })

  return NextResponse.json({ success: true, lead: updated })
}
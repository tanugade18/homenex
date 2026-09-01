import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const profile = await prisma.user.findUnique({ where: { selfiamId: userId } })
  return NextResponse.json({ profile })
}

export async function PATCH(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const data = await req.json()

  const updated = await prisma.user.update({
    where: { selfiamId: userId },
    data: {
      phone: data.phone || null,
      experience: data.experience ? Number(data.experience) : null,
      specialization: data.specialization || null,
      areasCovered: data.areasCovered || null,
      bio: data.bio || null,
    },
  })

  return NextResponse.json({ success: true, profile: updated })
}
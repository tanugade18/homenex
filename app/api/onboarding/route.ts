import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { role } = await req.json()
  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  await prisma.user.upsert({
    where: { selfiamId: userId },
    update: { role },
    create: {
      selfiamId: userId,
      name: user.fullName ?? 'Unnamed',
      email: user.emailAddresses[0]?.emailAddress ?? '',
      role,
    },
  })

  return NextResponse.json({ success: true })
}
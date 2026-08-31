import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { role } = await req.json()
  const client = await clerkClient()
  const user = await client.users.getUser(userId)

  // Save role in our database
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

  // Also save role in Clerk's metadata so middleware can check it quickly
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role, onboarded: true },
  })

  return NextResponse.json({ success: true })
}
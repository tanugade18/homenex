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
  const email = user.emailAddresses[0]?.emailAddress ?? ''

  // Check if a user already exists with this email (from an older/different Clerk account)
  const existingByEmail = await prisma.user.findUnique({ where: { email } })

  if (existingByEmail) {
    // Update that existing record to point to the current Clerk account + new role
    await prisma.user.update({
      where: { email },
      data: {
        selfiamId: userId,
        role,
        name: user.fullName ?? 'Unnamed',
      },
    })
  } else {
    await prisma.user.upsert({
      where: { selfiamId: userId },
      update: { role },
      create: {
        selfiamId: userId,
        name: user.fullName ?? 'Unnamed',
        email,
        role,
      },
    })
  }

  // Also save role in Clerk's metadata so middleware can check it quickly
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role, onboarded: true },
  })

  return NextResponse.json({ success: true })
}
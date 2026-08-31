import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isOnboardingRoute = createRouteMatcher(['/onboarding'])
const isApiRoute = createRouteMatcher(['/api(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()

  // Skip onboarding-redirect logic entirely for API routes —
  // API calls need JSON responses, not page redirects
  if (isApiRoute(req)) {
    return NextResponse.next()
  }

  if (!userId) {
    return NextResponse.next()
  }

  const onboarded = sessionClaims?.metadata?.onboarded

  if (!onboarded && !isOnboardingRoute(req)) {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }

  if (onboarded && isOnboardingRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
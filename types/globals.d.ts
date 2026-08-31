export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboarded?: boolean
      role?: string
    }
  }
}
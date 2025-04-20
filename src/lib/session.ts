'use server'
import { AUTH_TOKEN_KEY } from '@/constants/LocalStorage'
import { env } from '@/env'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: { token: string; expiresAt: Date }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify<JWTPayload & { token: string }>(
      session,
      encodedKey,
      {
        algorithms: ['HS256'],
      },
    )
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ token, expiresAt })

  const cookieStore = await cookies()
  cookieStore.set(AUTH_TOKEN_KEY, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_TOKEN_KEY)
}

export async function logout() {
  deleteSession()
}

export async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(AUTH_TOKEN_KEY)
  return !!session
}

export async function getToken() {
  const cookieStore = await cookies()
  const session = cookieStore.get(AUTH_TOKEN_KEY)
  return session?.value
}

export async function getApiToken() {
  const token = await decrypt(await getToken())

  return token?.token
}

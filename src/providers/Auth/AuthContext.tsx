'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { authSigninOperation } from '@/api/auth/operations'
import { PropsResponseAuthSignIn } from '@/api/auth/types'
import { showToasthHandleError } from '@/utils/toast'
import { AUTH_TOKEN_KEY, USER_DATA } from '@/constants/LocalStorage'

type User = PropsResponseAuthSignIn['user']

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const saveSession = (user: User, token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    localStorage.setItem(USER_DATA, JSON.stringify(user))
    setUser(user)
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { user, accessToken } = await authSigninOperation.AuthSignin({
        email,
        password,
      })
      saveSession(user, accessToken)
      router.push('/admin')
    } catch (error) {
      showToasthHandleError('Credenciais inválidas')
    }
  }

  const signOut = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setUser(null)
    router.push('/')
  }

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const storedUser = localStorage.getItem(USER_DATA)

    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { showToasthHandleError } from '@/utils/toast'
import { AUTH_TOKEN_KEY, USER_DATA } from '@/constants/LocalStorage'
import { AuthHttp } from '@/http/Auth'
import toast from 'react-hot-toast'
import { createSession, deleteSession } from '@/lib/session'
import { User } from '@/types/api/Response/UserResponse'

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

  const signIn = async (email: string, password: string) => {
    try {
      const userResponse = await AuthHttp.signIn(email, password)

      if (userResponse.hasError) {
        toast.error('Credenciais inválidas')
        return
      }

      createSession(userResponse.data.accessToken!)

      router.push('/admin')
    } catch (error) {
      showToasthHandleError('Credenciais inválidas')
    }
  }

  const signOut = () => {
    deleteSession()
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

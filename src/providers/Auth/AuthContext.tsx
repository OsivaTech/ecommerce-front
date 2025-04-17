'use client'

import { createContext, useContext, useState } from 'react'

import { useRouter } from 'next/navigation'
import { showToasthHandleError } from '@/utils/toast'
import { signIn as signInHttp } from '@/http/Auth'
import toast from 'react-hot-toast'
import { createSession, deleteSession } from '@/lib/session'

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({
  children,
  userIsAlreadyAuthenticated,
}: {
  children: React.ReactNode
  userIsAlreadyAuthenticated: boolean
}) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    userIsAlreadyAuthenticated,
  )
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    try {
      const userResponse = await signInHttp(email, password)

      if (userResponse.hasError) {
        toast.error('Credenciais inválidas')
        return
      }

      createSession(userResponse.data.accessToken!)
      setIsUserAuthenticated(true)
      router.refresh()
    } catch (error) {
      showToasthHandleError('Credenciais inválidas')
    }
  }

  const signOut = () => {
    deleteSession()
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated: isUserAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

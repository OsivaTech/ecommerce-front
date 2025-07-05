'use client'

import { BackButton } from '@/components/BackButton'
import { MyAccountPage } from '@/components/MyAccount'
import { useAuth } from '@/providers/Auth/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function MyAccount() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="flex flex-col container mx-auto py-8 px-4">
      <BackButton className="mb-4" />
      <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>
      <MyAccountPage />
    </div>
  )
}

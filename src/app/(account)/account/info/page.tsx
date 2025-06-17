'use client'

import UserInfoForm from '@/components/UserInfoForm'
import { useRouter } from 'next/navigation'

export default function UserInfoPage() {
  const router = useRouter()
  return (
    <div className="container mx-auto py-8 max-w-xl px-4">
      <button
        type="button"
        className="mb-4 text-sm text-gray-600 hover:underline"
        onClick={() => router.back()}
      >
        ← Voltar
      </button>
      <h1 className="text-3xl font-bold mb-8">Editar informações pessoais</h1>
      <UserInfoForm />
    </div>
  )
}

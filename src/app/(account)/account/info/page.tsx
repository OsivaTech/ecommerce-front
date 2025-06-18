'use client'
import { BackButton } from '@/components/BackButton'
import UserInfoForm from '@/components/UserInfoForm'

export default function UserInfoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <BackButton className="mb-4" />
      <h1 className="text-3xl font-bold mb-8">Editar informações pessoais</h1>
      <UserInfoForm />
    </div>
  )
}

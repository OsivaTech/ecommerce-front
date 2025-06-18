'use client'
import AddressForm from '@/components/AddressForm'
import { BackButton } from '@/components/BackButton'

export default function AddressPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <BackButton className="mb-4" />
      <h1 className="text-3xl font-bold mb-8">Editar endereço</h1>
      <AddressForm />
    </div>
  )
}

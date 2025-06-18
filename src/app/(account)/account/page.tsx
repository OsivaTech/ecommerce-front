import { BackButton } from '@/components/BackButton'
import { MyAccountPage } from '@/components/MyAccount'

export default function MyAccount() {
  return (
    <div className="flex flex-col container mx-auto py-8 px-4">
      <BackButton className="mb-4" />
      <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>
      <MyAccountPage />
    </div>
  )
}

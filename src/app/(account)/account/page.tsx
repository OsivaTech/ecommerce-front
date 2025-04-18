import { MyAccountPage } from '@/components/MyAccount'

export default function MyAccount() {
  return (
    <div className="flex flex-col container mx-auto mt-14">
      <h1 className="text-2xl font-bold mb-6">Minha Conta</h1>
      <MyAccountPage />
    </div>
  )
}

import { BackButton } from '@/components/BackButton'
import { UserHttp } from '@/http/User'
import { UserResponse } from '@/types/api/Response/UserResponse'
import { CartClient } from './CartClient'

export default async function ShoppingCart() {
  let currentUser: UserResponse | null = null
  const isLoadingUser = false

  try {
    const response = await UserHttp.getCurrentUser()
    if (!response.hasError) {
      currentUser = response.data
    } else {
      console.error('Erro ao buscar usuário:', response.error)
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton className="mb-4" />
      <h2 className="text-3xl font-bold mb-6">Carrinho de compras</h2>
      <CartClient currentUser={currentUser} isLoadingUser={isLoadingUser} />
    </div>
  )
}

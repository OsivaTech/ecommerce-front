'use client'

import { ShoppingCartListItem } from '@/components/ShoppingCartLIstItem'
import { ShoppingCartResume } from '@/components/ShoppingCartResume'
import { useCart } from '@/context/useCart'
import { UserResponse } from '@/types/api/Response/UserResponse'

interface CartClientProps {
  currentUser: UserResponse | null
  isLoadingUser: boolean
}

export function CartClient({ currentUser, isLoadingUser }: CartClientProps) {
  const { items } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-xl text-muted mb-4">Seu carrinho está vazio</p>
        <p className="text-muted">
          Adicione produtos ao seu carrinho para continuar comprando
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8">
      <ShoppingCartListItem />
      <ShoppingCartResume
        currentUser={currentUser}
        isLoadingUser={isLoadingUser}
      />
    </div>
  )
}

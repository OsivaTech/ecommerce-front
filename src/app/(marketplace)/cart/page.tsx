'use client'

import { ShoppingCartListItem } from '@/components/ShoppingCartLIstItem'
import { ShoppingCartResume } from '@/components/ShoppingCartResume'
import { useCart } from '@/context/useCart'

export default function ShoppingCart() {
  const { items } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Carrinho de compras</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-xl text-muted mb-4">Seu carrinho está vazio</p>
          <p className="text-muted">
            Adicione produtos ao seu carrinho para continuar comprando
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Carrinho de compras</h2>

      <div className="flex flex-col md:flex-row justify-between gap-8">
        <ShoppingCartListItem />
        <ShoppingCartResume />
      </div>
    </div>
  )
}

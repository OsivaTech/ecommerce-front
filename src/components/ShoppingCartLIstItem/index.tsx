'use client'
import { useCart } from '@/context/useCart'
import { ShoppingCartItem } from '../ShoppingCartItem'

export const ShoppingCartListItem = () => {
  const { items } = useCart()
  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map((item) => (
        <ShoppingCartItem key={item.product.id} cartItem={item} />
      ))}
    </div>
  )
}

'use client'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/useCart'
import { Product } from '@/types/api/Response/ProductResponse'
import { useState } from 'react'

export default function AddToCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product, quantity: number) => {
    if (quantity > 0) {
      addToCart(product, quantity)
    }
  }

  return (
    <div className="flex gap-2 px-4">
      <div className="flex items-center border rounded-md">
        <Button
          variant="ghost"
          className="px-2 py-1 h-8"
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 0}
        >
          -
        </Button>
        <span className="px-2 min-w-[30px] text-center">{quantity}</span>
        <Button
          variant="ghost"
          className="px-2 py-1 h-8"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </Button>
      </div>
      <Button
        onClick={() => handleAddToCart(product, quantity)}
        className="relative overflow-hidden group"
      >
        <span className="inline-block group-active:animate-ping absolute inset-0 bg-primary/20 rounded-md"></span>
        <span className="relative">Adicionar ao carrinho</span>
      </Button>
    </div>
  )
}

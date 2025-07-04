'use client'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/useCart'
import { Product } from '@/types/api/Response/ProductResponse'
import { useState } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'

export default function AddToCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(Math.min(1, product.stock))
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product, quantity: number) => {
    if (quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity)
    }
  }

  return (
    <div className="flex gap-3 items-center">
      {/* Controles de quantidade */}
      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-10">
        <Button
          variant="ghost"
          size="sm"
          className="px-3 h-10 hover:bg-gray-100 rounded-l-lg rounded-r-none"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="px-4 h-10 flex items-center justify-center min-w-[40px] text-center font-medium text-gray-700 bg-white border border-gray-200">
          {quantity}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="px-3 h-10 hover:bg-gray-100 rounded-l-none rounded-r-lg"
          onClick={() => setQuantity(Math.min(quantity + 1, product.stock))}
          disabled={quantity >= product.stock}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Botão adicionar ao carrinho */}
      <Button
        onClick={() => handleAddToCart(product, quantity)}
        className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium h-10 px-4 rounded-lg transition-all duration-200 hover:shadow-lg group"
        disabled={product.stock === 0 || quantity > product.stock}
      >
        <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-bounce" />
        {product.stock === 0 ? 'Indisponível' : 'Adicionar'}
      </Button>
    </div>
  )
}

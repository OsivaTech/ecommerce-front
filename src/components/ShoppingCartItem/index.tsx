'use client'
import { formatPrice } from '@/utils/mask'
import Image from 'next/image'
import { CartItem, useCart } from '@/context/useCart'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

export const ShoppingCartItem = ({ cartItem }: { cartItem: CartItem }) => {
  const { updateQuantity } = useCart()

  return (
    <div
      key={cartItem.product.id}
      className="flex items-center justify-between bg-white p-4 rounded-lg shadow h-[115px]"
    >
      <div className="flex items-center gap-4">
        <Image
          src={cartItem.product.file.url}
          alt={cartItem.product.name}
          width={80}
          height={80}
          className="rounded-md object-cover h-[80px] w-[80px]"
        />
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">{cartItem.product.name}</h3>
          <p className="text-blue-600 font-bold">
            {formatPrice(cartItem.product.price ?? 0)}
          </p>
        </div>
      </div>

      {/* Contador de quantidade */}
      <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
        <button
          onClick={() =>
            updateQuantity(cartItem.product.id, cartItem.quantity - 1)
          }
          className="p-1 text-gray-600 hover:text-black"
        >
          <MinusIcon className="w-5 h-5" />
        </button>
        <span className="text-lg font-medium">{cartItem.quantity}</span>
        <button
          onClick={() =>
            updateQuantity(cartItem.product.id, cartItem.quantity + 1)
          }
          className="p-1 text-gray-600 hover:text-black"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

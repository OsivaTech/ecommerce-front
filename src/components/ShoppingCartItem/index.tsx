'use client'
import { formatPrice } from '@/utils/mask'
import Image from 'next/image'
import { CartItem, useCart } from '@/context/useCart'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { APP_LINKS } from '../../../constants'

export const ShoppingCartItem = ({ cartItem }: { cartItem: CartItem }) => {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div
      key={cartItem.product.id}
      className="flex flex-row items-center bg-background p-4 rounded-lg border gap-4"
    >
      <Link href={APP_LINKS.STORE_PRODUCT(cartItem.product.id)}>
        <Image
          src={cartItem.product.file.url}
          alt={cartItem.product.name}
          width={80}
          height={80}
          className="rounded-md object-cover w-[80px] h-[80px] flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
        />
      </Link>
      <div className="flex flex-col justify-between h-full w-full">
        <Link
          href={APP_LINKS.STORE_PRODUCT(cartItem.product.id)}
          className="font-semibold hover:text-primary transition-colors cursor-pointer"
        >
          {cartItem.product.name}
        </Link>
        <div className="flex flex-row gap-2 justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Contador de quantidade */}
            <div className="flex items-center gap-2 border rounded-lg p-1">
              <button
                onClick={() =>
                  updateQuantity(cartItem.product.id, cartItem.quantity - 1)
                }
                className="p-1 text-muted hover:text-black"
              >
                <MinusIcon className="w-3 h-3" />
              </button>
              <span>{cartItem.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(cartItem.product.id, cartItem.quantity + 1)
                }
                className="p-1 text-muted hover:text-black"
              >
                <PlusIcon className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(cartItem.product.id)}
              className="p-2 text-muted hover:text-red-500 transition-colors"
              title="Remover item"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
          <p className="text-lg font-bold">
            {formatPrice(cartItem.product.price ?? 0)}
          </p>
        </div>
      </div>
    </div>
  )
}

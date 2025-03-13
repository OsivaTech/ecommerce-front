'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'

export default function ShoppingCart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      nome: 'Produto 1',
      preco: 'R$ 99,90',
      categoria: 'Skin',
      imagem: '/prod1.jpg',
      quantidade: 1,
    },
    {
      id: 2,
      nome: 'Produto 2',
      preco: 'R$ 89,90',
      categoria: 'Hair',
      imagem: '/prod2.jpg',
      quantidade: 1,
    },
  ])

  const recommendedProducts = [
    { id: 3, nome: 'Produto 3', preco: 'R$ 129,90', imagem: '/prod1.jpg' },
    { id: 4, nome: 'Produto 4', preco: 'R$ 149,90', imagem: '/prod2.jpg' },
  ]

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
          : item,
      ),
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            {/* Imagem e detalhes */}
            <div className="flex items-center gap-4">
              <Image
                src={item.imagem}
                alt={item.nome}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{item.nome}</h3>
                <p className="text-blue-600 font-bold">{item.preco}</p>
                <p className="text-gray-500 text-sm">{item.categoria}</p>
              </div>
            </div>

            {/* Contador de quantidade */}
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="p-1 text-gray-600 hover:text-black"
              >
                <MinusIcon className="w-5 h-5" />
              </button>
              <span className="text-lg font-medium">{item.quantidade}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="p-1 text-gray-600 hover:text-black"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping & Returns */}
      <h3 className="text-xl font-semibold mb-4 mt-4">Shipping and Returns</h3>
      <div className="flex justify-between bg-gray-100 p-4 rounded-lg">
        <div>
          <h4 className="font-medium">Shipping</h4>
          <p className="text-gray-600">Free Shipping on all orders</p>
        </div>
        <p className="font-bold text-green-600">Free</p>
      </div>
      <div className="flex justify-between bg-gray-100 p-4 rounded-lg mt-4">
        <div>
          <h4 className="font-medium">Returns</h4>
          <p className="text-gray-600">30-day return policy</p>
        </div>
        <p className="font-bold text-green-600">Free</p>
      </div>
      {/* Promo Code */}
      <h3 className="text-xl font-semibold mb-4 mt-4">Promo Code</h3>
      <button className="flex items-center justify-center gap-2  bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700">
        Enter promo code
        <ArrowRightIcon className="w-5 h-5" />
      </button>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button className="bg-gray-300 text-black py-3 px-6 rounded-lg hover:bg-gray-400">
          Continue Shopping
        </button>
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
          Checkout
        </button>
      </div>

      {/* You May Also Like */}
      <h3 className="text-xl font-semibold mb-4">You May Also Like</h3>
      <div className="grid grid-cols-2 gap-6">
        {recommendedProducts.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <Image
              src={item.imagem}
              alt={item.nome}
              width={440}
              height={580}
              className="rounded-md object-cover"
            />
            <h4 className="mt-2 font-medium text-lg">{item.nome}</h4>
            <p className="text-blue-600 font-bold">{item.preco}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

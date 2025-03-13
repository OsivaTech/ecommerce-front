'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Store() {
  const categorias = ['All', 'Skin', 'Hair', 'Body', 'Oral', 'Dental', 'Gut']
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('All')

  const produtos = [
    { id: 1, nome: 'Produto 1', preco: 'R$ 99,90', imagem: '/prod1.jpg' },
    { id: 2, nome: 'Produto 2', preco: 'R$ 89,90', imagem: '/prod2.jpg' },
    { id: 3, nome: 'Produto 3', preco: 'R$ 79,90', imagem: '/prod3.jpg' },
    { id: 4, nome: 'Produto 4', preco: 'R$ 69,90', imagem: '/prod4.jpg' },
    { id: 5, nome: 'Produto 5', preco: 'R$ 59,90', imagem: '/prod5.jpg' },
    { id: 6, nome: 'Produto 6', preco: 'R$ 49,90', imagem: '/prod6.jpg' },
    { id: 7, nome: 'Produto 7', preco: 'R$ 39,90', imagem: '/prod7.jpg' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categorias */}
      <div className="flex gap-3 justify-center mb-6">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-md border ${categoriaSelecionada === cat ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
            onClick={() => setCategoriaSelecionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Input de busca */}
      <div className="flex items-center bg-white border rounded-md px-4 py-2 shadow-sm max-w-lg mx-auto mb-8">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search for products"
          className="ml-2 w-full outline-none border-none"
        />
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="flex flex-col items-center text-center"
          >
            <div className="w-[135px] h-[135px] rounded-md overflow-hidden">
              <Image
                src={produto.imagem}
                alt={produto.nome}
                width={135}
                height={135}
                className="object-cover"
              />
            </div>
            <h3 className="mt-2 font-medium">{produto.nome}</h3>
            <p className="text-blue-600 font-bold">{produto.preco}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

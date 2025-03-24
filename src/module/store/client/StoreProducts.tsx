'use client'

import { useState } from 'react'
import { PropsProductsAll } from '@/api/products/types'
import SearchInput from '@/components/InputSearch/InputSearch'
import ImageCard from '@/components/ImageCard/ImageCard'

interface FeaturedProductProps {
  products: PropsProductsAll[]
}

export default function StoreProducts({ products }: FeaturedProductProps) {
  const categorias = ['All', 'Skin', 'Hair', 'Body', 'Oral', 'Dental', 'Gut']
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('All')

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
      <div className="relative w-full mb-8 ">
        <SearchInput className="h-[60px]" />
      </div>
      {/* Lista de produtos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center text-center"
          >
            <ImageCard
              imageSrc={product.imageUrl}
              title={product.name}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import SearchInput from '@/components/InputSearch/InputSearch'
import Button from '@/components/Button/Button'
import { ProductResponse } from '@/types/api/Response/ProductResponse'
import {
  Category,
  CategoryResponse,
} from '@/types/api/Response/CategoryResponse'
import { ProductCard } from '@/components/ProductCard'

interface StoreProductsProps {
  products: ProductResponse
  categories: CategoryResponse
}

export default function StoreProducts({
  products,
  categories,
}: StoreProductsProps) {
  const [categoriaSelected, setCategoriaSelected] = useState<Category>()
  const [searchTerm, setSearchTerm] = useState('')

  const allCategory = { id: 0, name: 'Todos' }
  const categoriasWithAll = [allCategory, ...categories]

  const productsFilter = products.filter((product) => {
    const matchesCategory =
      categoriaSelected && categoriaSelected.id !== 0
        ? product.category.id === categoriaSelected.id
        : true
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearchTerm
  })

  return (
    <div className="container mx-auto px-4 py-8 justify-items-start">
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categoriasWithAll.map((cat) => (
          <div key={cat.id}>
            <Button
              text={cat.name}
              onClick={() => setCategoriaSelected(cat)}
              isActive={
                categoriaSelected?.id === cat.id ||
                (!categoriaSelected && cat.id === 0)
              }
              className="active:bg-cyan-700"
            />
          </div>
        ))}
      </div>

      <div className="relative w-full mb-8 ">
        <SearchInput
          className="h-[60px]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {productsFilter.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full place-items-center">
          {productsFilter.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Não há produtos disponíveis.</p>
        </div>
      )}
    </div>
  )
}

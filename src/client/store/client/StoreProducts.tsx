'use client'

import { useState } from 'react'
import { PropsProductsAll } from '@/api/products/types'
import SearchInput from '@/components/InputSearch/InputSearch'
import ImageCard from '@/components/ImageCard/ImageCard'
import { PropsCategoriesAll } from '@/api/categories/types'
import Button from '@/components/Button/Button'

interface StoreProductsProps {
  products: PropsProductsAll[]
  categories: PropsCategoriesAll[]
}

export default function StoreProducts({
  products,
  categories,
}: StoreProductsProps) {
  const [categoriaSelected, setCategoriaSelected] =
    useState<PropsCategoriesAll>()
  const [searchTerm, setSearchTerm] = useState('')

  const allCategory = { id: 0, name: 'Todos' }
  const categoriasWithAll = [allCategory, ...categories]

  const productsFilter = products.filter((product) => {
    const matchesCategory =
      categoriaSelected && categoriaSelected.id !== 0
        ? product.categoryId === categoriaSelected.id
        : true
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearchTerm
  })
  return (
    <div className="container mx-auto px-4 py-8 justify-items-start">
      <div className="flex gap-3 justify-center mb-6">
        {categoriasWithAll.map((cat) => (
          <div key={cat.id}>
            <Button text={cat.name} onClick={() => setCategoriaSelected(cat)} />
          </div>
        ))}
      </div>

      <div className="relative w-full mb-8 ">
        <SearchInput
          className="h-[60px]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center">
        {productsFilter.map((product) => (
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

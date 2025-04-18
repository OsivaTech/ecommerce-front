'use client'

import { useRef, useState, useEffect } from 'react'
import SearchInput from '@/components/InputSearch/InputSearch'
import Button from '@/components/Button/Button'
import { ProductResponse } from '@/types/api/Response/ProductResponse'
import { CategoryResponse } from '@/types/api/Response/CategoryResponse'
import { ProductCard } from '@/components/ProductCard'
import { ChevronUp } from 'lucide-react'

interface StoreProductsProps {
  products: ProductResponse
  categories: CategoryResponse
}

export default function StoreProducts({
  products,
  categories,
}: StoreProductsProps) {
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const handleScrollToCategory = (categoryName: string) => {
    const categoryElement = categoryRefs.current[categoryName]
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: 'smooth' })
      window.location.hash = `${categoryName}`
    }
  }

  const productsFilter = (searchTerm: string) =>
    products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true)
    } else {
      setShowScrollToTop(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const categoryName = window.location.hash
    if (categoryName) {
      const categoryElement = categoryRefs.current[categoryName]
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [categories])

  const filteredCategories = categories.filter((category) =>
    productsFilter(searchTerm).some(
      (product) => product.category.id === category.id,
    ),
  )

  return (
    <div className="container mx-auto px-4 py-8 justify-items-start">
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {filteredCategories.map((cat) => (
          <div key={cat.id}>
            <Button
              text={cat.name}
              onClick={() => handleScrollToCategory(cat.name)}
              className="active:bg-[#637587]"
            />
          </div>
        ))}
      </div>

      <div className="relative w-full mb-8">
        <SearchInput
          className="h-[60px]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCategories.map((category) => (
        <div
          key={category.id}
          ref={(el) => {
            categoryRefs.current[category.name] = el
          }}
          id={`${category.name}`} // Adiciona um ID para vincular ao hash
          className="mb-8"
        >
          <h2 className="text-xl font-bold mb-4">{category.name}</h2>
          <div className="flex flex-wrap gap-6 w-full">
            {productsFilter(searchTerm)
              .filter((product) => product.category.id === category.id)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      ))}

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
        >
          {<ChevronUp className="w-6 h-6" />}
        </button>
      )}
    </div>
  )
}

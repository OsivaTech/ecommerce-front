'use client'

import { useRef, useState, useEffect } from 'react'
import SearchInput from '@/components/InputSearch/InputSearch'
import { Button } from '@/components/ui/button'
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

  // Função para ordenar produtos: com estoque primeiro, sem estoque no final
  const sortProductsByStock = (productsToSort: ProductResponse) => {
    return [...productsToSort].sort((a, b) => {
      const aHasStock = a.stock > 0
      const bHasStock = b.stock > 0

      if (aHasStock && !bHasStock) return -1
      if (!aHasStock && bHasStock) return 1
      return 0
    })
  }

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
    <div className="md:container mx-auto py-8">
      <div className="flex gap-3 px-4 mb-6 overflow-x-auto pb-2 w-full hide-scrollbar">
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="flex-shrink-0">
            <Button
              variant="secondary"
              onClick={() => handleScrollToCategory(cat.name)}
              className="text-muted whitespace-nowrap"
            >
              {cat.name}
            </Button>
          </div>
        ))}
      </div>

      <div className="relative w-full mb-8 px-4">
        <SearchInput
          className="h-[50px]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCategories.map((category) => (
        <div
          key={category.id}
          ref={(el) => {
            categoryRefs.current[category.name] = el
          }}
          id={`${category.name}`}
          className="mb-8"
        >
          <h2 className="text-xl font-bold mb-4 px-4">{category.name}</h2>
          <div className="flex overflow-x-auto md:flex-wrap md:overflow-x-visible hide-scrollbar md:overflow-visible snap-x snap-mandatory">
            {sortProductsByStock(
              productsFilter(searchTerm).filter(
                (product) => product.category.id === category.id,
              ),
            ).map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 md:flex-shrink snap-center px-2 py-2"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-hover"
        >
          {<ChevronUp className="w-6 h-6" />}
        </button>
      )}
    </div>
  )
}

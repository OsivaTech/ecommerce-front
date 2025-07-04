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
    <div className="min-h-screen">
      {/* Header da página */}
      <div className="bg-transparent border-b border-gray-200">
        <div className="md:container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Todos os produtos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra nossa coleção completa de produtos de qualidade para
              você.
            </p>
          </div>

          {/* Barra de pesquisa melhorada */}
          <div className="max-w-2xl mx-auto mb-8 px-4">
            <SearchInput
              className="h-14 text-lg shadow-sm border-0 focus:ring-2 focus:ring-primary/20"
              placeholder="Buscar produtos..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtros por categoria */}
          <div className="flex gap-3 overflow-x-auto pb-4 w-full hide-scrollbar px-4 md:px-0 md:justify-center">
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="flex-shrink-0">
                <Button
                  variant="secondary"
                  onClick={() => handleScrollToCategory(cat.name)}
                  className="text-muted whitespace-nowrap px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {cat.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="md:container mx-auto py-12">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            ref={(el) => {
              categoryRefs.current[category.name] = el
            }}
            id={`${category.name}`}
            className="mb-16"
          >
            {/* Header da categoria */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {category.name}
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            {/* Grid de produtos */}
            <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 md:overflow-x-visible">
              {sortProductsByStock(
                productsFilter(searchTerm).filter(
                  (product) => product.category.id === category.id,
                ),
              ).map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[85vw] max-w-xs md:w-auto md:max-w-full snap-center group hover:transform hover:scale-102 transition-all duration-300"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Mensagem quando não há produtos */}
            {sortProductsByStock(
              productsFilter(searchTerm).filter(
                (product) => product.category.id === category.id,
              ),
            ).length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar sua busca ou filtrar por outra categoria
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Mensagem quando não há categorias */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Não encontramos produtos que correspondam à sua busca. Tente usar
              termos diferentes.
            </p>
          </div>
        )}
      </div>

      {/* Botão voltar ao topo melhorado */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-xl hover:bg-primary/90 hover:shadow-2xl transition-all duration-300 z-50 group"
        >
          <ChevronUp className="w-6 h-6 group-hover:animate-bounce" />
        </button>
      )}
    </div>
  )
}

'use client'

import { ProductFeaturedResponse } from '@/types/api/Response/ProductResponse'
import { formatPrice } from '@/utils/mask'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/providers/Auth/AuthContext'

interface RecomendedProductsProps {
  products: ProductFeaturedResponse
  title?: string
  subtitle?: string
  showPrice?: boolean
}

export const RecomendedProducts = ({
  products,
  showPrice = true,
}: RecomendedProductsProps) => {
  const { isAuthenticated } = useAuth()

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto mt-16 px-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-2xl font-bold">Produtos recomendados</h2>
        </div>
        <p className="text-muted">
          Selecionados especialmente para profissionais como você
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <Card
            key={product.id}
            className="p-4 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex flex-col h-full">
              {/* Imagem do produto */}
              <div className="relative mb-4">
                <div className="w-full h-48 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.file.url}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Badge de destaque */}
                <Badge className="absolute top-2 left-2 bg-primary text-white">
                  Recomendado
                </Badge>

                {/* Avaliação */}
                {/* <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">4.8</span>
                </div> */}
              </div>

              {/* Informações do produto */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-muted mb-2">
                  {product.category.name}
                </p>

                {/* Preço */}
                {showPrice && isAuthenticated && (
                  <div className="mb-3">
                    <p className="text-lg font-bold text-primary">
                      {formatPrice(product.price ?? 0)}
                    </p>
                  </div>
                )}

                {/* Botão de ação */}
                <div className="mt-auto">
                  <Link href={`/store/${product.id}`} className="w-full">
                    <Button size="sm" className="w-full">
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Botão para ver mais */}
      {products.length > 8 && (
        <div className="text-center mt-8">
          <Link href="/store">
            <Button variant="outline" size="lg">
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}

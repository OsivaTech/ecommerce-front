'use client'

import { Card } from '@/components/ui/card'
import { useAuth } from '@/providers/Auth/AuthContext'
import { Product } from '@/types/api/Response/ProductResponse'
import { formatPrice } from '@/utils/mask'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import AddToCart from '../AddToCart'
import { Button } from '../ui/button'

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const isOutOfStock = product.stock === 0

  return (
    <Card className="w-full h-full bg-white hover:shadow-xl transition-all duration-300 relative overflow-hidden shadow-md group">
      {isOutOfStock && (
        <>
          <div className="absolute inset-0 bg-black/50 z-10 rounded-lg" />
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
            Sem estoque
          </div>
        </>
      )}

      <div className="flex flex-col h-full">
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push(`/store/${product.id}`)
          }}
        >
          {/* Imagem do produto */}
          <div className="relative h-64 p-6 group-hover:bg-gradient-to-br transition-all duration-300 border-b border-gray-100">
            <Image
              src={product.file.url}
              alt={product.name}
              fill
              className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Informações do produto */}
          <div className="flex flex-col flex-1 p-6">
            <div className="flex flex-col flex-1">
              <div className="mb-2">
                <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                  {product.category.name}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>

              <div className="mt-auto">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(product.price ?? 0)}
                    </p>
                    <div className="text-sm text-gray-500">
                      {product.stock === 0 && 'Indisponível'}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Button
                      onClick={() => router.push('/login')}
                      className="text-primary hover:text-primary/80 font-medium"
                      variant="link"
                    >
                      Faça login para ver o preço
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Botão de adicionar ao carrinho */}
        {isAuthenticated && (
          <div className="p-4 border-t border-gray-100">
            <AddToCart product={product} />
          </div>
        )}
      </div>
    </Card>
  )
}

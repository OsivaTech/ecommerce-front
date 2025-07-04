'use client'

import AddToCart from '@/components/AddToCart'
import { ProductCard } from '@/components/ProductCard'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ProductHttp } from '@/http/Product'
import { isAuthenticated } from '@/lib/session'
import { Product } from '@/types/api/Response/ProductResponse'
import { formatPrice } from '@/utils/mask'
import {
  ChevronRight,
  Home,
  Truck,
  Shield,
  Share2,
  Eye,
  CreditCard,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'

export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = use(params)
  const [product, setProduct] = useState<Product>()
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loadingRelated, setLoadingRelated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProduct = await ProductHttp.getProductById(productId)
      const authenticated = await isAuthenticated()
      if (!fetchedProduct.hasError) {
        setProduct(fetchedProduct.data)

        // Buscar produtos relacionados da mesma categoria
        if (fetchedProduct.data.category?.id) {
          setLoadingRelated(true)
          const relatedResponse = await ProductHttp.getProductsByCategory(
            fetchedProduct.data.category.id,
          )
          if (!relatedResponse.hasError && relatedResponse.data) {
            // Filtrar o produto atual e pegar apenas 4 produtos relacionados
            const filtered = relatedResponse.data
              .filter((p) => p.id !== fetchedProduct.data.id)
              .slice(0, 4)
            setRelatedProducts(filtered)
          }
          setLoadingRelated(false)
        }
      }
      setIsUserAuthenticated(authenticated)
    }

    fetchData()
  }, [productId])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="lg:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <Home size={16} />
            Início
          </button>
          <ChevronRight size={16} />
          <button
            onClick={() => router.push(`/store#${product.category.name}`)}
            className="hover:text-blue-600 transition-colors"
          >
            {product.category.name}
          </button>
          <ChevronRight size={16} />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="relative overflow-hidden rounded-xl border-0 shadow-md">
              <div className="aspect-square relative">
                <Image
                  src={product.file.url}
                  fill
                  alt={product.name}
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 rounded-full bg-white/80 hover:bg-white"
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: product.name,
                            text: `Confira este produto: ${product.name}`,
                            url: window.location.href,
                          })
                          .catch((error) => {
                            console.log('Erro ao compartilhar:', error)
                          })
                      } else {
                        // Fallback para navegadores que não suportam Web Share API
                        navigator.clipboard
                          .writeText(window.location.href)
                          .then(() => {
                            alert('Link copiado para a área de transferência!')
                          })
                          .catch(() => {
                            // Fallback final - abrir em nova aba
                            window.open(window.location.href, '_blank')
                          })
                      }
                    }}
                  >
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              <Card className="w-20 h-20 relative overflow-hidden rounded-lg border-2 border-blue-500 cursor-pointer">
                <Image
                  src={product.file.url}
                  fill
                  alt={product.name}
                  className="object-cover"
                />
              </Card>
              {/* Add more thumbnails here if product has multiple images */}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category.name}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              {/* <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  (4.8 • 127 avaliações)
                </span>
              </div> */}
            </div>

            {/* Price Section */}
            <div className="bg-white p-6 rounded-xl border">
              {isUserAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">
                      {formatPrice(product.price ?? 0)}
                    </span>
                    {/* <span className="text-sm text-gray-500 line-through">
                      {formatPrice((product.price ?? 0) * 1.2)}
                    </span>
                    <Badge variant="destructive" className="text-xs">
                      -20%
                    </Badge> */}
                  </div>
                  <p className="text-sm text-gray-600">
                    Em até 12x de no cartão de crédito
                  </p>
                  <AddToCart product={product} />
                </div>
              ) : (
                <div className="text-center py-8">
                  <Eye size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Faça login para ver o preço
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Acesse sua conta para visualizar preços e fazer compras
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => router.push('/login')}
                      className="flex-1"
                    >
                      Entrar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push('/create-account')}
                      className="flex-1"
                    >
                      Criar Conta
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
                <Truck size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Entrega Rápida</p>
                  <p className="text-xs text-gray-500">Receba em até 4 horas</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Para entregas em BH
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
                <Shield size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-sm">Produto Original</p>
                  <p className="text-xs text-gray-500">100% autêntico</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
                <CreditCard size={20} className="text-orange-600" />
                <div>
                  <p className="font-medium text-sm">Compra Segura</p>
                  <p className="text-xs text-gray-500">Pagamento protegido</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-xl p-8 border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Descrição do Produto
          </h2>
          <Separator className="mb-6" />
          <div
            className="rich-text-content prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Produtos Relacionados
            </h2>
            {loadingRelated ? (
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-lg p-4 border animate-pulse flex-shrink-0 w-64 snap-center md:w-auto"
                  >
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="flex snap-center md:w-auto"
                  >
                    <ProductCard product={relatedProduct} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

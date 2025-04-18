'use client'

import AddToCart from '@/components/AddToCart'
import { Card } from '@/components/ui/card'
import { ProductHttp } from '@/http/Product'
import { isAuthenticated } from '@/lib/session'
import { Product } from '@/types/api/Response/ProductResponse'
import { ResponseData } from '@/types/Error'
import { formatPrice } from '@/utils/mask'
import { ChevronRight, Home } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'

export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = use(params) // Desestrutura o `productId` de `params` usando `use`
  const [product, setProduct] = useState<ResponseData<Product>>()
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProduct = await ProductHttp.getProductById(productId)
      const authenticated = await isAuthenticated()
      setProduct(fetchedProduct)
      setIsUserAuthenticated(authenticated)
    }

    fetchData()
  }, [productId])

  if (!product) {
    return <div>Loading...</div>
  }

  if (product.hasError) {
    return <div>Error</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 justify-items-start space-y-4">
      <div className="flex flex-row items-center">
        <p
          className="flex flex-row items-center gap-1 text-sm text-muted cursor-pointer"
          onClick={() => {
            router.push(`/`)
          }}
        >
          <Home size={16} />
          Início
        </p>
        <ChevronRight />
        <p
          className="text-sm text-muted cursor-pointer"
          onClick={() => {
            router.push(`/store#${product.data.category.name}`)
          }}
        >
          {product.data.category.name}
        </p>
        <ChevronRight />
        <p className="text-sm font-bold">{product.data.name}</p>
      </div>
      <div className="mx-auto flex gap-4 flex-col md:flex-row items-start pt-10 ">
        <div className="w-full lg:w-1/2  flex items-center justify-center bg-white">
          <Card className="h-[300px] lg:h-[500px] w-full lg:w-[550px] relative border-none shadow-none">
            <Image
              src={product.data.file.url}
              fill
              alt={product.data.name}
              className="object-cover"
            />
          </Card>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-between items-start h-full">
          <h1 className="text-2xl font-bold">{product.data.name}</h1>
          {isUserAuthenticated ? (
            <>
              <p className="text-lg text-muted">
                {formatPrice(product.data.price ?? 0)}
              </p>
              <AddToCart product={product.data} />
            </>
          ) : (
            <p className="text-sm text-muted">Faça login para ver o preço</p>
          )}
        </div>
      </div>
      <p className="text-2xl font-bold">Descrição</p>
      <p className="text-base text-muted">{product.data.description}</p>
    </div>
  )
}

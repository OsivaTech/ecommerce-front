'use client'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Product } from '@/types/api/Response/ProductResponse'
import { formatPrice } from '@/utils/mask'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/Auth/AuthContext'
import AddToCart from '../AddToCart'

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const isOutOfStock = product.stock === 0

  return (
    <Card className="py-4 w-[300px] h-[419px] hover:scale-102 transition-all duration-300 relative overflow-hidden">
      {isOutOfStock && (
        <>
          <div className="absolute inset-0 bg-black/40 z-10 rounded-lg" />
          <div className="absolute top-3 right-3 bg-gray-800 text-white px-2 py-1 rounded-md text-sm font-medium z-20">
            Sem estoque
          </div>
        </>
      )}
      <div
        className="flex flex-col h-full gap-2 px-[30px] cursor-pointer"
        onClick={() => {
          router.push(`/store/${product.id}`)
        }}
      >
        <div className="flex flex-col h-[189px] min-w-[244px] rounded-md items-center justify-center">
          <Image
            src={product.file.url}
            alt="Product Image"
            width={244}
            height={189}
            className="object-contain h-full w-full p-2"
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold">{product.name}</h3>
            <p className="text-sm text-muted">{product.category.name}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            {isAuthenticated && (
              <p className="text-lg font-medium">
                {formatPrice(product.price ?? 0)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={'space-y-4'}>
        <Separator />
        {isAuthenticated ? (
          <AddToCart product={product} />
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-lg text-red-500">Faça login para ver o preço</p>
          </div>
        )}
      </div>
    </Card>
  )
}

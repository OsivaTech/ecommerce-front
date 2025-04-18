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

  return (
    <Card className="py-4 w-[300px] h-[419px] hover:scale-102 transition-all duration-300">
      <div
        className="flex flex-col h-full gap-2 px-[30px] cursor-pointer"
        onClick={() => {
          router.push(`/store/${product.id}`)
        }}
      >
        <div className="flex flex-col h-[189px] min-w-[244px]">
          <Image
            src={product.file.url}
            alt="Product Image"
            width={244}
            height={189}
            className="object-cover h-[189px] w-[244px]"
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category.name}</p>
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

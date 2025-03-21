'use client'
import { PropsProducts } from '@/api/products/types'
import { formatPrice } from '@/utils/mask'
import Image from 'next/image'

interface FeaturedProductProps {
  products: PropsProducts[]
}

export const FeaturedProduct = ({ products }: FeaturedProductProps) => {
  return (
    <section className="container mx-auto mt-12 px-4 text-center">
      <h2 className="text-xl font-bold mb-3 text-left">Produtos em Destaque</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center">
        {products.map((product: PropsProducts) => (
          <div key={product.id} className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={144}
                height={144}
                className="object-cover"
              />
            </div>
            <h3 className="text-base">{product.name}</h3>
            <p className="text-gray-600 text-sm">
              {formatPrice(product.price)}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.ceil(products.length / 5) }).map(
          (_, index) => (
            <div key={index} className="w-3 h-3 bg-gray-300 rounded-full"></div>
          ),
        )}
      </div>
    </section>
  )
}

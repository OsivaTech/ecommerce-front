'use client'
import { PropsProductsFeatured } from '@/api/products/types'
import { formatPrice } from '@/utils/mask'
import Image from 'next/image'

interface FeaturedProductProps {
  products: PropsProductsFeatured[]
}

export const FeaturedProduct = ({ products }: FeaturedProductProps) => {
  return (
    <section className="container mx-auto mt-12 px-4 text-center">
      <h2 className="text-xl font-bold mb-3 text-left">Produtos em Destaque</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center">
        {products.map((product: PropsProductsFeatured) => (
          <div key={product.id} className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden shadow-md mb-3">
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
    </section>
  )
}

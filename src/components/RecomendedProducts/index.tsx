'use client'

import { ProductFeatured } from '@/types/api/Response/ProductResponse'
import { formatPrice } from '@/utils/mask'
import Image from 'next/image'

export const RecomendedProducts = ({
  product,
}: {
  product: ProductFeatured
}) => {
  return (
    <div className="flex flex-col items-center text-wrap justify-between w-[200px] h-[250px]">
      <div className="w-36 h-36 bg-white rounded-full overflow-hidden shadow-md mb-3">
        <Image
          src={product.file.url}
          alt={product.name}
          width={144}
          height={144}
          className="object-cover"
        />
      </div>
      <h3 className="text-base">{product.name}</h3>
      <p className="text-gray-600 text-sm">{formatPrice(product.price ?? 0)}</p>
    </div>
  )
}

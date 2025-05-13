'use client'

import { ProductCard } from '@/components/ProductCard'
import {
  ProductFeatured,
  ProductFeaturedResponse,
} from '@/types/api/Response/ProductResponse'

export default function FeaturedProduct({
  products,
}: {
  products: ProductFeaturedResponse
}) {
  return (
    <section className="container mx-auto mt-12 px-4">
      <h2 className="text-xl font-bold mb-3 text-left">Produtos em Destaque</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {products &&
          products.map((product: ProductFeatured) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  )
}

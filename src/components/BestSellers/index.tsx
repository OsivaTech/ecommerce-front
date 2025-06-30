import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductFeatured } from '@/types/api/Response/ProductResponse'

interface BestSellersProps {
  products: ProductFeatured[]
}

export const BestSellers = ({ products }: BestSellersProps) => {
  return (
    <section className="container mx-auto mt-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Mais vendidos</h2>
        <p className="text-muted">Produtos preferidos pelos nossos clientes</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="p-4 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image
                  src={product.file.url}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-xs text-muted mb-2">
                  {product.category.name}
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <Link href={`/store/${product.id}`}>
                  <Button size="sm" className="w-full">
                    Ver produto
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

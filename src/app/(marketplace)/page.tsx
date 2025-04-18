import { FeaturedProduct } from '@/client/home/client/FeaturedProduct/FeaturedProduct'
import { ProductHttp } from '@/http/Product'
import { Advertisement } from '@/components/Advertisement'

export default async function Home() {
  const products = await ProductHttp.getFeaturedProducts()

  if (products.hasError) {
    return <div>Error</div>
  }

  return (
    <div className="relative w-full">
      <Advertisement />
      <FeaturedProduct products={products.data} />
    </div>
  )
}

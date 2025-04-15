import { FeaturedProduct } from '@/client/home/client/FeaturedProduct/FeaturedProduct'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import Image from 'next/image'
import { ProductHttp } from '@/http/Product'

export default async function Home() {
  const products = await ProductHttp.getFeaturedProducts()

  if (products.hasError) {
    return <div>Error</div>
  }

  return (
    <div>
      <div className="relative w-full max-w-5xl mx-auto aspect-[928/480] mt-8">
        <Image
          src="/fundocontent.jpg"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <FeaturedProduct products={products.data} />
    </div>
  )
}

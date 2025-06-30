import StoreProducts from '@/components/StoreProducts/StoreProducts'
import { Advertisement } from '@/components/Advertisement'
import { CategoryHttp } from '@/http/Category'
import { ProductHttp } from '@/http/Product'
import { AdvertisementHttp } from '@/http/Advertisement'

export default async function Store() {
  // Fazendo todas as requisições simultaneamente
  const [products, categories, advertisements] = await Promise.all([
    ProductHttp.getProducts(),
    CategoryHttp.getAllCategories(),
    AdvertisementHttp.getAdvertisements(),
  ])

  if (products.hasError || categories.hasError || advertisements.hasError) {
    return <div>Error</div>
  }

  return (
    <>
      <Advertisement advertisements={advertisements.data} />
      <StoreProducts products={products.data} categories={categories.data} />
    </>
  )
}

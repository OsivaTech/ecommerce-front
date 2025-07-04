import StoreProducts from '@/components/StoreProducts/StoreProducts'
import { CategoryHttp } from '@/http/Category'
import { ProductHttp } from '@/http/Product'

export default async function Store() {
  // Fazendo todas as requisições simultaneamente
  const [products, categories] = await Promise.all([
    ProductHttp.getProducts(),
    CategoryHttp.getAllCategories(),
  ])

  if (products.hasError || categories.hasError) {
    return <div>Error</div>
  }

  return (
    <>
      <StoreProducts products={products.data} categories={categories.data} />
    </>
  )
}

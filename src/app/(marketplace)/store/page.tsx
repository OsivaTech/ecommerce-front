import StoreProducts from '@/components/StoreProducts/StoreProducts'
import { Advertisement } from '@/components/Advertisement'
import { CategoryHttp } from '@/http/Category'
import { ProductHttp } from '@/http/Product'

export default async function Store() {
  const products = await ProductHttp.getProducts()
  const categories = await CategoryHttp.getAllCategories()

  if (products.hasError) {
    return <div>Error</div>
  }

  if (categories.hasError) {
    return <div>Error</div>
  }
  return (
    <>
      <Advertisement />
      <StoreProducts products={products.data} categories={categories.data} />
    </>
  )
}

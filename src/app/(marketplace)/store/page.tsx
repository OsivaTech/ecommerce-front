import StoreProducts from '@/client/store/client/StoreProducts'
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
  return <StoreProducts products={products.data} categories={categories.data} />
}

import StoreProducts from '@/client/store/client/StoreProducts'
import { ProductHttp } from '@/http/Product'
import { CategoryHttp } from '@/http/Category'

export default async function Marketplace() {
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

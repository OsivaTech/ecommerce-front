import { categorieOperation } from '@/api/categories/operations'
import { productOperation } from '@/api/products/operations'
import StoreProducts from '@/client/store/client/StoreProducts'

export default async function Store() {
  const products = await productOperation.All()
  const categories = await categorieOperation.CategoriesAll()

  return <StoreProducts products={products} categories={categories} />
}

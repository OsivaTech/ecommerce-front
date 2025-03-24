import { getCategorieOperation } from '@/api/categories/operations'
import { getProductOperation } from '@/api/products/operations'
import StoreProducts from '@/client/store/client/StoreProducts'

export default async function Store() {
  const products = await getProductOperation.All()
  const categories = await getCategorieOperation.CategoriesAll()

  return <StoreProducts products={products} categories={categories} />
}

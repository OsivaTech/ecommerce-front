import { getProductOperation } from '@/api/products/operations'
import StoreProducts from '@/module/store/client/StoreProducts'

export default async function Store() {
  const products = await getProductOperation.All()

  return <StoreProducts products={products} />
}

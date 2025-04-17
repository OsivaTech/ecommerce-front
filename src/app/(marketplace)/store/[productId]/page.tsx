import AddToCart from '@/components/AddToCart'
import { Card } from '@/components/ui/card'
import { ProductHttp } from '@/http/Product'
import { isAuthenticated } from '@/lib/session'
import { formatPrice } from '@/utils/mask'
import Image from 'next/image'

export default async function ProductPage({
  params,
}: {
  params: { productId: string }
}) {
  const { productId } = await params
  const product = await ProductHttp.getProductById(productId)
  const isUserAuthenticated = await isAuthenticated()

  if (product.hasError) {
    return <div>Error</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 justify-items-start space-y-4">
      <div className="mx-auto flex gap-4 flex-col md:flex-row items-start pt-10 ">
        <div className="w-full lg:w-1/2  flex items-center justify-center bg-white">
          <Card className="h-[300px] lg:h-[500px] w-full lg:w-[550px] relative border-none shadow-none">
            <Image
              src={product.data.file.url}
              fill
              alt={product.data.name}
              className="object-cover"
            />
          </Card>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-between items-start h-full">
          <h1 className="text-2xl font-bold">{product.data.name}</h1>
          {isUserAuthenticated ? (
            <>
              <p className="text-sm text-gray-500">
                {formatPrice(product.data.price ?? 0)}
              </p>
              <AddToCart product={product.data} />
            </>
          ) : (
            <p className="text-sm text-gray-500">Faça login para ver o preço</p>
          )}
        </div>
      </div>
      <p className="text-xl font-bold">Descrição</p>
      <p className="text-sm text-gray-500">{product.data.description}</p>
    </div>
  )
}

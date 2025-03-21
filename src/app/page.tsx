import { getProductsOperation } from '@/api/products/operations'

import { FeaturedProduct } from '@/module/home/client/FeaturedProduct/FeaturedProduct'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import Image from 'next/image'

export default async function Home() {
  const products = await getProductsOperation()

  return (
    <div>
      <div className="relative w-full max-w-5xl mx-auto aspect-[928/480] mt-8">
        <Image
          src="/fundocontent.png"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 flex flex-col justify-end items-center text-white text-center bg-black/50 p-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            Lorem ipsum dolor sit amet
          </h1>
          <div className="mt-4 flex items-center bg-white rounded-lg overflow-hidden w-full max-w-lg">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 ml-3" />
            <input
              type="text"
              placeholder="Buscar produto..."
              className="flex-grow p-2 outline-none border-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2">
              Pesquisar
            </button>
          </div>
        </div>
      </div>
      <FeaturedProduct products={products} />
    </div>
  )
}

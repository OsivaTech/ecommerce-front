import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Home() {
  const produtos = [
    {
      id: 1,
      nome: 'Produto 1',
      preco: 'R$ 99,90',
      imagem: '/produto1.png',
    },
    { id: 2, nome: 'Produto 2', preco: 'R$ 89,90', imagem: '/produto2.png' },
    { id: 3, nome: 'Produto 3', preco: 'R$ 79,90', imagem: '/produto3.png' },
    { id: 4, nome: 'Produto 4', preco: 'R$ 69,90', imagem: '/produto4.png' },
    { id: 5, nome: 'Produto 5', preco: 'R$ 59,90', imagem: '/produto5.png' },
    { id: 6, nome: 'Produto 6', preco: 'R$ 49,90', imagem: '/produto6.png' },
  ]

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
      {/* Produtos em Destaque */}
      <section className="container mx-auto mt-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Produtos em Destaque</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center">
          {produtos.map((produto) => (
            <div key={produto.id} className="flex flex-col items-center">
              <div className="w-36 h-36 rounded-full overflow-hidden">
                <Image
                  src={produto.imagem}
                  alt={produto.nome}
                  width={144}
                  height={144}
                  className="object-cover"
                />
              </div>
              <h3 className="mt-2 font-medium">{produto.nome}</h3>
              <p className="text-blue-600 font-bold">{produto.preco}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(produtos.length / 5) }).map(
            (_, index) => (
              <div
                key={index}
                className="w-3 h-3 bg-gray-300 rounded-full"
              ></div>
            ),
          )}
        </div>
      </section>
    </div>
  )
}

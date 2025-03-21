'use client'

import { useState } from 'react'
import {
  MagnifyingGlassIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Logo from '@/assets/svg/logo'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Esquerda - Logo e Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            <Logo />
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex gap-4">
            <Link href="/store" className="hover:text-blue-600">
              Loja
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              Sobre
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contate-nos
            </Link>
          </nav>
        </div>

        {/* Direita - Barra de Pesquisa e Botões */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center border rounded-lg px-3 py-1">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar..."
              className="ml-2 outline-none border-none"
            />
          </div>

          <Link href="/create-account">
            <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg">
              Entrar / Cadastrar
            </button>
          </Link>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <HeartIcon className="w-6 h-6 text-red-500" />
          </button>
          <Link href="/cart">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <ShoppingCartIcon className="w-6 h-6 text-blue-500" />
            </button>
          </Link>
          {/* Menu Mobile */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col items-center gap-4 p-4 bg-white border-t">
          <Link href="/loja" className="hover:text-blue-600">
            Loja
          </Link>
          <Link href="/sobre" className="hover:text-blue-600">
            Sobre
          </Link>
          <Link href="/contato" className="hover:text-blue-600">
            Contate-nos
          </Link>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Entrar / Cadastrar
          </button>
          <div className="flex gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <HeartIcon className="w-6 h-6 text-red-500" />
            </button>
            <Link href="/cart">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <ShoppingCartIcon className="w-6 h-6 text-blue-500" />
              </button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

'use client'

import { useState } from 'react'
import {
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Logo from '@/assets/svg/logo'

import SearchInput from '../../../components/InputSearch/InputSearch'
import Button from '@/components/Button/Button'
import IconButton from '@/components/ButtonIcon/IconButton'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-gray-100 shadow-md">
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
          <SearchInput />

          <Link href="/create-account">
            <Button text="Entrar / Cadastrar" />
          </Link>
          <IconButton icon={<HeartIcon className="h-6 w-6 text-[#0D141C]" />} />
          <Link href="/cart">
            <IconButton
              icon={<ShoppingBagIcon className="h-6 w-6 text-[#0D141C]" />}
            />
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
                <ShoppingBagIcon className="w-6 h-6 text-blue-500" />
              </button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

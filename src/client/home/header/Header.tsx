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

          <nav className="hidden lg:flex gap-4">
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

        <div className="hidden lg:flex items-center gap-4">
          <div className="w-[160px]">
            <SearchInput />
          </div>
          <Link href="/create-account">
            <Button text="Entrar / Cadastrar" className="w-[145px]" />
          </Link>
          <IconButton icon={<HeartIcon className="h-6 w-6 text-[#0D141C]" />} />
          <Link href="/cart">
            <IconButton
              icon={<ShoppingBagIcon className="h-6 w-6 text-[#0D141C]" />}
            />
          </Link>
          {/* Menu Mobile */}
        </div>
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="lg:hidden flex flex-col items-center gap-4 p-4 bg-gray-100 ">
          <Link href="/store" className="hover:text-blue-600">
            Loja
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            Sobre
          </Link>
          <Link href="/contact" className="hover:text-blue-600">
            Contate-nos
          </Link>
          <Button text="Entrar / Cadastrar" className="w-[145px]" />
          <div className="flex gap-4">
            <IconButton
              icon={<HeartIcon className="h-6 w-6 text-[#0D141C]" />}
            />
            <Link href="/cart">
              <IconButton
                icon={<ShoppingBagIcon className="h-6 w-6 text-[#0D141C]" />}
              />
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

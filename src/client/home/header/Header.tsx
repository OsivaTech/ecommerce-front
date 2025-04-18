'use client'

import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Logo from '@/assets/svg/logo'
import { HeaderActions } from '@/components/HeaderActions'
import { APP_LINKS } from '../../../../constants'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-transparent border-b-2 border-secondary">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Esquerda - Logo e Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold">
            <Logo />
          </Link>

          <nav className="hidden lg:flex gap-4">
            <Link href={APP_LINKS.STORE()} className="hover:text-primary">
              Loja
            </Link>
            <Link href={APP_LINKS.ABOUT()} className="hover:text-primary">
              Sobre
            </Link>
            <Link href={APP_LINKS.CONTACT()} className="hover:text-primary">
              Contate-nos
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <HeaderActions />
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <XMarkIcon className="w-5 h-5" />
          ) : (
            <Bars3Icon className="w-5 h-5" />
          )}
        </button>
      </div>

      <div
        className={`flex flex-col items-center gap-4 lg:hidden bg-transparent transition-all duration-300 ease-in-out ${
          menuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="flex items-center justify-center gap-4 w-full p-4">
          <Link onClick={() => setMenuOpen(false)} href={APP_LINKS.STORE()}>
            Loja
          </Link>
          <Link onClick={() => setMenuOpen(false)} href={APP_LINKS.ABOUT()}>
            Sobre
          </Link>
          <Link onClick={() => setMenuOpen(false)} href={APP_LINKS.CONTACT()}>
            Contate-nos
          </Link>
        </div>
        <div className="flex items-center gap-4 pb-2">
          <HeaderActions />
        </div>
      </div>
    </header>
  )
}

'use client'

import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { HeaderActions } from '@/components/Header/Actions'
import { APP_LINKS } from '../../../constants'
import { Drawer } from '@/components/Drawer'

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-background border-b-2 border-secondary fixed top-0 left-0 w-full z-50 h-18">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Esquerda - Logo */}
        <div className="flex items-center gap-6">
          <button
            className="lg:hidden mr-2"
            onClick={() => setDrawerOpen(true)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <Link href="/" className="text-2xl font-bold">
            <Image src="/images/logo.svg" alt="Logo" width={20} height={36} />
          </Link>
          <nav className="hidden lg:flex gap-4">
            <Link
              href={APP_LINKS.HOMEPAGE()}
              className={`hover:text-primary ${
                isActive(APP_LINKS.HOMEPAGE())
                  ? 'text-primary border-b-2 border-primary'
                  : ''
              }`}
            >
              Início
            </Link>
            <Link
              href={APP_LINKS.STORE()}
              className={`hover:text-primary ${
                isActive(APP_LINKS.STORE())
                  ? 'text-primary border-b-2 border-primary'
                  : ''
              }`}
            >
              Loja
            </Link>
            <Link
              href={APP_LINKS.ABOUT()}
              className={`hover:text-primary ${
                isActive(APP_LINKS.ABOUT())
                  ? 'text-primary border-b-2 border-primary'
                  : ''
              }`}
            >
              Sobre
            </Link>
            <Link
              href={APP_LINKS.CONTACT()}
              className={`hover:text-primary ${
                isActive(APP_LINKS.CONTACT())
                  ? 'text-primary border-b-2 border-primary'
                  : ''
              }`}
            >
              Contate-nos
            </Link>
          </nav>
        </div>
        {/* Direita - Ícones sempre visíveis */}
        <div className="flex items-center gap-4">
          <HeaderActions />
        </div>
      </div>

      {/* Drawer lateral para mobile */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isActive={isActive}
      />
    </header>
  )
}

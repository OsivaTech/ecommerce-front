'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  RiThreadsLine,
  RiInstagramLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFacebookFill,
  RiLinkedinFill,
} from 'react-icons/ri'
import { APP_LINKS } from '../../../constants'
import { CategoryHttp } from '@/http/Category'

export default function Footer() {
  const [openSections, setOpenSections] = useState<number | null>(null)
  const [categories, setCategories] = useState<{ name: string }[]>([]) // Estado para armazenar as categorias
  const router = useRouter()

  const toggleSection = (index: number) => {
    setOpenSections(openSections === index ? null : index)
  }

  // Buscar categorias ao carregar o componente
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await CategoryHttp.getAllCategories()
      if (!fetchedCategories.hasError) {
        setCategories(
          fetchedCategories.data.map((category: { name: string }) => ({
            name: category.name,
          })),
        )
      } else {
        console.error('Error fetching categories:', fetchedCategories.error)
      }
    }

    fetchCategories()
  }, [])

  // Dados dos links
  const links = [
    {
      title: 'Navegação',
      items: [
        { label: 'Loja', href: `${APP_LINKS.STORE()}` },
        { label: 'Sobre', href: `${APP_LINKS.ABOUT()}` },
        { label: 'Contate-nos', href: `${APP_LINKS.CONTACT()}` },
      ],
    },
    {
      title: 'Produtos',
      items: categories.map((category) => ({
        label: category.name,
        href: `${APP_LINKS.STORE()}#${category.name}`,
      })), // Preenche dinamicamente com base nas categorias
    },
    {
      title: 'Ajuda',
      items: [
        { label: 'FAQ', href: `${APP_LINKS.FAQ()}` },
        {
          label: 'WhatsApp',
          href: 'https://wa.me/5531972498696',
        },
      ],
    },
  ]

  return (
    <footer className="container mx-auto bg-background">
      <div className="px-6 py-10 md:px-14 md:py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Logo */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-app-secondary mb-4">
              Ls Injectable
            </h1>
            <h2 className="text-sm text-gray-500 mb-4">Medicine injectable</h2>
            <h2 className="text-sm text-gray-500 mb-4">
              CNPJ: 59.960.636/0001-28
            </h2>
            <div className="flex gap-6">
              <SocialLinks />
            </div>
          </div>

          {/* Links - Desktop */}
          <div className="hidden md:flex gap-20">
            {links.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-app-secondary text-2xl font-bold mb-2">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      {item.href.startsWith('http') ||
                      item.href.startsWith('mailto') ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-app-secondary"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <button
                          onClick={() => router.push(item.href)}
                          className="hover:text-app-secondary"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Links - Mobile Accordion */}
          <div className="md:hidden space-y-4 text-sm mb-20">
            {links.map((section, idx) => (
              <div
                key={idx}
                className="border-b border-gray-700 pb-2 transition-all duration-300"
              >
                <button
                  className="text-app-secondary font-medium cursor-pointer flex justify-between items-center w-full"
                  onClick={() => toggleSection(idx)}
                >
                  <span className="text-lg">{section.title}</span>
                  {openSections === idx ? (
                    <RiArrowUpSLine className="w-4 h-4" />
                  ) : (
                    <RiArrowDownSLine className="w-4 h-4" />
                  )}
                </button>
                <ul
                  className={`mt-2 ml-4 space-y-2 transition-all duration-300 ${
                    openSections === idx
                      ? 'max-h-screen opacity-100'
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      {item.href.startsWith('http') ||
                      item.href.startsWith('mailto') ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-app-secondary text-base"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <button
                          onClick={() => router.push(item.href)}
                          className="hover:text-app-secondary text-base"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export const SocialLinks = ({
  className = 'text-black hover:text-[#AB8256] transition',
}: {
  className?: string
}) => {
  return (
    <div className="flex gap-6">
      <a
        href="https://www.instagram.com/lsinjectable"
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <RiInstagramLine size={24} />
      </a>
      <a
        href="https://www.threads.net/@lsinjectable"
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <RiThreadsLine size={24} />
      </a>
      <a
        href="https://www.facebook.com/lsinjectable"
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <RiFacebookFill size={24} />
      </a>
      <a
        href="https://www.facebook.com/lsinjectable"
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <RiLinkedinFill size={24} />
      </a>
    </div>
  )
}

import { CategoryHttp } from '@/http/Category'
import { APP_LINKS } from '../../../constants'
import {
  RiThreadsLine,
  RiInstagramLine,
  RiFacebookFill,
  RiLinkedinFill,
} from 'react-icons/ri'
import Link from 'next/link'

export default async function Footer() {
  // Buscar categorias no servidor
  const categoriesResponse = await CategoryHttp.getAllCategories()
  const categories = categoriesResponse.hasError
    ? []
    : categoriesResponse.data.map((category: { name: string }) => ({
        name: category.name,
      }))

  // Dados dos links
  const links = [
    {
      title: 'Navegação',
      items: [
        { label: 'Início', href: `${APP_LINKS.HOMEPAGE()}` },
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
      })),
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
                        <Link
                          href={item.href}
                          className="hover:text-app-secondary"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Links - Mobile */}
          <div className="md:hidden space-y-4 text-sm mb-20">
            {links.map((section, idx) => (
              <div key={idx} className="border-b border-gray-700 pb-2">
                <h4 className="text-app-secondary font-medium text-lg mb-2">
                  {section.title}
                </h4>
                <ul className="ml-4 space-y-2">
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
                        <Link
                          href={item.href}
                          className="hover:text-app-secondary text-base"
                        >
                          {item.label}
                        </Link>
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

'use client'
import { menuItems } from '@/components/AdminSideMenu/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const AdminSideMenu = () => {
  const pathname = usePathname()
  const selectedItem = pathname.split('/').pop()

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 p-4 border-r h-full">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition ${
              selectedItem === item.id
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            {item.icon}
            <span className="text-lg">{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

'use client'
import { menuItems } from '@/components/AdminSideMenu/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const AdminSideMenu = () => {
  const pathname = usePathname()
  const selectedItem = pathname.split('/').pop()

  return (
    <aside className="w-full lg:w-1/4 h-full text-primary">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = selectedItem === item.href.split('/').pop()
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center gap-3 w-full h-[40px] p-3 rounded-[12px] text-sm transition text-primary hover:bg-secondary group',
                isActive && 'bg-secondary',
              )}
              aria-selected={isActive}
            >
              {isActive ? item.iconSolid : item.icon}
              <span className="text-lg">{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

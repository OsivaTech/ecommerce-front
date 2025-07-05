'use client'

import { ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import IconButton from '@/components/ButtonIcon/IconButton'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/useCart'
import { useAuth } from '@/providers/Auth/AuthContext'
import { APP_LINKS } from '../../../../constants'

export const HeaderActions = () => {
  const router = useRouter()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? (
    <>
      <Link href={APP_LINKS.ACCOUNT()}>
        <IconButton
          icon={
            <UserIcon className="h-5 w-5 text-text-primary cursor-pointer" />
          }
        />
      </Link>
      <Link href={APP_LINKS.CART()}>
        <div className="relative">
          <IconButton
            icon={
              <ShoppingBagIcon className="h-5 w-5 text-base cursor-pointer" />
            }
            onClick={() => router.push(APP_LINKS.CART())}
          />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </Link>
    </>
  ) : (
    <div className="flex gap-2">
      <Link href={APP_LINKS.LOGIN()}>
        <Button variant="primary">Conecte-se</Button>
      </Link>
    </div>
  )
}

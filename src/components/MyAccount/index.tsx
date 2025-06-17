'use client'

import { User, ShoppingCart, Settings, LogOut, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { APP_LINKS, APP_LINKS_ACCOUNT } from '../../../constants'
import { useAuth } from '../../providers/Auth/AuthContext'
import { useEffect, useState } from 'react'
import { UserHttp } from '@/http/User'

export const MyAccountPage = () => {
  const router = useRouter()
  const { signOut } = useAuth()
  const [isUserAdmin, setIsUserAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      const currentUser = await UserHttp.getCurrentUser()

      if (currentUser.hasError) {
        console.log(currentUser.error)
        return
      }

      setIsUserAdmin(currentUser.data.role === 'Administrator')
    }

    checkAdmin()
  }, [])

  const handleOptionClick = (title: string) => {
    switch (title) {
      case 'Minhas informações':
        router.push(APP_LINKS_ACCOUNT.INFO())
        break
      case 'Endereço':
        router.push(APP_LINKS_ACCOUNT.ADDRESS())
        break
      case 'Seus pedidos':
        router.push(APP_LINKS_ACCOUNT.ORDERS())
        break
      case 'Administrador':
        router.push(APP_LINKS.ADMIN())
        break
      case 'Sair':
        signOut()
        break
      default:
        break
    }
  }

  const accountOptions = [
    {
      icon: <User size={24} />,
      title: 'Minhas informações',
      description: 'Aqui você pode editar suas informações pessoais.',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Endereço',
      description: 'Gerencie seu endereço de entrega.',
    },
    {
      icon: <ShoppingCart size={24} />,
      title: 'Seus pedidos',
      description: 'Aqui você pode ver o histórico dos seus últimos pedidos.',
    },
    ...(isUserAdmin
      ? [
          {
            icon: <Settings size={24} />,
            title: 'Administrador',
            description: 'Acessar painel administrativo.',
          },
        ]
      : []),
    {
      icon: <LogOut size={24} />,
      title: 'Sair',
      description: 'Sair da conta.',
    },
  ]

  return (
    <div className="w-full px-2">
      <div className="space-y-4">
        {accountOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => handleOptionClick(option.title)}
          >
            <div className="flex items-center justify-center w-16 h-16 min-w-[64px] min-h-[64px] bg-primary rounded-lg text-white">
              {option.icon}
            </div>
            <div>
              <h2 className="text-lg font-bold text-title">{option.title}</h2>
              <p className="text-sm text-muted">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

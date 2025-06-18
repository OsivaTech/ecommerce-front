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
      case 'Meus pedidos':
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
      title: 'Meus pedidos',
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
    <div className="w-full px-2 max-w-4xl mx-auto mt-8 mb-2">
      {/* Seção do Admin separada */}
      {isUserAdmin && (
        <div className="mb-8">
          <div
            className="flex items-center gap-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg cursor-pointer hover:bg-yellow-200 transition-colors shadow-sm"
            onClick={() => handleOptionClick('Administrador')}
          >
            <div className="flex items-center justify-center w-16 h-16 min-w-[64px] min-h-[64px] bg-yellow-400 rounded-lg text-white">
              <Settings size={28} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-yellow-900">
                Administrador
              </h2>
              <p className="text-sm text-yellow-800">
                Acessar painel administrativo.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Grid de opções da conta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {accountOptions
          .filter((option) => option.title !== 'Administrador')
          .map((option, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:shadow-md hover:border-primary transition-all min-h-[140px]"
              onClick={() => handleOptionClick(option.title)}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg text-white mb-2">
                {option.icon}
              </div>
              <div>
                <h2 className="text-base font-semibold text-title mb-1">
                  {option.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-snug">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

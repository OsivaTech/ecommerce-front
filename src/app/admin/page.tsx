'use client'

import { useState } from 'react'
import {
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  ShoppingCartIcon,
  BellIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'

const menuItems = [
  {
    id: 'home',
    title: 'Home',
    icon: <HomeIcon className="h-6 w-6" />,
    content: 'Bem-vindo à Home!',
  },
  {
    id: 'profile',
    title: 'Perfil',
    icon: <UserIcon className="h-6 w-6" />,
    content: 'Aqui estão os detalhes do seu perfil.',
  },
  {
    id: 'orders',
    title: 'Pedidos',
    icon: <ShoppingCartIcon className="h-6 w-6" />,
    content: 'Seus pedidos recentes aparecem aqui.',
  },
  {
    id: 'notifications',
    title: 'Notificações',
    icon: <BellIcon className="h-6 w-6" />,
    content: 'Veja suas notificações.',
  },
  {
    id: 'settings',
    title: 'Configurações',
    icon: <Cog6ToothIcon className="h-6 w-6" />,
    content: 'Gerencie suas configurações.',
  },
  {
    id: 'about',
    title: 'Sobre',
    icon: <InformationCircleIcon className="h-6 w-6" />,
    content: 'Informações sobre nós.',
  },
]

export default function MenuPage() {
  const [selected, setSelected] = useState('home')

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Menu Lateral */}
      <aside className="w-full md:w-1/3 lg:w-1/4 bg-gray-100 p-4 border-r">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition ${
                selected === item.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200'
              }`}
            >
              {item.icon}
              <span className="text-lg">{item.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Conteúdo à Direita */}
      <main className="flex-1 p-6">
        {menuItems.find((item) => item.id === selected)?.content}
      </main>
    </div>
  )
}

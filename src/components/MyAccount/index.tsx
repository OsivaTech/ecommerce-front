'use client'

import { User, ShoppingCart, Settings } from 'lucide-react'

export const MyAccountPage = () => {
  const accountOptions = [
    {
      icon: <User size={24} />,
      title: 'Minhas informações',
      description: 'Aqui você pode editar suas informações pessoais.',
    },
    {
      icon: <ShoppingCart size={24} />,
      title: 'Seus pedidos',
      description: 'Aqui você pode ver o histórico dos seus últimos pedidos.',
    },
    {
      icon: <Settings size={24} />,
      title: 'Administrador',
      description: 'Acessar painel administrativo.',
    },
  ]

  return (
    <div className="w-full container mx-auto px-2">
      <h1 className="text-2xl font-bold mb-6">Minha Conta</h1>
      <div className="space-y-4">
        {accountOptions.map((option, index) => (
          <div key={index} className="flex items-center gap-4 cursor-pointer">
            <div className="flex items-center justify-center w-20 h-20 bg-[#b08d5b] rounded-lg">
              {option.icon}
            </div>
            <div>
              <h2 className="text-lg font-bold">{option.title}</h2>
              <p className="text-sm text-gray-500">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

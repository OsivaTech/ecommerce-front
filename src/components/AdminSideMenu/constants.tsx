import {
  BellIcon,
  Cog6ToothIcon,
  HomeIcon,
  InformationCircleIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

export const menuItems = [
  {
    id: 'home',
    title: 'Home',
    icon: <HomeIcon className="h-6 w-6" />,
    href: '/admin',
  },
  {
    id: 'profile',
    title: 'Perfil',
    icon: <UserIcon className="h-6 w-6" />,
    href: '/admin/profile',
  },
  {
    id: 'orders',
    title: 'Pedidos',
    icon: <ShoppingCartIcon className="h-6 w-6" />,
    href: '/admin/orders',
  },
  {
    id: 'notifications',
    title: 'Notificações',
    icon: <BellIcon className="h-6 w-6" />,
    href: '/admin/notifications',
  },
  {
    id: 'settings',
    title: 'Configurações',
    icon: <Cog6ToothIcon className="h-6 w-6" />,
    href: '/admin/settings',
  },
  {
    id: 'about',
    title: 'Sobre',
    icon: <InformationCircleIcon className="h-6 w-6" />,
    href: '/admin/about',
  },
]

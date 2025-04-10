import { ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline'
import {
  ChartBarIcon as ChartBarIconSolid,
  ClockIcon as ClockIconSolid,
} from '@heroicons/react/24/solid'
export const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <ChartBarIcon className="h-6 w-6" />,
    iconSolid: <ChartBarIconSolid className="h-6 w-6" />,
    href: '/admin/dashboard',
  },
  {
    id: 'user-management',
    title: 'Gestão de Usuários',
    icon: <ClockIcon className="h-6 w-6 " />,
    iconSolid: <ClockIconSolid className="h-6 w-6 " />,
    href: '/admin/user-management',
  },
  // {
  //   id: 'orders',
  //   title: 'Pedidos',
  //   icon: <ShoppingCartIcon className="h-6 w-6" />,
  //   href: '/admin/orders',
  // },
  // {
  //   id: 'notifications',
  //   title: 'Notificações',
  //   icon: <BellIcon className="h-6 w-6" />,
  //   href: '/admin/notifications',
  // },
  // {
  //   id: 'settings',
  //   title: 'Configurações',
  //   icon: <Cog6ToothIcon className="h-6 w-6" />,
  //   href: '/admin/settings',
  // },
  // {
  //   id: 'about',
  //   title: 'Sobre',
  //   icon: <InformationCircleIcon className="h-6 w-6" />,
  //   href: '/admin/about',
  // },
]

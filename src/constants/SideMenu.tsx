import {
  ChartBarIcon,
  ClockIcon,
  ShoppingCartIcon,
  CubeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import {
  ChartBarIcon as ChartBarIconSolid,
  ClockIcon as ClockIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  CubeIcon as CubeIconSolid,
  UsersIcon as UsersIconSolid,
} from '@heroicons/react/24/solid'
import { APP_LINKS_ADMIN } from '../../constants'

export const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <ChartBarIcon className="h-6 w-6" />,
    iconSolid: <ChartBarIconSolid className="h-6 w-6" />,
    href: APP_LINKS_ADMIN.PANEL(),
  },
  {
    id: 'user-management',
    title: 'Gestão de cadastros',
    icon: <ClockIcon className="h-6 w-6 " />,
    iconSolid: <ClockIconSolid className="h-6 w-6 " />,
    href: APP_LINKS_ADMIN.USERS(),
  },
  {
    id: 'orders',
    title: 'Pedidos',
    icon: <ShoppingCartIcon className="h-6 w-6" />,
    iconSolid: <ShoppingCartIconSolid className="h-6 w-6" />,
    href: APP_LINKS_ADMIN.ORDER(),
  },
  {
    id: 'stock',
    title: 'Estoque',
    icon: <CubeIcon className="h-6 w-6" />,
    iconSolid: <CubeIconSolid className="h-6 w-6" />,
    href: APP_LINKS_ADMIN.STOCK(),
  },
  {
    id: 'users',
    title: 'Usuários',
    icon: <UsersIcon className="h-6 w-6" />,
    iconSolid: <UsersIconSolid className="h-6 w-6" />,
    href: APP_LINKS_ADMIN.USER(),
  },
  // {
  //   id: 'about',
  //   title: 'Sobre',
  //   icon: <InformationCircleIcon className="h-6 w-6" />,
  //   href: '/admin/about',
  // },
]

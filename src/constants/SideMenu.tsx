import {
  ChartBarIcon,
  ClockIcon,
  ShoppingCartIcon,
  CubeIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArchiveBoxIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline'
import {
  ChartBarIcon as ChartBarIconSolid,
  ClockIcon as ClockIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  CubeIcon as CubeIconSolid,
  UsersIcon as UsersIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  ArchiveBoxIcon as ArchiveBoxIconSolid,
  MegaphoneIcon as MegaphoneIconSolid,
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
    id: 'advertisements',
    title: 'Anúncios',
    icon: <MegaphoneIcon className="h-6 w-6" />,
    iconSolid: <MegaphoneIconSolid className="h-6 w-6" />,
    href: APP_LINKS_ADMIN.ADVERTISEMENTS(),
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
    id: 'packages',
    title: 'Pacotes',
    icon: <ArchiveBoxIcon className="h-6 w-6" />,
    iconSolid: <ArchiveBoxIconSolid className="h-6 w-6" />,
    href: APP_LINKS_ADMIN.PACKAGES(),
  },
  {
    id: 'users',
    title: 'Usuários',
    icon: <UsersIcon className="h-6 w-6" />,
    iconSolid: <UsersIconSolid className="h-6 w-6" />,
    href: APP_LINKS_ADMIN.USER(),
  },
  {
    id: 'settings',
    title: 'Configurações',
    icon: <Cog6ToothIcon className="h-6 w-6" />,
    iconSolid: <Cog6ToothIconSolid className="h-6 w-6" />,
    href: APP_LINKS_ADMIN.SETTINGS(),
  },
  // {
  //   id: 'about',
  //   title: 'Sobre',
  //   icon: <InformationCircleIcon className="h-6 w-6" />,
  //   href: '/admin/about',
  // },
]

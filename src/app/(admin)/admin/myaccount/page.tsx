import {
  HomeIcon,
  UserIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  HeartIcon,
  CogIcon,
  LockClosedIcon,
  BellIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'

const accountOptions = [
  {
    icon: UserIcon,
    title: 'Profile Information',
    subtitle: 'Update your personal details',
  },
  {
    icon: CreditCardIcon,
    title: 'Payment Methods',
    subtitle: 'Manage your saved cards',
  },
  {
    icon: ShoppingBagIcon,
    title: 'Order History',
    subtitle: 'View your past purchases',
  },
  {
    icon: HeartIcon,
    title: 'Wishlist',
    subtitle: 'View and manage your favorite items',
  },
  { icon: CogIcon, title: 'Settings', subtitle: 'Adjust your preferences' },
  {
    icon: LockClosedIcon,
    title: 'Security',
    subtitle: 'Update your password and security settings',
  },
  {
    icon: BellIcon,
    title: 'Notifications',
    subtitle: 'Manage your notification preferences',
  },
  {
    icon: QuestionMarkCircleIcon,
    title: 'Help & Support',
    subtitle: 'Get assistance and FAQs',
  },
  {
    icon: HomeIcon,
    title: 'Address Book',
    subtitle: 'Manage your shipping addresses',
  },
]

export default function MyAccount() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-gray-500 text-sm mb-4">
        <span className="text-gray-700">Home</span> /{' '}
        <span className="font-semibold">My Account</span>
      </nav>

      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6">My Account</h2>

      {/* Account Options */}
      <div className="space-y-6">
        {accountOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-white shadow rounded-lg hover:bg-gray-50 transition"
          >
            <option.icon className="w-12 h-12 text-gray-700" />
            <div>
              <h3 className="text-lg font-semibold">{option.title}</h3>
              <p className="text-gray-500 text-sm">{option.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

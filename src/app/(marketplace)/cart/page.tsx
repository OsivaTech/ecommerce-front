import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { ShoppingCartListItem } from '@/components/ShoppingCartLIstItem'

export default function ShoppingCart() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      <div className="space-y-6">
        <ShoppingCartListItem />
      </div>

      {/* Shipping & Returns */}
      <h3 className="text-xl font-semibold mb-4 mt-4">Shipping and Returns</h3>
      <div className="flex justify-between bg-gray-100 p-4 rounded-lg">
        <div>
          <h4 className="font-medium">Shipping</h4>
          <p className="text-gray-600">Free Shipping on all orders</p>
        </div>
        <p className="font-bold text-green-600">Free</p>
      </div>
      <div className="flex justify-between bg-gray-100 p-4 rounded-lg mt-4">
        <div>
          <h4 className="font-medium">Returns</h4>
          <p className="text-gray-600">30-day return policy</p>
        </div>
        <p className="font-bold text-green-600">Free</p>
      </div>
      {/* Promo Code */}
      <h3 className="text-xl font-semibold mb-4 mt-4">Promo Code</h3>
      <button className="flex items-center justify-center gap-2  bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700">
        Enter promo code
        <ArrowRightIcon className="w-5 h-5" />
      </button>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button className="bg-gray-300 text-black py-3 px-6 rounded-lg hover:bg-gray-400">
          Continue Shopping
        </button>
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  )
}

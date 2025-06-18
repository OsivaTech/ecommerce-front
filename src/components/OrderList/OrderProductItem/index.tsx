import Image from 'next/image'
import { Order } from '@/types/api/Response/OrderResponse'

interface OrderProductItemProps {
  item: Order['items'][number]
}

export function OrderProductItem({ item }: OrderProductItemProps) {
  return (
    <div
      key={item.productId}
      className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 shadow-sm"
    >
      {item.product?.file?.url ? (
        <Image
          src={item.product.file.url}
          alt={item.productName}
          className="w-14 h-14 object-cover rounded-lg border border-gray-200 bg-white"
          width={56}
          height={56}
        />
      ) : (
        <div className="w-14 h-14 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-100 animate-pulse text-gray-300 text-2xl">
          📦
        </div>
      )}
      <div className="flex-1">
        <span className="block text-gray-800 font-medium text-base leading-tight">
          {item.productName}
        </span>
        <span className="block text-gray-400 text-xs">
          Qtd: {item.quantity}
        </span>
      </div>
      <span className="font-semibold text-gray-700 text-base">
        R$ {(item.unitPrice * item.quantity).toFixed(2)}
      </span>
    </div>
  )
}

import { formatPrice } from '@/utils/mask'
import Image from 'next/image'

interface ImageCardProps {
  imageSrc: string
  title: string
  price: number
  className?: string
}

export default function ImageCard({
  imageSrc,
  title,
  price,
  className,
}: ImageCardProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-[160px] h-[160px] rounded-[12px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          className="w-full h-full"
          width={160}
          height={160}
        />
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-[16px] font-medium mb-1 ">{title}</h3>
        <p className="text-[14px] text-gray-600">{formatPrice(price)}</p>
      </div>
    </div>
  )
}

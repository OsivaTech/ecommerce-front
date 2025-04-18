import { ReactNode } from 'react'

interface IconButtonProps {
  icon: ReactNode
  onClick?: () => void
  className?: string
}

export default function IconButton({
  icon,
  onClick,
  className,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-10 w-10 bg-secondary text-title rounded-[12px] flex items-center justify-center transition hover:bg-gray-100 ${className}`}
    >
      {icon}
    </button>
  )
}

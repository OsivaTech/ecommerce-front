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
      className={`h-10 w-[50px] min-w-[50px] max-w-[480px] bg-[#E8EDF2] 
                  text-[#0D141C] rounded-[12px] flex items-center justify-center 
                  transition hover:bg-[#D8E0E8] active:bg-[#C0C8D0] 
                  ${className}`}
    >
      {icon}
    </button>
  )
}

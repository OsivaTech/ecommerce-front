import { Loader2 } from 'lucide-react'

interface CustomButtonProps {
  text: string
  onClick?: () => void
  className?: string
  isActive?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  isLoading?: boolean
}

export default function Button({
  text,
  onClick,
  className,
  isActive = false,
  type = 'submit',
  disabled = false,
  isLoading = false,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`h-10 min-w-[80px] w-full px-4 rounded-[12px] flex items-center justify-center 
        font-medium transition text-[12px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        ${isActive ? 'bg-[#637587] text-white' : 'bg-[#E8EDF2] text-[#0D141C] hover:bg-[#637587] hover:text-white'} 
        ${className}`}
    >
      {text}
      {isLoading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
    </button>
  )
}

interface CustomButtonProps {
  text: string
  onClick?: () => void
  className?: string
  isActive?: boolean
}

export default function Button({
  text,
  onClick,
  className,
  isActive = false,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-10 min-w-[80px] max-w-[480px] px-4 rounded-[12px] flex items-center justify-center 
        font-medium transition text-[12px] 
        ${isActive ? 'bg-cyan-700 text-white' : 'bg-[#E8EDF2] text-[#0D141C] hover:bg-cyan-600 hover:text-white'} 
        ${className}`}
    >
      {text}
    </button>
  )
}

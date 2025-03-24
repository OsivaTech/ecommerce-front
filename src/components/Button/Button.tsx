interface CustomButtonProps {
  text: string
  onClick?: () => void
  className?: string
}

export default function Button({
  text,
  onClick,
  className,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-10 w-[145px] min-w-[80px] max-w-[480px] px-4 bg-[#E8EDF2] 
        text-[#0D141C] rounded-[12px] flex items-center justify-center 
        font-medium transition hover:bg-[#D8E0E8] active:bg-[#C0C8D0] text-[12px]
        ${className}`}
    >
      {text}
    </button>
  )
}

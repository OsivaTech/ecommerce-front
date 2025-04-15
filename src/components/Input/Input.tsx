import { cn } from '@/lib/utils'
import { applyMask } from '@/utils/maskUtils'
import { UseFormRegisterReturn } from 'react-hook-form'
import { ClipLoader } from 'react-spinners'

interface CustomInputProps {
  label?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  messageError?: string
  register?: UseFormRegisterReturn
  mask?: string
  isLoading?: boolean
  className?: string
}

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  messageError,
  register,
  mask,
  isLoading = false,
  className,
  ...rest
}: CustomInputProps) {
  const handleMaskedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = mask ? applyMask(e.target.value, mask) : e.target.value
    e.target.value = maskedValue

    if (onChange) {
      onChange(e) // Chama o onChange original, se fornecido
    }
  }

  return (
    <div className="flex flex-col">
      {label && <label className="text-[16px] font-medium mb-2">{label}</label>}
      <div className="relative flex flex-col">
        <input
          {...register}
          {...rest}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={mask ? handleMaskedInput : onChange}
          className={cn(
            'bg-gray-100 rounded-[12px] text-[16px] max-h-[50px] p-4 outline-none border border-[#D1DBE8]',
            className,
          )}
        />
        {isLoading && (
          <ClipLoader
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 animate-spin"
            size={20}
          />
        )}
      </div>
      {messageError && <p className="text-red-500 text-sm">{messageError}</p>}
    </div>
  )
}

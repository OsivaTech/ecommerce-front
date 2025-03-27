import { UseFormRegisterReturn } from 'react-hook-form'

interface CustomInputProps {
  label: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  messageError?: string
  register?: UseFormRegisterReturn
}

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  messageError,
  register,
  ...rest
}: CustomInputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-[16px] font-medium mb-2">{label}</label>
      <input
        {...register}
        {...rest}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-gray-100 rounded-[12px] text-[16px] p-4 outline-none border border-[#D1DBE8]"
      />
      {messageError && <p className="text-red-500 text-sm">{messageError}</p>}
    </div>
  )
}

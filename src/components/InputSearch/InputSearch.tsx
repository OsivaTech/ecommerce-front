import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function SearchInput({
  placeholder = 'Buscar',
  value,
  onChange,
  className,
}: SearchInputProps) {
  return (
    <div className="relative w-full ">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#637587]" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full h-10 pl-10 pr-4 py-2 bg-[#F0F2F5] text-[#637587] placeholder-[#637587] rounded-[12px] outline-none border border-gray-300 ${className}`}
      />
    </div>
  )
}

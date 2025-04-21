import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface StatusOption {
  label: string
  value: string
}

interface StatusSelectProps {
  onChange: (value: string) => void
  value: string
  options: StatusOption[]
  placeholder?: string
}

export const StatusSelect = ({
  onChange,
  value,
  options,
  placeholder = 'Selecione',
}: StatusSelectProps) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

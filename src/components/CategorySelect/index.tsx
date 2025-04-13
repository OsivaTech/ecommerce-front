import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CategoryHttp } from "@/http/Category"
import { CategoryResponse } from "@/types/api/Response/CategoryResponse"
import { Loader2 } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import toast from "react-hot-toast"

export const CategorySelect = ({ onChange, value }: { onChange: (value: string) => void, value: string }) => {
  const [categories, setCategories] = useState<CategoryResponse>([])
  const [isPending, startTransition] = useTransition()
  
  useEffect(() => {
    async function fetchCategories() {
      const categories = await CategoryHttp.getAllCategory()
      if (categories.hasError) {
        toast.error(categories.error[0]?.message || 'Erro ao buscar categorias')
      } else {
        setCategories(categories.data)
      }
    }
    startTransition(fetchCategories)
  }, [])

  return (
    <Select
    onValueChange={onChange}
    value={value}
    
      >
    <SelectTrigger disabled={isPending} className="w-full">
      <SelectValue placeholder="Selecione uma categoria" /> 
      {isPending && <Loader2 className="animate-spin" /> }
    </SelectTrigger>
    <SelectContent>
      {categories.map((category) => (
        <SelectItem
          key={category.id}
          value={category?.id?.toString() || ''}
        >
          {category.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  )
}

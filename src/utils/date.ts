import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date: string) => {
  return format(new Date(date), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  })
}

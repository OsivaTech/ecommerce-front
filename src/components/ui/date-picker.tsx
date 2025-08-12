'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useEffect } from 'react'
import { DateRange } from 'react-day-picker'

export function DatePicker() {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  })
  const router = useRouter()

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('from', format(date.from!, 'yyyy-MM-dd'))
    url.searchParams.set('to', format(date.to!, 'yyyy-MM-dd'))
    router.push(url.toString())
  }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-between font-semibold h-[56px] cursor-pointer text-title',
          )}
        >
          {date?.from ? (
            <>
              {format(date.from, 'dd/MM/yyyy', { locale: ptBR })}
              {date?.to &&
                ` - ${format(date.to, 'dd/MM/yyyy', { locale: ptBR })}`}
            </>
          ) : (
            <span>Selecione uma data</span>
          )}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={date}
          onSelect={(range) => setDate(range as DateRange)}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}

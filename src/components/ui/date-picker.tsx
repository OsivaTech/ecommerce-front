'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DateRange } from 'react-day-picker'

export function DatePicker() {
  const [date, setDate] = React.useState<DateRange>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-between font-semibold h-[56px] cursor-pointer text-primary',
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
          onSelect={setDate}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}

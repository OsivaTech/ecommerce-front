import { Modal } from '@/components/Modal'
import { StockMovementsHttp } from '@/http/StockMovements'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { StatusSelect } from '@/components/StatusSelect'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const stockMovementSchema = z.object({
  quantity: z.number().min(1, 'A quantidade deve ser maior que 0'),
  movementType: z.enum(['Entry', 'Exit', 'Adjustment', 'None', 'InitialStock']),
  source: z.enum(['Site', 'External', 'None']),
  adjustmentType: z.enum(['Add', 'Remove']).optional(),
})

type StockMovementFormData = z.infer<typeof stockMovementSchema>

const movementTypeOptions = [
  { label: 'Entrada', value: 'Entry' },
  { label: 'Saída', value: 'Exit' },
  { label: 'Ajuste', value: 'Adjustment' },
]

const adjustmentTypeOptions = [
  { label: 'Adicionar ao estoque', value: 'Add' },
  { label: 'Remover do estoque', value: 'Remove' },
]

const sourceOptions = [
  { label: 'Venda externa', value: 'External' },
  { label: 'Venda no site', value: 'Site' },
]

interface StockMovementModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  productId: string
  currentStock: number
  onSuccess?: () => void
}

export const StockMovementModal = ({
  open,
  setOpen,
  productId,
  currentStock,
  onSuccess,
}: StockMovementModalProps) => {
  const router = useRouter()
  const form = useForm<StockMovementFormData>({
    resolver: zodResolver(stockMovementSchema),
    defaultValues: {
      quantity: 0,
      movementType: 'Adjustment',
      source: 'Site',
      adjustmentType: 'Add',
    },
  })

  const quantity = form.watch('quantity')
  const movementType = form.watch('movementType')
  const adjustmentType = form.watch('adjustmentType')

  const calculateNewStock = () => {
    if (!quantity) return currentStock

    switch (movementType) {
      case 'Entry':
        return currentStock + quantity
      case 'Exit':
        return currentStock - quantity
      case 'Adjustment':
        if (adjustmentType === 'Add') {
          return currentStock + quantity
        } else {
          return currentStock - quantity
        }
      default:
        return currentStock
    }
  }

  const newStock = calculateNewStock()
  const isStockNegative = newStock < 0

  const handleSubmit = async (data: StockMovementFormData) => {
    try {
      const response = await StockMovementsHttp.createStockMovement({
        productId: Number(productId),
        quantity:
          data.movementType === 'Exit' ||
          (data.movementType === 'Adjustment' &&
            data.adjustmentType === 'Remove')
            ? -Math.abs(data.quantity)
            : Math.abs(data.quantity),
        movementType: data.movementType,
        source:
          data.movementType === 'Entry' || data.movementType === 'Adjustment'
            ? 'Site'
            : data.source,
      })

      if (response.hasError) {
        toast.error(response.error[0]?.message || 'Erro ao atualizar estoque')
      } else {
        toast.success('Estoque atualizado com sucesso')
        setOpen(false)
        onSuccess?.()
        router.refresh()
      }
    } catch (error) {
      toast.error('Erro ao atualizar estoque')
    }
  }

  return (
    <Modal
      title="Atualizar Estoque"
      description="Atualize a quantidade em estoque do produto"
      open={open}
      setOpen={setOpen}
      className="w-[500px]"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <FormLabel>Estoque Atual</FormLabel>
              <p className="mt-1 text-lg font-semibold">{currentStock}</p>
            </div>
            <div className="w-1/2">
              <FormLabel>Estoque Após Alteração</FormLabel>
              <p
                className={`mt-1 text-lg font-semibold ${isStockNegative ? 'text-red-600' : ''}`}
              >
                {newStock}
              </p>
              {isStockNegative && (
                <p className="mt-1 text-sm text-red-600">
                  O estoque não pode ficar negativo
                </p>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="movementType"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Tipo de Movimento</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="w-80 space-y-2">
                        <p className="font-semibold">Entrada:</p>
                        <p>
                          Para quando for incluir estoque, ex: um carregamento
                          de produtos chegou na loja, e o estoque foi reposto.
                        </p>

                        <p className="font-semibold">Saída:</p>
                        <p>
                          Quando for feita uma venda do produto, e precisa dar
                          baixa no estoque. No campo Fonte, normalmente será
                          colocado &quot;Venda externa&quot;, para indicar uma
                          venda pelo WhatsApp, por exemplo. Apenas em casos
                          excepcionais será usado &quot;Venda no site&quot;,
                          pois o site já faz automaticamente a baixa do estoque.
                        </p>

                        <p className="font-semibold">Ajuste:</p>
                        <p>
                          Quando o estoque estiver divergente com a realidade, e
                          não for possível determinar o motivo da movimentação
                          (Entrada ou Saída desconhecidas).
                        </p>
                        <p>
                          Exemplo: O estoque está com 100 unidades, mas o
                          sistema está com 105 unidades. Nesse caso, o tipo da
                          movimentação é um ajuste.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <StatusSelect
                    onChange={field.onChange}
                    value={field.value || ''}
                    options={movementTypeOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {movementType === 'Adjustment' && (
            <FormField
              control={form.control}
              name="adjustmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Ajuste</FormLabel>
                  <FormControl>
                    <StatusSelect
                      onChange={field.onChange}
                      value={field.value || ''}
                      options={adjustmentTypeOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {movementType === 'Exit' && (
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fonte</FormLabel>
                  <FormControl>
                    <StatusSelect
                      onChange={field.onChange}
                      value={field.value || ''}
                      options={sourceOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isStockNegative}>
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

import { AdminTitle } from '@/components/AdminTitle'
import { Button } from '@/components/ui/button'

export default function StoragePage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminTitle title="Estoque" />
        <Button className="bg-primary text-white cursor-pointer">
          Adicionar produto
        </Button>
      </div>
      <div> PENDENTE DE IMPLEMENTAR</div>
    </div>
  )
}

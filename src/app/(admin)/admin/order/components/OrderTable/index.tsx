'use client'

import { columns } from '@/app/(admin)/admin/order/components/columns'
import { DataTable } from '@/components/ui/data-table'
import { OrderHttp } from '@/http/Order'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Order } from '@/types/api/Response/OrderResponse'
import { useEffect, useState } from 'react'
import { SortingState } from '@tanstack/react-table'
import { Label } from '@/components/ui/label'

export const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'createdAt',
      desc: true,
    },
  ])

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await OrderHttp.getOrders()
      if (!response.hasError) {
        setOrders(response.data)
        setFilteredOrders(response.data)
      }
    }
    fetchOrders()
  }, [])

  useEffect(() => {
    if (selectedStatus === 'all') {
      setFilteredOrders(orders)
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status === selectedStatus),
      )
    }
  }, [selectedStatus, orders])

  if (orders.length === 0) {
    return <div>Carregando...</div>
  }

  return (
    <div className="mt-[20px]">
      <div className="mb-4 flex flex-col gap-2">
        <Label htmlFor="status-filter">Status do Pedido</Label>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger id="status-filter" className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="None">Nenhum</SelectItem>
            <SelectItem value="Pending">Pendente</SelectItem>
            <SelectItem value="WaitingShipment">Aguardando Envio</SelectItem>
            <SelectItem value="Shipped">Enviado</SelectItem>
            <SelectItem value="Completed">Concluído</SelectItem>
            <SelectItem value="Canceled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable
        columns={columns}
        data={filteredOrders}
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </div>
  )
}

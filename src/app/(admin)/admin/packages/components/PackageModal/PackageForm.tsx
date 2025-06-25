'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'react-hot-toast'
import { HttpPackage } from '@/http/Package'
import { PackageResponse } from '@/types/api/Response/PackageResponse'
import { PackageMaterialType } from '@/types/api/Types/PackageMaterialType'
import { PackagePreview } from '@/components/PackagePreview'
import { useState } from 'react'
import { z } from 'zod'

interface PackageFormProps {
  package?: PackageResponse
  onSuccess: () => void
}

const materialTypeOptions = [
  { value: 'Styrofoam', label: 'Isopor' },
  { value: 'Cardboard', label: 'Papelão' },
] as const

const packageSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  width: z.number().min(0.1, 'Largura deve ser maior que zero'),
  height: z.number().min(0.1, 'Altura deve ser maior que zero'),
  length: z.number().min(0.1, 'Comprimento deve ser maior que zero'),
  maxWeight: z.number().min(0.01, 'Peso deve ser maior que zero'),
  materialType: z.enum(['Styrofoam', 'Cardboard'], {
    errorMap: () => ({ message: 'Selecione o tipo de material' }),
  }),
})

export function PackageForm({
  package: packageData,
  onSuccess,
}: PackageFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: packageData?.name || '',
    width: packageData?.width || 0,
    height: packageData?.height || 0,
    length: packageData?.length || 0,
    maxWeight: packageData?.maxWeight || 0,
    materialType: packageData?.materialType || 'Styrofoam',
  })
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validação Zod
    const parsed = packageSchema.safeParse({
      ...formData,
      width: Number(formData.width),
      height: Number(formData.height),
      length: Number(formData.length),
      maxWeight: Number(formData.maxWeight),
    })
    if (!parsed.success) {
      const errors: Partial<Record<keyof typeof formData, string>> = {}
      parsed.error.errors.forEach((err) => {
        if (err.path[0])
          errors[err.path[0] as keyof typeof formData] = err.message
      })
      setFormErrors(errors)
      setIsLoading(false)
      return
    }
    setFormErrors({})

    try {
      if (packageData) {
        await HttpPackage.updatePackage(packageData.id.toString(), formData)
        toast.success('Pacote atualizado com sucesso!')
      } else {
        await HttpPackage.createPackage(formData)
        toast.success('Pacote criado com sucesso!')
      }
      onSuccess()
      if (
        typeof window !== 'undefined' &&
        (window as Window & { refreshPackages?: () => Promise<void> })
          .refreshPackages
      ) {
        await (window as Window & { refreshPackages?: () => Promise<void> })
          .refreshPackages!()
      }
    } catch (error) {
      toast.error('Erro ao salvar pacote')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value,
    }))
    setFormErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleMaterialTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      materialType: value as PackageMaterialType,
    }))
    setFormErrors((prev) => ({ ...prev, materialType: undefined }))
  }

  return (
    <div className="space-y-6">
      {/* Pré-visualização */}
      <div className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            Pré-visualização do Pacote
          </Label>
          <div className="flex justify-center">
            <PackagePreview
              width={formData.width}
              height={formData.height}
              length={formData.length}
              showDimensions={true}
              className="justify-center"
              materialType={formData.materialType}
            />
          </div>
          <p className="text-xs text-gray-500">
            A visualização é atualizada em tempo real conforme você altera as
            dimensões
          </p>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Nome do pacote"
            required
          />
          {formErrors.name && (
            <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Largura (cm)</Label>
            <Input
              id="width"
              type="number"
              step="0.01"
              value={formData.width}
              onChange={(e) => handleInputChange('width', e.target.value)}
              placeholder="0.00"
              required
            />
            {formErrors.width && (
              <p className="text-xs text-red-500 mt-1">{formErrors.width}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Altura (cm)</Label>
            <Input
              id="height"
              type="number"
              step="0.01"
              value={formData.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              placeholder="0.00"
              required
            />
            {formErrors.height && (
              <p className="text-xs text-red-500 mt-1">{formErrors.height}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="length">Comprimento (cm)</Label>
            <Input
              id="length"
              type="number"
              step="0.01"
              value={formData.length}
              onChange={(e) => handleInputChange('length', e.target.value)}
              placeholder="0.00"
              required
            />
            {formErrors.length && (
              <p className="text-xs text-red-500 mt-1">{formErrors.length}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxWeight">Peso Máximo (kg)</Label>
            <Input
              id="maxWeight"
              type="number"
              step="0.01"
              value={formData.maxWeight}
              onChange={(e) => handleInputChange('maxWeight', e.target.value)}
              placeholder="0.00"
              required
            />
            {formErrors.maxWeight && (
              <p className="text-xs text-red-500 mt-1">
                {formErrors.maxWeight}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="materialType">Tipo de Material</Label>
          <Select
            value={formData.materialType}
            onValueChange={handleMaterialTypeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de material" />
            </SelectTrigger>
            <SelectContent>
              {materialTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formErrors.materialType && (
            <p className="text-xs text-red-500 mt-1">
              {formErrors.materialType}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : packageData ? 'Atualizar' : 'Criar'}
          </Button>
        </div>
      </form>
    </div>
  )
}

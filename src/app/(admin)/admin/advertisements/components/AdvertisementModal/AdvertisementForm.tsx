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
import { Textarea } from '@/components/ui/textarea'
import { UploadFrame } from '@/components/UploadField'
import { AdvertisementHttp } from '@/http/Advertisement'
import { AdvertisementResponse } from '@/types/api/Response/AdvertisementResponse'
import { showToast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const advertisementSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['None', 'MediaOnly', 'MediaAndText']),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de fim é obrigatória'),
  enabled: z.boolean(),
  medias: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        type: z.enum(['Image', 'Video', 'None']),
        size: z.enum(['Square', 'Wide', 'UltraWide', 'None']),
        imageId: z.number(),
        urlGoTo: z.string().min(1, 'URL de destino é obrigatória'),
        cta: z.string().optional(),
      }),
    )
    .min(1, 'Pelo menos uma mídia é obrigatória'),
})

type AdvertisementFormData = z.infer<typeof advertisementSchema>

interface AdvertisementFormProps {
  advertisement: AdvertisementResponse | null
  mode: 'create' | 'edit'
  onSuccess: () => void
}

export function AdvertisementForm({
  advertisement,
  mode,
  onSuccess,
}: AdvertisementFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImageId, setUploadedImageId] = useState<number | null>(
    advertisement?.medias?.[0]?.imageId || null,
  )
  const [imageError, setImageError] = useState<string | null>(null)
  console.log(advertisement, 'advertisement')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AdvertisementFormData>({
    resolver: zodResolver(advertisementSchema),
    defaultValues: {
      name: advertisement?.name || '',
      type: advertisement?.type || 'MediaOnly',
      startDate: advertisement?.startDate
        ? new Date(advertisement.startDate).toISOString().slice(0, 16)
        : '',
      endDate: advertisement?.endDate
        ? new Date(advertisement.endDate).toISOString().slice(0, 16)
        : '',
      enabled: advertisement?.enabled ?? true,
      medias: advertisement?.medias?.map((media) => ({
        title: media.title || '',
        description: media.description || '',
        type: media.type,
        size: media.size,
        imageId: media.imageId,
        urlGoTo: media.urlGoTo,
        cta: media.cta || '',
      })) || [
        {
          title: '',
          description: '',
          type: 'Image' as const,
          size: 'Wide' as const,
          imageId: 0,
          urlGoTo: '',
          cta: '',
        },
      ],
    },
  })

  const watchedType = watch('type')

  const onSubmit = async (data: AdvertisementFormData) => {
    // Verificar se há imagem no modo de criação
    if (
      mode === 'create' &&
      !uploadedImageId &&
      !advertisement?.medias?.[0]?.imageId
    ) {
      setImageError('Imagem é obrigatória')
      return
    }
    console.log(mode, 'mode')
    setIsLoading(true)
    setImageError(null)

    if (uploadedImageId) {
      data.medias[0]!.imageId = uploadedImageId
    }

    if (mode === 'create') {
      const response = await AdvertisementHttp.createAdvertisement(data)
      if (response.hasError) {
        showToast.error(response.error[0]?.message || 'Erro ao criar anúncio')
        setIsLoading(false)
        return
      }
      showToast.success('Anúncio criado com sucesso!')
    } else {
      const response = await AdvertisementHttp.updateAdvertisement(
        advertisement!.id,
        data,
      )
      console.log(response, 'response')
      if (response.hasError) {
        showToast.error(
          response.error[0]?.message || 'Erro ao atualizar anúncio',
        )
        setIsLoading(false)
        return
      }
      showToast.success('Anúncio atualizado com sucesso!')
    }

    setIsLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome do Anúncio</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Digite o nome do anúncio"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="type">Tipo</Label>
          <Select
            value={watchedType}
            onValueChange={(value) =>
              setValue('type', value as 'MediaOnly' | 'MediaAndText')
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MediaOnly">Apenas Mídia</SelectItem>
              <SelectItem value="MediaAndText">Mídia e Texto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Data e Hora de Início</Label>
          <Input
            id="startDate"
            type="datetime-local"
            {...register('startDate')}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="endDate">Data e Hora de Fim</Label>
          <Input id="endDate" type="datetime-local" {...register('endDate')} />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <UploadFrame
          onChange={(fileResponse) => {
            if (fileResponse) {
              setUploadedImageId(fileResponse.id)
              setImageError(null)
            } else {
              setUploadedImageId(null)
            }
          }}
          uploadFunction={AdvertisementHttp.uploadImage}
          value={
            advertisement?.medias?.[0]?.image
              ? {
                  id: advertisement.medias[0].image.id,
                  name: advertisement.medias[0].image.name,
                  url: advertisement.medias[0].image.url,
                  size: advertisement.medias[0].image.size,
                  contentType: advertisement.medias[0].image.contentType,
                }
              : null
          }
          className="w-full"
          style={{ aspectRatio: '21/9' }}
          label="Imagem do Anúncio"
        />
        {imageError && (
          <p className="text-red-500 text-sm mt-1">{imageError}</p>
        )}
      </div>

      {watchedType === 'MediaAndText' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              {...register('medias.0.title')}
              placeholder="Digite o título do anúncio"
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register('medias.0.description')}
              placeholder="Digite a descrição do anúncio"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="cta">Texto do Botão (CTA)</Label>
            <Input
              id="cta"
              {...register('medias.0.cta')}
              placeholder="Ex: Saiba mais, Comprar agora"
            />
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="urlGoTo">URL de Destino</Label>
        <Input
          id="urlGoTo"
          {...register('medias.0.urlGoTo')}
          placeholder="https://exemplo.com"
        />
        {errors.medias?.[0]?.urlGoTo && (
          <p className="text-red-500 text-sm mt-1">
            {errors.medias[0].urlGoTo.message}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="enabled"
          type="checkbox"
          checked={watch('enabled')}
          onChange={(e) => setValue('enabled', e.target.checked)}
          className="h-4 w-4"
        />
        <Label htmlFor="enabled">Anúncio Ativo</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSuccess()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? 'Salvando...'
            : mode === 'create'
              ? 'Criar Anúncio'
              : 'Atualizar Anúncio'}
        </Button>
      </div>
    </form>
  )
}

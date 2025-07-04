import { useRef, useState, useTransition } from 'react'
import { Camera, Loader2, Upload } from 'lucide-react'
import { FileResponse } from '@/types/api/Response/FileResponse'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import { ResponseData } from '@/types/Error'

export const UploadFrame = ({
  onChange,
  uploadFunction,
  value,
  className,
  style,
  label,
}: {
  onChange: (file: FileResponse | null) => void
  value: FileResponse | null
  uploadFunction: (file: File) => Promise<ResponseData<FileResponse>>
  className?: string
  style?: React.CSSProperties
  label?: string
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()
  const [uploadedFile, setUploadedFile] = useState<FileResponse | null>(value)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    startTransition(async () => {
      const file = event.target.files?.[0]
      if (!file) return
      const response = await uploadFunction(file)
      if (response.hasError) {
        toast.error(response.error[0]?.message || 'Erro ao carregar arquivo')
        return
      }
      setUploadedFile(response.data)
      onChange(response.data)
    })
  }

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
      />
      <div className="flex flex-col gap-2">
        {label && <Label>{label}</Label>}
        <div
          className={`border border-gray-300 overflow-hidden rounded-md flex items-center justify-center cursor-pointer ${className || 'w-[200px] h-[200px]'}`}
          style={style}
          onClick={() => inputRef.current?.click()}
        >
          {!uploadedFile?.url && !isPending && (
            <div className="flex flex-col items-center gap-2 overflow-hidden">
              <Upload className="w-4 h-4" />
              <p className="text-xs text-gray-500">Fazer Upload</p>
            </div>
          )}
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {uploadedFile?.url && (
            <div className="w-full h-full relative overflow-hidden group">
              <Image
                src={uploadedFile.url}
                alt={uploadedFile.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Alterar imagem
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

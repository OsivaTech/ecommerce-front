import { uploadFile } from '@/http/File'
import { useRef, useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { FileResponse } from '@/types/api/Response/FileResponse'
import toast from 'react-hot-toast'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const UploadButton = ({
  onChange,
  value,
  label,
  className,
}: {
  onChange: (fileId: number | null) => void
  value: FileResponse
  label: string
  className?: string
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
      const response = await uploadFile(file)
      if (response.hasError) {
        toast.error(response.error[0]?.message || 'Erro ao carregar arquivo')
        return
      }
      setUploadedFile(response.data)
      onChange(response.data?.id || null)
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
      <div className="flex gap-2">
        <Button
          className={cn(className)}
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
        >
          {label}
          {isPending && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
        </Button>
        {uploadedFile && <Label>{uploadedFile.name}</Label>}
      </div>
    </div>
  )
}

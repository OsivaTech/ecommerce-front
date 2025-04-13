import { FileHttp } from "@/http/File"
import { useRef, useState, useTransition } from "react"
import { Loader2, Upload } from "lucide-react"
import { FileResponse } from "@/types/api/Response/FileResponse"
import toast from "react-hot-toast"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form"

export const UploadField = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()
  const  [uploadedFile, setUploadedFile] = useState<FileResponse | null>(null)
  const {setValue} = useFormContext()
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(async () => {
      const file = event.target.files?.[0]
      if (!file) return
      const response = await FileHttp.uploadFile(file)
      if (response.hasError) {
        toast.error(response.error[0]?.message || 'Erro ao carregar arquivo')
        return
      }
      setUploadedFile(response.data)
      setValue('file.id', response.data?.id || '')
    })
  }

  return (
    <div>
      <input type="file" className="hidden" ref={inputRef} onChange={handleFileChange} />
      <div className="flex flex-col gap-2">
        <Label>Imagem do Produto</Label>
        <div className="border border-gray-300 overflow-hidden rounded-md  w-[100px] h-[100px] flex items-center justify-center cursor-pointer" onClick={() => inputRef.current?.click()}>
          {!uploadedFile?.url && !isPending && (
            <div className="flex flex-col items-center gap-2 overflow-hidden">
              <Upload className="w-4 h-4" />
              <p className="text-xs text-gray-500">Fazer Upload</p>
            </div>
          )}
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {uploadedFile?.url && (
            <Image src={uploadedFile.url} alt="Uploaded file" width={100} height={100} className=" object-fit" />
          )}
        </div>
      </div>
    </div>
  )
}

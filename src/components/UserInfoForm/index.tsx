import { useEffect, useState } from 'react'
import { UserHttp } from '@/http/User'
import { UserResponse } from '@/types/api/Response/UserResponse'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Input from '@/components/Input/Input'
import { applyMask } from '@/utils/maskUtils'
import { ProfessionalDocumentType } from '@/types/api/Types/ProfessionalDocumentType'

export default function UserInfoForm() {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [originalUser, setOriginalUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    const response = await UserHttp.getCurrentUser()
    if (response.hasError) {
      toast.error('Erro ao carregar dados do usuário')
      setLoading(false)
      return
    }

    // Aplica a máscara ao valor inicial do documento e telefone
    const docType = response.data.personalDocument.type
    const docNumber = response.data.personalDocument.number || ''
    const maskedNumber =
      docType === 'CNPJ'
        ? applyMask(docNumber, 'cnpj')
        : applyMask(docNumber, 'cpf')
    const maskedPhone = applyMask(response.data.phone || '', 'phone')
    const userWithMaskedDoc = {
      ...response.data,
      phone: maskedPhone,
      personalDocument: {
        ...response.data.personalDocument,
        number: maskedNumber,
      },
    }
    setUser(userWithMaskedDoc)
    setOriginalUser(userWithMaskedDoc)
    setLoading(false)
  }

  const hasChanges = () => {
    if (!user || !originalUser) return false
    return (
      user.name !== originalUser.name ||
      user.email !== originalUser.email ||
      user.phone !== originalUser.phone ||
      user.personalDocument.number !== originalUser.personalDocument.number ||
      user.professionalDocument.type !==
        originalUser.professionalDocument.type ||
      user.professionalDocument.number !==
        originalUser.professionalDocument.number
    )
  }

  const handleSavePersonalData = async () => {
    if (!user) return
    setSaving(true)
    const response = await UserHttp.updateUserById(user.id, {
      name: user.name,
      email: user.email,
      phone: user.phone,
    })
    if (response.hasError) {
      toast.error(response.error[0]?.message || 'Erro ao atualizar dados')
      setSaving(false)
      return
    }

    toast.success('Dados atualizados com sucesso')
    setOriginalUser(user)
    setSaving(false)
  }

  if (loading) {
    return <div>Carregando...</div>
  }
  if (!user) {
    return <div>Usuário não encontrado</div>
  }

  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Nome</Label>
        <Input
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">E-mail</Label>
        <Input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="phone">Telefone</Label>
        <Input
          mask="phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="document">CPF/CNPJ</Label>
        <Input
          mask={user.personalDocument.type === 'CNPJ' ? 'cnpj' : 'cpf'}
          value={user.personalDocument.number || ''}
          readOnly
          onChange={(e) =>
            setUser({
              ...user,
              personalDocument: {
                ...user.personalDocument,
                number: e.target.value,
              },
            })
          }
        />
      </div>
      <Separator className="my-4" />
      <div>
        <h3 className="text-lg font-semibold mb-4">Documento Profissional</h3>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-1/3">
            <Label htmlFor="professionalDocument.type">Tipo</Label>
            <Input
              value={user.professionalDocument.type}
              readOnly
              onChange={(e) =>
                setUser({
                  ...user,
                  professionalDocument: {
                    ...user.professionalDocument,
                    type: e.target.value as ProfessionalDocumentType,
                  },
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-2/3">
            <Label htmlFor="professionalDocument.number">Número</Label>
            <Input
              value={user.professionalDocument.number || ''}
              readOnly
              onChange={(e) =>
                setUser({
                  ...user,
                  professionalDocument: {
                    ...user.professionalDocument,
                    number: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        {user.professionalDocument.file && (
          <div className="flex flex-col gap-1 mt-4">
            <Label>Documento Digital</Label>
            <div className="flex items-center gap-2">
              <Image
                src={user.professionalDocument.file.url}
                alt="Documento"
                className="w-16 h-16 object-cover rounded"
                width={64}
                height={64}
              />
              <span className="text-sm text-gray-500">
                {user.professionalDocument.file.name}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleSavePersonalData}
          disabled={saving || !hasChanges()}
          type="button"
        >
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  )
}

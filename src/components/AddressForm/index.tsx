import { useEffect, useState } from 'react'
import { UserHttp } from '@/http/User'
import { UserResponse } from '@/types/api/Response/UserResponse'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import Input from '@/components/Input/Input'
import { updateAddress, getAddressByPostalCode } from '@/http/Address'
import { UpdateAddressRequest } from '@/types/api/Request/AddressRequest'
import { useDebounce } from '@/hook/useDebounce'

export default function AddressForm() {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [originalUser, setOriginalUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [hasTypedCep, setHasTypedCep] = useState(false)
  const debouncedPostalCode = useDebounce(user?.address?.postalCode)

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    if (!hasTypedCep) return
    const fetchAddress = async () => {
      if (!debouncedPostalCode || debouncedPostalCode.length < 8) return
      setIsLoadingCep(true)
      const response = await getAddressByPostalCode(debouncedPostalCode)
      if (response.hasError) {
        toast.error('Endereço não encontrado')
      } else {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                address: {
                  ...prev.address!,
                  street: response.data?.street ?? '',
                  neighborhood: response.data?.neighborhood ?? '',
                  city: response.data?.city ?? '',
                  state: response.data?.state ?? '',
                },
              }
            : prev,
        )
      }
      setIsLoadingCep(false)
    }
    fetchAddress()
  }, [debouncedPostalCode, hasTypedCep])

  const loadUserData = async () => {
    const response = await UserHttp.getCurrentUser()
    if (response.hasError) {
      toast.error('Erro ao carregar dados do usuário')
    } else {
      setUser(response.data)
      setOriginalUser(response.data)
    }
    setLoading(false)
  }

  const hasChanges = () => {
    if (!user?.address || !originalUser?.address) return false
    return (
      user.address.street !== originalUser.address.street ||
      user.address.number !== originalUser.address.number ||
      user.address.complement !== originalUser.address.complement ||
      user.address.neighborhood !== originalUser.address.neighborhood ||
      user.address.city !== originalUser.address.city ||
      user.address.state !== originalUser.address.state ||
      user.address.postalCode !== originalUser.address.postalCode
    )
  }

  const handleSaveAddress = async () => {
    if (!user?.address?.id) return
    setSaving(true)
    const addressData: UpdateAddressRequest = {
      street: user.address.street || '',
      number: user.address.number || '',
      complement: user.address.complement || '',
      neighborhood: user.address.neighborhood || '',
      city: user.address.city,
      state: user.address.state,
      postalCode: user.address.postalCode.replace(/\D/g, ''),
    }
    const response = await updateAddress(user.address.id, addressData)
    if (response.hasError) {
      toast.error(response.error[0]?.message || 'Erro ao atualizar endereço')
    } else {
      toast.success('Endereço atualizado com sucesso')
      setOriginalUser(user)
    }
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
        <Label>CEP</Label>
        <Input
          mask="cep"
          value={user.address?.postalCode || ''}
          isLoading={isLoadingCep}
          onChange={(e) => {
            setHasTypedCep(true)
            setUser({
              ...user,
              address: {
                ...user.address!,
                postalCode: e.target.value,
              },
            })
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Rua/Avenida</Label>
        <Input
          value={user.address?.street || ''}
          onChange={(e) =>
            setUser({
              ...user,
              address: {
                ...user.address!,
                street: e.target.value,
              },
            })
          }
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-1 w-1/2">
          <Label>Número</Label>
          <Input
            value={user.address?.number || ''}
            onChange={(e) =>
              setUser({
                ...user,
                address: {
                  ...user.address!,
                  number: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <Label>Complemento (opcional)</Label>
          <Input
            value={user.address?.complement || ''}
            onChange={(e) =>
              setUser({
                ...user,
                address: {
                  ...user.address!,
                  complement: e.target.value,
                },
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label>Bairro</Label>
        <Input
          value={user.address?.neighborhood || ''}
          onChange={(e) =>
            setUser({
              ...user,
              address: {
                ...user.address!,
                neighborhood: e.target.value,
              },
            })
          }
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-1 w-2/3">
          <Label>Cidade</Label>
          <Input
            value={user.address?.city || ''}
            onChange={(e) =>
              setUser({
                ...user,
                address: {
                  ...user.address!,
                  city: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="flex flex-col gap-1 w-1/3">
          <Label>Estado</Label>
          <Input
            value={user.address?.state || ''}
            onChange={(e) =>
              setUser({
                ...user,
                address: {
                  ...user.address!,
                  state: e.target.value,
                },
              })
            }
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleSaveAddress}
          disabled={saving || !hasChanges()}
          type="button"
        >
          {saving ? 'Salvando...' : 'Salvar Endereço'}
        </Button>
      </div>
    </form>
  )
}

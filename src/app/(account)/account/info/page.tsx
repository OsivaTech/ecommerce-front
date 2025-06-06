// src/app/(account)/account/info/page.tsx
'use client'

import { UserHttp, UpdateUserProfilePayload } from '@/http/User' // Import UpdateUserProfilePayload
import { UserResponse } from '@/types/api/Response/UserResponse'
import { UpdateAddressRequest } from '@/types/api/Request/AddressRequest'
import { useEffect, useState, ChangeEvent } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { showToast } from '@/utils/toast' // Correct import for showToast

interface UserProfile {
  id: number
  name: string
  email: string
  phone?: string
  cpf?: string
  // Store address as a nested object to better match UserResponse.address structure
  // This will also make it easier to get address.id
  address?: {
    id?: number | null
    street?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null // Made nullable to align with potential nulls from API
    state?: string | null // Made nullable
    postalCode?: string | null // Renamed from address_zip and made nullable
  }
  createdAt?: string
  status?: string
  role?: string
}

export default function MyInformationPage() {
  const [userData, setUserData] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false) // For loading state during save
  const [error, setError] = useState<string | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  // FormData can still be flat for input handling, or structured.
  // Let's keep it flat for now as per previous implementation and handle nesting on save.
  const [formData, setFormData] = useState<Partial<UserProfile & {
    address_street?: string | null
    address_number?: string | null
    address_complement?: string | null
    address_neighborhood?: string | null
    address_city?: string | null
    address_state?: string | null
    address_zip?: string | null
  }>>({})
  // const { toast } = useToast() // Remove useToast initialization

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await UserHttp.getCurrentUser()
        if (response.hasError || !response.data) {
          let errorMessage = 'Failed to load user data.'; // Default error message
          if (response.error) {
            if (Array.isArray(response.error) && response.error.length > 0) {
              // If response.error is an array, try to get message from the first element
              // Assuming the elements of the array follow the 'Error' schema { code?, message? }
              errorMessage = response.error[0]?.message || errorMessage;
            } else if (typeof response.error === 'object' && response.error !== null && 'message' in response.error && typeof response.error.message === 'string') {
              // If response.error is an object with a message property
              errorMessage = response.error.message;
            }
            // If response.error is just a string, it could be used directly (optional, current structure implies object or array)
            // else if (typeof response.error === 'string') {
            //   errorMessage = response.error;
            // }
          }
          setError(errorMessage);
          console.error('Error fetching user data:', response.error); // Keep the original log for debugging
        } else {
          const apiData = response.data as UserResponse
          const profileData: UserProfile = {
            id: apiData.id,
            name: apiData.name,
            email: apiData.email,
            // Assuming phone might come from a field in UserResponse or related entity for now
            phone: (apiData as any).phone || undefined,
            cpf: apiData.personalDocument?.number,
            address: apiData.address
              ? {
                  id: apiData.address.id,
                  street: apiData.address.street,
                  number: apiData.address.number,
                  complement: apiData.address.complement,
                  neighborhood: apiData.address.neighborhood,
                  city: apiData.address.city,
                  state: apiData.address.state,
                  postalCode: apiData.address.postalCode,
                }
              : undefined,
            createdAt: apiData.createdAt,
            status: apiData.status as string,
            role: apiData.role as string,
          }
          setUserData(profileData)
          // Initialize flat formData from potentially nested profileData
          setFormData({
            ...profileData,
            address_street: profileData.address?.street,
            address_number: profileData.address?.number,
            address_complement: profileData.address?.complement,
            address_neighborhood: profileData.address?.neighborhood,
            address_city: profileData.address?.city,
            address_state: profileData.address?.state,
            address_zip: profileData.address?.postalCode,
          })
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.')
        console.error('Unexpected error fetching user data:', err)
      }
      setIsLoading(false)
    }

    fetchUserData()
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleToggleEditMode = () => {
    if (isEditMode && userData) {
      // Reset formData to original userData when canceling
      setFormData({
        ...userData,
        address_street: userData.address?.street,
        address_number: userData.address?.number,
        address_complement: userData.address?.complement,
        address_neighborhood: userData.address?.neighborhood,
        address_city: userData.address?.city,
        address_state: userData.address?.state,
        address_zip: userData.address?.postalCode,
      })
    }
    setIsEditMode(!isEditMode)
  }

  const handleSaveChanges = async () => {
    if (!userData) return

    // Basic Frontend Validation
    if (!formData.name || formData.name.trim() === '') {
      showToast.error('O nome é obrigatório.')
      return
    }
    if (!formData.email || formData.email.trim() === '') {
      showToast.error('O email é obrigatório.')
      return
    }
    // Basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showToast.error('Formato de email inválido.')
      return
    }

    // Validate required address fields if any address field is filled (implying address is being edited/added)
    const addressFields = [
      formData.address_street, formData.address_number, formData.address_complement,
      formData.address_neighborhood, formData.address_city, formData.address_state, formData.address_zip
    ];
    const isEditingAddress = addressFields.some(field => field && field.trim() !== '');

    if (isEditingAddress) {
      if (!formData.address_street || formData.address_street.trim() === '') {
        showToast.error('O logradouro do endereço é obrigatório.');
        return;
      }
      if (!formData.address_city || formData.address_city.trim() === '') {
        showToast.error('A cidade do endereço é obrigatória.');
        return;
      }
      if (!formData.address_zip || formData.address_zip.trim() === '') {
        showToast.error('O CEP do endereço é obrigatório.');
        return;
      }
    }

    setIsSaving(true)
    let profileUpdated = false
    let addressUpdated = false
    let newUserData = { ...userData } // To store updates from API responses

    try {
      // Prepare UserProfilePayload (name, email, phone)
      const userProfilePayload: UpdateUserProfilePayload = {}
      if (formData.name !== userData.name) userProfilePayload.name = formData.name
      if (formData.email !== userData.email) userProfilePayload.email = formData.email
      if (formData.phone !== userData.phone) userProfilePayload.phone = formData.phone

      if (Object.keys(userProfilePayload).length > 0) {
        const profileResponse = await UserHttp.updateCurrentUserProfile(userProfilePayload)
        if (profileResponse.hasError || !profileResponse.data) {
          throw new Error(profileResponse.error?.message || 'Failed to update profile')
        }
        newUserData = {
            ...newUserData,
            name: profileResponse.data.name,
            email: profileResponse.data.email,
            phone: (profileResponse.data as any).phone || newUserData.phone, // Assuming phone is part of response
        }
        profileUpdated = true
      }

      // Prepare AddressPayload
      const addressPayload: UpdateAddressRequest = {}
      let addressHasChanges = false
      if (formData.address_street !== (userData.address?.street || null)) { addressPayload.street = formData.address_street; addressHasChanges = true; }
      if (formData.address_number !== (userData.address?.number || null)) { addressPayload.number = formData.address_number; addressHasChanges = true; }
      if (formData.address_complement !== (userData.address?.complement || null)) { addressPayload.complement = formData.address_complement; addressHasChanges = true; }
      if (formData.address_neighborhood !== (userData.address?.neighborhood || null)) { addressPayload.neighborhood = formData.address_neighborhood; addressHasChanges = true; }
      if (formData.address_city !== (userData.address?.city || null)) { addressPayload.city = formData.address_city; addressHasChanges = true; }
      if (formData.address_state !== (userData.address?.state || null)) { addressPayload.state = formData.address_state; addressHasChanges = true; }
      if (formData.address_zip !== (userData.address?.postalCode || null)) { addressPayload.postalCode = formData.address_zip; addressHasChanges = true; }

      if (userData.address?.id && addressHasChanges) {
        const addressResponse = await UserHttp.updateUserAddress(userData.address.id, addressPayload)
        if (addressResponse.hasError || !addressResponse.data) {
          throw new Error(addressResponse.error?.message || 'Failed to update address')
        }
         newUserData = {
            ...newUserData,
            address: { // Update address part of newUserData
                id: addressResponse.data.id,
                street: addressResponse.data.street,
                number: addressResponse.data.number,
                complement: addressResponse.data.complement,
                neighborhood: addressResponse.data.neighborhood,
                city: addressResponse.data.city,
                state: addressResponse.data.state,
                postalCode: addressResponse.data.postalCode,
            }
        }
        addressUpdated = true
      }

      if (profileUpdated || addressUpdated) {
        setUserData(newUserData)
        // Update formData to reflect the newUserData, including flattened address for the form
        setFormData({
            ...newUserData,
            address_street: newUserData.address?.street,
            address_number: newUserData.address?.number,
            address_complement: newUserData.address?.complement,
            address_neighborhood: newUserData.address?.neighborhood,
            address_city: newUserData.address?.city,
            address_state: newUserData.address?.state,
            address_zip: newUserData.address?.postalCode,
        })
        showToast.success('Suas informações foram atualizadas.')
        setIsEditMode(false)
      } else {
        showToast.success('Nenhuma alteração foi detectada.') // Using success as per instruction
        setIsEditMode(false) // Still exit edit mode
      }
    } catch (error: any) {
      console.error('Error saving changes:', error)
      showToast.error(error.message || 'Não foi possível atualizar suas informações. Tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <p className="container mx-auto mt-14 px-4 py-8">Carregando suas informações...</p>
  if (error) return <p className="container mx-auto mt-14 px-4 py-8 text-red-500">Erro: {error}</p>
  if (!userData) return <p className="container mx-auto mt-14 px-4 py-8">Não foi possível carregar os dados do usuário.</p>

  return (
    <div className="container mx-auto mt-14 px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-title">Minhas Informações</h1>
        <Button onClick={handleToggleEditMode} disabled={isSaving}>
          {isEditMode ? 'Cancelar' : 'Editar Informações'}
        </Button>
      </div>

      {!isEditMode ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
              <CardDescription>Suas informações pessoais básicas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name_display">Nome:</Label>
                  <p id="name_display" className="text-md text-gray-800">{userData.name}</p>
                </div>
                <div>
                  <Label htmlFor="email_display">Email:</Label>
                  <p id="email_display" className="text-md text-gray-800">{userData.email}</p>
                </div>
                {userData.cpf && (
                  <div>
                    <Label htmlFor="cpf_display">CPF:</Label>
                    <p id="cpf_display" className="text-md text-gray-800">{userData.cpf}</p>
                  </div>
                )}
                {userData.phone && (
                   <div>
                    <Label htmlFor="phone_display">Telefone:</Label>
                    <p id="phone_display" className="text-md text-gray-800">{userData.phone}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
              <CardDescription>Seu endereço de correspondência.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData.address ? (
                <>
                  <div>
                    <Label htmlFor="address_street_display">Logradouro:</Label>
                    <p id="address_street_display" className="text-md text-gray-800">{userData.address.street || 'N/A'}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address_number_display">Número:</Label>
                      <p id="address_number_display" className="text-md text-gray-800">{userData.address.number || 'N/A'}</p>
                    </div>
                    <div>
                      <Label htmlFor="address_complement_display">Complemento:</Label>
                      <p id="address_complement_display" className="text-md text-gray-800">{userData.address.complement || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address_neighborhood_display">Bairro:</Label>
                      <p id="address_neighborhood_display" className="text-md text-gray-800">{userData.address.neighborhood || 'N/A'}</p>
                    </div>
                    <div>
                      <Label htmlFor="address_city_display">Cidade:</Label>
                      <p id="address_city_display" className="text-md text-gray-800">{userData.address.city || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address_state_display">Estado:</Label>
                      <p id="address_state_display" className="text-md text-gray-800">{userData.address.state || 'N/A'}</p>
                    </div>
                    <div>
                      <Label htmlFor="address_zip_display">CEP:</Label>
                      <p id="address_zip_display" className="text-md text-gray-800">{userData.address.postalCode || 'N/A'}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p>Nenhum endereço cadastrado.</p>
              )}
            </CardContent>
             <CardFooter>
                <p className="text-xs text-gray-500">Criado em: {new Date(userData.createdAt || '').toLocaleDateString()}</p>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Editar Informações</CardTitle>
            <CardDescription>Modifique seus dados abaixo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dados Pessoais Form */}
            <fieldset disabled={isSaving} className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name">Nome:</Label>
                        <Input type="text" name="name" id="name" value={formData.name || ''} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email:</Label>
                        <Input type="email" name="email" id="email" value={formData.email || ''} onChange={handleInputChange} required />
                    </div>
                     <div>
                        <Label htmlFor="phone">Telefone:</Label>
                        <Input type="tel" name="phone" id="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="(XX) XXXXX-XXXX"/>
                    </div>
                    <div>
                        <Label htmlFor="cpf">CPF: (não editável)</Label>
                        <Input type="text" name="cpf" id="cpf" value={formData.cpf || ''} disabled />
                    </div>
                </div>
            </fieldset>

            {/* Endereço Form */}
            <fieldset disabled={isSaving} className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Endereço</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="address_street">Logradouro:</Label>
                        <Input type="text" name="address_street" id="address_street" value={formData.address_street || ''} onChange={handleInputChange} required={isEditingAddress} />
                    </div>
                    <div>
                        <Label htmlFor="address_number">Número:</Label>
                        <Input type="text" name="address_number" id="address_number" value={formData.address_number || ''} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="address_complement">Complemento:</Label>
                        <Input type="text" name="address_complement" id="address_complement" value={formData.address_complement || ''} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="address_neighborhood">Bairro:</Label>
                        <Input type="text" name="address_neighborhood" id="address_neighborhood" value={formData.address_neighborhood || ''} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="address_city">Cidade:</Label>
                        <Input type="text" name="address_city" id="address_city" value={formData.address_city || ''} onChange={handleInputChange} required={isEditingAddress} />
                    </div>
                     <div>
                        <Label htmlFor="address_state">Estado:</Label>
                        <Input type="text" name="address_state" id="address_state" value={formData.address_state || ''} onChange={handleInputChange} />
                    </div>
                </div>
                 <div>
                    <Label htmlFor="address_zip">CEP:</Label>
                    <Input type="text" name="address_zip" id="address_zip" value={formData.address_zip || ''} onChange={handleInputChange} required={isEditingAddress} />
                </div>
            </fieldset>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button variant="outline" onClick={handleToggleEditMode} disabled={isSaving}>Cancelar</Button>
            <Button type="button" onClick={handleSaveChanges} disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </CardFooter>
        </Card>
      )}
      {!isLoading && !error && !userData && !isEditMode && (
        <p>Não foi possível carregar os dados do usuário.</p>
      )}
    </div>
  )
}

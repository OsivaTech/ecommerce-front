import { FormDataCreateUser } from '@/components/SignupForm/SignupForm'
import { PropsRequestBodyCreateUser } from './types'

export const createUserRequestBody = (
  data: FormDataCreateUser,
): PropsRequestBodyCreateUser => {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.senha,
    personalDocument: {
      number: data.numeroLicenca || '',
      type: 'None', // CRM / CRO
    },
    professionalDocument: {
      number: data.numeroLicenca || '',
      type: 'None', // Ajuste conforme necessário
      image: '', // Adicione o valor correto, se necessário
    },
    address: {
      street: data.street,
      number: data.number?.toString() || null,
      complement: data.complement || null,
      neighborhood: data.neighborhood || null,
      city: data.city,
      state: data.state,
      postalCode: data.cep.replace(/\D/g, ''), // Remove caracteres não numéricos
    },
  }
}

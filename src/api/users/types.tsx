export interface PropsRequestBodyCreateUser {
  name: string
  email: string
  phone: string
  password: string
  personalDocument?: {
    number: string
    type: string
  }
  professionalDocument?: {
    number: string
    type: string
    image: string
  }
  address: {
    street: string
    number: string | null
    complement: string | null
    neighborhood: string | null
    city: string
    state: string
    postalCode: string
  }
}

export interface PropsRequestCreateUser {
  data: PropsRequestBodyCreateUser
}

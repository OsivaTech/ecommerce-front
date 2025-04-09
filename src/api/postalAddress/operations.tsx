import { PropsResponsePostalAddress } from '@/services/type'
import { postalAddressService } from './services'
import { PropsPostalAddress } from './types'

class PostalAddressOperation {
  async getPostal({
    postalcode,
  }: PropsResponsePostalAddress): Promise<PropsPostalAddress> {
    return await postalAddressService.getPostalAddress({
      postalcode,
    })
  }
}

export const postalAddressOperation = new PostalAddressOperation()

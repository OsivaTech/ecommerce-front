import { urlService } from '@/services/urlService'
import { PropsPostalAddress } from './types'
import { PropsResponsePostalAddress } from '@/services/type'

class PostalAddressService {
  async getPostalAddress({
    postalcode,
  }: PropsResponsePostalAddress): Promise<PropsPostalAddress> {
    return await urlService.getPostalAddress({
      postalcode,
    })
  }
}

export const postalAddressService = new PostalAddressService()

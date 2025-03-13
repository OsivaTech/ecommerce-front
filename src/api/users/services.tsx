// firestoreService.ts

import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/config/firebaseConfig'
import { PropsGetUser } from './types'

class GetUserService {
  async getUser(uid: string): Promise<PropsGetUser> {
    try {
      const result = await getDoc(doc(db, 'users', uid))

      if (result.exists()) {
        return result.data() as PropsGetUser
      }

      throw new Error('Usuário não encontrado.')
    } catch (error) {
      throw new Error('Ocorreu um erro ao obter todos os usuários.')
    }
  }
}

export const getUserService = new GetUserService()

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getUserService } from './services'
import { PropsGetUser } from './types'

const auth = getAuth()

async function getCurrentUserUid(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        if (user) {
          resolve(user.uid)
        } else {
          resolve(null)
        }
      },
      reject,
    )
  })
}

async function getUserOperation(uid: string): Promise<PropsGetUser> {
  try {
    return await getUserService.getUser(uid)
  } catch (error) {
    throw new Error('Ocorreu um erro ao criar o usuário.')
  }
}

export { getUserOperation, getCurrentUserUid }

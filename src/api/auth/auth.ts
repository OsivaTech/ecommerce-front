import { auth } from '@/config/firebaseConfig'
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean,
) => {
  try {
    const persistence = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence
    await setPersistence(auth, persistence)
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )

    return userCredential.user
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    throw error
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    throw error
  }
}

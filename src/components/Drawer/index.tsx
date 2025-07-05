import Link from 'next/link'
import { User, LogOut, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { APP_LINKS } from '../../../constants'
import { useAuth } from '@/providers/Auth/AuthContext'
import { useRouter } from 'next/navigation'

interface DrawerProps {
  open: boolean
  onClose: () => void
  isActive: (path: string) => boolean
}

export function Drawer({ open, onClose, isActive }: DrawerProps) {
  const { signOut, isAuthenticated } = useAuth()
  const router = useRouter()
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-4/5 bg-background shadow-lg z-100 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-4 p-4">
          <Link
            onClick={onClose}
            href={APP_LINKS.HOMEPAGE()}
            className={`hover:text-primary ${
              isActive(APP_LINKS.HOMEPAGE())
                ? 'text-primary border-b-2 border-primary w-fit'
                : ''
            }`}
          >
            Início
          </Link>
          <Link
            onClick={onClose}
            href={APP_LINKS.STORE()}
            className={`hover:text-primary ${
              isActive(APP_LINKS.STORE())
                ? 'text-primary border-b-2 border-primary w-fit'
                : ''
            }`}
          >
            Loja
          </Link>
          <Link
            onClick={onClose}
            href={APP_LINKS.ABOUT()}
            className={`hover:text-primary ${
              isActive(APP_LINKS.ABOUT())
                ? 'text-primary border-b-2 border-primary w-fit'
                : ''
            }`}
          >
            Sobre
          </Link>
          <Link
            onClick={onClose}
            href={APP_LINKS.CONTACT()}
            className={`hover:text-primary ${
              isActive(APP_LINKS.CONTACT())
                ? 'text-primary border-b-2 border-primary w-fit'
                : ''
            }`}
          >
            Contate-nos
          </Link>
          {isAuthenticated ? (
            <>
              <hr className="my-4 border-gray-200" />
              <Link
                onClick={onClose}
                href={APP_LINKS.ACCOUNT ? APP_LINKS.ACCOUNT() : '/account'}
                className="flex items-center gap-2 hover:text-primary"
              >
                <User size={20} />
                Minha Conta
              </Link>
              <button
                onClick={() => {
                  signOut()
                  router.refresh()
                  onClose()
                }}
                className="flex items-center gap-2 hover:text-primary text-left"
              >
                <LogOut size={20} />
                Sair
              </button>
            </>
          ) : (
            <>
              <hr className="my-4 border-gray-200" />
              <div className="flex flex-col gap-2">
                <Link href={APP_LINKS.LOGIN()} onClick={onClose}>
                  <Button variant="primary" className="w-full">
                    Entrar
                  </Button>
                </Link>
                <Link href={APP_LINKS.REGISTER()} onClick={onClose}>
                  <Button variant="outline" className="w-full">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>
      {/* Overlay para fechar o drawer ao clicar fora */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}
    </>
  )
}

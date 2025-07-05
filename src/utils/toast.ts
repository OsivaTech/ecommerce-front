import toast, { ToastPosition } from 'react-hot-toast'

const defaultPosition: ToastPosition = 'top-right'
const defaultDuration = 5000 // 5 segundos

export const showToast = {
  success: (message: string, position: ToastPosition = defaultPosition) =>
    toast.success(message, { position, duration: defaultDuration }),

  error: (message: string, position: ToastPosition = defaultPosition) =>
    toast.error(message, { position, duration: defaultDuration }),

  warning: (message: string, position: ToastPosition = defaultPosition) =>
    toast(message, { icon: '⚠️', position, duration: defaultDuration }),

  loading: (message: string, position: ToastPosition = defaultPosition) =>
    toast.loading(message, { position, duration: defaultDuration }),

  dismiss: () => toast.dismiss(), // Fecha todos os toasts ativos
}

export const showToasthHandleError = (
  error: unknown,
  position: ToastPosition = defaultPosition,
) => {
  const errorMessage = error instanceof Error ? error.message : String(error)
  showToast.error(errorMessage, position)
}

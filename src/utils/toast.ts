import toast, { ToastPosition } from 'react-hot-toast'

const defaultPosition: ToastPosition = 'top-right'

export const showToast = {
  success: (message: string, position: ToastPosition = defaultPosition) =>
    toast.success(message, { position }),

  error: (message: string, position: ToastPosition = defaultPosition) =>
    toast.error(message, { position }),

  warning: (message: string, position: ToastPosition = defaultPosition) =>
    toast(message, { icon: '⚠️', position }),

  loading: (message: string, position: ToastPosition = defaultPosition) =>
    toast.loading(message, { position }),

  dismiss: () => toast.dismiss(), // Fecha todos os toasts ativos
}

export const showToasthHandleError = (
  error: unknown,
  position: ToastPosition = defaultPosition,
) => {
  const errorMessage = error instanceof Error ? error.message : String(error)
  showToast.error(errorMessage, position)
}

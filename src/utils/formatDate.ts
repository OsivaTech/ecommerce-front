export function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return (
    date.toLocaleDateString('pt-BR') +
    ' às ' +
    date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  )
}

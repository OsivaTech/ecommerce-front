import { RegistrationPending } from '@/types/api/Response/RegistrationResponse'
import { Row } from '@tanstack/react-table'
import { Eye, Download } from 'lucide-react'

export const DocumentCell = ({ row }: { row: Row<RegistrationPending> }) => {
  const handleDownload = () => {
    if (row.original.professionalDocument?.file?.url) {
      const link = document.createElement('a')
      link.href = row.original.professionalDocument.file.url
      link.download = `document-${row.original.name || 'download'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleOpenInNewTab = () => {
    if (row.original.professionalDocument?.file?.url) {
      window.open(row.original.professionalDocument?.file?.url, '_blank')
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Eye
        onClick={handleOpenInNewTab}
        className="cursor-pointer text-primary"
      />
      <Download onClick={handleDownload} className="cursor-pointer" />
    </div>
  )
}

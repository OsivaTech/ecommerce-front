'use client'
import { UserEditModal } from '@/app/(admin)/admin/user/components/UserEditModal'
import { User } from '@/types/api/Response/UserResponse'
import { Row } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import { useState } from 'react'

export const ActionsCell = ({ row }: { row: Row<User> }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Eye className="cursor-pointer" onClick={() => setIsOpen(true)} />
      {isOpen && (
        <UserEditModal
          user={row.original}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  )
}

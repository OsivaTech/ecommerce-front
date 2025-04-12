import { Skeleton } from '@/components/ui/skeleton'

export function UserManagementTableSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="rounded-md border">
        <div className="p-4">
          <Skeleton className="h-8 w-[250px]" />
        </div>
        <div className="border-t">
          {/* Table header */}
          <div className="flex items-center border-b px-4 py-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-4 w-[100px] mx-2" />
            ))}
          </div>
          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center border-b px-4 py-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-4 w-[100px] mx-2" />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end p-4">
          <Skeleton className="h-8 w-[200px]" />
        </div>
      </div>
    </div>
  )
}

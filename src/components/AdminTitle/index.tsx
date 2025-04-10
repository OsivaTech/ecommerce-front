export const AdminTitle = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}

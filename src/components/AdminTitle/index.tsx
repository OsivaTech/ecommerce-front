export const AdminTitle = ({
  title,
  description,
}: {
  title: string
  description?: string
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="app-title">{title}</h1>
      {description && <p className="text-slate-400">{description}</p>}
    </div>
  )
}

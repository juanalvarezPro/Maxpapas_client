
export default function Alerta({children}) {
  return (
    <div className="my-2 flex items-start gap-2 rounded-xl bg-danger/10 px-4 py-3 text-sm font-semibold text-danger ring-1 ring-danger/20">
        <span aria-hidden="true">⚠</span>
        <span>{children}</span>
    </div>
  )
}

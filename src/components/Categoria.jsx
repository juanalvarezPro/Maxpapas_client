import useQuisco from "../hooks/useQuiosco";

export default function Categoria({ categoria }) {
  const { handleClickCategoria, categoriaActual, setCategoriaActual  } = useQuisco();
  const {id, nombre } = categoria;

  const categoryActual = categoriaActual.id === id

  return (
    <div
      className={`${
        categoryActual
          ? "bg-primary text-ink font-bold"
          : "text-ink-soft hover:bg-primary-50 hover:text-ink"
      } flex items-center justify-between gap-3 w-full rounded-xl px-3 py-2.5 cursor-pointer transition`}
      onClick={() =>categoryActual ? setCategoriaActual({}): handleClickCategoria(id)}
    >
      <div className="capitalize font-semibold cursor-pointer truncate" type="button">
        {nombre}
      </div>
      {categoryActual && <span className="text-xs font-bold">✕</span>}
    </div>
  );
}

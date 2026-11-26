import useQuisco from "../hooks/useQuiosco";

// Barra horizontal de categorías, siempre visible (se desliza en móvil)
export default function CategoriaBar() {
  const { categorias, categoriaActual, handleClickCategoria, setCategoriaActual } =
    useQuisco();

  const chip =
    "shrink-0 rounded-full px-4 py-2 text-sm font-bold capitalize whitespace-nowrap transition active:scale-95";
  const activo = "bg-ink text-white shadow";
  const inactivo = "bg-white text-ink-soft ring-1 ring-line hover:ring-primary hover:text-ink";

  const sinCategoria = !categoriaActual?.id;

  return (
    <div className="-mx-4 lg:-mx-6 px-4 lg:px-6 flex gap-2 overflow-x-auto scrollbar">
      <button
        type="button"
        className={`${chip} ${sinCategoria ? activo : inactivo}`}
        onClick={() => setCategoriaActual({})}
      >
        Todos
      </button>
      {categorias.map((categoria) => {
        const esActual = categoriaActual?.id === categoria.id;
        return (
          <button
            type="button"
            key={categoria.id}
            className={`${chip} ${esActual ? activo : inactivo}`}
            onClick={() =>
              esActual ? setCategoriaActual({}) : handleClickCategoria(categoria.id)
            }
          >
            {categoria.nombre}
          </button>
        );
      })}
    </div>
  );
}

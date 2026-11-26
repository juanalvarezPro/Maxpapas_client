import { Link } from "react-router-dom";
import { formatearDinero } from "../helpers";
import useQuisco from "../hooks/useQuiosco";
import { QuantityPeople } from "./UI/QuantityPeople";
import QuantityWings from "./UI/QuantityWings";

export default function Producto({ producto }) {
  const { ClearProductoEdit, quickToggleModal, handleSetProducto } =
    useQuisco();
  const {
    id,
    nombre,
    imagen,
    precio,
    cantidad_personas,
    cantidad_alas,
    modal_rapido,
  } = producto;
  const formattedPrice = formatearDinero(precio);

  const addClasses =
    "btn-primary w-full py-2.5 text-sm lg:text-base shadow-none group-hover:shadow-glow";

  return (
    <div className="card group flex flex-col overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-[4/3] w-full bg-white p-3">
        <div className="absolute top-2 left-2 z-10 flex gap-1">
          {cantidad_personas === 1 ? null : (
            <QuantityPeople People={cantidad_personas} />
          )}
          {cantidad_alas > 1 && <QuantityWings Wings={cantidad_alas} />}
        </div>

        <img
          decoding="async"
          loading="lazy"
          alt={`imagen ${nombre}`}
          className="w-full h-full object-contain transition duration-300 group-hover:scale-105"
          width="100%"
          height="auto"
          src={`/img/${imagen}.webp`}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-line/70 p-3 lg:p-4">
        <div className="flex-1">
          <p className="font-bold leading-tight text-ink text-sm sm:text-base lg:text-lg line-clamp-2">
            {nombre}
          </p>
          {formattedPrice === "$ 0.000" ? null : (
            <p className="mt-1 font-display text-lg lg:text-xl font-semibold text-primary-700">
              {formattedPrice}
            </p>
          )}
        </div>
        {modal_rapido ? (
          <div
            className={addClasses}
            onClick={() => {
              handleSetProducto(producto);
              quickToggleModal();
            }}
          >
            Agregar
          </div>
        ) : (
          <Link
            className={addClasses}
            to={`/orden/${id}`}
            onClick={() => {
              ClearProductoEdit();
            }}
          >
            Agregar
          </Link>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { formatearDinero } from "../helpers";
import useQuisco from "../hooks/useQuiosco";

export const ClickCardProducto = ({ producto }) => {
  const { id , nombre, precio, imagen } = producto;
  const { handleSetpreview, checkProductInPreview , handleEliminarProducto } = useQuisco();
  const isProductInCart = checkProductInPreview(producto);
  const formattedPrice = formatearDinero(precio);
  return (
    <div
      onClick={() => {
        isProductInCart ?
        handleEliminarProducto(id) :
        handleSetpreview(producto, 1, false, false);
      }}

      className={`${
        isProductInCart
          ? "bg-primary-50 ring-2 ring-primary shadow-glow"
          : "bg-white ring-1 ring-line/70 shadow-card hover:shadow-lift hover:-translate-y-0.5"
      } cursor-pointer rounded-2xl text-center relative overflow-hidden group transition duration-200 flex flex-col`}
    >
      {isProductInCart && (
        <span className="absolute top-2 right-2 z-10 grid place-items-center h-7 w-7 rounded-full bg-primary text-ink text-sm font-bold shadow animate-fade-up">
          ✓
        </span>
      )}
      <div className="w-full aspect-[4/3] p-3">
        <img
          decoding="async"
          loading="lazy"
          width="100%"
          height="auto"
          alt={`imagen ${nombre}`}
          className="w-full h-full object-contain mix-blend-multiply transition duration-300 group-hover:scale-105"
          src={`/img/${imagen}.webp`}
        />
      </div>

      <div className="flex-1 flex items-center flex-col justify-center text-center border-t border-line/70 px-3 py-3">
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold leading-tight text-ink text-sm sm:text-base lg:text-lg">{nombre}</p>
          {formattedPrice === "$ 0.000" ? null : (
            <p className="mt-0.5 font-display font-semibold text-primary-700">{formattedPrice}</p>
          )}
        </div>
      </div>
    </div>
  );
};

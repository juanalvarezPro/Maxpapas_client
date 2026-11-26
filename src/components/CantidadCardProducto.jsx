import { formatearDinero } from "../helpers";
import useQuisco from "../hooks/useQuiosco";
import { useCantidad } from "../hooks/useCantidad";
import { ButtonDelete, ButtonPlus, ButtonRest } from "./UI";
import { QuantityProducto } from "./UI/QuantityProducto";

export const CantidadCardProducto = ({ producto }) => {
  const { handleSetpreview, checkProductInPreview, handleSetProducto, editToggleModal, checkQuantityInProducto, handleEliminarProducto } = useQuisco();
  const { id, nombre, precio, imagen} = producto;
  const [cantidad, handleIncrement, handleDecrement] = useCantidad();
  

  const isProductInCart = checkProductInPreview(producto);
  const quantityProduct = checkQuantityInProducto(producto)
  return (
    <div
      className={`${
        isProductInCart
          ? "bg-primary-50 ring-2 ring-primary shadow-glow"
          : "bg-white ring-1 ring-line/70 shadow-card hover:shadow-lift"
      } rounded-2xl text-center relative overflow-hidden group transition duration-200 flex flex-col`}
    >
      <div
        className={`absolute top-2 left-2 z-10 ${
          isProductInCart ? "block animate-fade-up" : "hidden"
        } `}
      >
        <ButtonDelete onClick={()=>{
          handleEliminarProducto(id)
        }} />
      </div>
      <div
        className={`absolute top-2 right-2 z-10 ${
          isProductInCart ? "block animate-fade-up" : "hidden"
        } `}
      >
        <QuantityProducto
          onClick={() => {
            handleSetProducto(producto);
            editToggleModal();
          }}
          Quantity={quantityProduct}
        />
      </div>
      <div className="w-full aspect-[4/3] p-3">
        <img
          decoding="async"
          loading="lazy"
          width="100%"
          height="auto"
          alt={`imagen ${nombre}`}
          className="w-full h-full object-contain mix-blend-multiply"
          src={`/img/${imagen}.webp`}
        />
      </div>

      <div className="px-3 pt-2 pb-1 border-t border-line/70">
        <p className="font-bold leading-tight text-ink text-sm sm:text-base lg:text-lg">{nombre}</p>
        <p className="mt-0.5 font-display font-semibold text-primary-700">{formatearDinero(precio)}</p>
      </div>

      <div className="flex flex-col gap-2 p-3 pt-2 mt-auto">
        <div className="flex gap-4 w-full justify-center items-center">
          <ButtonRest onClick={handleDecrement} />
          <p className="font-display text-2xl font-semibold text-ink min-w-[2ch]">{cantidad}</p>
          <ButtonPlus onClick={handleIncrement} />
        </div>
        <div
          className="btn-dark w-full py-2.5 text-sm uppercase tracking-wide"
          onClick={() => {
            handleSetpreview(producto, cantidad, false, false);
          }}
        >
          Agregar
        </div>
      </div>
    </div>
  );
};

/*Este modal es solo para vista rapida de productos que no 
necesitan un panel de combo como las bebidas que solo se necesitan cantidad */
import React from "react";
import useQuisco from "../hooks/useQuiosco";
import { ButtonPlus, ButtonRest } from "./UI";
import { useCantidad } from "../hooks/useCantidad";

const ModalQuick = () => {
  const { producto, quickToggleModal, addOrder } = useQuisco();
  const [cantidad, handleIncrement, handleDecrement] = useCantidad();
  return (
    <>
      <div className="bg-white w-full flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Cantidad</p>
          <h2 className="section-title">{producto.nombre}</h2>
        </div>

        <div className="flex items-center gap-6">
          <ButtonRest onClick={handleDecrement} />
          <p className="font-display text-5xl font-semibold text-ink min-w-[3ch] text-center">{cantidad}</p>
          <ButtonPlus onClick={handleIncrement} />
        </div>
        <div
          className="btn-primary w-full"
          onClick={() => {
            addOrder(producto, cantidad)
            quickToggleModal();
          }}
        >
          Agregar Combo
        </div>
      </div>
    </>
  );
};

export default ModalQuick;

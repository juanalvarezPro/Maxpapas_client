import React from 'react'
import useQuisco from '../hooks/useQuiosco'
import { ButtonDelete, ButtonPlus, ButtonRest } from './UI';
import { useCantidad } from '../hooks/useCantidad';


export const ModalEdit = () => {
  const {producto, handleSetpreview, editToggleModal} = useQuisco();
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
            handleSetpreview(producto, cantidad, false, true);
            editToggleModal();
          }}
        >
          Editar Cantidad
        </div>
      </div>
    </>
  );
}

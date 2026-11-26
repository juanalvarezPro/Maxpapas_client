import React from "react";
import useAdmin from "../../hooks/useAdmin";
import { Transferencia } from "../../utils/global";

const ButtonTransfer = ({pedidoId}) => {
  const { pay, handleSetPay} = useAdmin();

  const isPayTransfer = pay == Transferencia
  return (
    <div
    onClick={() => {
      handleSetPay(isPayTransfer ? null : Transferencia);
    }}
      className={`h-full w-full ${
        isPayTransfer
          ? "bg-primary ring-2 ring-primary-600 shadow-glow"
          : "bg-white ring-1 ring-line hover:ring-primary"
      } flex gap-4 items-center justify-center overflow-hidden rounded-2xl cursor-pointer transition duration-200 p-3`}
    >
      <img
        decoding="async"
        alt={`imagen Bancolombia`}
        className="w-11 max-h-full object-contain"
        src={`/img/logo_bancolombia.webp`}
      />
      <div className="text-left">
        <p className="text-lg font-bold leading-tight">Transferencia</p>
        <p className={`text-xs font-semibold ${isPayTransfer ? "text-ink" : "text-ink-muted"}`}>
          {isPayTransfer ? "Seleccionado ✓" : "Tocar para seleccionar"}
        </p>
      </div>
    </div>
  );
};

export default ButtonTransfer;

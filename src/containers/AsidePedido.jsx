import React, { useState } from "react";
import Resumen from "../components/Resumen";
import { useAuth } from "../hooks/useAuth";
import useQuisco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

const AsidePedido = () => {
  const { pedido, handleSubmitNuevaOrden, total } = useQuisco();
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  const comprobarPedido = () => pedido.length === 0;

  const handleSubmit = (e) => {
    if (!pedidoEnviado) {
      e.preventDefault();
      setPedidoEnviado(true);
      handleSubmitNuevaOrden();
    }
  };
  if (comprobarPedido() && pedidoEnviado) {
    setPedidoEnviado(false);
  }

  return (
    <>
      <div className="shrink-0 h-16 lg:h-[4.5rem] flex items-center justify-between gap-3 px-4 lg:px-5 border-b border-line">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("panel-productos")
                ?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
            }
            aria-label="Seguir agregando productos"
            className="lg:hidden grid place-items-center h-10 w-10 shrink-0 rounded-xl bg-cream ring-1 ring-line text-ink text-xl"
          >
            ←
          </button>
          <h1 className="font-display text-2xl font-semibold text-ink truncate">Pedido actual</h1>
        </div>
        {pedido.length > 0 && (
          <span className="tag bg-primary-100 text-primary-800 text-sm">
            {pedido.length} {pedido.length === 1 ? "ítem" : "ítems"}
          </span>
        )}
      </div>

      <section className="flex-1 overflow-y-auto scrollbar p-4">
        {pedido.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="grid place-items-center h-24 w-24 rounded-full bg-primary-50">
              <img src="/img/Papas.webp" alt="" className="w-16 mix-blend-multiply" />
            </div>
            <p className="mt-4 font-bold text-ink">Tu pedido se encuentra vacío</p>
            <p className="mt-1 text-sm text-ink-muted">
              Agrega productos desde el menú para empezar.
            </p>
          </div>
        ) : (
          <Resumen />
        )}
      </section>

      <footer className="shrink-0 shadow-footer bg-white px-4 lg:px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            Total
          </p>
          <p className="font-display text-3xl font-semibold text-ink">
            {formatearDinero(total)}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="submit"
              className={`${
                comprobarPedido() || pedidoEnviado ? "btn-muted" : "btn-dark"
              } w-full py-4 text-base uppercase tracking-wide`}
              value={pedidoEnviado ? "Pedido enviado" : "Confirmar pedido"}
              disabled={comprobarPedido() || pedidoEnviado}
            />
          </div>
        </form>
      </footer>
    </>
  );
};

export default AsidePedido;

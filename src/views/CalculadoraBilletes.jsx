import React, { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { formatearDinero } from "../helpers";
import BillsItem from "../components/Admin/BillsItem";
import { ButtonTransfer } from "../components/UI";
import useOrderDifference from "../hooks/useOrderDifference";
import { Transferencia } from "../utils/global";

export const CalculadoraBilletes = () => {
  const { bills, orden, coinsTotal, stateInitialCalculator, payOrder, pay} = useAdmin();
  const { id, total } = orden;
  const { diferencia, textoEstado, colorEstado } = useOrderDifference(
    total,
    coinsTotal
  );

  const totalPedido = total ?? 0;

  const navigate = useNavigate();
  useEffect(() => {
    // Redirigir a /admin/ si el total del pedido es cero
    if (totalPedido === 0) {
      navigate("/admin/");
    }
  }, [total]);

  /* -------Clean setCoins------ */
  useEffect(() => {
    stateInitialCalculator();
  }, []);

  const comprobarPedido = () => {
    const isPayTransfer = pay == Transferencia
    return coinsTotal >= total || isPayTransfer
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    payOrder();
    navigate("/admin/");
  };

  return (
    <div className="max-w-5xl flex flex-col mx-auto gap-4">
      <header className="grid gap-3 grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 lg:col-span-1 rounded-3xl bg-ink text-white p-5 flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Total pedido</p>
          <h2 className="font-display text-4xl font-semibold text-primary">{formatearDinero(totalPedido)}</h2>
        </div>

        <div className="card p-4 flex flex-col justify-center gap-1">
          <div className="text-xs font-bold uppercase tracking-wider text-ink-muted">Recibe</div>
          <div className={`font-display text-2xl font-semibold ${colorEstado}`}>
            {formatearDinero(coinsTotal)}
          </div>
        </div>

        <div className="card p-4 flex flex-col justify-center gap-1">
          <div className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            {textoEstado}
          </div>
          <div className="font-display text-2xl font-semibold text-info">
            {formatearDinero(diferencia)}
          </div>
        </div>
      </header>

      <div className="h-16">
        <ButtonTransfer pedidoId={id} />
      </div>

      <main className="flex-1 min-h-0">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-muted">Billetes y monedas recibidos</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {bills.map((bill) => (
            <BillsItem key={bill.id} bill={bill} />
          ))}
        </div>
      </main>

      <footer className="sticky bottom-0 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-cream border-t border-line sm:border-0">
        <form onSubmit={handleSubmit}>
          <div>
          <input
              type="submit"
              className={`${
                comprobarPedido() ? "btn-dark" : "btn-muted"
              } w-full py-4 text-base uppercase tracking-wide`}
              value={comprobarPedido() ? "Pagar pedido" : "Sin canje"}
              disabled={!comprobarPedido()}
            />
          </div>
        </form>
      </footer>
    </div>
  );
};

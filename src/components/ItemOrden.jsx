import React from "react";
import { formatearDinero } from "../helpers";
import { ButtonPrinter } from "./UI";
import Ticket from "../Printer/Ticket";
import { v4 as uuidv4 } from "uuid";
import useAdmin from "../hooks/useAdmin";
import { ProductoOrden } from "./ProductoOrden";
import ButtonPayOrden from "./UI/ButtonPayOrden";

const ItemOrden = ({ pedido }) => {
  const {handleSetOrden} = useAdmin();
  const { cliente, id, total, productos, metodo_pago } = pedido;
  return (
    <details className="group card w-full mb-3 overflow-hidden animate-fade-up">
      <summary className="flex flex-wrap sm:flex-nowrap w-full items-center justify-between gap-3 p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-primary-50/60 transition">
        <div className="flex items-center gap-3 min-w-0">
          <div onClick={(e) => e.stopPropagation()}>
            <ButtonPrinter
              onClick={() => {
                Ticket(pedido);
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-lg capitalize text-ink truncate">{cliente}</p>
            <p className="text-xs text-ink-muted">
              Orden #{id} · {productos.length} {productos.length === 1 ? "producto" : "productos"}
              <span className="ml-1 inline-block transition group-open:rotate-180">▾</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <p className="font-display text-xl font-semibold text-ink whitespace-nowrap">{formatearDinero(total)}</p>
          <ButtonPayOrden onClick={()=>{handleSetOrden(pedido)}}/>
        </div>
      </summary>

      <div className="px-4 pb-4 border-t border-line">
      {productos.map((producto) => (
        <ProductoOrden key={uuidv4()} producto={producto} />
      ))}
      </div>
    </details>
  );
};

export default ItemOrden;

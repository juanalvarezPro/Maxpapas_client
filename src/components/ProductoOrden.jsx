import React from "react";
import { formatearDinero, formatter } from "../helpers";

export const ProductoOrden = ({ producto }) => {
  const { nombre, pivot } = producto;
  const detalle =
    typeof pivot.detalle === "string"
      ? JSON.parse(pivot.detalle)
      : pivot.detalle;

  const papa =
    detalle && detalle.papas && detalle.papas.length > 0
      ? detalle.papas[0].nombre_corto
      : "";
  const comentario = pivot.comentario;
  return (
    <div className="w-full flex gap-4 rounded-xl bg-cream ring-1 ring-line/70 mt-2 p-3 text-sm">
      <div className="flex-1 min-w-0 space-y-1">
        <h1
          className={`tag-llevar mb-1 ${
            pivot.envio ? "inline-flex" : "hidden"
          }`}
        >
          Para llevar
        </h1>
        <section className="detail-row">
          <h2 className="detail-key">Combo:</h2>
          <p className="detail-value">
            {pivot.cantidad == 1 ? '': pivot.cantidad} <span className="font-semibold text-ink">{nombre}</span>
            <span className="mx-1">{papa}</span>
            {detalle.salsas.length > 0 && (
              <>
                <span className="mx-1">con</span>
                <span>
                  {formatter.format(
                    detalle.salsas.map((item) =>
                      item.cantidad > 1
                        ? `${item.cantidad} ${item.nombre}`
                        : item.nombre
                    )
                  )}
                </span>
              </>
            )}
          </p>
        </section>
        {detalle.salsasAlas.length > 0 && (
          <section className="detail-row">
            <h2 className="detail-key">Alas:</h2>
            <p className="detail-value">
              {formatter.format(detalle.salsasAlas.map((item) => item.nombre))}
            </p>
          </section>
        )}
        {detalle.bebidas.length > 0 && (
          <section className="detail-row">
            <h2 className="detail-key">Bebida:</h2>
            <p className="detail-value">
              {formatter.format(
                detalle.bebidas.map(
                  (item) =>
                    `${item.cantidad == 1 ? "" : item.cantidad}  ${item.nombre}`
                )
              )}
            </p>
          </section>
        )}
        {detalle.adiciones.length > 0 && (
          <section className="detail-row">
            <h2 className="detail-key">Adiciones:</h2>
            <p className="detail-value">
              {formatter.format(
                detalle.adiciones.map(
                  (item) => `${item.cantidad} ${item.nombre}`
                )
              )}
            </p>
          </section>
        )}
        {comentario !== null && (
          <section className="mt-2 rounded-lg bg-primary-50 px-2.5 py-1.5 text-xs">
            <h2 className="inline font-bold text-primary-800">Comentario: </h2>
            <p className="inline text-ink-soft">{comentario}</p>
          </section>
        )}
      </div>

      <div className="shrink-0 font-display text-base font-semibold text-ink flex items-center">{formatearDinero(pivot.totalCombo)}</div>
    </div>
  );
};

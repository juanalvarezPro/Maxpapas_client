import { formatearDinero, formatter } from "../helpers";
import { ButtonDelete, ButtonEdit } from "./UI";

export default function ResumenCombos({ producto, Eliminar, Editar }) {
  const { stateEnvio, combo, detalles, total, uuid, comentario } = producto;

  return (
    <div className="card flex w-full mb-3 p-3.5 text-sm gap-3 animate-fade-up">
      <div className="flex-1 min-w-0 space-y-1">
        <h1
          className={`tag-llevar mb-1 ${
            stateEnvio ? "inline-flex" : "hidden"
          }`}
        >
          Para llevar
        </h1>
        {combo.length > 0 && (
          <section className="detail-row">
            <h2 className="detail-key">Combo:</h2>
            <p className="detail-value">
              {formatter.format(
                combo.map(
                  (item) =>
                    `${item.cantidad == 1 ? "" : item.cantidad} ${item.nombre}`
                )
              )}
              {detalles.papas.length > 0 && (
                <span className="mx-1">
                  {detalles.papas[0].nombre === "Papa Francesa"
                    ? "Francesa"
                    : detalles.papas[0].nombre === "Papa Mixta"
                    ? "Mixta"
                    : "Criolla"}
                </span>
              )}
              {detalles.salsas.length > 0 && (
                <>
                  <span className="mx-1">con</span>
                  <span>
                    {formatter.format(
                      detalles.salsas.map((item) =>
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
        )}{" "}
        {detalles.salsasAlas.length > 0 && (
          <section className="detail-row">
            <h2 className="detail-key">Alas:</h2>
            <p className="detail-value">
              {formatter.format(
                detalles.salsasAlas.map(
                  (item) =>
                   item.nombre
                )
              )}
            </p>
          </section>
        )}
        {detalles.bebidas.length > 0 && (
          <section className="detail-row">
            <h2 className="detail-key">Bebida:</h2>
            <p className="detail-value">
              {formatter.format(
                detalles.bebidas.map(
                  (item) =>
                    `${item.cantidad == 1 ? "" : item.cantidad}  ${item.nombre}`
                )
              )}
            </p>
          </section>
        )}
        {detalles.adiciones.length > 0 && (
          <section className="detail-row">
            <h2 className="detail-key">Adiciones:</h2>
            <p className="detail-value">
              {formatter.format(
                detalles.adiciones.map(
                  (item) => `${item.cantidad} ${item.nombre}`
                )
              )}
            </p>
          </section>
        )}
        {comentario !== "" && (
          <section className="mt-2 rounded-lg bg-primary-50 px-2.5 py-1.5 text-xs">
            <h2 className="inline font-bold text-primary-800">Comentario: </h2>
            <p className="inline text-ink-soft">{comentario}</p>
          </section>
        )}
      </div>
      <div className="flex flex-col items-end justify-between gap-3 shrink-0">
        <div className="flex gap-1.5 justify-end">
          <ButtonDelete
            onClick={() => {
              Eliminar(uuid);
            }}
          />
          <ButtonEdit
            onClick={() => {
              Editar(producto);
            }}
          />
        </div>
        <h2 className="font-display text-base font-semibold text-ink whitespace-nowrap">{formatearDinero(total)}</h2>
      </div>
    </div>
  );
}

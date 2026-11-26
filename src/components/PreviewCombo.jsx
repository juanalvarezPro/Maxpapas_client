import React from "react";
import useQuisco from "../hooks/useQuiosco";
import { formatter, formatearDinero } from "../helpers";
import ButtonDelete from "../components/UI/ButtonDelete";
import { ButtonDouble, ButtonEdit } from "./UI";

const PreviewCombo = () => {
  const {
    totalBebidas,
    handleEliminarSection,
    bebidas,
    totalAdicion,
    adiciones,
    papas,
    salsas,
    totalPreview,
    cantidadSalsa,
    comentario,
    setComentario,
    comboToggleModal,
    handleDuplicate,
    setTotalEnvio,
    pedidoEdit,
    salsasAlas,
    combo,
    previewCombo,
    stateEnvio,
    setStateEnvio,
  } = useQuisco();

  const isComboValid =
    (combo[0]?.necesita_papas == false && totalPreview > 0) || papas.length > 0;

  const isEditing = Object.keys(pedidoEdit).length === 0;

  return (
    <>
      <div>
        <div className="h-16 lg:h-[4.5rem] flex items-center gap-2 px-4 lg:px-5 border-b border-line">
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("panel-armar")
                ?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
            }
            aria-label="Seguir armando el combo"
            className="lg:hidden grid place-items-center h-10 w-10 shrink-0 rounded-xl bg-cream ring-1 ring-line text-ink text-xl"
          >
            ←
          </button>
          <h1 className="font-display text-2xl font-semibold text-ink truncate">Detalle del combo</h1>
        </div>
        {previewCombo.length === 0 ? (
          <p className="p-8 text-center text-ink-muted">No hay detalles del combo</p>
        ) : (
          <div className="p-4 w-full">
            <div className="flex gap-3 justify-between mb-4 items-center rounded-2xl bg-ink px-4 py-3 text-white">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">Subtotal</p>
                <p className="font-display text-2xl font-semibold">
                  {formatearDinero(totalPreview)}
                </p>
              </div>
              {isComboValid && (
                <>
                  {isEditing && (
                    <ButtonDouble
                      onClick={() => {
                        handleDuplicate();
                      }}
                    />
                  )}
                </>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3 text-sm">
              {stateEnvio && (
                <p
                  onClick={() => {
                    setStateEnvio(false);
                    setTotalEnvio(0);
                  }}
                  title="Quitar para llevar"
                  className="tag-llevar cursor-pointer justify-center w-full py-1.5 text-sm col-span-4 hover:bg-danger hover:text-white transition"
                >
                  Para Llevar
                </p>
              )}

              {/*---- Section Combos---- */}
              {combo && (
                <section className="card relative p-3 col-span-2">
                  <div className="flex w-full justify-between items-center mb-2 pb-2 border-b border-line">
                    <h2 className="font-bold text-ink">Combo</h2>
                    <div className="">
                      <ButtonEdit
                        onClick={() => {
                          comboToggleModal();
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-ink-soft">
                    {combo.map((item, index) => (
                      <span key={index}>
                        <span>{item.cantidad == 1 ? "" : item.cantidad} </span>
                        <span> {item.nombre} </span>
                      </span>
                    ))}
                    {papas.length > 0 && (
                      <span className=" ">
                        {formatter.format(
                          papas.map((item) => item.nombre_corto)
                        )}
                      </span>
                    )}
                  </p>
                </section>
              )}

              {/*---- Section Salsas---- */}

              {cantidadSalsa > 0 && (
                <section className="card col-span-2 p-3">
                  <div className="flex w-full justify-between mb-2 items-center pb-2 border-b border-line">
                    <h2 className="font-bold text-ink">Salsas</h2>
                    <div className="">
                      <ButtonDelete
                        onClick={() => {
                          let categoria_id = salsas[0].categoria_id;
                          handleEliminarSection(categoria_id);
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-ink-soft">
                    {formatter.format(
                      salsas.map((item) =>
                        item.cantidad > 1
                          ? `${item.cantidad} ${item.nombre}`
                          : item.nombre
                      )
                    )}
                  </p>
                </section>
              )}
              {/*---- Section Salsas Alas---- */}

              {salsasAlas.length > 0 && (
                <section className="card col-span-2 p-3">
                  <div className="flex w-full justify-between mb-2 items-center pb-2 border-b border-line">
                    <h2 className="font-bold text-ink">Salsas alas</h2>
                    <div className="">
                      <ButtonDelete
                        onClick={() => {
                          let categoria_id = salsasAlas[0].categoria_id;
                          handleEliminarSection(categoria_id);
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-ink-soft">
                    {formatter.format(salsasAlas.map((item) => item.nombre))}
                  </p>
                </section>
              )}

               {/*---- Section Bebidas---- */}
               {totalBebidas > 0 && (
                <section className="card p-3 relative col-span-2 text-ink-soft">
                  <div className="flex w-full justify-between items-center mb-2 pb-2 border-b border-line">
                    <h2 className="font-bold text-ink">Bebida</h2>
                    <div className="">
                      <ButtonDelete
                        onClick={() => {
                          let categoria_id = bebidas[0].categoria_id;
                          handleEliminarSection(categoria_id);
                        }}
                      />
                    </div>
                  </div>
                  {formatter.format(
                      bebidas.map((item) =>
                        item.cantidad > 1
                          ? `${item.cantidad} ${item.nombre}`
                          : item.nombre
                      )
                    )}
                </section>
              )}

              {/*---- Section Adiciones---- */}
              {totalAdicion > 0 && (
                <section className="card p-3 relative col-span-2 text-ink-soft">
                  <div className="flex w-full justify-between items-center mb-2 pb-2 border-b border-line">
                    <h2 className="font-bold text-ink">Adiciones</h2>
                    <div className="">
                      <ButtonDelete
                        onClick={() => {
                          let categoria_id = adiciones[0].categoria_id;
                          handleEliminarSection(categoria_id);
                        }}
                      />
                    </div>
                  </div>
                  {formatter.format(
                      adiciones.map((item) =>
                        item.cantidad > 1
                          ? `${item.cantidad} ${item.nombre}`
                          : item.nombre
                      )
                    )}
                </section>
              )}


              {/*---- Section Comentario---- */}

              {comentario !== "" && (
                <section className={`rounded-2xl bg-primary-50 ring-1 ring-primary-100 ${salsasAlas.length > 0 ? "col-span-2" : "col-span-4"} p-3 pr-12 relative text-ink-soft`}>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-primary-800 mb-1">Comentario</h2>
                  <div className="absolute top-0 right-0 m-2">
                    <ButtonDelete
                      onClick={() => {
                        setComentario("");
                      }}
                    />
                  </div>
                  {comentario}
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PreviewCombo;

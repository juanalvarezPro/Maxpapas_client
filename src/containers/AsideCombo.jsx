import React, { useState } from "react";
import useQuisco from "../hooks/useQuiosco";
import { Link } from "react-router-dom";
import PreviewCombo from "../components/PreviewCombo";
import ResumenCombos from "../components/ResumenCombos";
import ButtonExpand from "../components/UI/ButtonExpand";

const AsideCombo = () => {
  const {
    agregarCombo,
    duplicateCombo,
    handleEliminarCombo,
    handleEditCombo,
    cleanCombo,
    papas,
    pedidoEdit,
    combo,
    totalPreview,
  } = useQuisco();
  const [resumenExpanded, setResumenExpanded] = useState(false);

  const handleExpandResumen = () => {
    setResumenExpanded(!resumenExpanded);
  };

  const isComboValid =
    (combo[0]?.necesita_papas == false && totalPreview > 0) || papas.length > 0;

  return (
    <>
      <section
        className={`overflow-y-auto scrollbar ${
          duplicateCombo.length === 0 ? "flex-1" : "md:h-[60%] h-[45%]"
        } ${resumenExpanded ? "hidden" : "block"}`}
      >
        <PreviewCombo />
      </section>

      <section
        className={`${
          duplicateCombo.length === 0 ? "hidden" : "block"
        }  relative bg-cream border-t border-line ${
          resumenExpanded ? "flex-1 pt-10" : "flex-1"
        }`}
      >
        <div
          className={`absolute ${
            resumenExpanded ? "top-2" : "top-[-20px]"
          } z-10 left-0 w-full flex justify-center items-center`}
        >
          <ButtonExpand
            onClick={() => {
              handleExpandResumen();
            }}
            rotation={resumenExpanded}
          />
        </div>

        <div className="overflow-y-auto scrollbar p-4 h-full pt-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-muted">
            Combos agregados ({duplicateCombo.length})
          </p>
          {duplicateCombo.map((producto, key) => (
            <ResumenCombos
              key={key}
              producto={producto}
              Editar={handleEditCombo}
              Eliminar={handleEliminarCombo}
            />
          ))}
        </div>
      </section>

      <footer
        className={`shrink-0 min-h-[5.5rem] bg-white shadow-footer flex items-center justify-around px-4 lg:px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] overflow-hidden`}
      >
        {isComboValid && (
          <Link
            to={"/"}
            className="btn-dark w-full py-4 text-base uppercase tracking-wide"
            onClick={() => {
              agregarCombo();
              cleanCombo();
            }}
          >
            {duplicateCombo.length === 0
              ? Object.keys(pedidoEdit).length === 0
                ? "Agregar Combo"
                : "Editar Combo"
              : "Agregar Combos"}
          </Link>
        )}
        {!isComboValid && (
          <p className="w-full rounded-xl bg-cream px-4 py-3 text-center text-sm font-semibold text-ink-muted">
            Completa el combo para agregarlo
          </p>
        )}
      </footer>
    </>
  );
};

export default AsideCombo;

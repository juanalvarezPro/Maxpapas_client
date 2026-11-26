import React, { useEffect, useState } from "react";
import { useCantidad } from "../hooks/useCantidad";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { ButtonPlus, ButtonRest, Switch } from "../components/UI";
import useQuisco from "../hooks/useQuiosco";
import { BiSolidCommentEdit } from "react-icons/bi";
import { formatearDinero } from "../helpers";
import SelectionCombo from "../components/SelectionCombo";
import DetailCombo from "../components/DetailCombo";
import CustomModal from "../components/UI/CustomModal";
import { useModal } from "../hooks/useModal";


const PrepareCombo = ({ dataCombo }) => {
  const {
    setTotalEnvio,
    handleSetpreview,
    handleSetEnvio,
    stateEnvio,
    comentario,
    setComentario,
    ComboModal,
    comboToggleModal,
    passDataPreview,
    pedidoEdit,
    totalPreview,
  } = useQuisco();
  const [showComentario, setShowComentario] = useState(false)
  const [option, setOption] = useState([]);
  const [opcionActual, setOpcionActual] = useState({});
  const [cantidad, handleIncrement, handleDecrement] = useCantidad();

  function closeModal() {
    setShowComentario(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleClickoption = (id) => {
    const option = dataCombo.options.filter((option) => option.id === id)[0];
    setOpcionActual(option);
    setOption(option.productos);
  };

  const { producto, Empaque, options } = dataCombo || {};

  useEffect(() => {
    const pedidoProduct = pedidoEdit;
    const option = dataCombo.options[0];
    setOpcionActual(option);
    setOption(option.productos);
    if (Object.keys(pedidoProduct).length === 0) {
      handleSetpreview(producto, 1, true, false);
    } else {
      passDataPreview(pedidoProduct);
    }
  }, []);
  return (
    <>
      <header className="topbar shrink-0 h-16 lg:h-[4.5rem] flex items-center justify-between w-full px-4 lg:px-6 gap-3 shadow-sm">
        <div className="min-w-0 flex items-center gap-3">
          <div className="min-w-0">
            <p className="hidden sm:block text-xs font-semibold uppercase tracking-wider text-ink/60">Armando combo</p>
            <h3 className="font-display text-xl lg:text-2xl font-semibold text-ink truncate">{producto.nombre}</h3>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 shrink-0">
          <Switch
            checked={stateEnvio}
            onChange={(e) => handleSetEnvio(e.target.checked)}
            onClick={() => {
              const nuevoTotalEnvio = stateEnvio ? 0 : Empaque;
              setTotalEnvio(nuevoTotalEnvio);
            }}
            label={"Para Llevar"}
            viewPrice={Empaque}
          />

          <button
            type="button"
            title="Cantidad de combos"
            onClick={() => {
              comboToggleModal();
            }}
            className={`topbar-btn ${ComboModal ? "topbar-btn-active" : ""}`}
          >
            <MdOutlineAddToPhotos className="text-2xl" />
          </button>
          <button
            type="button"
            title="Agregar comentario"
            onClick={() => {
              setShowComentario(true);
            }}
            className={`topbar-btn ${comentario ? "topbar-btn-active" : ""}`}
          >
            <BiSolidCommentEdit className="text-2xl" />
          </button>
        </div>
      </header>

      <section className="overflow-y-auto flex-1 scrollbar">
        <div className="px-4 lg:px-6 pt-5 pb-1 flex items-center gap-2">
          <h2 className="section-title">{opcionActual?.nombre}</h2>
        </div>
        <div className="p-4 lg:p-6 pt-3 lg:pt-3 grid gap-3 sm:gap-4 lg:gap-5 grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 auto-rows-max">
          {option.map((producto) => (
            <DetailCombo key={producto.imagen} producto={producto} />
          ))}
        </div>
      </section>

      <div className="lg:hidden shrink-0 px-3 pt-2 bg-cream">
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("panel-combo")
              ?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
          }
          className="btn-dark w-full justify-between px-5 py-3.5 rounded-2xl shadow-lift"
        >
          <span>Ver combo</span>
          <span className="font-display text-lg">{formatearDinero(totalPreview)}</span>
        </button>
      </div>

      <footer className="shrink-0 bg-white shadow-footer border-t border-line flex items-center justify-center px-3 py-3 overflow-x-auto scrollbar">
      <div className={`grid gap-2 lg:gap-3 justify-center ${options.length === 3 ? 'grid-cols-3' : options.length === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}>
          {options.map((option, index) => (
            <SelectionCombo
              opcionActual={opcionActual}
              key={index}
              option={option}
              onClick={() => handleClickoption(option.id)}
            />
          ))}
        </div>
      </footer>

      <CustomModal isOpen={showComentario} onRequestClose={closeModal}>
        <form
          onSubmit={handleSubmit}
          className="text-ink flex w-full flex-col gap-4"
        >
          <div>
            <label htmlFor="setComentario" className="section-title block">Comentario</label>
            <p className="text-sm text-ink-muted">Instrucciones especiales para cocina.</p>
          </div>
          <textarea
            id="setComentario"
            name="setComentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
            rows={4}
            placeholder="Ej: sin cebolla, salsa aparte..."
            className="input resize-none"
          />

          <button
            className="btn-dark w-full"
            type="submit"
          >
            Guardar comentario
          </button>
        </form>
      </CustomModal>

      <CustomModal isOpen={ComboModal} onRequestClose={comboToggleModal}>
        <div className="bg-white w-full flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Cantidad de combos</p>
          <h2 className="section-title">
           {producto.nombre}
          </h2>
        </div>

          <div className="flex items-center gap-6">
            <ButtonRest onClick={handleDecrement} />
            <p className="font-display text-5xl font-semibold text-ink min-w-[3ch] text-center">{cantidad}</p>
            <ButtonPlus onClick={handleIncrement} />
          </div>
          <div
            className="btn-primary w-full"
            onClick={() => {
              handleSetpreview(producto, cantidad, true, true);
              comboToggleModal();
            }}
          >
            Agregar Combo
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default PrepareCombo;

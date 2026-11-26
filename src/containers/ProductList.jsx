import React, { useEffect, useState } from "react";
import useQuisco from "../hooks/useQuiosco";
import { useAuth } from "../hooks/useAuth";
import { LuMenuSquare } from "react-icons/lu";
import { MenuProducto } from "../components/MenuProducto";
import { ImUserPlus } from "react-icons/im";
import Producto from "../components/Producto";
import SearchBar from "../components/SearchBar";
import CustomModal from "../components/UI/CustomModal";
import ButtonAdminPanel from "../components/UI/ButtonAdminPanel";
import HeroSlider from "../components/HeroSlider";
import CategoriaBar from "../components/CategoriaBar";
import { formatearDinero } from "../helpers";

const ProductList = ({ products }) => {
  const {
    busqueda,
    handleChangeBusqueda,
    nameCliente,
    setNameCliente,
    cleanCombo,
    categoriaActual,
    pedido,
    total,
  } = useQuisco();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showClient, setShowClient] = useState(false);
  const { user } = useAuth({ middleware: "auth" });

  function closeModal() {
    setShowClient(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };
  useEffect(() => {
    return () => {
      cleanCombo();
    };
  }, []);

  const limpiarBusqueda = () => handleChangeBusqueda({ target: { value: "" } });
  const hayFiltro = Boolean(busqueda.trim()) || Boolean(categoriaActual?.id);

  // En móvil, el pedido está a la derecha: lo traemos a la vista
  const verPedido = () => {
    document
      .getElementById("panel-pedido")
      ?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <>
      <header className="topbar shrink-0 h-16 lg:h-[4.5rem] flex items-center justify-between w-full px-4 lg:px-6 gap-3 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <img src="/img/logo.svg" alt="Max Papas" className="h-11 w-11 lg:h-12 lg:w-12 shrink-0 drop-shadow" />
          <div className="hidden sm:block min-w-0">
            {user?.admin ? (
              <ButtonAdminPanel />
            ) : (
              <h3 className="font-display text-xl lg:text-2xl font-semibold text-ink truncate">
                ¡Hola, {user?.name}!
              </h3>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 min-w-0">
          <button
            type="button"
            className="topbar-btn px-3 sm:px-4 min-w-0"
            onClick={() => {
              setShowClient(true);
            }}
            title="Cambiar nombre del cliente"
          >
            <ImUserPlus className="text-lg shrink-0" />
            <span className="text-base sm:text-lg font-bold truncate max-w-[8rem] sm:max-w-[12rem]">{nameCliente}</span>
          </button>

          <button
            type="button"
            title="Menú"
            onClick={() => setShowSidebar(!showSidebar)}
            className={`topbar-btn shrink-0 ${showSidebar ? "topbar-btn-active" : ""}`}
          >
            <LuMenuSquare className="text-2xl" />
          </button>
        </div>
        <div
          className={`fixed lg:absolute inset-0 z-50 bg-ink/40 backdrop-blur-[2px] ${
            showSidebar ? "block" : "hidden"
          }`}
        >
          <div className="card z-[100] p-3 absolute top-[4.5rem] right-3 w-64 max-h-[75vh] overflow-y-auto scrollbar animate-fade-up text-ink">
            {user?.admin && (
              <div className="sm:hidden mb-3 pb-3 border-b border-line [&>div]:w-full [&>div]:bg-ink">
                <ButtonAdminPanel />
              </div>
            )}
            <MenuProducto />
          </div>
          <div
            className=" w-full h-full"
            onClick={() => {
              setShowSidebar(false);
            }}
          ></div>
        </div>
      </header>

      <section className="overflow-y-auto flex-1 scrollbar">
        <div className="px-4 lg:px-6 pt-4 space-y-4">
          {!hayFiltro && <HeroSlider />}

          <div className="sticky top-0 z-30 -mx-4 lg:-mx-6 px-4 lg:px-6 pt-1 pb-3 bg-cream/95 backdrop-blur space-y-3">
            <SearchBar value={busqueda} changeInput={handleChangeBusqueda} onClear={limpiarBusqueda} />
            <CategoriaBar />
          </div>

          {hayFiltro && (
            <p className="text-sm text-ink-muted">
              {products.length} {products.length === 1 ? "resultado" : "resultados"}
              {categoriaActual?.id ? (
                <> en <span className="font-bold text-ink capitalize">{categoriaActual.nombre}</span></>
              ) : null}
              {busqueda.trim() ? (
                <> para <span className="font-bold text-ink">“{busqueda.trim()}”</span></>
              ) : null}
            </p>
          )}
        </div>

        <div className="p-4 lg:p-6 pt-1 lg:pt-1 pb-28 lg:pb-6 grid gap-3 sm:gap-4 lg:gap-5 grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 auto-rows-max">
          {products.map((producto) => (
            <Producto key={producto.imagen} producto={producto} />
          ))}
        </div>
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center pb-32 pt-8 text-center text-ink-muted px-6">
            <img src="/img/Papas.webp" alt="" className="w-24 opacity-60 mix-blend-multiply" />
            <p className="mt-3 font-bold text-ink">No encontramos productos</p>
            <p className="text-sm">Prueba con otra palabra o categoría.</p>
          </div>
        )}
      </section>

      {/* Barra inferior móvil: acceso rápido al pedido */}
      <div className="lg:hidden absolute bottom-0 inset-x-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-cream via-cream/90 to-transparent">
        <button
          type="button"
          onClick={verPedido}
          className="btn-dark w-full justify-between px-5 py-4 rounded-2xl shadow-lift"
        >
          <span className="flex items-center gap-2">
            <span className="grid place-items-center h-7 min-w-[1.75rem] px-1.5 rounded-full bg-primary text-ink text-sm">
              {pedido.length}
            </span>
            Ver pedido
          </span>
          <span className="font-display text-lg">{formatearDinero(total)}</span>
        </button>
      </div>

      <CustomModal isOpen={showClient} onRequestClose={closeModal}>
        <form
          onSubmit={handleSubmit}
          className="text-ink flex w-full flex-col gap-4"
        >
          <div>
            <h2 className="section-title">Nombre del cliente</h2>
            <p className="text-sm text-ink-muted">Así aparecerá en el ticket y en cocina.</p>
          </div>
          <label htmlFor="setNameCliente" className="sr-only">Cambia el nombre del cliente</label>
          <input
            type="text"
            id="setNameCliente"
            name="setNameCliente"
            value={nameCliente}
            onChange={(e) => setNameCliente(e.target.value)}
            required
            autoFocus
            className="input text-lg"
            maxLength={15}
          />

          <button
            className="btn-dark w-full"
            type="submit"
          >
            Guardar nombre
          </button>
        </form>
      </CustomModal>
    </>
  );
};

export default ProductList;

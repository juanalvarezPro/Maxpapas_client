import useQuisco from "../hooks/useQuiosco";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import AsidePedido from "../containers/AsidePedido";
import ProductList from "../containers/ProductList";
import CustomModal from "../components/UI/CustomModal";
import ModalQuick from "../components/ModalQuick";

// Ignora mayúsculas y tildes: "salchipapa" encuentra "Salchipapá"
const normalizarTexto = (texto = "") =>
  texto
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export default function Inicio() {
  useAuth({ middleware: "auth" });
  const {
    categoriaActual,
    busqueda,
    handleClickCategoria,
    quickModal,
    quickToggleModal,
    listProductos,
  } = useQuisco();
  const [filterProduct, setFilterProduct] = useState([]);
  
  const applyFilters = () => {
    let productos = listProductos;
    if (categoriaActual.id > 0) {
      productos = listProductos.filter(
        (producto) => producto.categoria_id === categoriaActual.id
      );
    }
    if (busqueda.trim()) {
      const termino = normalizarTexto(busqueda.trim());
      productos = productos.filter((producto) =>
        normalizarTexto(producto.nombre).includes(termino)
      );
    }

    setFilterProduct(productos);
  };

  useEffect(() => {
    applyFilters();
  }, [categoriaActual, busqueda, listProductos]);


  return (
    <div className="flex overflow-x-auto h-screen h-[100dvh] snap-mandatory snap-x scrollbar bg-cream">
      <div id="panel-productos" className="w-screen h-full flex-shrink-0 lg:w-3/5 xl:w-2/3 relative snap-center flex flex-col">
        <ProductList products={filterProduct} />
      </div>
      <div id="panel-pedido" className="w-screen h-full flex-shrink-0 relative snap-center lg:w-2/5 xl:w-1/3 panel flex flex-col">
        <AsidePedido />
      </div>
      <CustomModal isOpen={quickModal} onRequestClose={quickToggleModal}>
        <ModalQuick />
      </CustomModal>
    </div>
  );
}

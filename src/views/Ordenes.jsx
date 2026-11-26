import React, { useState } from "react";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import DataTable from "react-data-table-component";
import { ButtonPrinter } from "../components/UI";
import Ticket from "../Printer/Ticket";
import { formatearDinero } from "../helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const columns = [
  {
    name: "id",
    selector: (row) => row.id,
  },
  {
    name: "Nombre",
    selector: (row) => row.cliente,
  },
  {
    name: "Total",
    selector: (row) => formatearDinero(row.total),
  },
  {
    name: "Fecha y Hora",
    selector: (row) => {
      const date = new Date(row.updated_at);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
  },
  {
    name: "Imprimir",
    cell: (row) => (
      <div className="flex justify-center items-center">
        <ButtonPrinter
          onClick={() => {
            Ticket(row);
          }}
        />
      </div>
    ),
  },
];

const customStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },
  headRow: {
    style: {
      border: "none",
      backgroundColor: "#FFF8E6",
      borderRadius: "0.75rem",
      minHeight: "44px",
    },
  },
  headCells: {
    style: {
      color: "#5E5147",
      fontSize: "0.8rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
    },
  },
  rows: {
    style: {
      fontSize: "0.95rem",
      color: "#241B14",
      minHeight: "56px",
    },
    highlightOnHoverStyle: {
      backgroundColor: "#FFF8E6",
      borderBottomColor: "#FFFFFF",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};

export const Ordenes = () => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [url, setUrl] = useState(`/api/pedidos?page=${currentPage}`);
  const fetcher = (url) =>
    clienteAxios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  // Función para actualizar la URL con los filtros y llamar a la API
  const handleFilter = () => {
    let newUrl = `/api/pedidos?page=${currentPage}`;
    if (startDate) {
      newUrl += `&start_date=${startDate.toISOString().split("T")[0]}`;
    }
    if (endDate) {
      newUrl += `&end_date=${endDate.toISOString().split("T")[0]}`;
    }
    setUrl(newUrl); // Actualiza la URL en useSWR
  };

  const updatePageUrl = (page) => {
    let newUrl = `/api/pedidos?page=${page}`;
    if (startDate) {
      newUrl += `&start_date=${startDate.toISOString().split("T")[0]}`;
    }
    if (endDate) {
      newUrl += `&end_date=${endDate.toISOString().split("T")[0]}`;
    }
    setUrl(newUrl);
  };
  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <p className="p-6 text-center font-semibold text-ink-muted">Cargando...</p>;
  if (error) return <p className="card p-6 text-center font-semibold text-danger">Error al cargar datos</p>;

  // Funciones para cambiar la página y actualizar la URL
  const handleNextPage = () => {
    if (data.data.data.current_page < data.data.data.last_page) {
      const nextPage = data.data.data.current_page + 1;
      setCurrentPage(nextPage);
      updatePageUrl(nextPage); // Actualiza la URL con la nueva página
    }
  };

  const handlePrevPage = () => {
    if (data.data.data.current_page > 1) {
      const prevPage = data.data.data.current_page - 1;
      setCurrentPage(prevPage);
      updatePageUrl(prevPage); // Actualiza la URL con la nueva página
    }
  };

  return (
    <div className="relative">
      <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Historial</p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-5">Pedidos</h1>
       <div className="rounded-3xl bg-ink text-white p-5 sm:p-6 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">Total pedidos</h2>
        <p className="font-display text-3xl sm:text-4xl font-semibold text-primary">{formatearDinero(data.data.total)}</p>
      </div>
      <div>
        <div className="card p-4 mb-5 grid grid-cols-2 sm:flex sm:items-end gap-3">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Fecha de inicio"
            className="input py-2.5"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Fecha de fin"
            className="input py-2.5"
          />
          <button
            onClick={handleFilter}
            className="btn-primary col-span-2 py-2.5 shadow-none"
          >
            Filtrar
          </button>
        </div>
      </div>

      <div className="card overflow-hidden p-2">
      <DataTable
        columns={columns}
        data={data.data.data.data}
        pagination={false}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
      />
      </div>
      <div className="flex items-center justify-between gap-3 mt-4 pb-4">
        <button
          onClick={handlePrevPage}
          disabled={data.data.data.current_page === 1}
          className="btn-soft py-2.5"
        >
          Anterior
        </button>
        <span className="text-sm font-semibold text-ink-soft text-center">
          Página {data.data.data.current_page} de {data.data.data.last_page}
        </span>
        <button
          onClick={handleNextPage}
          disabled={data.data.data.current_page === data.data.data.last_page}
          className="btn-soft py-2.5"
        >
          Siguiente
        </button>
      </div> 
    </div>
  );
};

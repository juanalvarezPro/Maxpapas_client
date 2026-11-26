import React from "react";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loading from "../components/Loading";
import ItemOrden from "../components/ItemOrden";

const OrdenesEnProceso = () => {
  const stateProcess = 2;
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios(`/api/pedidos/estado/${stateProcess}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  const { data, error, isLoading } = useSWR(
    `/api/pedidos/estado/${stateProcess}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  if (isLoading) return <Loading />;
  if (error) return <p className="card p-6 text-center font-semibold text-danger">Error al cargar datos</p>;

  return (
    <div>
      <header className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Cocina</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink">Órdenes en proceso</h1>
        </div>
        <span className="tag bg-info/10 text-info text-sm px-3 py-1">{data.data.data.length}</span>
      </header>
      {data.data.data.map((pedido) => (
        <ItemOrden key={pedido.id} pedido={pedido} />
      ))}
    </div>
  );
};

export default OrdenesEnProceso;

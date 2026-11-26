import useSWR from 'swr'
import clienteAxios from '../config/axios'
import Loading from "../components/Loading";
import ItemOrden from '../components/ItemOrden';

export default function BandejaOrdenes() {
  const receivedStatus = 1;
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios(`/api/pedidos/estado/${receivedStatus}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  const { data, error, isLoading } = useSWR(
    `/api/pedidos/estado/${receivedStatus}`,
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
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink">Órdenes pendientes</h1>
        </div>
        <span className="tag bg-primary text-ink text-sm px-3 py-1">{data.data.data.length}</span>
      </header>
      {data.data.data.length === 0 && (
        <div className="card flex flex-col items-center justify-center py-16 text-center">
          <img src="/img/Papas.webp" alt="" className="w-20 opacity-60 mix-blend-multiply" />
          <p className="mt-3 font-bold text-ink">No hay órdenes pendientes</p>
        </div>
      )}
      {data.data.data.map((pedido)=>(<ItemOrden key={pedido.id} pedido={pedido} />))}
    </div>
  );
}

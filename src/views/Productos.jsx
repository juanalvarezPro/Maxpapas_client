import useSWR from 'swr'
import clienteAxios from '../config/axios'
import Producto from '../components/Producto'

export default function Productos() {

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(datos => datos.data)

  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {refreshInterval: 10000})
  

  if(isLoading) return <p className='p-6 text-center font-semibold text-ink-muted'>Cargando...</p>

 

  return (
    <div>
        <p className='text-xs font-bold uppercase tracking-wider text-ink-muted'>Catálogo</p>
        <h1 className='font-display text-3xl sm:text-4xl font-semibold text-ink'>Productos</h1>
        <p className='mt-1 mb-6 text-ink-soft'>
          Maneja la disponibilidad desde aquí.
        </p>

        <div className='grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {data.data.map(producto => (
              <Producto
                key={producto.imagen}
                producto={producto}
                botonDisponible={true}
              />
          ))}
        </div>
    </div>
  )
}

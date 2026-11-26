import React from 'react'

const DashBoard = () => {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Resumen</p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink">Dashboard</h1>
      <div className="card mt-6 flex flex-col items-center justify-center py-16 text-center">
        <img src="/img/Papas.webp" alt="" className="w-20 opacity-60 mix-blend-multiply" />
        <p className="mt-3 font-bold text-ink">Muy pronto</p>
        <p className="text-sm text-ink-muted">Aquí verás las ventas y los productos más pedidos.</p>
      </div>
    </div>
  )
}

export default DashBoard

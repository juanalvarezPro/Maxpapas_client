import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-cream">
      <aside className="relative hidden lg:flex flex-col items-center justify-center overflow-hidden bg-ink p-12 text-center">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "url(/background/maxpapas.webp)", backgroundSize: "180px" }}
        />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-danger/20 blur-3xl" />

        <img src="/img/logo.svg" alt="Max Papas" className="relative w-72 drop-shadow-2xl" />
        <h2 className="relative mt-8 font-display text-4xl font-semibold text-white">
          Papas, alitas y mucho sabor
        </h2>
        <p className="relative mt-3 max-w-sm text-white/60">
          Toma pedidos rápido, arma combos y mantén la cocina al día.
        </p>
      </aside>

      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md animate-fade-up">
          <img src="/img/logo.svg" alt="Max Papas" className="mx-auto mb-6 w-32 lg:hidden" />
          <Outlet />
        </div>
      </section>
    </main>
  )
}

import { useAuth } from "../hooks/useAuth";

export const MenuProducto = () => {
  const { user, logout } = useAuth({ middleware: "auth" });

  return (
    <div>
      <div className="px-2 pb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Sesión</p>
        <p className="mt-0.5 font-bold text-ink truncate">{user?.name}</p>
      </div>

      <div className="w-full border-t border-line pt-3">
        <button
          type="button"
          className="btn-dark w-full py-2.5 text-sm"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

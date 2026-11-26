import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

export function SidebarItem({ icon, text, enlace }) {
  const { expanded, active, handleClickSideItem } = useAdmin();

  return (
    <Link
      to={enlace}
      onClick={() => {
        handleClickSideItem(text);
      }}
      className={`
          relative flex flex-col items-center justify-center gap-1 flex-1 md:flex-none md:w-full
          py-2 md:py-3 px-2 rounded-xl cursor-pointer
          text-[11px] font-semibold
          transition-colors group
          ${
            active === text
              ? "bg-primary text-ink"
              : "text-white/60 hover:bg-white/10 hover:text-white"
          }
      `}
    >
      {icon}
      <span className="md:hidden">{text}</span>

      {!expanded && (
        <div
          className={`
            hidden md:block
            absolute left-full rounded-lg px-2.5 py-1 ml-4 whitespace-nowrap
            bg-ink text-white text-sm font-semibold shadow-lift
            invisible opacity-20 -translate-x-3 transition-all
            z-[10000]
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
        >
          {text}
        </div>
      )}
    </Link>
  );
}

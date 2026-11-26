import { ButtonLogout, ButtonStore } from "../UI";
export default function Sidebar({ children }) {


  return (
    <aside className="shrink-0 md:h-full">
      {/* Escritorio: barra lateral */}
      <nav className="hidden md:flex h-full w-24 flex-col items-center bg-ink py-5">
        <ButtonStore/>
        <ul className="flex-1 flex flex-col justify-center items-center gap-2 w-full px-3">
          <li className="w-full flex flex-col gap-2">{children}</li>
        </ul>
        <div className="border-t border-white/10 pt-4 w-full flex justify-center">
        <ButtonLogout/>
        </div>
      </nav>

      {/* Móvil: barra inferior */}
      <nav className="md:hidden bg-ink px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lift">
        <ul className="flex items-stretch justify-around gap-1">
          <li className="contents">{children}</li>
          <li className="flex items-center"><ButtonLogout/></li>
        </ul>
      </nav>
    </aside>
  );
}

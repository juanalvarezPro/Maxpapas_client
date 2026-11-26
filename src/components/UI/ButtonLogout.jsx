import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { IoLogOut } from "react-icons/io5";

const ButtonLogout = () => {
  const { logout } = useAuth({ middleware: "auth" });
  return (
    <div className="relative group w-full text-center flex justify-center items-center">
      <IoLogOut
        size={44}
        className="p-2.5 rounded-xl text-white/60 cursor-pointer transition hover:bg-danger hover:text-white"
        onClick={logout}
      />
      <div
        className={`
          absolute left-full rounded-lg px-2.5 py-1 ml-4 whitespace-nowrap z-50
          bg-ink font-semibold text-white text-sm shadow-lift
          invisible opacity-0 transform -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
      >
        Cerrar sesión
      </div>
    </div>
  );
};

export default ButtonLogout;

import React from "react";

const ButtonStore = () => {
  const enterStore = (e) => {
    e.preventDefault();
    window.open("/", "_blank");
  };
  return (
    <div className="relative group w-full text-center flex justify-center items-center">
      <div onClick={enterStore} className="flex justify-center items-center">
        <img
          src="/img/logo.svg"
          alt="Max Papas"
          className="h-14 w-14 cursor-pointer transition-transform group-hover:scale-110"
        />
      </div>
      <div
        className={`
          absolute left-full rounded-lg px-2.5 py-1 ml-4 whitespace-nowrap z-50
          bg-ink text-white text-sm shadow-lift
          font-semibold
          invisible opacity-0 transform -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
      >
        Ir a la tienda
      </div>
    </div>
  );
};

export default ButtonStore;

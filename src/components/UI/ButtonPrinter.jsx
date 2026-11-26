import React from "react";
import { IoIosPrint } from "react-icons/io";


const ButtonPrinter = ({ onClick}) => {
  return (
    <IoIosPrint
      title="Imprimir ticket"
      className="cursor-pointer h-10 w-10 p-2 rounded-xl bg-white text-ink ring-1 ring-line shadow-sm transition hover:bg-ink hover:text-white active:scale-95"
      onClick={onClick}
    />
  );
};

export default ButtonPrinter;

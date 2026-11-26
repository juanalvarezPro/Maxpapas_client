import React from "react";
import { BiSolidDish } from "react-icons/bi";

export const QuantityProducto = ({ Quantity, onClick }) => {
  return (
    <div onClick={onClick} title="Editar cantidad" className="tag cursor-pointer bg-ink text-white text-sm py-1 shadow transition hover:bg-ink/85">
      <p>{Quantity}</p>
      <BiSolidDish className="text-base"/>
    </div>
  );
};

import React from "react";
import { MdMenuOpen } from "react-icons/md";

const ButtonMenu = ({ onClick}) => {
  return (
    <MdMenuOpen
      size={40}
      onClick={onClick}
      className="cursor-pointer bg-primary p-2 text-ink rounded-xl shadow-sm transition hover:bg-primary-400"
    />
  );
};

export default ButtonMenu;

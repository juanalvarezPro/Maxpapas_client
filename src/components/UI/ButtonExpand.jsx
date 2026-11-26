import React from "react";
import { TbLayoutBottombarExpandFilled } from "react-icons/tb";


const ButtonExpand = ({ onClick, rotation }) => {
  return (
    <TbLayoutBottombarExpandFilled
      title={rotation ? "Contraer" : "Expandir"}
      className={`cursor-pointer h-9 w-9 p-2 rounded-full bg-primary text-ink shadow-glow transition-transform ${rotation ? ' rotate-180' : 'rotate-0'}`}
      onClick={onClick}
    />
  );
};

export default ButtonExpand;

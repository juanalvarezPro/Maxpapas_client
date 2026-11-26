import React from "react";
import { PiCaretCircleDoubleDownFill } from "react-icons/pi";

const ButtonDouble = ({onClick}) => {
  return (
    <div
      onClick={onClick}
      title="Duplicar combo"
      className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-ink/85 active:scale-95"
    >
     <PiCaretCircleDoubleDownFill className="text-base" />
     <span>Duplicar</span>
    </div>
    
  );
};

export default ButtonDouble;

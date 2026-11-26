import React from "react";
import useCantidadBill from "../../hooks/useCantidadBill";
import { ButtonPlus, ButtonRest } from "../UI";

const BillsItem = ({ bill }) => {
    const { imagen} = bill;
  const [cantidad, handleIncrement, handleDecrement] = useCantidadBill(bill);
  return (
    <div className={`card relative flex flex-col overflow-hidden transition ${cantidad > 0 ? "ring-2 ring-primary" : ""}`}>
      {cantidad > 0 && (
        <span className="absolute top-2 right-2 z-10 grid place-items-center h-7 min-w-[1.75rem] px-1.5 rounded-full bg-primary text-ink text-sm font-bold shadow">
          {cantidad}
        </span>
      )}
      <div className="h-20 sm:h-24 p-2 bg-cream overflow-hidden">
        <img
          src={`/bills/${imagen}.webp`}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-2">
        <ButtonRest  onClick={handleDecrement} />
        <p className="font-display text-xl font-semibold text-ink">{cantidad}</p>
        <ButtonPlus onClick={handleIncrement} />
      </div>
    </div>
  );
};

export default BillsItem;

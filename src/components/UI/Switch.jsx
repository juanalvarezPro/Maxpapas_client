import React, { forwardRef } from "react";
import { FaCheck } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { formatearDinero } from "../../helpers";
import { LuPackagePlus } from "react-icons/lu";
import useQuisco from "../../hooks/useQuiosco";

const Switch = forwardRef(
  ({ label, viewPrice, onClick, ...restProps }, forwardedRef) => {
    // Extraer propiedades válidas para el input
    const { ...inputProps } = restProps;

    const { stateEnvio } = useQuisco();
    return (
      <label
        className={`cursor-pointer flex items-center gap-3 h-12 rounded-2xl pl-2 pr-4 transition ${
          stateEnvio ? "bg-ink text-white" : "bg-white/40 text-ink hover:bg-white/70"
        }`}
        onClick={onClick}
      >
        <div className="flex gap-3 items-center">
          {/* Pasar solo las props válidas al input */}
          <input
            type="checkbox"
            className="hidden"
            ref={forwardedRef}
            {...inputProps}
          />
          <div
            className={`w-14 p-1 rounded-full transition-colors ${
              stateEnvio ? "bg-white/20" : "bg-black/10"
            }`}
          >
            <div
              className={`w-fit p-0.5 shadow rounded-full transition-all duration-300 text-white ${
                stateEnvio
                  ? "bg-primary text-ink translate-x-6 rotate-0"
                  : "bg-white/90 text-ink-muted -rotate-180"
              }`}
            >
              {stateEnvio ? (
                <FaCheck size={18} />
              ) : (
                <IoCloseOutline size={18} className="text-ink-muted" />
              )}
            </div>
          </div>
          <span className="text-base font-bold hidden md:block whitespace-nowrap">
            {label}
          </span>

          <LuPackagePlus className="text-2xl block md:hidden" />
        </div>
        <p
          className={`font-display font-semibold text-lg hidden ${
            stateEnvio ? "xl:block xl:visible" : "xl:block xl:invisible"
          }`}
        >
          +{formatearDinero(viewPrice)}
        </p>
      </label>
    );
  }
);

export default Switch;

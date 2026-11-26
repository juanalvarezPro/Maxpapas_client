const SelectionCombo = ({ option ,onClick, opcionActual}) => {
  const {id, imagen, nombre } = option;
  const isActive = opcionActual.id === id;
  return (
    <div
      className={`w-[72px] lg:w-24 col-span-1 rounded-2xl text-center p-2 flex justify-center items-center flex-col gap-1 cursor-pointer transition ${
        isActive
          ? "bg-primary ring-2 ring-primary-600 shadow-glow"
          : "bg-white ring-1 ring-line hover:ring-primary hover:bg-primary-50"
      }`}
      onClick={onClick}
    >
      <div className="aspect-square w-4/5">
        <img src={`/img/${imagen}.webp`} alt="" className="w-full h-full object-contain mix-blend-multiply" />
      </div>
      <div className="font-bold text-[11px] lg:text-xs leading-tight text-ink truncate w-full">
        <p className="truncate">{nombre}</p>
      </div>
    </div>
  );
};

export default SelectionCombo;

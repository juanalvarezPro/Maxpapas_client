import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const SearchBar = ({ value, changeInput, onClear }) => {
  return (
    <div className="flex items-center rounded-2xl bg-white ring-1 ring-line px-4 h-12 gap-3 shadow-card transition focus-within:ring-2 focus-within:ring-primary">
      <FaSearch className="searchBar-icon text-base text-primary-600 shrink-0" />
      <input
        className="placeholder:text-ink-muted bg-transparent w-full input-focus text-base text-ink"
        style={{ outline: "none" }}
        type="search"
        inputMode="search"
        enterKeyHint="search"
        placeholder="Buscar papas, alitas, bebidas..."
        value={value}
        onChange={changeInput}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpiar búsqueda"
          className="grid place-items-center h-7 w-7 shrink-0 rounded-full bg-line text-ink-soft hover:bg-ink hover:text-white transition"
        >
          <IoClose />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

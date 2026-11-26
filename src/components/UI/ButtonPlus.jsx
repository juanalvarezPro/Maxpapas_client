import React from 'react'

const ButtonPlus = ({onClick}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Sumar"
      className="grid place-items-center h-11 w-11 rounded-full bg-primary text-ink shadow-sm transition hover:bg-primary-400 active:scale-90"
    >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 5v14m7-7H5"
      />
    </svg>
  </button>
  )
}

export default ButtonPlus

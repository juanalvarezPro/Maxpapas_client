import React from 'react'

const ButtonRest = ({onClick}) => {
  return (
    <button
    type="button"
    onClick={onClick}
    title="Restar"
    className="grid place-items-center h-11 w-11 rounded-full bg-white text-ink ring-2 ring-line transition hover:ring-primary active:scale-90"
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
        d="M19 12H5"
      />
    </svg>
  </button>
  )
}

export default ButtonRest

import React from 'react'

const QuantityWings = ({Wings}) => {
  return (
    <div className="tag cursor-pointer bg-danger text-white text-xs xl:text-sm py-1" title="Alas">
    <p>{Wings}</p>
    <img className='w-4 xl:w-5 brightness-0 invert' src="./img/alasIcon.webp" alt="" />
  </div>
  )
}

export default QuantityWings

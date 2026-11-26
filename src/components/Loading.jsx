import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen grid place-content-center justify-items-center gap-4 bg-cream'>
      <div className='h-12 w-12 rounded-full border-4 border-primary-100 border-t-primary animate-spin' />
      <p className='font-display text-lg font-semibold text-ink-soft'>Cargando...</p>
    </div>
  )
}


export default Loading

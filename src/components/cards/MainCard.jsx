import React from 'react'

function MainCard({ agent }) {
  return (
    <>
      <div className='max-w-56 max-h-64 rounded overflow-hidden shadow-lg'>
        <img
          className='max-w-40'
          src={'../assets/hero-placeholder.png'}
          alt='Agent Picture'
        />
        <div className='px-6 py-4'>
          <div className='font-bold text-xl text-center mb-2'>
            {agent?.displayName}
          </div>
        </div>
      </div>
    </>
  )
}

export default MainCard

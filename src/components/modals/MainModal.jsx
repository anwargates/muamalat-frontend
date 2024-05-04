import React, { useState } from 'react'
import ReactModal from 'react-modal'

function MainModal({ isOpen, closeModal, agent }) {
  const embedUrl = agent?.video?.replace('youtu.be', 'www.youtube.com/embed')
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg flex flex-col gap-1'>
        <h2 className='text-2xl font-bold'>{agent.displayName}</h2>
        <div className='flex flex-row w-100'>
          <img
            className='flex-2 max-h-80 object-contain'
            src={agent.fullPortrait}
            alt=''
          />
          <div className='flex-1 aspect-w-16 aspect-h-9'>
            <iframe
              title={agent.displayName}
              className='w-full h-full'
              src={embedUrl}
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen></iframe>
          </div>
        </div>
        <p className='mt-1 mb-1'>{agent.description}</p>
        <p className='font-bold'>Role: {agent.role}</p>
        <div className='flex overflow-scroll'>
          {agent.abilities?.map((ability, index) => (
            <div
              key={index}
              className='min-w-24 m-1 rounded-sm'>
              <img
                className='w-8'
                src={ability.displayIcon}
                alt='Icon'
              />
              <h3 className='text-lg font-bold'>{ability.displayName}</h3>
              <p>{ability.description}</p>{' '}
            </div>
          ))}
        </div>
      </div>
    </ReactModal>
  )
}

export default MainModal

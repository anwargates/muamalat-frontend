import React, { useState, useEffect } from 'react'

const Toast = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => {
      clearTimeout(timer)
    }
  }, [duration])

  return visible ? (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-8 py-4 rounded-md text-center'>
      {message}
    </div>
  ) : null
}

export default Toast

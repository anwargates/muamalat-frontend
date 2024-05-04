import React from 'react'

function Footer() {
  return (
    <footer className='bg-gray-800 py-4 text-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <p className='text-sm'>&copy; 2024 Muhammad Anwar Firdaus</p>
        <ul className='flex space-x-4'>
          <li>
            <a
              href='https://www.linkedin.com/in/muhammad-anwar-firdaus/'
              className='hover:text-blue-300'>
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href='https://github.com/anwargates'
              className='hover:text-blue-300'>
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer

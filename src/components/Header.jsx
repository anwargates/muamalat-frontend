import React, { useState } from 'react'
import { useAgentStore } from '../global/store'
import { useEffect } from 'react'
import axios from 'axios'

function Header() {
  const {
    agents,
    setAgents,
    setFilterRole,
    setFilterName,
    filterName,
    isLogin,
    setIsLogin,
  } = useAgentStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [profilePicture, setProfilePicture] = useState('')

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    // Trigger filter change with search term
    setFilterName(searchTerm)
  }

  // Extract unique roles from agents
  const roles = Array.from(new Set(agents.map((agent) => agent.role)))

  const handleRoleChange = (role) => {
    agents.filter
    setFilterRole(role)
  }

  const handleSignOut = (event) => {
    event.preventDefault()
    localStorage.removeItem('token')
    setIsLogin(false)
  }

  useEffect(() => {
    // handleGetProfilePic()
  }, [])

  // const handleGetProfilePic = async () => {
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:8191/adminuser/profilepicture',
  //       {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       }
  //     )
  //     console.error(response)
  //     // setProfilePicture(response?.data?)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <>
      <div className="bg-cover bg-center bg-[url('../assets/bg-header.png')]">
        <div className='h-36'></div>
        {isLogin ? (
          <div className='flex flex-col lg:flex-row content-between justify-between bg-gray-800 bg-opacity-75 text-white p-4'>
            <img
              src={profilePicture}
              alt=''
            />
            <ul className='flex border-b'>
              <li
                key='-1'
                className=''>
                <a
                  className='inline-block py-2 px-4 font-semibold'
                  href='#'
                  onClick={() => handleRoleChange('')}>
                  All
                </a>
              </li>
              {roles.map((role, index) => (
                <li
                  key={index}
                  className=''>
                  <a
                    className='inline-block py-2 px-4 font-semibold'
                    href='#'
                    onClick={() => handleRoleChange(role)}>
                    {role}
                  </a>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSearchSubmit}>
              <input
                type='text'
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Search by name'
                className='px-2 py-1 rounded-sm rounded-tr-none rounded-br-none text-black'
              />
              <button
                type='submit'
                className=' bg-[#3edeed] text-white px-2 py-1 rounded-sm rounded-tl-none rounded-bl-none '>
                Search
              </button>
              <button
                onClick={handleSignOut}
                className='bg-[#6d6d6d] text-[#ededed] px-2 py-1 rounded-sm rounded-tl-none rounded-bl-none '>
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <div className='flex flex-col lg:flex-row content-between justify-between bg-gray-800 bg-opacity-75 text-white p-4'>
            <button className='rounded'></button>
          </div>
        )}
      </div>
    </>
  )
}

export default Header

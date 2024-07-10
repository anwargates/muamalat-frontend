import React, { useEffect, useRef, useState } from 'react'
import { useAgentStore } from '../global/store'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  const { isLogin, setIsLogin, setLoginName } = useAgentStore()

  const initialError = {
    email: '',
    password: '',
    name: '',
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('ADMIN')
  const [error, setError] = useState(initialError)
  const [isLoginForm, setLoginForm] = useState(true)
  const [profilePicture, setProfilePicture] = useState(null)

  const navigate = useNavigate()

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 5) {
      setError((prevState) => ({
        ...prevState,
        password: 'Password must be at least 5 characters long.',
      }))
    } else {
      setError((prevState) => ({
        ...prevState,
        password: '',
      }))
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (e.target.value.length < 5) {
      setError((prevState) => ({
        ...prevState,
        email: 'Email must be at least 5 characters long.',
      }))
    } else {
      setError((prevState) => ({
        ...prevState,
        email: '',
      }))
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
    if (e.target.value.length < 5) {
      setError((prevState) => ({
        ...prevState,
        name: 'Name must be at least 5 characters long.',
      }))
    } else {
      setError((prevState) => ({
        ...prevState,
        name: '',
      }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setProfilePicture(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (JSON.stringify(error) !== JSON.stringify(initialError)) {
      return
    }

    let url = ''
    if (isLoginForm) {
      url = 'http://localhost:8191/auth/signin'
    } else {
      url = 'http://localhost:8191/auth/signup'
    }

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('name', name)
    formData.append('role', role)
    formData.append('profilePicture', profilePicture)

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Login successful:', response.data)
      // Handle successful login (e.g., store authentication token in local storage)
      localStorage.setItem('token', response.data?.token)
      setLoginName(response.data.name)
      setIsLogin(true)
      toast.success('Login successful')
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      // setError(error.response?.data?.message || error.response?.message) // Assuming error message is in data.message
      // handleShowToast()
      toast.error(error.response?.data?.message ?? error.message)
      setIsLogin(false)
    }
  }

  // useEffect(() => {
  //   console.log(error)
  //   console.log(initialError)
  //   console.log(JSON.stringify(error) !== JSON.stringify(initialError))
  // }, [error])

  return (
    <>
      <section className='min-h-[50vh] bg-[#e4e1d8]'>
        <div className='container max-w-7xl mx-auto py-16 md:px-16 '>
          <h2 className='font-bold text-2xl mb-20 text-center uppercase'>
            {isLoginForm ? 'SIGN IN' : 'SIGN UP'}
          </h2>
          <div className='flex gap-2 flex-wrap items-stretch justify-center'>
            {isLoginForm ? (
              <form
                onSubmit={handleSubmit}
                className='flex gap-2 flex-col'>
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  className='px-2 py-1 rounded-sm rounded-tr-none rounded-br-none text-black'
                  required
                />
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => handlePasswordChange(e)}
                  className='px-2 py-1 rounded-sm rounded-tr-none rounded-br-none text-black'
                  required
                />
                <button
                  type='submit'
                  className='bg-[#3edeed] text-white px-2 py-1 rounded-sm rounded-tl-none rounded-bl-none'>
                  Sign In
                </button>
                <button
                  type='submit'
                  onClick={() => setLoginForm(!isLoginForm)}
                  className='bg-[#b6ed3e] text-white px-2 py-1 rounded-sm rounded-tl-none rounded-bl-none'>
                  Sign Up
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-2'>
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  className='px-2 py-1 rounded-sm rounded-tr-none rounded-br-none text-black'
                  required
                />
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => handlePasswordChange(e)}
                  className='px-2 py-1 rounded-sm rounded-tr-none rounded-br-none text-black'
                  required
                />
                <input
                  type='name'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => handleNameChange(e)}
                  className='px-2 py-1 rounded-sm rounded-tr-none rounded-br-none text-black'
                  required
                />
                <input
                  type='file'
                  onChange={(e) => handleFileChange(e)}
                  className='text-black'
                  accept='image/*'
                />
                <button
                  type='submit'
                  className='bg-[#3edeed] text-white px-2 py-1 rounded-sm rounded-tl-none rounded-bl-none'>
                  Sign Up
                </button>
                <button
                  type='submit'
                  onClick={() => setLoginForm(!isLoginForm)}
                  className='bg-[#b6ed3e] text-white px-2 py-1 rounded-sm rounded-tl-none rounded-bl-none'>
                  Sign In
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      {/* {showToast && <Toast message={error} />} */}
    </>
  )
}

export default Login

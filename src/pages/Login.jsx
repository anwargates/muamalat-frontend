import React, { useEffect, useState } from 'react'
import { useAgentStore } from '../global/store'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/toasts/Toast'

function Login() {
  const { isLogin, setIsLogin, setLoginName } = useAgentStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('ADMIN')
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [isLoginForm, setLoginForm] = useState(true)
  const navigate = useNavigate()

  const handleShowToast = () => {
    setShowToast(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 5) {
      setError('Password must be at least 5 characters long.')
      handleShowToast()
      return
    } else {
      setError('')
    }

    let url = ''
    if (isLoginForm) {
      url = 'http://localhost:8191/auth/signin'
    } else {
      url = 'http://localhost:8191/auth/signup'
    }

    try {
      const response = await axios.post(url, {
        email,
        password,
        name,
        role,
      })
      console.log('Login successful:', response.data)
      // Handle successful login (e.g., store authentication token in local storage)
      localStorage.setItem('token', response.data.token)
      setLoginName(response.data.name)
      setIsLogin(true)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error.response.data)
      handleShowToast()
      setError(error.response.data.message) // Assuming error message is in data.message
      setIsLogin(false)
    }
  }

  useEffect(() => {
    console.log(error)
  }, [error])

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
                  onChange={(e) => setEmail(e.target.value)}
                  className='px-2 py-1 rounded-sm rounded-tr-none rounded-br-none text-black'
                  required
                />
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='px-2 py-1 rounded-sm rounded-tr-none rounded-br-none text-black'
                  required
                />
                <button
                  type='submit'
                  className='bg-[#3edeed] text-white px-2 py-1 rounded-sm rounded-tl-none rounded-bl-none'>
                  Sign In
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
                  onChange={(e) => setEmail(e.target.value)}
                  className='px-2 py-1 rounded-sm rounded-tr-none rounded-br-none text-black'
                  required
                />
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='px-2 py-1 rounded-sm rounded-tr-none rounded-br-none text-black'
                  required
                />
                <input
                  type='name'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='px-2 py-1 rounded-sm rounded-tr-none rounded-br-none text-black'
                  required
                />
                <button
                  type='submit'
                  className='bg-[#3edeed] text-white px-2 py-1 rounded-sm rounded-tl-none rounded-bl-none'>
                  Sign Up
                </button>
              </form>
            )}
            <button
              type='submit'
              onClick={() => setLoginForm(!isLoginForm)}
              className='bg-[#b6ed3e] text-white px-2 py-1 rounded-sm rounded-tl-none rounded-bl-none'>
              Switch
            </button>
          </div>
        </div>
      </section>
      {showToast && <Toast message={error} />}
    </>
  )
}

export default Login

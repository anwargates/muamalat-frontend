import React, { useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MainTemplate } from './components/templates/MainTemplate'
import Home from './pages/Home'
import { useAgentStore } from './global/store'
import Login from './pages/Login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'

function App() {
  const { agents, filterRole, setAgents, setFilterRole, isLogin, setIsLogin } =
    useAgentStore()
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token != null) {
      handleRefreshToken(token)
    }

    const fetchData = async () => {
      try {
        const response = await fetch('https://staging.ina17.com/data.json')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const jsonData = await response.json()
        setAgents(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleRefreshToken = async (token) => {
    try {
      const response = await axios.post('http://localhost:8191/auth/refresh', {
        token: token,
      })
      console.log('Login successful:', response.data)
      // Handle successful login (e.g., store authentication token in local storage)
      localStorage.setItem('token', response?.data?.token)
      setIsLogin(true)
      navigate('/dashboard')
    } catch (error) {
      console.error(
        'Login failed:',
        error.response?.data?.message ?? error.message
      )
      // setError(error.response?.data?.message ?? error.response?.message)
      toast.error(error.response?.data?.message ?? error.message) // Assuming error message is in data.message
      setIsLogin(false)
    }
  }

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<MainTemplate />}>
          {/* Redirect to /dashboard if logged in, otherwise redirect to /login */}
          <Route
            index
            element={
              isLogin ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
            }
          />
          <Route
            path='/login'
            element={<Login />}
          />
          {/* Protected route for the dashboard, accessible only when logged in */}
          <Route
            path='/dashboard'
            element={isLogin ? <Home /> : <Navigate to='/login' />}
          />
        </Route>
      </Routes>
    </>
  )
}

export default App

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import loginService from '../services/login'
import studentsService from '../services/students'

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)

  const setAuthToken = useCallback((token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      studentsService.setToken(token)
    } else {
      delete axios.defaults.headers.common['Authorization']
      studentsService.setToken(null)
    }
  }, [])

  const loadUser = useCallback(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedStudentappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setIsAdmin(user.isAdmin || false)
      setStatus(user.status || 'Unknown')
      setAuthToken(user.token)

      try {
        await studentsService.verifyToken()
      } catch (error) {
        console.error('Token verification failed:', error)
        await logout()
      }
    }
    setLoading(false)
  }, [setAuthToken])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const login = async (username, password) => {
    try {
      setLoading(true)
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedStudentappUser', JSON.stringify(user))
      setAuthToken(user.token)
      studentsService.setToken(user.token)
      setUser(user)
      setIsAdmin(user.isAdmin || false)
      setStatus(user.status || 'Unknown')
      return user
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage(error.response?.data?.error || 'Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      window.localStorage.removeItem('loggedStudentappUser')
      setUser(null)
      setIsAdmin(false)
      setAuthToken(null)
      setStatus(null)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const register = async (username, password, name) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users', { username, password, name })
      const newUser = response.data

      window.localStorage.setItem('loggedStudentappUser', JSON.stringify(newUser))
      setAuthToken(newUser.token)
      setUser(newUser)
      setIsAdmin(newUser.isAdmin || false)
      setStatus(newUser.status || 'Unknown')
      return newUser
    } catch (error) {
      console.error('Registration error:', error)
      setErrorMessage(error.response?.data?.error || 'Registration failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    errorMessage,
    login,
    logout,
    register,
    isAdmin,
    loading,
    status
  }
}

export default useAuth
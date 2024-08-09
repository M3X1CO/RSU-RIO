import { useState, useEffect } from 'react'
import axios from 'axios'
import loginService from '../services/login'
import studentsService from '../services/students'

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedStudentappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setAuthToken(user.token)
    }
  }, [])

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      studentsService.setToken(token)
    } else {
      delete axios.defaults.headers.common['Authorization']
      studentsService.setToken(null)
    }
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedStudentappUser', JSON.stringify(user))
      setAuthToken(user.token)
      setUser(user)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedStudentappUser')
    setUser(null)
    setAuthToken(null)
  }

  return { 
    user, 
    errorMessage, 
    login, 
    logout,
    isAdmin: user ? user.isAdmin : false
  }
}

export default useAuth
import { useState, useEffect } from 'react'
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
      studentsService.setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedStudentappUser', JSON.stringify(user))
      studentsService.setToken(user.token)
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
    studentsService.setToken(null)
  }

  return { user, errorMessage, login, logout }
}

export default useAuth
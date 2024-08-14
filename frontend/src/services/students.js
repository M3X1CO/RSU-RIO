import axios from 'axios'

const baseUrl = '/api/students'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const api = axios.create({
  baseURL: baseUrl,
})

api.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('loggedStudentappUser')
      window.location = '/login'
    }
    return Promise.reject(error)
  }
)

const verifyToken = async () => {
  try {
    const response = await api.get('/verify-token')
    return response.data
  } catch (error) {
    console.error('Token verification failed:', error)
    throw error
  }
}

const getAll = async () => {
  const response = await api.get('/')
  return response.data
}

const create = async (newObject) => {
  const response = await api.post('/', newObject)
  return response.data
}

const update = async (id, newObject) => {
  const response = await api.put(`/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const response = await api.delete(`/${id}`)
  return response.data
}

const studentService = { 
  setToken,
  getAll, 
  create, 
  update, 
  remove, 
  verifyToken
}

export default studentService
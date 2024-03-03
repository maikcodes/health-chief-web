import { AuthService } from '@services/Auth'
import { createContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '../models/routes'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({
    id: '',
    email: '',
    roles: []
  })
  const [loading, setLoading] = useState(true)

  const cookies = new Cookies()
  const navigate = useNavigate()
  const isAuthenticated = () => {
    return !!token
  }

  useEffect(() => {
    const storedToken = cookies.get('token')
    if (storedToken) {
      setToken(storedToken)
      const decoded = jwtDecode(storedToken)
      setUser(decoded)
    }
    setLoading(false)
  }, [])

  const logIn = useCallback(async ({ email, password }) => {
    if (!isAuthenticated()) {
      try {
        const response = await AuthService.login({ email, password })
        const { token } = response
        setToken(token)
        cookies.set('token', token, { path: '/' })
        const decoded = jwtDecode(token)
        setUser(decoded)
        navigate(`/${PrivateRoutes.PRIVATE}`)
      } catch (error) {
        throw new Error(error)
      }
    }
  }, [isAuthenticated, navigate])

  const logOut = useCallback(async () => {
    setToken('')
    setUser({
      id: '',
      email: '',
      roles: []
    })
    cookies.remove('token')
    navigate('/')
  }, [navigate])

  return (
    <AuthContext.Provider value={{ user, loading, token, isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

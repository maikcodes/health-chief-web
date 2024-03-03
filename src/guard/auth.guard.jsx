import { Outlet, Navigate } from 'react-router-dom'
import { PublicRoutes } from '../models/routes'
import useAuth from '@hooks/useAuth'

function AuthGuard () {
  const { isAuthenticated, loading } = useAuth()
  console.log('🚀 ~ AuthGuard ~ isAuthenticated:', isAuthenticated())

  if (loading) {
    return null
  }

  return isAuthenticated() ? <Outlet /> : <Navigate to={PublicRoutes.LOGIN} />
}

export default AuthGuard

import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

function useAuth () {
  const authContext = useContext(AuthContext)
  return authContext
}
export default useAuth

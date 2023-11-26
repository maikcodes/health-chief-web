import { useSelector } from 'react-redux'
// import { AppStore } from '../redux/store'
import { Outlet, Navigate } from 'react-router-dom'
import { PublicRoutes } from '../models/routes'

function AuthGuard () {
  // const userState = useSelector(store => store.user)
  // return userState.id ? true : false
  const userState = true
  return userState ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />
  // return <Navigate replace to={PublicRoutes.LOGIN} />
}

export default AuthGuard

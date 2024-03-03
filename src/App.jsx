import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { Login } from './pages/LogIn'
import { PrivateRoutes, PublicRoutes } from './models/routes'
import AuthGuard from './guard/auth.guard'
import { RoutesWithNotFound } from './utilities/RoutesWithNotFound'
import { Private } from './pages/Private'
import { AuthProvider } from '@contexts/AuthProvider'

function App () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesWithNotFound>
          <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />

          <Route path={PublicRoutes.LOGIN} element={<Login />} />

          <Route element={<AuthGuard />}>
            <Route
              path={`${PrivateRoutes.PRIVATE}/*`}
              element={<Private />}
            />
          </Route>

        </RoutesWithNotFound>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

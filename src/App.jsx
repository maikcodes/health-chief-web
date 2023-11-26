import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { Login } from './pages/login'
import { PrivateRoutes, PublicRoutes } from './models/routes'
import AuthGuard from './guard/auth.guard'
import { RoutesWithNotFound } from './utilities/RoutesWithNotFound'
import { Private } from './pages/Private'
import { Provider } from 'react-redux'
import store from './redux/store'

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />

          <Route path={PublicRoutes.LOGIN} element={<Login />} />

          <Route element={<AuthGuard />}>
            <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
          </Route>

        </RoutesWithNotFound>
      </BrowserRouter>
    </Provider>
  )
}

export default App

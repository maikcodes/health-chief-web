import { PrivateRoutes } from '../../models/routes'
import { Route, Navigate } from 'react-router-dom'
import { AdminRoutes } from './Admin'
import { RoutesWithNotFound } from '../../utilities/RoutesWithNotFound'
import { Doctor } from './Doctor'
import { Receptionist } from './Receptionist'

function Private () {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={PrivateRoutes.ADMIN} />} />
      <Route path='admin/*' element={<AdminRoutes />} />
      <Route path={PrivateRoutes.DOCTOR} element={<Doctor />} />

      <Route path={PrivateRoutes.RECEPTIONIST} element={<Receptionist />} />
    </RoutesWithNotFound>
  )
}

export default Private

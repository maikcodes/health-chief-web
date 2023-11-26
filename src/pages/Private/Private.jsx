import { PrivateRoutes } from '../../models/routes'
import { Route, Navigate } from 'react-router-dom'
import { Admin, Doctors, Users } from './Admin'
import { RoutesWithNotFound } from '../../utilities/RoutesWithNotFound'
import { Doctor } from './Doctor'
import { Receptionist } from './Receptionist'
import PersonsView from './Admin/Persons/Persons'

function Private () {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={PrivateRoutes.ADMIN} />} />

      <Route path={PrivateRoutes.ADMIN} element={<Admin />} />
      <Route path={`${PrivateRoutes.ADMIN}/users`} element={<Users />} />
      <Route path={`${PrivateRoutes.ADMIN}/doctors`} element={<Doctors />} />
      <Route path={`${PrivateRoutes.ADMIN}/persons`} element={<PersonsView />} />

      <Route path={PrivateRoutes.DOCTOR} element={<Doctor />} />

      <Route path={PrivateRoutes.RECEPTIONIST} element={<Receptionist />} />
    </RoutesWithNotFound>
  )
}

export default Private

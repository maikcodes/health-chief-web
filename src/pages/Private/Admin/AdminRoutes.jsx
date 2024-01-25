import { Routes, Route } from 'react-router-dom'
import Admin from './Admin'
import { Anamnesis } from './Anamnesis'
import { Appointments } from './Appointments'
import { Doctors } from './Doctors'
import { Patients } from './Patients'
import { GOH } from './GOH'
import { Persons } from './Persons'
import { PersonsRoles } from './PersonsRoles'
import { PhysicalExaminations } from './PhysicalExaminations'
import { Roles } from './Roles'
import { Users } from './Users'
import { Specialties } from './Specialties'

function AdminRoutes () {
  return (
    <Routes>
      <Route path='/' element={<Admin />} />
      <Route path='/anamnesis' element={<Anamnesis />} />
      <Route path='/appointments' element={<Appointments />} />
      <Route path='/doctors' element={<Doctors />} />
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <Route path='/gynecological-obstetrical-histories' element={<GOH />} />
      <Route path='/patients' element={<Patients />} />
      <Route path='/persons' element={<Persons />} />
      <Route path='/person-roles' element={<PersonsRoles />} />
      <Route path='/physical-examinations' element={<PhysicalExaminations />} />
      <Route path='/roles' element={<Roles />} />
      <Route path='/specialties' element={<Specialties />} />
      <Route path='/users' element={<Users />} />
    </Routes>
  )
}

export default AdminRoutes

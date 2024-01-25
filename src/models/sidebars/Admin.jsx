import { TiAttachmentOutline } from 'react-icons/ti'
import { ICON_STYLE } from './Styles'

export const adminSidebarOptions = {
  title: 'Admin',
  options: [
    { id: 'dashboard', title: 'dashboard' },
    { id: 'dashboard_1', title: 'dashboard 1', route: '', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'dashboard_2', title: 'dashboard 2', route: '', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'dashboard_3', title: 'dashboard 3', route: '', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'entities', title: 'entities' },
    { id: 'anamnesis', title: 'Anamnesis', route: '../anamnesis', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'appointments', title: 'Appointments', route: '../appointments', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'doctors', title: 'Doctors', route: '../doctors', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'patients', title: 'Patients', route: '../patients', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'goh', title: 'GOH', route: '../gynecological-obstetrical-histories', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'persons', title: 'Persons', route: '../persons', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'person-roles', title: 'Persons roles', route: '../person-roles', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'physical-examinations', title: 'Physical examinations', route: '../physical-examinations', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'roles', title: 'Roles', route: '../roles', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'users', title: 'Users', route: '../users', icon: <TiAttachmentOutline className={ICON_STYLE} /> },
    { id: 'specialties', title: 'Specialties', route: '../specialties', icon: <TiAttachmentOutline className={ICON_STYLE} /> }
  ]
}

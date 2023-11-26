import { doctorSidebarOptions } from '../../models/sidebars/Doctor'
import { sidebarMenuOptions } from '../../models/sidebars/SidebarMenu'
import { Sidebar } from '../sidebar'
import Layout from './Layout'

function DoctorLayout ({ children }) {
  return (
    <Layout>
      <Sidebar options={{ sidebarHeader: sidebarMenuOptions, sidebarOptions: doctorSidebarOptions }} />
      <main className='flex-1 lg:w-9/12 px-5'>
        {children}
      </main>
    </Layout>
  )
}

export default DoctorLayout

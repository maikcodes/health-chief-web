import { adminSidebarOptions } from '../../models/sidebars/Admin'
import { sidebarMenuOptions } from '../../models/sidebars/SidebarMenu'
import { Sidebar } from '../sidebar'
import Layout from './Layout'

function AdminLayout ({ children }) {
  return (
    <Layout>
      <Sidebar options={{ sidebarHeader: sidebarMenuOptions, sidebarOptions: adminSidebarOptions }} />
      <main className='flex-1 lg:w-9/12 px-5 py-2'>
        {children}
      </main>
    </Layout>
  )
}

export default AdminLayout

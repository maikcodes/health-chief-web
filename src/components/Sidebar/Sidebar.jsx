import { useState } from 'react'
import SidebarClosed from './SidebarClosed'
import SidebarOpen from './SidebarOpen'

function Sidebar ({ options }) {
  const [open, setOpen] = useState(true)

  const handleOpen = () => {
    setOpen(!open)
  }

  if (!open) {
    return <SidebarClosed handleOpen={handleOpen} options={options} />
  }

  return <SidebarOpen handleOpen={handleOpen} options={options} />
}

export default Sidebar

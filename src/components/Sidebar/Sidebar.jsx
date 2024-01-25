import { useState } from 'react'
import SidebarClosed from './SidebarClosed'
import SidebarOpen from './SidebarOpen'

function Sidebar ({ options }) {
  const [open, setOpen] = useState(true)
  const [selected, setSelected] = useState('')

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSelect = (id) => {
    setSelected(id)
  }

  if (!open) {
    return <SidebarClosed handleOpen={handleOpen} options={options} handleSelect={handleSelect} selected={selected} />
  }

  return <SidebarOpen handleOpen={handleOpen} options={options} handleSelect={handleSelect} selected={selected} />
}

export default Sidebar

import { Navbar } from '../navbar'

function Layout ({ children }) {
  return (
    <div className='w-screen h-screen flex flex-col bg-indigo-50'>
      <Navbar />
      <div className='flex-1 md:flex w-full'>
        {children}
      </div>
    </div>
  )
}

export default Layout

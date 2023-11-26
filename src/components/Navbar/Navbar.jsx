import userIcon from '../../../public/profile.png'
import appIcon from '../../../public/app-icon.png'
import { BiSolidDownArrow } from 'react-icons/bi'
import { BsFillCalendarEventFill, BsFillChatDotsFill, BsFillBellFill } from 'react-icons/bs'

function Navbar () {
  return (
    <header
      id='navbar' name='navbar'
      className='sticky top-0 z-50 px-2 py-2 border-b-2 rounded-b-lg border-gray-400 bg-gray-100'
    >
      <nav className='flex flex-row justify-between'>

        <div className='capitalize flex flex-row items-center md:w-3/12 lg:w-2/12 lg:pl-5'>
          <div className='w-6 h-6 md:w-12 md:h-12'>
            <img className='rounded-full object-cover' src={appIcon} />
          </div>
          <h1 className='hidden md:block lg:px-3 lg:text-lg md:text-xl md:font-bold'>
            Health Chief
          </h1>
        </div>

        <div className='flex flex-row gap-2 md:gap-0 md:w-9/12 lg:w-10/12 md:items-center md:justify-between'>

          <div className='flex items-center md:w-4/12 md:flex'>
            <ul className='flex flex-row md:pl-7 gap-1'>
              <li className='text-biscay-900 md:flex md:px-2 md:hover:cursor-pointer md:text-lg'>
                <BsFillCalendarEventFill />
              </li>
              <li className='text-biscay-900 md:flex md:px-2 md:hover:cursor-pointer md:text-lg'>
                <BsFillChatDotsFill />
              </li>
              <li className='text-biscay-900 md:flex md:px-2 md:hover:cursor-pointer md:text-lg'>
                <BsFillBellFill />
              </li>
            </ul>
          </div>

          <div className='flex items-center md:flex-row md:justify-end md:px-5'>
            <div className='md:flex md:flex-row'>
              <div className='flex flex-row items-center pr-2 capitalize space-x-4'>

                <div>
                  <h1 className='hidden md:block md:text-sm md:font-semibold'>
                    Willy Romero
                  </h1>

                  <div className='md:flex md:justify-end'>
                    <p className='border-[1px] text-biscay-800 font-bold rounded-xl px-2 py-[1px] text-xs border-biscay-600 bg-biscay-200'>
                      Admin
                    </p>
                  </div>
                </div>

                <div className='flex flex-row gap-1 items-center'>
                  <div className='w-8 h-8 md:w-12 md:h-12'>
                    <img className='rounded-full object-cover' src={userIcon} alt='user profile icon' />
                  </div>

                  <BiSolidDownArrow className='md:leading-none md:text-xl' />
                </div>
              </div>
            </div>

          </div>
        </div>

      </nav>

    </header>
  )
}

export default Navbar

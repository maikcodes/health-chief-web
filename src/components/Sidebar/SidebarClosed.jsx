import { ButtonPrimary } from '../Buttons'
import { Link } from 'react-router-dom'

function SidebarClosed ({ handleOpen, options, handleSelect, selected }) {
  const sidebarMenuIcon = options.sidebarHeader.icon
  const sidebarOptions = options.sidebarOptions.options
  return (
    <div className='md:flex md:items-start md:w-[75px] px-1 py-2'>
      <nav className='bg-biscay-700 md:flex md:rounded-2xl md:w-full p-1 md:p-4 sticky z-0 top-0 md:max-h-[520px] shadow-md shadow-gray-500'>

        <div className='md:flex md:flex-col w-full'>
          <ButtonPrimary icon={sidebarMenuIcon} onClick={handleOpen} />

          <ul className='hidden md:block md:overflow-y-scroll md:no-scrollbar md:overflow-x-hidden'>
            {sidebarOptions.map((option, optionIndex) => {
              if ('icon' in option) {
                return (
                  <li key={optionIndex}>
                    <Link
                      to={option.route}
                      className={`${selected === option.id
                        ? 'text-white lg:hover:cursor-pointer py-1 bg-biscay-400 rounded-xl capitalize flex flex-row items-center group relative justify-center px-2'
                        : 'text-white lg:hover:cursor-pointer py-1 hover:bg-biscay-400 rounded-xl capitalize flex flex-row items-center group relative justify-center px-2'}`}
                      title={option.title}
                      onClick={() => handleSelect(option.id)}
                    >
                      <div className='px-2'>{option.icon}</div>
                    </Link>
                  </li>
                )
              }
              return (
                <li key={optionIndex} className='flex items-center my-5 flex-row '>
                  <div className='border-t border-gray-300 flex-grow' />
                </li>
              )
            })}
          </ul>

        </div>
      </nav>
    </div>
  )
}

export default SidebarClosed

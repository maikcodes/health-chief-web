import { ButtonPrimary } from '../Buttons'
import { Link } from 'react-router-dom'

function SidebarOpen ({ handleOpen, options, handleSelect, selected }) {
  const sidebarMenuIcon = options.sidebarHeader.icon
  const sidebarTitle = options.sidebarOptions.title
  const sidebarOptions = options.sidebarOptions.options

  return (
    <div className='md:flex md:items-start md:w-4/12 lg:w-2/12 px-1 py-2'>
      <nav className='bg-biscay-700 md:flex md:rounded-2xl md:w-full p-1 md:p-4 sticky z-0 top-0 md:max-h-[520px] shadow-md shadow-gray-500'>

        <div className='md:flex md:flex-col w-full'>
          <ButtonPrimary icon={sidebarMenuIcon} text={sidebarTitle} onClick={handleOpen} />

          <ul className='overflow-y-scroll no-scrollbar overflow-x-hidden'>
            {sidebarOptions.map((option) => {
              if ('icon' in option) {
                return (
                  <li key={option.id} className='' onClick={() => handleSelect(option.id)}>
                    <Link
                      to={option.route}
                      className={`${selected === option.id
                        ? 'justify-center md:justify-normal md:text-left text-white lg:hover:cursor-pointer py-1 bg-biscay-400 capitalize rounded-xl flex flex-row items-center group relative px-2'
                        : 'justify-center md:justify-normal md:text-left text-white lg:hover:cursor-pointer py-1 hover:bg-biscay-400 capitalize rounded-xl flex flex-row items-center group relative px-2'}`}
                      title={option.title}
                    >
                      <div className='pr-2'>{option.icon}</div>
                      <p className='px-2 md:text-sm'>{option.title}</p>

                    </Link>
                  </li>
                )
              }
              return (
                <li key={option.id} className='flex items-center py-1 md:py-3 flex-row'>
                  <div className='border-t border-gray-300 flex-grow' />
                  <p className='text-gray-300 uppercase mx-2 md:text-sm'>{option.title}</p>
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

export default SidebarOpen

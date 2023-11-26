import { ButtonPrimary } from '../Buttons'

function SidebarOpen ({ handleOpen, options }) {
  const sidebarMenuIcon = options.sidebarHeader.icon
  const sidebarTitle = options.sidebarOptions.title
  const sidebarOptions = options.sidebarOptions.options
  return (
    <div className='md:flex md:items-start md:w-4/12 lg:w-2/12 p-1'>
      <nav className='bg-biscay-700 md:flex md:rounded-2xl md:w-full p-1 md:p-4 sticky z-0 top-0 md:max-h-[545px] shadow-md shadow-gray-500'>

        <div className='md:flex md:flex-col w-full'>
          <ButtonPrimary icon={sidebarMenuIcon} text={sidebarTitle} onClick={handleOpen} />

          <ul className='overflow-y-scroll no-scrollbar overflow-x-hidden'>
            {sidebarOptions.map((option, optionIndex) => {
              if ('icon' in option) {
                return (
                  <li key={optionIndex} className=''>
                    <a
                      href='#'
                      className='justify-center md:justify-normal md:text-left text-white lg:hover:cursor-pointer py-1 hover:bg-biscay-400 capitalize rounded-xl flex flex-row items-center group relative px-2'
                      title={option.title}
                    >
                      <div className='pr-2'>{option.icon}</div>
                      <p className='px-2 md:text-sm'>{option.title}</p>

                    </a>
                  </li>
                )
              }
              return (
                <li key={optionIndex} className='flex items-center py-1 md:py-3 flex-row'>
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

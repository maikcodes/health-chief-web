function SidebarClosed ({ handleOpen, options }) {
  const sidebarMenuIcon = options.sidebarHeader.icon
  const sidebarOptions = options.sidebarOptions.options
  return (
    <div className='md:flex md:items-start md:w-[75px] p-1'>
      <nav className='bg-indigo-600 md:flex md:rounded-2xl md:w-full p-1 md:p-4 sticky z-0 top-0 md:max-h-[545px] shadow-md shadow-gray-500'>

        <div className='md:flex md:flex-col w-full'>
          <div className='flex items-center justify-center h-8 md:h-16'>
            <button type='button' onClick={handleOpen} className='justify-center rounded-xl hover:bg-indigo-400 p-2 w-full flex items-center'>
              {sidebarMenuIcon}
            </button>
          </div>

          <ul className='hidden md:block md:overflow-y-scroll md:no-scrollbar md:overflow-x-hidden'>
            {sidebarOptions.map((option, optionIndex) => {
              if ('icon' in option) {
                return (
                  <li key={optionIndex}>
                    <a
                      href='#'
                      className='text-white lg:hover:cursor-pointer py-1 hover:bg-indigo-400 rounded-xl capitalize flex flex-row items-center group relative justify-center px-2'
                      title={option.title}
                    >
                      <div className='px-2'>{option.icon}</div>
                    </a>
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

import { useEffect, useState } from 'react'
import userImage from '../../../../../public/profile.png'
import { BsEyeFill, BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { AdminLayout } from '../../../../components/Layouts'
// import { AdminTable } from '../../../../components/Tables'
import { PersonService } from '../../../../services'

function PersonsView () {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    async function loadPersonList () {
      try {
        const persons = await PersonService.getAll()
        console.log(persons)
        setPersons(persons)
      } catch (error) {
        console.log(error)
      }
    }

    loadPersonList()
  }, [])

  return (
    <AdminLayout>
      <div className='h-full lg:pt-3'>

        <div className='md:mb-5 flex flex-col'>
          <h2 className='md:text-2xl font-bold flex lg:pb-2'>Persons</h2>

          <div className='lg:flex lg:flex-row lg:justify-between lg:items-center'>
            <div className='relative items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg className='w-4 h-4 text-gray-500' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
                </svg>
              </div>
              <input type='text' id='table-search-users' className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50  focus:border-blue-500' placeholder='Search for users' />
            </div>

            <div>
              <button className='lg:px-6 lg:py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500' type='button'>New</button>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between border-t border-gray-200 bg-white py-3'>

          <div className='flex flex-1 justify-between sm:hidden'>
            <a href='#' className='relative inline-flex items-center rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>Previous</a>
            <a href='#' className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>Next</a>
          </div>

          <div className='lg:flex lg:flex-1 lg:items-center lg:justify-end'>

            <div className='lg:mx-5'>
              <div className='text-sm text-gray-700 lg:w-full flex flex-row justify-end'>
                <p className='lg:mx-2'>
                  Showing
                </p>
                <span className='font-medium'>1</span>
                <p className='lg:mx-2'>
                  to
                </p>
                <span className='font-medium'>10</span>
                <p className='lg:mx-2'>
                  of
                </p>
                <span className='font-medium'>97</span>
                <p className='lg:mx-2'>
                  results
                </p>
              </div>
            </div>

            <div>
              <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm' aria-label='Pagination'>
                <a href='#' className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                  <span className='sr-only'>Previous</span>
                  <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                    <path fillRule='evenodd' d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z' clipRule='evenodd' />
                  </svg>
                </a>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                <a href='#' aria-current='page' className='relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>1</a>
                <a href='#' className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>2</a>
                <a href='#' className='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'>3</a>
                <span className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'>...</span>
                <a href='#' className='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'>8</a>
                <a href='#' className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>9</a>
                <a href='#' className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>10</a>
                <a href='#' className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                  <span className='sr-only'>Next</span>
                  <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                    <path fillRule='evenodd' d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z' clipRule='evenodd' />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}

export default PersonsView

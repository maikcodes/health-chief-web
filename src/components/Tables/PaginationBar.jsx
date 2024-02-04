import UsePaginationIndices from '../../hooks/UsePaginationIndices'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

function PaginationBar ({ paginationObject }) {
  const { page, totalPages, results, totalResults, handlePageChange, limit, handleLimitChange } = paginationObject
  const { paginationIndices, error } = UsePaginationIndices({ page, totalPages })

  const generateStartResults = () => {
    if (page < totalPages) return (results * page) - results + 1
    return totalResults - results + 1
  }

  const generateEndResults = () => {
    if (page < totalPages) return results * page
    return totalResults
  }

  const _handleLimitChange = (event) => {
    const _limit = event.target.value
    if (_limit > totalPages) {
      handlePageChange(1)
      handleLimitChange(_limit)
    } else {
      handleLimitChange(_limit)
    }
  }

  const handleNextPage = () => {
    if (page !== totalPages) handlePageChange(page + 1)
  }

  const handlePreviousPage = () => {
    if (page !== 1) handlePageChange(page - 1)
  }

  if (error) return (<p>Error</p>)

  return (
    <div className='flex flex-col md:flex-row items-center justify-center md:justify-between gap-y-2'>
      <div className='flex flex-col md:flex-row items-center gap-y-2'>
        <div className='flex flex-row justify-center text-gray-600'>
          <p className=''>
            Showing
            <span className='text-md font-bold'> {results} </span>
            ({generateStartResults()} - {generateEndResults()})
            of
            <span className='text-md font-bold'> {totalResults} </span>
            results
          </p>
        </div>
        <select
          id='results'
          className='text-md bg-gray-300 mx-2 rounded-lg px-2 py-1'
          defaultValue={limit}
          onChange={_handleLimitChange}
        >
          <option className='bg-white' value='5'>5</option>
          <option className='bg-white' value='10'>10</option>
          <option className='bg-white' value='15'>15</option>
          <option className='bg-white' value='20'>20</option>
          <option className='bg-white' value='100'>100</option>
        </select>
      </div>
      <div className={`w-full md:w-auto ${paginationIndices.length > 7 ? 'grid grid-cols-7' : 'flex'}  md:flex md:flex-row justify-center items-center gap-2 md:gap-y-2`}>
        <button
          className={`px-2 h-8 ${page === 1 ? 'lg:hover:cursor-not-allowed' : 'lg:hover:cursor-pointer lg:hover:bg-gray-400 shadow-md shadow-gray-500'} bg-gray-300 rounded-lg flex items-center text-gray-600`}
          onClick={handlePreviousPage}
        >
          <IoIosArrowBack />
        </button>
        {
          paginationIndices.map((pageIndex, index) => (
            pageIndex === '...'
              ? <div key={index} className='px-2 h-8 lg:hover:cursor-not-allowed flex items-center justify-center'><p>&hellip;</p></div>
              : (
                <button
                  key={index}
                  onClick={() => handlePageChange(pageIndex)}
                  className={`px-2 h-8 ${pageIndex === page ? 'bg-gray-400' : 'bg-gray-300'} lg:hover:bg-gray-400 rounded-lg flex items-center shadow-md shadow-gray-500 text-gray-600`}
                >
                  {pageIndex}
                </button>
                )
          ))
        }
        <button
          className={`px-2 h-8 ${page === totalPages ? 'lg:hover:cursor-not-allowed' : 'lg:hover:cursor-pointer lg:hover:bg-gray-400 shadow-md shadow-gray-500'} bg-gray-300 rounded-lg flex items-center text-gray-600`}
          onClick={handleNextPage}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  )
}

export default PaginationBar

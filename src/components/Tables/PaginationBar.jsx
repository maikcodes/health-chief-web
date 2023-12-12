import { useEffect, useState } from 'react'

// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

function PaginationBar ({ paginationObject }) {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(paginationObject.page)
  }, [currentPage])

  // const renderPreviousPageButton = () => {
  //   console.log(paginationObject.page)
  //   if (paginationObject.page === 1) {
  //     return <p className='disabled lg:hover:cursor-not-allowed px-2 py-1 bg-gray-300  rounded-lg flex items-center'><IoIosArrowBack /></p>
  //   }
  //   return <a href='/#' className='enabled px-2 py-1 bg-gray-300 lg:hover:bg-gray-400 rounded-lg flex items-center'><IoIosArrowBack /></a>
  // }

  // const renderNextPageButton = () => {
  //   if (paginationObject.page === paginationObject.totalPages) {
  //     return <p className='disabled lg:hover:cursor-not-allowed px-2 py-1 bg-gray-300  rounded-lg flex items-center'><IoIosArrowForward /></p>
  //   }
  //   return <a href='/#' className='enabled px-2 py-1 bg-gray-300 lg:hover:bg-gray-400 rounded-lg flex items-center'><IoIosArrowForward /></a>
  // }

  const handlePageChange = (newPage) => {
    paginationObject.handlePageChange(newPage)
    setCurrentPage(newPage)
  }

  const renderPagination = () => {
    const nearPages = 2

    const pages = []
    for (let i = Math.max(1, paginationObject.page - nearPages); i <= Math.min(paginationObject.totalPages, paginationObject.page + nearPages); i++) {
      pages.push(
        <button key={i} onClick={() => handlePageChange(i)} className='enabled px-2 py-1 bg-gray-300 lg:hover:bg-gray-400 rounded-lg flex items-center '>
          {i}
        </button>
      )
    }

    return (
      <div className='flex flex-row justify-between w-full md:w-auto md:justify-normal gap-y-2 md:gap-x-2'>
        {paginationObject.page > nearPages + 1 && (
          <>
            <button onClick={() => handlePageChange(1)}>1</button>
            <span>...</span>
          </>
        )}
        {pages}
        {paginationObject.page < paginationObject.totalPages - nearPages && (
          <>
            <span>...</span>
            <button onClick={() => handlePageChange(paginationObject.totalPages)}>{paginationObject.totalPages}</button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className='flex flex-col md:flex-row items-center justify-between gap-y-2 md:gap-y-0'>
      <div className='text-gray-600'>
        <p>
          Showing
          <span className='text-md font-bold'> {paginationObject.results} ({paginationObject.totalResults - paginationObject.results} - {paginationObject.totalResults}) </span>
          of
          <span className='text-md font-bold'> {paginationObject.totalResults} </span>
          results
        </p>
      </div>
      <div className='flex flex-col w-full md:w-auto md:flex-row items-center gap-y-2 gap-x-2 md:gap-y-2'>
        {/* <div className='flex flex-row justify-between w-full md:w-auto md:justify-normal gap-y-2 md:gap-x-2'> */}
        {/* {renderPreviousPageButton()}
          <a href='/#' className='enabled px-2 py-1 bg-gray-300 lg:hover:bg-gray-400 rounded-lg flex items-center '>
            {indexes.firstPosition}
          </a>
          <a href='/#' className='enabled px-2 py-1 bg-gray-300 lg:hover:bg-gray-400 rounded-lg flex items-center'>
            {indexes.secondPosition}
          </a>
          <p className='px-2 py-1 rounded-lg'>...</p>
          <a href='/#' className='enabled px-2 py-1 bg-gray-300 lg:hover:bg-gray-400 rounded-lg flex items-center'>
            {indexes.thirdPosition}
          </a>
          <a href='/#' className='enabled px-2 py-1 bg-gray-300 lg:hover:bg-gray-400 rounded-lg flex items-center'>
            {indexes.fourthPosition}
          </a>
          {renderNextPageButton()} */}
        {renderPagination()}
        {/* </div> */}
      </div>
    </div>
  )
}

export default PaginationBar

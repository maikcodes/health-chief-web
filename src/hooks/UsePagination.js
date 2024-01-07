import { useState } from 'react'

function usePagination (defaultPage = 1, defaultLimit = 10) {
  const [page, setPage] = useState(defaultPage)
  const [limit, setLimit] = useState(defaultLimit)

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return {
    page,
    limit,
    handleLimitChange,
    handlePageChange
  }
}

export default usePagination

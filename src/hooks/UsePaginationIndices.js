import { useState, useEffect } from 'react'
import { PaginationIndices, segment } from '../services/PaginationIndices'

function UsePaginationIndices ({ page, totalPages, adjacentIndices = 2 }) {
  const [paginationIndices, setPaginationIndices] = useState([])
  const [error, setError] = useState(false)

  const generatePaginationIndices = async () => {
    try {
      const indices = new PaginationIndices({
        page,
        totalPages,
        adjacentIndices,
        segment
      })
      setPaginationIndices(indices.getPaginationIndices())
      setError(false)
    } catch (error) {
      setPaginationIndices([])
      setError(true)
    }
  }

  useEffect(() => {
    generatePaginationIndices()
  }, [page, totalPages])

  return { paginationIndices, error }
}

export default UsePaginationIndices

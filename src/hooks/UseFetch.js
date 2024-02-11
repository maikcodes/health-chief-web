import { useCallback, useState, useEffect } from 'react'

function useFetch ({ fetchFunction, page, limit }) {
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const fetchedData = await fetchFunction(page, limit)
      setData(fetchedData)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [fetchFunction, page, limit])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, error, loading, reloadData: fetchData }
}

export default useFetch

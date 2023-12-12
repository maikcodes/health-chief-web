import { useState, useEffect } from 'react'

function useFetch ({ fetchFunction, page, limit }) {
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const fetchedData = await fetchFunction(page, limit)
      setData(fetchedData)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, limit])

  return { data, error, loading }
}

export default useFetch

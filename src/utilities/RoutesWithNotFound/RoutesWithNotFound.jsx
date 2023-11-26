import { Route, Routes } from 'react-router-dom'

function RoutesWithNotFound ({ children }) {
  return (
    <Routes>
      {children}
      <Route path='*' element={<div><h1>Not Found</h1></div>} />
    </Routes>
  )
}

export default RoutesWithNotFound

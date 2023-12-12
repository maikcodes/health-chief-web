import React from 'react'

function TableBody ({ children }) {
  return (
    <tbody className='bg-white max-h-[350px]'>
      {children}
    </tbody>
  )
}

export default TableBody

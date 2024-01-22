import React from 'react'

function TableHead ({ children }) {
  return (
    <thead className='sticky top-0 h-[50px]'>
      <tr className='uppercase bg-biscay-700 text-white text-left font-bold'>
        {children}
      </tr>
    </thead>
  )
}

export default TableHead

import PaginationBar from '../PaginationBar'
import React from 'react'

function AdminTable ({ children, pagination }) {
  return (
    <>
      <div className='overflow-y-auto max-h-[400px] shadow-md shadow-gray-500 rounded-lg'>
        <table className='table-auto w-full'>
          {children}
        </table>
      </div>
      <PaginationBar paginationObject={pagination} />
    </>
  )
}

export default AdminTable

import PaginationBar from '../PaginationBar'
import React from 'react'

function AdminTable ({ children, pagination }) {
  return (
    <>
      <div className='scrollbar-sm overflow-y-auto max-h-[395px] shadow-md shadow-gray-500 rounded-lg'>
        <table className='table-auto w-full'>
          {children}
        </table>
      </div>
      <PaginationBar paginationObject={pagination} />
    </>
  )
}

export default AdminTable

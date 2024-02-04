import React from 'react'

function Spinner () {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='flex flex-col gap-y-2'>
        <div className='flex justify-center w-full h-12 lg:items-center'>
          <div className='w-12 h-12 border-8 absolute border-gray-300 border-solid rounded-full' />
          <div className='w-12 h-12 border-8 absolute border-biscay-600 border-solid border-t-transparent rounded-full animate-spin shadow-md' />
        </div>
        <p className='text-gray-500'>Loading</p>
      </div>
    </div>
  )
}

export default Spinner

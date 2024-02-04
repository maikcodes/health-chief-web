import React from 'react'

function Error () {
  return (
    <div className='flex w-full h-full border-2 border-gray-300 bg-gray-200 items-center justify-center rounded-md'>
      <div className='flex flex-col items-center justify-center gap-y-2'>
        <h2 className='md:text-2xl font-bold text-gray-700'>Error.</h2>
        <p className='text-gray-500 text-wrap-balanced text-center'>An error occurred, please try again later.</p>
      </div>
    </div>
  )
}

export default Error

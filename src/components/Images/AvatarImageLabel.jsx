import React from 'react'

function AvatarImageLabel ({ initials }) {
  return (
    <div className='w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-biscay-500 text-white font-bold uppercase rounded-full overflow-hidden border-2 border-biscay-600'>
      <span className='lg:text-xl'>{initials}</span>
    </div>
  )
}

export default AvatarImageLabel

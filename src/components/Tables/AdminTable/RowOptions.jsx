import React from 'react'
import { BsEyeFill, BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'

function RowOptions ({ onViewCLick, onEditClick, onDeleteClick }) {
  return (
    <>
      <button onClick={onViewCLick}>
        <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
      </button>
      <button onClick={onEditClick}>
        <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
      </button>
      <button onClick={onDeleteClick}>
        <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
      </button>
    </>
  )
}

export default RowOptions

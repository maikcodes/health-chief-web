import React from 'react'
import profileImage from '../../../../../public/profile.png'
import { BsEyeFill, BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { AdminLayout } from '../../../../components/Layouts'
import { ButtonPrimary } from '../../../../components/Buttons'
import { SearchInput } from '../../../../components/Inputs'
import { PanelTitle } from '../../../../components/Texts'

function Users () {
  return (
    <AdminLayout>
      <div className='flex flex-col gap-y-4 h-full'>

        <div className='flex flex-col gap-y-2'>
          <PanelTitle text='Users' />

          <div className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'>
            <SearchInput placeholder='Search users' />
            <ButtonPrimary text='New' onClick={() => { }} />
          </div>
        </div>

        <div className='overflow-y-auto max-h-[400px] shadow-md shadow-gray-500 rounded-lg'>
          <table className='table-auto w-full'>

            <thead className='sticky top-0 h-[50px]'>
              <tr className='uppercase bg-biscay-700 text-white text-left'>
                <th className='px-4 py-2'>id</th>
                <th className='px-4 py-2 w-52 min-w-52'>name</th>
                <th className='px-4 py-2'>email</th>
                <th className='px-4 py-2'>phone</th>
                <th className='px-4 py-2 text-center'>settings</th>
              </tr>
            </thead>

            <tbody className='bg-white h-[350px] max-h-[350px]'>
              <tr>
                <th>0</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td className='px-4 py-2 capitalize flex w-52 min-w-52'>lorem ipsum</td>
                <td className='px-4 py-2'>lorem@gmail.com</td>
                <td className='px-4 py-2'>0998989898</td>
                <td className='flex flex-row items-center justify-center gap-x-4'>
                  <BsEyeFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <AiFillEdit className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                  <BsTrashFill className='text-biscay-700 text-lg lg:hover:text-biscay-400 lg:hover:cursor-pointer' />
                </td>
              </tr>
            </tbody>

          </table>
        </div>

        {/* <div class='flex items-center justify-between border-t border-gray-200 bg-white py-3'>

          <div class='flex flex-1 justify-between sm:hidden'>
            <a href='#' class='relative inline-flex items-center rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>Previous</a>
            <a href='#' class='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>Next</a>
          </div>

          <div class='lg:flex lg:flex-1 lg:items-center lg:justify-end'>

            <div className='lg:mx-5'>
              <div class='text-sm text-gray-700 lg:w-full flex flex-row justify-end'>
                <p className='lg:mx-2'>
                  Showing
                </p>
                <span class='font-medium'>1</span>
                <p className='lg:mx-2'>
                  to
                </p>
                <span class='font-medium'>10</span>
                <p className='lg:mx-2'>
                  of
                </p>
                <span class='font-medium'>97</span>
                <p className='lg:mx-2'>
                  results
                </p>
              </div>
            </div>

            <div>
              <nav class='isolate inline-flex -space-x-px rounded-md shadow-sm' aria-label='Pagination'>
                <a href='#' class='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                  <span class='sr-only'>Previous</span>
                  <svg class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                    <path fill-rule='evenodd' d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z' clip-rule='evenodd' />
                  </svg>
                </a>

                <a href='#' aria-current='page' class='relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>1</a>
                <a href='#' class='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>2</a>
                <a href='#' class='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'>3</a>
                <span class='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'>...</span>
                <a href='#' class='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'>8</a>
                <a href='#' class='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>9</a>
                <a href='#' class='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>10</a>
                <a href='#' class='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                  <span class='sr-only'>Next</span>
                  <svg class='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                    <path fill-rule='evenodd' d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z' clip-rule='evenodd' />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div> */}

      </div>
    </AdminLayout>
  )
}

export default Users

import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead } from '@components/Tables'
import { ButtonPrimary } from '@components/Buttons'
import { DisabledText, PanelTitle } from '@components/Texts'
import { Modal } from '@components/Dialogs'
import { SearchInput, TextInput } from '@components/Inputs'
import { UserServices } from '@services/User'

import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function Users () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data, error, loading } = UseFetch({ fetchFunction: UserServices.getAll, page, limit })
  const [user, setUser] = useState({})
  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setUser({
      firstNames: '',
      lastNames: '',
      image: '',
      email: '',
      phone: ''
    })
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const users = data.data
    const filteredUser = users.filter((_user) => _user.id === id)[0]
    setUser(filteredUser)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleCreate = () => {
    console.log('creating user', JSON.stringify(user))
  }

  const handleEdit = () => {
    console.log('editing user', JSON.stringify(user))
  }

  const handleDelete = () => {
    console.log('deleting user', JSON.stringify(user))
  }

  return (
    <AdminLayout>
      <div className='flex flex-col gap-y-2 h-full w-full'>

        <div className='flex flex-col gap-y-2'>
          <PanelTitle text='Users' />

          <div className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'>
            <SearchInput placeholder='Search users' />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </div>
        </div>

        {error && (
          <div className='w-full h-full flex items-start justify-between'>
            <p>Error</p>
          </div>
        )}

        {loading && (
          <div className='w-full h-full flex items-start justify-between'>
            <p>Loading Data</p>
          </div>
        )}

        {!error && !loading && data && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: data.page,
            totalPages: data.totalPages,
            results: data.results,
            totalResults: data.totalResults,
            limit
          }}
          >
            <TableHead>
              <td className='px-4 py-2 text-center'>id</td>
              <th className='px-4 py-2 w-72'>name</th>
              <th className='px-4 py-2'>email</th>
              <th className='px-4 py-2'>phone</th>
              <th className='px-4 py-2 text-center'>settings</th>
            </TableHead>
            <TableBody>
              {data.data?.map((user) => (
                <tr
                  key={user.id}
                  className='lg:hover:bg-gray-300'
                >
                  <td className='px-4 py-2 font-bold text-center'>{user.id}</td>
                  <td className='px-4 py-2 capitalize flex w-72 md:w-62 flex-row items-center gap-x-2'>
                    <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-biscay-600'>
                      <img src={user.image} alt={`${user.firstNames} ${user.lastNames}`} />
                    </div>
                    <div className='flex flex-col'>
                      <p className='font-bold'>
                        {user.firstNames}
                      </p>
                      <p className='font-bold'>
                        {user.lastNames}
                      </p>
                    </div>
                  </td>
                  <td className='px-4 py-2'>{user.email}</td>
                  <td className='px-4 py-2'>{user.phone}</td>
                  <td className='px-4 py-2'>
                    <div className='flex flex-row items-center justify-center gap-x-4'>
                      <RowOptions
                        onViewCLick={() => handleOpenModal(viewModal.handleOpen, user.id)}
                        onEditClick={() => handleOpenModal(editModal.handleOpen, user.id)}
                        onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, user.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </TableBody>
          </AdminTable>
        )}
      </div>

      <Modal
        title='User Details'
        actionTitle='Accept'
        isOpen={viewModal.isOpen}
        onClose={viewModal.handleClose}
      >
        <div className='flex items-center justify-center'>
          <img
            src={user.image}
            alt={`${user.firstNames} ${user.lastNames}`}
            className='w-32 h-32 rounded-full'
          />
        </div>
        <div className='flex flex-col gap-y-2 p-4'>
          <DisabledText text={user.id} />

          <p className='font-bold'>Full Name:</p>
          <DisabledText text={user.firstNames + ' ' + user.lastNames} />

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-bold'>Email:</p>
              <DisabledText text={user.email} />
            </div>
            <div>
              <p className='font-bold'>Phone:</p>
              <DisabledText text={user.phone} />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title='Create new user'
        actionTitle='Save'
        isOpen={createModal.isOpen}
        action={handleCreate}
        onClose={createModal.handleClose}
      >
        <form action=''>
          <div className='flex items-center justify-center'>
            <input type='file' onChange={handleDataChange} />
          </div>
          <div className='flex flex-col gap-y-2 p-4'>

            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                  <label htmlFor='firstNames' className='font-bold'>First names:</label>
                  <TextInput
                    name='firstNames'
                    id='firstNames'
                    value={user.firstNames}
                    handleDataChange={handleDataChange}
                    placeholder='Insert first names'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='email' className='font-bold'>Email:</label>
                  <TextInput
                    name='email'
                    id='email'
                    value={user.email}
                    handleDataChange={handleDataChange}
                    placeholder='Insert email'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                  <label htmlFor='lastNames' className='font-bold'>Last names:</label>
                  <TextInput
                    name='lastNames'
                    id='lastNames'
                    value={user.lastNames}
                    handleDataChange={handleDataChange}
                    placeholder='Insert last names'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='phone' className='font-bold'>Phone:</label>
                  <TextInput
                    name='phone'
                    id='phone'
                    value={user.phone}
                    handleDataChange={handleDataChange}
                    placeholder='Insert phone'
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Edit user'
        actionTitle='Save changes'
        isOpen={editModal.isOpen}
        action={handleEdit}
        onClose={editModal.handleClose}
      >
        <form action=''>
          <div className='flex items-center justify-center'>
            <img
              src={user.image}
              alt={`${user.firstNames} ${user.lastNames}`}
              className='w-32 h-32 rounded-full'
            />
          </div>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledText text={user.id} />

            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                  <label htmlFor='firstNames' className='font-bold'>First names:</label>
                  <TextInput
                    name='firstNames'
                    id='firstNames'
                    value={user.firstNames}
                    handleDataChange={handleDataChange}
                    placeholder='Insert first names'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='email' className='font-bold'>Email:</label>
                  <TextInput
                    name='email'
                    id='email'
                    value={user.email}
                    handleDataChange={handleDataChange}
                    placeholder='Insert email'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                  <label htmlFor='lastNames' className='font-bold'>Last names:</label>
                  <TextInput
                    name='lastNames'
                    id='lastNames'
                    value={user.lastNames}
                    handleDataChange={handleDataChange}
                    placeholder='Insert last names'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='phone' className='font-bold'>Phone:</label>
                  <TextInput
                    name='phone'
                    id='phone'
                    value={user.phone}
                    handleDataChange={handleDataChange}
                    placeholder='Insert phone'
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Delete user'
        actionTitle='Delete'
        action={handleDelete}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.handleClose}
      >
        <form action=''>
          <div className='flex items-center justify-center'>
            <img
              src={user.image}
              alt={`${user.firstNames} ${user.lastNames}`}
              className='w-32 h-32 rounded-full'
            />
          </div>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledText text={user.id} />

            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                  <label htmlFor='firstNames' className='font-bold'>First names:</label>
                  <DisabledText
                    text={user.firstNames}
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='email' className='font-bold'>Email:</label>
                  <DisabledText
                    text={user.email}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                  <label htmlFor='lastNames' className='font-bold'>Last names:</label>
                  <DisabledText
                    text={user.lastNames}
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='phone' className='font-bold'>Phone:</label>
                  <DisabledText
                    text={user.phone}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}

export default Users

import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables'
import { ButtonPrimary } from '@components/Buttons'
import { DisabledText, PanelTitle } from '@components/Texts'
import { Error } from '@components/Errors'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'
import { UserServices } from '@services/User'
import { Spinner } from '@components/Spinners'

import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'
import { DisabledFormInput, FormInputText } from '@components/Forms'

function Users () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data: fetchedUsers, error, loading, reloadData } = UseFetch({ fetchFunction: UserServices.getAll, page, limit })
  const [user, setUser] = useState({})

  const [search, setSearch] = useState('')

  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setUser({
      email: '',
      password: ''
    })
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const usersData = fetchedUsers.data
    const filteredUser = usersData.filter((_user) => _user.id === id)[0]
    setUser(filteredUser)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleCreate = async () => {
    await UserServices.create(user)
    createModal.handleClose()
    reloadData()
  }

  const handleEdit = async () => {
    await UserServices.update(user.id, user)
    editModal.handleClose()
    reloadData()
  }

  const handleDelete = async () => {
    await UserServices.delete(user.id)
    deleteModal.handleClose()
    reloadData()
  }

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
  }

  return (
    <AdminLayout>
      <div className='flex flex-col gap-y-2 h-full w-full'>

        <div className='flex flex-col gap-y-2'>
          <PanelTitle text='Users' />

          <form
            className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'
            onSubmit={(event) => { event.preventDefault() }}
          >
            <SearchInput placeholder='Search users' handleChange={handleSearch} />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </form>
        </div>

        {error && <Error />}
        {loading && <Spinner />}

        {!error && !loading && fetchedUsers && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: fetchedUsers.page,
            totalPages: fetchedUsers.totalPages,
            results: fetchedUsers.results,
            totalResults: fetchedUsers.totalResults,
            limit
          }}
          >
            <TableHead>
              <TableHeader>id</TableHeader>
              <TableHeader>email</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                fetchedUsers.data
                  ?.filter(item => item.id.includes(search.toLowerCase()))
                  ?.map((_user) => (
                    <tr
                      key={_user.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 text-center'>{_user.id}</td>
                      <td className='px-4 py-2 text-center'>{_user.email}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, _user.id)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, _user.id)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, _user.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
              }
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
        <div className='flex flex-col gap-y-2 p-4'>

          <DisabledText text={user.id} />

          <div className='flex flex-col gap-3'>
            <DisabledFormInput
              id='email'
              name='email'
              title='ID Card'
              value={user.email}
            />
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
          <div className='flex flex-col gap-y-2 p-4'>
            <div className='flex flex-col gap-3'>
              <FormInputText
                id='id'
                name='id'
                title='User ID'
                value={user.id}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='email'
                name='email'
                title='Email'
                value={user.email}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='password'
                name='password'
                title='Password'
                value={user.password}
                handleDataChange={handleDataChange}
              />
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
          <div className='flex flex-col gap-y-2 p-4'>
            <div className='flex flex-col gap-3'>
              <FormInputText
                id='id'
                name='id'
                title='User ID'
                value={user.id}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='email'
                name='email'
                title='Email'
                value={user.email}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='password'
                name='password'
                title='Password'
                value={user.password}
                handleDataChange={handleDataChange}
              />
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
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledText text={user.id} />

            <div className='flex flex-col gap-3'>
              <DisabledFormInput
                id='email'
                name='email'
                title='ID Card'
                value={user.email}
              />
            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}

export default Users

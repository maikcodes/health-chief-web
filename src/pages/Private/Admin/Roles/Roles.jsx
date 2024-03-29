import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { Error } from '@components/Errors'
import { PanelTitle } from '@components/Texts'
import { FormInputText, DisabledFormInput, DisabledFormTextCopy } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'
import { Spinner } from '@components/Spinners'

import { RoleServices } from '@services/Role'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function Roles () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data: fetchedRoles, error, loading, reloadData } = UseFetch({ fetchFunction: RoleServices.getAll, page, limit })
  const [role, setRole] = useState({
    id: '',
    name: ''
  })
  const [search, setSearch] = useState('')

  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setRole({})
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const rolesData = fetchedRoles.data
    const filteredRole = rolesData.find((element) => element.id === id)
    setRole(filteredRole)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setRole({ ...role, [name]: value })
  }

  const handleCreate = async () => {
    await RoleServices.create(role)
    createModal.handleClose()
    reloadData()
  }

  const handleEdit = async () => {
    await RoleServices.update(role.id, role)
    editModal.handleClose()
    reloadData()
  }

  const handleDelete = async () => {
    await RoleServices.delete(role.id)
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
          <PanelTitle text='Roles' />

          <form
            className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'
            onSubmit={(event) => { event.preventDefault() }}
          >
            <SearchInput placeholder='Search roles' handleChange={handleSearch} />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </form>
        </div>

        {error && <Error />}
        {loading && <Spinner />}

        {!error && !loading && fetchedRoles && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: fetchedRoles.page,
            totalPages: fetchedRoles.totalPages,
            results: fetchedRoles.results,
            totalResults: fetchedRoles.totalResults,
            limit
          }}
          >
            <TableHead>
              <TableHeader>id</TableHeader>
              <TableHeader>name</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                fetchedRoles.data
                  ?.filter(item => item.id.toLowerCase().includes(search.toLowerCase()))
                  ?.map((_role) => (
                    <tr
                      key={_role.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 text-center'>{_role.id}</td>
                      <td className='px-4 py-2 text-center'>{_role.name}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, _role.id)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, _role.id)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, _role.id)}
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
        title='Role Details'
        actionTitle='Accept'
        isOpen={viewModal.isOpen}
        onClose={viewModal.handleClose}
      >
        <div className='flex flex-col gap-y-2 p-4'>

          <DisabledFormTextCopy
            id='id'
            name='id'
            title='Role ID'
            value={role.id}
          />

          <div className='flex flex-col gap-3'>

            <DisabledFormInput
              id='name'
              name='name'
              title='Name'
              value={role.name}
            />

          </div>
        </div>
      </Modal>

      <Modal
        title='Create Role'
        actionTitle='Save'
        isOpen={createModal.isOpen}
        action={handleCreate}
        onClose={createModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>
            <div className='flex flex-col gap-3'>

              <FormInputText
                id='name'
                name='name'
                title='Name'
                value={role.name}
                handleDataChange={handleDataChange}
              />

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Edit Role'
        actionTitle='Save changes'
        isOpen={editModal.isOpen}
        action={handleEdit}
        onClose={editModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledFormTextCopy
              id='id'
              name='id'
              title='Role ID'
              value={role.id}
            />

            <div className='flex flex-col gap-3'>

              <FormInputText
                id='name'
                name='name'
                title='Name'
                value={role.name}
                handleDataChange={handleDataChange}
              />

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Delete Role'
        actionTitle='Delete'
        action={handleDelete}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledFormTextCopy
              id='id'
              name='id'
              title='Role ID'
              value={role.id}
            />

            <div className='flex flex-col gap-3'>

              <DisabledFormInput
                id='name'
                name='name'
                title='Name'
                value={role.name}
              />

            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}

export default Roles

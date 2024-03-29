import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { Error } from '@components/Errors'
import { PanelTitle } from '@components/Texts'
import { FormInputText, DisabledFormTextCopy } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'
import { Spinner } from '@components/Spinners'

import { PersonRoleServices } from '@services/PersonRole'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function PersonsRoles () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data: fetchedPersonsRoles, error, loading, reloadData } = UseFetch({ fetchFunction: PersonRoleServices.getAll, page, limit })
  const [personRole, setPersonRole] = useState({
    idPerson: '',
    idRole: ''
  })
  const [search, setSearch] = useState('')

  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setPersonRole({})
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, idPerson) => {
    const personsRolesData = fetchedPersonsRoles.data
    const filteredPersonRole = personsRolesData.find((element) => element.idPerson === idPerson)
    setPersonRole(filteredPersonRole)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    console.log(personRole)
    const { name, value } = event.target
    setPersonRole({ ...personRole, [name]: value })
  }

  const handleCreate = async () => {
    await PersonRoleServices.create(personRole)
    createModal.handleClose()
    reloadData()
  }

  const handleEdit = async () => {
    await PersonRoleServices.update(personRole.id, personRole)
    editModal.handleClose()
    reloadData()
  }

  const handleDelete = async () => {
    await PersonRoleServices.delete(personRole.id)
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
          <PanelTitle text='Person Roles' />

          <form
            className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'
            onSubmit={(event) => { event.preventDefault() }}
          >
            <SearchInput placeholder='Search persons roles' handleChange={handleSearch} />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </form>
        </div>

        {error && <Error />}
        {loading && <Spinner />}

        {!error && !loading && fetchedPersonsRoles && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: fetchedPersonsRoles.page,
            totalPages: fetchedPersonsRoles.totalPages,
            results: fetchedPersonsRoles.results,
            totalResults: fetchedPersonsRoles.totalResults,
            limit
          }}
          >
            <TableHead>
              <TableHeader>Person ID</TableHeader>
              <TableHeader>Role ID</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                fetchedPersonsRoles.data
                  ?.filter(item => item.idPerson.toLowerCase().includes(search.toLowerCase()))
                  ?.map((_personRoles) => (
                    <tr
                      key={_personRoles.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 text-center'>{_personRoles.idPerson}</td>
                      <td className='px-4 py-2 text-center'>{_personRoles.idRole}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, _personRoles.idPerson)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, _personRoles.idPerson)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, _personRoles.idPerson)}
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
        title='Person Role Details'
        actionTitle='Accept'
        isOpen={viewModal.isOpen}
        onClose={viewModal.handleClose}
      >
        <div className='flex flex-col gap-y-2 p-4'>

          <DisabledFormTextCopy
            id='id'
            name='id'
            title='Person Role ID'
            value={personRole.id}
          />

          <div className='flex flex-col gap-3'>

            <DisabledFormTextCopy
              id='idPerson'
              name='idPerson'
              title='Person ID'
              value={personRole.idPerson}
            />

            <DisabledFormTextCopy
              id='idRole'
              name='idRole'
              title='Role ID'
              value={personRole.idRole}
            />

          </div>
        </div>
      </Modal>

      <Modal
        title='Create Person Role'
        actionTitle='Save'
        isOpen={createModal.isOpen}
        action={handleCreate}
        onClose={createModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>
            <div className='flex flex-col gap-3'>

              <FormInputText
                id='idPerson'
                name='idPerson'
                title='Person ID'
                value={personRole.idPerson}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='idRole'
                name='idRole'
                title='Role ID'
                value={personRole.idRole}
                handleDataChange={handleDataChange}
              />

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Edit Person Role'
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
              title='Person Role ID'
              value={personRole.id}
            />

            <DisabledFormTextCopy
              id='idPerson'
              name='idPerson'
              title='Person ID'
              value={personRole.idPerson}
            />

            <div className='flex flex-col gap-3'>

              <FormInputText
                id='idRole'
                name='idRole'
                title='Role ID'
                value={personRole.idRole}
                handleDataChange={handleDataChange}
              />

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Delete Person Role'
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
              title='Person Role ID'
              value={personRole.id}
            />

            <div className='flex flex-col gap-3'>

              <DisabledFormTextCopy
                id='idPerson'
                name='idPerson'
                title='Person ID'
                value={personRole.idPerson}
              />

              <DisabledFormTextCopy
                id='idRole'
                name='idRole'
                title='Role ID'
                value={personRole.idRole}
              />

            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}

export default PersonsRoles

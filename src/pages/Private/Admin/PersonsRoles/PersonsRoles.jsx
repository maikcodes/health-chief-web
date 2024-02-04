import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { Error } from '@components/Errors'
import { PanelTitle } from '@components/Texts'
import { FormInputText, DisabledFormInput } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'
import { Spinner } from '@components/Spinners'

import { PersonRoleServices } from '@services/PersonRole'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function PersonsRoles () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data, error, loading } = UseFetch({ fetchFunction: PersonRoleServices.getAll, page, limit })
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
    const persons = data.data
    const filteredPerson = persons.find((element) => element.idPerson === idPerson)
    setPersonRole(filteredPerson)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { idRole, value } = event.target
    setPersonRole({ ...personRole, [idRole]: value })
  }

  const handleCreate = () => {
    PersonRoleServices.create(personRole)
  }

  const handleEdit = async () => {
    PersonRoleServices.update(personRole.idPerson, personRole.idRole, { personRole })
  }

  const handleDelete = () => {
    PersonRoleServices.delete(personRole.idPerson, personRole.idRole)
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
            <SearchInput placeholder='Search persons' handleChange={handleSearch} />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </form>
        </div>

        {error && <Error />}
        {loading && <Spinner />}

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
              <TableHeader>id person</TableHeader>
              <TableHeader>id role</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                data.data
                  ?.filter(item => item.idPerson.toLowerCase().includes(search.toLowerCase()))
                  ?.map((_personRoles) => (
                    <tr
                      key={_personRoles.idPerson}
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

          <DisabledFormInput
            title='ID Person'
            value={personRole.idPerson}
          />

          <div className='flex flex-col gap-3'>

            <DisabledFormInput
              title='ID Role'
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
                title='ID Person'
                value={personRole.idPerson}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='ID Role'
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

            <DisabledFormInput
              title='ID Person'
              value={personRole.idPerson}
            />

            <div className='flex flex-col gap-3'>

              <FormInputText
                title='ID Role'
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

            <DisabledFormInput
              title='ID Person'
              value={personRole.idPerson}
            />

            <div className='flex flex-col gap-3'>

              <DisabledFormInput
                title='ID Role'
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

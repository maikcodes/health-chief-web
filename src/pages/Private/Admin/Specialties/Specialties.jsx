import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { Error } from '@components/Errors'
import { PanelTitle } from '@components/Texts'
import { FormInputText, DisabledFormInput } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'
import { Spinner } from '@components/Spinners'

import { SpecialtyServices } from '@services/Specialty'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function Specialties () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data: specialties, error, loading, reloadData } = UseFetch({ fetchFunction: SpecialtyServices.getAll, page, limit })
  const [specialty, setSpecialty] = useState({
    id: '',
    name: ''
  })
  const [search, setSearch] = useState('')

  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setSpecialty({})
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const persons = specialties.data
    const filteredPerson = persons.find((element) => element.id === id)
    setSpecialty(filteredPerson)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setSpecialty({ ...specialty, [name]: value })
  }

  const handleCreate = async () => {
    await SpecialtyServices.create(specialty)
    createModal.handleClose()
    reloadData()
  }

  const handleEdit = async () => {
    await SpecialtyServices.update(specialty.id, specialty)
    editModal.handleClose()
    reloadData()
  }

  const handleDelete = async () => {
    await SpecialtyServices.delete(specialty.id)
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
          <PanelTitle text='Specialties' />

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

        {!error && !loading && specialties && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: specialties.page,
            totalPages: specialties.totalPages,
            results: specialties.results,
            totalResults: specialties.totalResults,
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
                specialties.data
                  ?.filter(item => item.id.toLowerCase().includes(search.toLowerCase()))
                  ?.map((_specialty) => (
                    <tr
                      key={_specialty.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 text-center'>{_specialty.id}</td>
                      <td className='px-4 py-2 text-center'>{_specialty.name}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, _specialty.id)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, _specialty.id)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, _specialty.id)}
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
        title='Specialty Details'
        actionTitle='Accept'
        isOpen={viewModal.isOpen}
        onClose={viewModal.handleClose}
      >
        <div className='flex flex-col gap-y-2 p-4'>

          <DisabledFormInput
            id='id'
            name='id'
            title='ID Specialty'
            value={specialty.id}
          />

          <div className='flex flex-col gap-3'>

            <DisabledFormInput
              id='name'
              name='name'
              title='Name'
              value={specialty.name}
            />

          </div>
        </div>
      </Modal>

      <Modal
        title='Create Specialty'
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
                value={specialty.name}
                handleDataChange={handleDataChange}
              />

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Edit Specialty'
        actionTitle='Save changes'
        isOpen={editModal.isOpen}
        action={handleEdit}
        onClose={editModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledFormInput
              id='id'
              name='id'
              title='ID Specialty'
              value={specialty.id}
            />

            <div className='flex flex-col gap-3'>

              <FormInputText
                id='name'
                name='name'
                title='Name'
                value={specialty.name}
                handleDataChange={handleDataChange}
              />

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Delete Specialty'
        actionTitle='Delete'
        action={handleDelete}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledFormInput
              id='id'
              name='id'
              title='ID Specialty'
              value={specialty.id}
            />

            <div className='flex flex-col gap-3'>

              <DisabledFormInput
                id='name'
                name='name'
                title='Name'
                value={specialty.name}
              />

            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}

export default Specialties

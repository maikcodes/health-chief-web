import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { PanelTitle } from '@components/Texts'
import { FormInputText, DisabledFormInput } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'

import { DoctorServices } from '@services/Doctor'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function Doctors () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data, error, loading } = UseFetch({ fetchFunction: DoctorServices.getAll, page, limit })
  const [doctor, setDoctor] = useState({
    id: '',
    idSpecialty: ''
  })
  const [search, setSearch] = useState('')

  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setDoctor({})
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const persons = data.data
    const filteredPerson = persons.find((element) => element.id === id)
    setDoctor(filteredPerson)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setDoctor({ ...doctor, [name]: value })
  }

  const handleCreate = () => {
    DoctorServices.create(doctor)
  }

  const handleEdit = async () => {
    DoctorServices.update(doctor.id, { doctor })
  }

  const handleDelete = () => {
    DoctorServices.delete(doctor.id)
  }

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
  }

  return (
    <AdminLayout>
      <div className='flex flex-col gap-y-2 h-full w-full'>

        <div className='flex flex-col gap-y-2'>
          <PanelTitle text='Doctors' />

          <form
            className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'
            onSubmit={(event) => { event.preventDefault() }}
          >
            <SearchInput placeholder='Search persons' handleChange={handleSearch} />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </form>
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
              <TableHeader>id</TableHeader>
              <TableHeader>Specialty</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                data.data
                  ?.filter(item => item.id.toLowerCase().includes(search.toLowerCase()))
                  ?.map((_doctor) => (
                    <tr
                      key={_doctor.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 text-center'>{_doctor.id}</td>
                      <td className='px-4 py-2 text-center'>{_doctor.idSpecialty}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, _doctor.id)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, _doctor.id)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, _doctor.id)}
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
        title='Doctor Details'
        actionTitle='Accept'
        isOpen={viewModal.isOpen}
        onClose={viewModal.handleClose}
      >
        <div className='flex flex-col gap-y-2 p-4'>

          <DisabledFormInput
            title='ID Doctor'
            value={doctor.id}
          />

          <div className='flex flex-col gap-3'>

            <DisabledFormInput
              title='ID Specialty'
              value={doctor.idSpecialty}
            />

          </div>
        </div>
      </Modal>

      <Modal
        title='Create Doctor'
        actionTitle='Save'
        isOpen={createModal.isOpen}
        action={handleCreate}
        onClose={createModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>
            <div className='flex flex-col gap-3'>

              <FormInputText
                title='ID Doctor'
                value={doctor.id}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='ID Specialty'
                value={doctor.idSpecialty}
                handleDataChange={handleDataChange}
              />

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Edit Doctor'
        actionTitle='Save changes'
        isOpen={editModal.isOpen}
        action={handleEdit}
        onClose={editModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledFormInput
              title='ID Doctor'
              value={doctor.id}
            />

            <div className='flex flex-col gap-3'>

              <FormInputText
                title='ID Specialty'
                value={doctor.idSpecialty}
                handleDataChange={handleDataChange}
              />

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Delete Doctor'
        actionTitle='Delete'
        action={handleDelete}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledFormInput
              title='ID Doctor'
              value={doctor.id}
            />

            <div className='flex flex-col gap-3'>

              <DisabledFormInput
                title='ID Specialty'
                value={doctor.idSpecialty}
              />

            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}

export default Doctors

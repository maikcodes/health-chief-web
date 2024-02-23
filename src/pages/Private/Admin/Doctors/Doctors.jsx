import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { Error } from '@components/Errors'
import { PanelTitle } from '@components/Texts'
import { FormInputText, DisabledFormTextCopy } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'
import { Spinner } from '@components/Spinners'

import { DoctorServices } from '@services/Doctor'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function Doctors () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data: fetchedDoctors, error, loading, reloadData } = UseFetch({ fetchFunction: DoctorServices.getAll, page, limit })
  const [doctor, setDoctor] = useState({
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
    const doctorsData = fetchedDoctors.data
    const filteredDoctor = doctorsData.find((element) => element.id === id)
    setDoctor(filteredDoctor)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setDoctor({ ...doctor, [name]: value })
  }

  const handleCreate = async () => {
    await DoctorServices.create(doctor)
    createModal.handleClose()
    reloadData()
  }

  const handleEdit = async () => {
    await DoctorServices.update(doctor.id, doctor)
    editModal.handleClose()
    reloadData()
  }

  const handleDelete = async () => {
    await DoctorServices.delete(doctor.id)
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
          <PanelTitle text='Doctors' />

          <form
            className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'
            onSubmit={(event) => { event.preventDefault() }}
          >
            <SearchInput placeholder='Search doctors' handleChange={handleSearch} />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </form>
        </div>

        {error && <Error />}
        {loading && <Spinner />}

        {!error && !loading && fetchedDoctors && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: fetchedDoctors.page,
            totalPages: fetchedDoctors.totalPages,
            results: fetchedDoctors.results,
            totalResults: fetchedDoctors.totalResults,
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
                fetchedDoctors.data
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

          <DisabledFormTextCopy
            id='id'
            name='id'
            title='Doctor ID'
            value={doctor.id}
          />

          <div className='flex flex-col gap-3'>

            <DisabledFormTextCopy
              id='idSpecialty'
              name='idSpecialty'
              title='Specialty ID'
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
                id='id'
                name='id'
                title='Doctor ID'
                value={doctor.id}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='idSpecialty'
                name='idSpecialty'
                title='Specialty ID'
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

            <DisabledFormTextCopy
              id='id'
              name='id'
              title='Doctor ID'
              value={doctor.id}
            />

            <div className='flex flex-col gap-3'>

              <FormInputText
                id='idSpecialty'
                name='idSpecialty'
                title='Specialty ID'
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

            <DisabledFormTextCopy
              id='id'
              name='id'
              title='Doctor ID'
              value={doctor.id}
            />

            <div className='flex flex-col gap-3'>

              <DisabledFormTextCopy
                id='idSpecialty'
                name='idSpecialty'
                title='Specialty ID'
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

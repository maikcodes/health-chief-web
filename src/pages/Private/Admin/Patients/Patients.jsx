import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { PanelTitle } from '@components/Texts'
import { FormInputText, DisabledFormInput, FormInputSelect } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'
import { Spinner } from '@components/Spinners'
import { Error } from '@components/Errors'

import { PatientServices } from '@services/Patient'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function Patients () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data: fetchedPatients, error, loading, reloadData } = UseFetch({ fetchFunction: PatientServices.getAll, page, limit })
  const [patient, setPatient] = useState({
    status: ''
  })
  const [search, setSearch] = useState('')

  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setPatient({})
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const patientsData = fetchedPatients.data
    const filteredPatient = patientsData.find((element) => element.id === id)
    setPatient(filteredPatient)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setPatient({ ...patient, [name]: value })
  }

  const handleCreate = async () => {
    await PatientServices.create(patient)
    createModal.handleClose()
    reloadData()
  }

  const handleEdit = async () => {
    await PatientServices.update(patient.id, patient)
    editModal.handleClose()
    reloadData()
  }

  const handleDelete = async () => {
    await PatientServices.delete(patient.id)
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
          <PanelTitle text='Patients' />

          <form
            className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'
            onSubmit={(event) => { event.preventDefault() }}
          >
            <SearchInput placeholder='Search patients' handleChange={handleSearch} />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </form>
        </div>

        {error && <Error />}
        {loading && <Spinner />}

        {!error && !loading && fetchedPatients && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: fetchedPatients.page,
            totalPages: fetchedPatients.totalPages,
            results: fetchedPatients.results,
            totalResults: fetchedPatients.totalResults,
            limit
          }}
          >
            <TableHead>
              <TableHeader>id</TableHeader>
              <TableHeader>status</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                fetchedPatients.data
                  ?.filter(item => item.id.toLowerCase().includes(search.toLowerCase()))
                  ?.map((_patient) => (
                    <tr
                      key={_patient.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 text-center'>{_patient.id}</td>
                      <td className='px-4 py-2 text-center'>{_patient.status ? 'Active' : 'No Active'}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, _patient.id)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, _patient.id)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, _patient.id)}
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
        title='Patient Details'
        actionTitle='Accept'
        isOpen={viewModal.isOpen}
        onClose={viewModal.handleClose}
      >
        <div className='flex flex-col gap-y-2 p-4'>

          <DisabledFormInput
            id='id'
            name='id'
            title='ID Patient'
            value={patient.id}
          />

          <div className='flex flex-col gap-3'>

            <DisabledFormInput
              id='status'
              name='status'
              title='Status'
              value={patient.status ? 'Active' : 'Inactive'}
            />

          </div>
        </div>
      </Modal>

      <Modal
        title='Create Patient'
        actionTitle='Save'
        isOpen={createModal.isOpen}
        action={handleCreate}
        onClose={createModal.handleClose}
      >
        <div>
          <div className='flex flex-col gap-y-2 p-4'>
            <div className='flex flex-col gap-3'>

              <FormInputText
                id='id'
                name='id'
                title='ID Patient'
                value={patient.id}
                handleDataChange={handleDataChange}
              />

              <FormInputSelect
                id='status'
                name='status'
                title='Status'
                value={patient.status}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'Inactive', value: false },
                  { option: 'Active', value: true }
                ]}
              />

            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title='Edit Patient'
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
              title='ID Patient'
              value={patient.id}
            />

            <div className='flex flex-col gap-3'>

              <FormInputSelect
                id='status'
                name='status'
                title='Status'
                value={patient.status}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'Inactive', value: false },
                  { option: 'Active', value: true }
                ]}
              />

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Delete Patient'
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
              title='ID Patient'
              value={patient.id}
            />

            <div className='flex flex-col gap-3'>

              <DisabledFormInput
                id='status'
                name='status'
                title='Status'
                value={patient.status ? 'Active' : 'Inactive'}
              />

            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}

export default Patients

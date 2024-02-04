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
  const { data, error, loading } = UseFetch({ fetchFunction: PatientServices.getAll, page, limit })
  const [patient, setPatient] = useState({
    id: '',
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
    const persons = data.data
    const filteredPerson = persons.find((element) => element.id === id)
    setPatient(filteredPerson)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    console.log(patient)
    const { name, value } = event.target
    console.log({ name, value })
    setPatient({ ...patient, [name]: value })
  }

  const handleCreate = () => {
    console.log(patient)
    PatientServices.create(patient)
  }

  const handleEdit = async () => {
    PatientServices.update(patient.id, { patient })
  }

  const handleDelete = () => {
    PatientServices.delete(patient.id)
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
              <TableHeader>id</TableHeader>
              <TableHeader>status</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                data.data
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
            title='ID Patient'
            value={patient.id}
          />

          <div className='flex flex-col gap-3'>

            <DisabledFormInput
              title='Status'
              value={patient.status ? 'Active' : 'No Active'}
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
                title='ID Patient'
                value={patient.id}
                handleDataChange={handleDataChange}
              />

              <FormInputSelect
                title='Status'
                value={patient.status}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'No Active', value: false },
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
              title='ID Patient'
              value={patient.id}
            />

            <div className='flex flex-col gap-3'>

              <FormInputSelect
                title='Status'
                value={patient.status}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'No Active', value: false },
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
              title='ID Patient'
              value={patient.id}
            />

            <div className='flex flex-col gap-3'>

              <DisabledFormInput
                title='Status'
                value={patient.status ? 'Active' : 'No Active'}
              />

            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}

export default Patients

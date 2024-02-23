import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { Error } from '@components/Errors'
import { PanelTitle } from '@components/Texts'
import { FormInputDate, FormInputText, FormInputTime, FormTextArea, FormInputSelect, DisabledFormInput, DisabledFormTextCopy } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'
import { Spinner } from '@components/Spinners'

import { AppointmentServices } from '@services/Appointment'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function Appointments () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data: fetchedAppointments, error, loading, reloadData } = UseFetch({ fetchFunction: AppointmentServices.getAll, page, limit })
  const [appointment, setAppointment] = useState({
    idPreviousAppointment: '',
    idPatient: '',
    idDoctor: '',
    reason: '',
    appointmentDate: '',
    appointmentTime: '',
    status: ''
  })
  const [search, setSearch] = useState('')

  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setAppointment({})
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const appointmentsData = fetchedAppointments.data
    const filteredAAppointment = appointmentsData.find((element) => element.id === id)
    setAppointment(filteredAAppointment)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setAppointment({ ...appointment, [name]: value })
  }

  const handleCreate = async () => {
    await AppointmentServices.create(appointment)
    createModal.handleClose()
    reloadData()
  }

  const handleEdit = async () => {
    await AppointmentServices.update(appointment.id, appointment)
    editModal.handleClose()
    reloadData()
  }

  const handleDelete = async () => {
    await AppointmentServices.delete(appointment.id)
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
          <PanelTitle text='Appointments' />

          <form
            className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'
            onSubmit={(event) => { event.preventDefault() }}
          >
            <SearchInput placeholder='Search appointments' handleChange={handleSearch} />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </form>
        </div>

        {error && <Error />}
        {loading && <Spinner />}

        {!error && !loading && fetchedAppointments && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: fetchedAppointments.page,
            totalPages: fetchedAppointments.totalPages,
            results: fetchedAppointments.results,
            totalResults: fetchedAppointments.totalResults,
            limit
          }}
          >
            <TableHead>
              <TableHeader>id</TableHeader>
              <TableHeader>Patient</TableHeader>
              <TableHeader>Doctor</TableHeader>
              <TableHeader>Reason</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                fetchedAppointments.data
                  ?.filter(item => item.id.toLowerCase().includes(search.toLowerCase()))
                  ?.map((_appointment) => (
                    <tr
                      key={_appointment.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 text-center'>{_appointment.id}</td>
                      <td className='px-4 py-2 text-center'>{_appointment.idPatient}</td>
                      <td className='px-4 py-2 text-center'>{_appointment.idDoctor}</td>
                      <td className='px-4 py-2 text-center'>{_appointment.reason}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, _appointment.id)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, _appointment.id)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, _appointment.id)}
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
        title='Appointment Details'
        actionTitle='Accept'
        isOpen={viewModal.isOpen}
        onClose={viewModal.handleClose}
      >
        <div className='flex flex-col gap-y-2 p-4'>
          <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

            <DisabledFormTextCopy
              id='id'
              name='id'
              title='Appointment ID'
              value={appointment.id}
            />

            {
              appointment.idPreviousAppointment
                ? <DisabledFormTextCopy
                    id='idPreviousAppointment'
                    name='idPreviousAppointment'
                    title='Previous Appointment ID'
                    value={appointment.idPreviousAppointment}
                  />
                : <DisabledFormInput
                    id='idPreviousAppointment'
                    name='idPreviousAppointment'
                    title='Previous Appointment ID'
                    value='No previous appointment'
                  />
            }

            <DisabledFormTextCopy
              id='idPatient'
              name='idPatient'
              title='Patient ID'
              value={appointment.idPatient}
            />

            <DisabledFormTextCopy
              id='idDoctor'
              name='idDoctor'
              title='Doctor ID'
              value={appointment.idDoctor}
            />

            <div className='col-span-2'>
              <FormTextArea
                id='reason'
                name='reason'
                title='Reason'
                value={appointment.reason}
                isDisabled
              />
            </div>

            <div className='col-span-2'>
              <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>

                <DisabledFormInput
                  id='appointmentDate'
                  name='appointmentDate'
                  title='Date'
                  value={appointment.appointmentDate}
                />

                <DisabledFormInput
                  id='appointmentTime'
                  name='appointmentTime'
                  title='Time'
                  value={appointment.appointmentTime}
                />

                <DisabledFormInput
                  id='status'
                  name='status'
                  title='Status'
                  value={!appointment.status ? 'Pending' : 'Done'}
                />

              </div>
            </div>

          </div>
        </div>
      </Modal>

      <Modal
        title='Create Appointment'
        actionTitle='Save'
        isOpen={createModal.isOpen}
        action={handleCreate}
        onClose={createModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>
            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

              <FormInputText
                id='idPreviousAppointment'
                name='idPreviousAppointment'
                title='Previous Appointment ID'
                value={appointment.idPreviousAppointment}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='idPatient'
                name='idPatient'
                title='Patient ID'
                value={appointment.idPatient}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='idDoctor'
                name='idDoctor'
                title='Doctor ID'
                value={appointment.idDoctor}
                handleDataChange={handleDataChange}
              />

              <div className='col-span-2'>
                <FormTextArea
                  id='reason'
                  name='reason'
                  title='Reason'
                  value={appointment.reason}
                  handleDataChange={handleDataChange}
                />
              </div>

              <div className='col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>

                  <FormInputDate
                    id='appointmentDate'
                    name='appointmentDate'
                    title='Date'
                    value={appointment.appointmentDate}
                    handleDataChange={handleDataChange}
                  />

                  <FormInputTime
                    id='appointmentTime'
                    name='appointmentTime'
                    title='Time'
                    value={appointment.appointmentTime}
                    handleDataChange={handleDataChange}
                  />

                  <FormInputSelect
                    id='status'
                    name='status'
                    title='Status'
                    value={appointment.status}
                    handleDataChange={handleDataChange}
                    options={[
                      { option: 'Pending', value: false },
                      { option: 'Done', value: true }
                    ]}
                  />

                </div>
              </div>

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Edit Appointment'
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
              title='Appointment ID'
              value={appointment.id}
            />

            <FormInputText
              id='idPreviousAppointment'
              name='idPreviousAppointment'
              title='Previous Appointment ID'
              value={appointment.idPreviousAppointment}
              handleDataChange={handleDataChange}
            />

            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

              <FormInputText
                id='idPatient'
                name='idPatient'
                title='Patient ID'
                value={appointment.idPatient}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='idDoctor'
                name='idDoctor'
                title='Doctor ID'
                value={appointment.idDoctor}
                handleDataChange={handleDataChange}
              />

              <div className='col-span-2'>
                <FormTextArea
                  id='reason'
                  name='reason'
                  title='Reason'
                  value={appointment.reason}
                  handleDataChange={handleDataChange}
                />
              </div>

              <div className='col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>

                  <FormInputDate
                    id='appointmentDate'
                    name='appointmentDate'
                    title='Date'
                    value={appointment.appointmentDate}
                    handleDataChange={handleDataChange}
                  />

                  <FormInputTime
                    id='appointmentTime'
                    name='appointmentTime'
                    title='Time'
                    value={appointment.appointmentTime}
                    handleDataChange={handleDataChange}
                  />

                  <FormInputSelect
                    id='status'
                    name='status'
                    title='Status'
                    value={appointment.status}
                    handleDataChange={handleDataChange}
                    options={[
                      { option: 'Pending', value: false },
                      { option: 'Done', value: true }
                    ]}
                  />

                </div>
              </div>

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Delete Appointment'
        actionTitle='Delete'
        action={handleDelete}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>
            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

              <DisabledFormTextCopy
                id='id'
                name='id'
                title='Appointment ID'
                value={appointment.id}
              />

              {
                appointment.idPreviousAppointment
                  ? <DisabledFormTextCopy
                      id='idPreviousAppointment'
                      name='idPreviousAppointment'
                      title='Previous Appointment ID'
                      value={appointment.idPreviousAppointment}
                    />
                  : <DisabledFormInput
                      id='idPreviousAppointment'
                      name='idPreviousAppointment'
                      title='Previous Appointment ID'
                      value='No previous appointment'
                    />
              }

              <DisabledFormTextCopy
                id='idPatient'
                name='idPatient'
                title='Patient ID'
                value={appointment.idPatient}
              />

              <DisabledFormTextCopy
                id='idDoctor'
                name='idDoctor'
                title='Doctor ID'
                value={appointment.idDoctor}
              />

              <div className='col-span-2'>
                <FormTextArea
                  id='reason'
                  name='reason'
                  title='Reason'
                  value={appointment.reason}
                  isDisabled
                />
              </div>

              <div className='col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>

                  <DisabledFormInput
                    id='appointmentDate'
                    name='appointmentDate'
                    title='Date'
                    value={appointment.appointmentDate}
                  />

                  <DisabledFormInput
                    id='appointmentTime'
                    name='appointmentTime'
                    title='Time'
                    value={appointment.appointmentTime}
                  />

                  <DisabledFormInput
                    id='status'
                    name='status'
                    title='Status'
                    value={!appointment.status ? 'Pending' : 'Done'}
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

export default Appointments

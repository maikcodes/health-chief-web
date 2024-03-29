import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { Error } from '@components/Errors'
import { PanelTitle } from '@components/Texts'
import { FormInputDate, FormInputText, FormTextArea, DisabledFormInput, DisabledFormTextCopy } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'
import { Spinner } from '@components/Spinners'

import { PhysicalExaminationServices } from '@services/PhysicalExamination'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function PhysicalExaminations () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data: fetchedPE, error, loading, reloadData } = UseFetch({ fetchFunction: PhysicalExaminationServices.getAll, page, limit })
  const [physicalExamination, setPhysicalExamination] = useState({
    diseaseCode: '',
    visualization: '',
    patientCheck: '',
    diagnosis: '',
    conclusion: '',
    managementPlan: '',
    symptomOnsetDate: '',
    contingencyType: '',
    sickLeaveDays: ''
  })
  const [search, setSearch] = useState('')

  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setPhysicalExamination({})
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const physicalExaminationsData = fetchedPE.data
    const filteredPhysicalExamination = physicalExaminationsData.find((element) => element.id === id)
    setPhysicalExamination(filteredPhysicalExamination)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setPhysicalExamination({ ...physicalExamination, [name]: value })
  }

  const handleCreate = async () => {
    await PhysicalExaminationServices.create(physicalExamination)
    createModal.handleClose()
    reloadData()
  }

  const handleEdit = async () => {
    await PhysicalExaminationServices.update(physicalExamination.id, physicalExamination)
    editModal.handleClose()
    reloadData()
  }

  const handleDelete = async () => {
    await PhysicalExaminationServices.delete(physicalExamination.id)
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
          <PanelTitle text='Physical Examinations' />

          <form
            className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'
            onSubmit={(event) => { event.preventDefault() }}
          >
            <SearchInput placeholder='Search physical examinations' handleChange={handleSearch} />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </form>
        </div>

        {error && <Error />}
        {loading && <Spinner />}

        {!error && !loading && fetchedPE && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: fetchedPE.page,
            totalPages: fetchedPE.totalPages,
            results: fetchedPE.results,
            totalResults: fetchedPE.totalResults,
            limit
          }}
          >
            <TableHead>
              <TableHeader>id</TableHeader>
              <TableHeader>disease code</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                fetchedPE.data
                  ?.filter(item => item.id.toLowerCase().includes(search.toLowerCase()))
                  ?.map((_physicalExamination) => (
                    <tr
                      key={_physicalExamination.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 text-center'>{_physicalExamination.id}</td>
                      <td className='px-4 py-2 text-center'>{_physicalExamination.diseaseCode}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, _physicalExamination.id)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, _physicalExamination.id)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, _physicalExamination.id)}
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
        title='Physical Examination Details'
        actionTitle='Accept'
        isOpen={viewModal.isOpen}
        onClose={viewModal.handleClose}
      >
        <div className='flex flex-col gap-y-2 p-4'>

          <DisabledFormTextCopy
            id='id'
            name='id'
            title='Physical Examination ID'
            value={physicalExamination.id}
          />

          <div className='flex flex-col gap-3'>

            <DisabledFormInput
              id='diseaseCode'
              name='diseaseCode'
              title='Disease Code'
              value={physicalExamination.diseaseCode}
            />

            <FormTextArea
              id='visualization'
              name='visualization'
              title='Visualization'
              value={physicalExamination.visualization}
              isDisabled
            />

            <FormTextArea
              id='patientCheck'
              name='patientCheck'
              title='Patient Check'
              value={physicalExamination.patientCheck}
              isDisabled
            />

            <FormTextArea
              id='diagnosis'
              name='diagnosis'
              title='Diagnosis'
              value={physicalExamination.diagnosis}
              isDisabled
            />

            <FormTextArea
              id='conclusion'
              name='conclusion'
              title='Conclusion'
              value={physicalExamination.conclusion}
              isDisabled
            />

            <FormTextArea
              id='managementPlan'
              name='managementPlan'
              title='Management Plan'
              value={physicalExamination.managementPlan}
              isDisabled
            />

            <FormTextArea
              id='contingencyType'
              name='contingencyType'
              title='Contingency Type'
              value={physicalExamination.contingencyType}
              isDisabled
            />

            <div className='col-span-2'>
              <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

                <DisabledFormInput
                  id='symptomOnsetDate'
                  name='symptomOnsetDate'
                  title='Symptom On Date'
                  value={physicalExamination.symptomOnsetDate}
                />

                <DisabledFormInput
                  id='sickLeaveDays'
                  name='sickLeaveDays'
                  title='Sick Leave Days'
                  value={physicalExamination.sickLeaveDays}
                />

              </div>
            </div>

          </div>
        </div>
      </Modal>

      <Modal
        title='Create Physical Examination'
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
                title='Physical Examination ID'
                value={physicalExamination.id}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='diseaseCode'
                name='diseaseCode'
                title='Disease Code'
                value={physicalExamination.diseaseCode}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='visualization'
                name='visualization'
                title='Visualization'
                value={physicalExamination.visualization}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='patientCheck'
                name='patientCheck'
                title='Patient Check'
                value={physicalExamination.patientCheck}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='diagnosis'
                name='diagnosis'
                title='Diagnosis'
                value={physicalExamination.diagnosis}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='conclusion'
                name='conclusion'
                title='Conclusion'
                value={physicalExamination.conclusion}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='managementPlan'
                name='managementPlan'
                title='Management Plan'
                value={physicalExamination.managementPlan}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='contingencyType'
                name='contingencyType'
                title='Contingency Type'
                value={physicalExamination.contingencyType}
                handleDataChange={handleDataChange}
              />

              <div className='col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

                  <FormInputDate
                    id='symptomOnsetDate'
                    name='symptomOnsetDate'
                    title='Symptom On Date'
                    value={physicalExamination.symptomOnsetDate}
                    handleDataChange={handleDataChange}

                  />

                  <FormInputText
                    id='sickLeaveDays'
                    name='sickLeaveDays'
                    title='Sick Leave Days'
                    value={physicalExamination.sickLeaveDays}
                    handleDataChange={handleDataChange}
                  />

                </div>
              </div>

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Edit Physical Examination'
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
              title='Physical Examination ID'
              value={physicalExamination.id}
            />

            <div className='flex flex-col gap-3'>

              <FormInputText
                id='diseaseCode'
                name='diseaseCode'
                title='Disease Code'
                value={physicalExamination.diseaseCode}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='visualization'
                name='visualization'
                title='Visualization'
                value={physicalExamination.visualization}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='patientCheck'
                name='patientCheck'
                title='Patient Check'
                value={physicalExamination.patientCheck}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='diagnosis'
                name='diagnosis'
                title='Diagnosis'
                value={physicalExamination.diagnosis}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='conclusion'
                name='conclusion'
                title='Conclusion'
                value={physicalExamination.conclusion}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='managementPlan'
                name='managementPlan'
                title='Management Plan'
                value={physicalExamination.managementPlan}
                handleDataChange={handleDataChange}
              />

              <FormTextArea
                id='contingencyType'
                name='contingencyType'
                title='Contingency Type'
                value={physicalExamination.contingencyType}
                handleDataChange={handleDataChange}
              />

              <div className='col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

                  <FormInputDate
                    id='symptomOnsetDate'
                    name='symptomOnsetDate'
                    title='Symptom On Date'
                    value={physicalExamination.symptomOnsetDate}
                    handleDataChange={handleDataChange}

                  />

                  <FormInputText
                    id='sickLeaveDays'
                    name='sickLeaveDays'
                    title='Sick Leave Days'
                    value={physicalExamination.sickLeaveDays}
                    handleDataChange={handleDataChange}
                  />

                </div>
              </div>

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Delete Physical Examination'
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
              title='Physical Examination ID'
              value={physicalExamination.id}
            />

            <div className='flex flex-col gap-3'>

              <DisabledFormInput
                id='diseaseCode'
                name='diseaseCode'
                title='Disease Code'
                value={physicalExamination.diseaseCode}
              />

              <FormTextArea
                id='visualization'
                name='visualization'
                title='Visualization'
                value={physicalExamination.visualization}
                isDisabled
              />

              <FormTextArea
                id='patientCheck'
                name='patientCheck'
                title='Patient Check'
                value={physicalExamination.patientCheck}
                isDisabled
              />

              <FormTextArea
                id='diagnosis'
                name='diagnosis'
                title='Diagnosis'
                value={physicalExamination.diagnosis}
                isDisabled
              />

              <FormTextArea
                id='conclusion'
                name='conclusion'
                title='Conclusion'
                value={physicalExamination.conclusion}
                isDisabled
              />

              <FormTextArea
                id='managementPlan'
                name='managementPlan'
                title='Management Plan'
                value={physicalExamination.managementPlan}
                isDisabled
              />

              <FormTextArea
                id='contingencyType'
                name='contingencyType'
                title='Contingency Type'
                value={physicalExamination.contingencyType}
                isDisabled
              />

              <div className='col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

                  <DisabledFormInput
                    id='symptomOnsetDate'
                    name='symptomOnsetDate'
                    title='Symptom On Date'
                    value={physicalExamination.symptomOnsetDate}
                  />

                  <DisabledFormInput
                    id='sickLeaveDays'
                    name='sickLeaveDays'
                    title='Sick Leave Days'
                    value={physicalExamination.sickLeaveDays}
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

export default PhysicalExaminations

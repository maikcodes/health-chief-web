import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { DisabledText, PanelTitle } from '@components/Texts'
import { FormInputText, FormTextArea, FormInputSelect, DisabledFormInput } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'

import { AnamnesisServices } from '@services/Anamnesis'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function Anamnesis () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data, error, loading } = UseFetch({ fetchFunction: AnamnesisServices.getAll, page, limit })
  const [anamnesis, setAnamnesis] = useState({
    id: '',
    bloodType: '',
    personalSurgicalHistory: '',
    personalPathologicalHistory: '',
    familyPathologicalHistory: '',
    allergies: ''
  })
  const [search, setSearch] = useState('')

  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setAnamnesis({})
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const persons = data.data
    const filteredPerson = persons.find((element) => element.id === id)
    setAnamnesis(filteredPerson)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setAnamnesis({ ...anamnesis, [name]: value })
  }

  const handleCreate = () => {
    AnamnesisServices.create(anamnesis)
  }

  const handleEdit = async () => {
    AnamnesisServices.update(anamnesis.id, { anamnesis })
  }

  const handleDelete = () => {
    AnamnesisServices.delete(anamnesis.id)
  }

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
  }

  return (
    <AdminLayout>
      <div className='flex flex-col gap-y-2 h-full w-full'>

        <div className='flex flex-col gap-y-2'>
          <PanelTitle text='Anamnesis' />

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
              <TableHeader>Blood type</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                data.data
                  ?.filter(item => item.id.toLowerCase().includes(search.toLowerCase()))
                  ?.map((_anamnesis) => (
                    <tr
                      key={_anamnesis.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 text-center'>{_anamnesis.id}</td>
                      <td className='px-4 py-2 text-center'>{_anamnesis.bloodType}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, _anamnesis.id)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, _anamnesis.id)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, _anamnesis.id)}
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
        title='Anamnesis Details'
        actionTitle='Accept'
        isOpen={viewModal.isOpen}
        onClose={viewModal.handleClose}
      >
        <div className='flex flex-col gap-y-2 p-4'>

          <DisabledText text={anamnesis.id} />

          <DisabledFormInput
            title='Blood Type'
            value={anamnesis.bloodType}
          />

          <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>
            <FormTextArea
              title='Personal Surgical History'
              value={anamnesis.personalSurgicalHistory}
              isDisabled
            />
            <FormTextArea
              title='Personal Pathological History'
              value={anamnesis.personalPathologicalHistory}
              isDisabled
            />
            <FormTextArea
              title='Family Pathological History'
              value={anamnesis.familyPathologicalHistory}
              isDisabled
            />
            <FormTextArea
              title='Allergies'
              value={anamnesis.allergies}
              isDisabled
            />
          </div>
        </div>
      </Modal>

      <Modal
        title='Create Anamnesis'
        actionTitle='Save'
        isOpen={createModal.isOpen}
        action={handleCreate}
        onClose={createModal.handleClose}
      >
        <form action=''>
          <div className='p-4 flex flex-col lg:grid lg:grid-cols-2 gap-3'>
            <FormInputText
              title='ID'
              value={anamnesis.id}
              handleDataChange={handleDataChange}
            />
            <FormInputSelect
              title='Blood Type'
              value={anamnesis.bloodType}
              handleDataChange={handleDataChange}
              options={[
                { option: 'A', value: 'A' },
                { option: 'O', value: 'O' }
              ]}
            />
            <FormTextArea
              title='Personal Surgical History'
              value={anamnesis.personalSurgicalHistory}
              handleDataChange={handleDataChange}
            />
            <FormTextArea
              title='Personal Pathological History'
              value={anamnesis.personalPathologicalHistory}
              handleDataChange={handleDataChange}
            />
            <FormTextArea
              title='Family Pathological History'
              value={anamnesis.familyPathologicalHistory}
              handleDataChange={handleDataChange}
            />
            <FormTextArea
              title='Allergies'
              value={anamnesis.allergies}
              handleDataChange={handleDataChange}
            />
          </div>
        </form>
      </Modal>

      <Modal
        title='Edit Anamnesis'
        actionTitle='Save changes'
        isOpen={editModal.isOpen}
        action={handleEdit}
        onClose={editModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledText text={anamnesis.id} />

            <FormInputSelect
              title='Blood Type'
              value={anamnesis.bloodType}
              handleDataChange={handleDataChange}
              options={[
                { option: 'A', value: 'A' },
                { option: 'O', value: 'O' }
              ]}
            />

            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>
              <FormTextArea
                title='Personal Surgical History'
                value={anamnesis.personalSurgicalHistory}
                handleDataChange={handleDataChange}
              />
              <FormTextArea
                title='Personal Pathological History'
                value={anamnesis.personalPathologicalHistory}
                handleDataChange={handleDataChange}
              />
              <FormTextArea
                title='Family Pathological History'
                value={anamnesis.familyPathologicalHistory}
                handleDataChange={handleDataChange}
              />
              <FormTextArea
                title='Allergies'
                value={anamnesis.allergies}
                handleDataChange={handleDataChange}
              />
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Delete Anamnesis'
        actionTitle='Delete'
        action={handleDelete}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledText text={anamnesis.id} />

            <DisabledFormInput
              title='Blood Type'
              value={anamnesis.bloodType}
            />

            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>
              <FormTextArea
                title='Personal Surgical History'
                value={anamnesis.personalSurgicalHistory}
                isDisabled
              />
              <FormTextArea
                title='Personal Pathological History'
                value={anamnesis.personalPathologicalHistory}
                isDisabled
              />
              <FormTextArea
                title='Family Pathological History'
                value={anamnesis.familyPathologicalHistory}
                isDisabled
              />
              <FormTextArea
                title='Allergies'
                value={anamnesis.allergies}
                isDisabled
              />
            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}

export default Anamnesis

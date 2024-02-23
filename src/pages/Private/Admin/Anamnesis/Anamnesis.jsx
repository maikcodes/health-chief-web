import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { PanelTitle } from '@components/Texts'
import { Error } from '@components/Errors'
import { FormInputText, FormTextArea, FormInputSelect, DisabledFormInput, DisabledFormTextCopy } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'
import { Spinner } from '@components/Spinners'

import { AnamnesisServices } from '@services/Anamnesis'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function Anamnesis () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data: fetchedAnamnesis, error, loading, reloadData } = UseFetch({ fetchFunction: AnamnesisServices.getAll, page, limit })
  const [anamnesis, setAnamnesis] = useState({
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
    const anamnesisData = fetchedAnamnesis.data
    const filteredAnamnesis = anamnesisData.find((element) => element.id === id)
    setAnamnesis(filteredAnamnesis)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setAnamnesis({ ...anamnesis, [name]: value })
  }

  const handleCreate = async () => {
    await AnamnesisServices.create(anamnesis)
    createModal.handleClose()
    reloadData()
  }

  const handleEdit = async () => {
    await AnamnesisServices.update(anamnesis.id, anamnesis)
    editModal.handleClose()
    reloadData()
  }

  const handleDelete = async () => {
    await AnamnesisServices.delete(anamnesis.id)
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
          <PanelTitle text='Anamnesis' />

          <form
            className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'
            onSubmit={(event) => { event.preventDefault() }}
          >
            <SearchInput placeholder='Search anamnesis' handleChange={handleSearch} />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </form>
        </div>

        {error && <Error />}
        {loading && <Spinner />}

        {!error && !loading && fetchedAnamnesis && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: fetchedAnamnesis.page,
            totalPages: fetchedAnamnesis.totalPages,
            results: fetchedAnamnesis.results,
            totalResults: fetchedAnamnesis.totalResults,
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
                fetchedAnamnesis.data
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

          <DisabledFormTextCopy
            title='Anamnesis ID'
            value={anamnesis.id}
          />

          <DisabledFormInput
            id='bloodType'
            name='bloodType'
            title='Blood Type'
            value={anamnesis.bloodType}
          />

          <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>
            <FormTextArea
              id='personalSurgicalHistory'
              name='personalSurgicalHistory'
              title='Personal Surgical History'
              value={anamnesis.personalSurgicalHistory}
              isDisabled
            />
            <FormTextArea
              id='personalPathologicalHistory'
              name='personalPathologicalHistory'
              title='Personal Pathological History'
              value={anamnesis.personalPathologicalHistory}
              isDisabled
            />
            <FormTextArea
              id='familyPathologicalHistory'
              name='familyPathologicalHistory'
              title='Family Pathological History'
              value={anamnesis.familyPathologicalHistory}
              isDisabled
            />
            <FormTextArea
              id='allergies'
              name='allergies'
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
              id='id'
              name='id'
              title='ID'
              value={anamnesis.id}
              handleDataChange={handleDataChange}
            />
            <FormInputSelect
              id='bloodType'
              name='bloodType'
              title='Blood Type'
              value={anamnesis.bloodType}
              handleDataChange={handleDataChange}
              options={[
                { option: 'A', value: 'A' },
                { option: 'O', value: 'O' }
              ]}
            />
            <FormTextArea
              id='personalSurgicalHistory'
              name='personalSurgicalHistory'
              title='Personal Surgical History'
              value={anamnesis.personalSurgicalHistory}
              handleDataChange={handleDataChange}
            />
            <FormTextArea
              id='personalPathologicalHistory'
              name='personalPathologicalHistory'
              title='Personal Pathological History'
              value={anamnesis.personalPathologicalHistory}
              handleDataChange={handleDataChange}
            />
            <FormTextArea
              id='familyPathologicalHistory'
              name='familyPathologicalHistory'
              title='Family Pathological History'
              value={anamnesis.familyPathologicalHistory}
              handleDataChange={handleDataChange}
            />
            <FormTextArea
              id='allergies'
              name='allergies'
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

            <DisabledFormTextCopy
              title='Anamnesis ID'
              value={anamnesis.id}
            />

            <FormInputSelect
              id='bloodType'
              name='bloodType'
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
                id='personalSurgicalHistory'
                name='personalSurgicalHistory'
                title='Personal Surgical History'
                value={anamnesis.personalSurgicalHistory}
                handleDataChange={handleDataChange}
              />
              <FormTextArea
                id='personalPathologicalHistory'
                name='personalPathologicalHistory'
                title='Personal Pathological History'
                value={anamnesis.personalPathologicalHistory}
                handleDataChange={handleDataChange}
              />
              <FormTextArea
                id='familyPathologicalHistory'
                name='familyPathologicalHistory'
                title='Family Pathological History'
                value={anamnesis.familyPathologicalHistory}
                handleDataChange={handleDataChange}
              />
              <FormTextArea
                id='allergies'
                name='allergies'
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

            <DisabledFormTextCopy
              title='Anamnesis ID'
              value={anamnesis.id}
            />

            <DisabledFormInput
              id='bloodType'
              name='bloodType'
              title='Blood Type'
              value={anamnesis.bloodType}
            />

            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>
              <FormTextArea
                id='personalSurgicalHistory'
                name='personalSurgicalHistory'
                title='Personal Surgical History'
                value={anamnesis.personalSurgicalHistory}
                isDisabled
              />
              <FormTextArea
                id='personalPathologicalHistory'
                name='personalPathologicalHistory'
                title='Personal Pathological History'
                value={anamnesis.personalPathologicalHistory}
                isDisabled
              />
              <FormTextArea
                id='familyPathologicalHistory'
                name='familyPathologicalHistory'
                title='Family Pathological History'
                value={anamnesis.familyPathologicalHistory}
                isDisabled
              />
              <FormTextArea
                id='allergies'
                name='allergies'
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

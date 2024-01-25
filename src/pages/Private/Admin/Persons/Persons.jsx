import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { AvatarImage, AvatarImageLabel } from '@components/Images'
import { ButtonPrimary } from '@components/Buttons'
import { DisabledText, PanelTitle } from '@components/Texts'
import { FormInputDate, FormInputText, FormInputSelect, DisabledFormInput } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { PersonServices } from '@services/Person'
import { SearchInput } from '@components/Inputs'

import { UseFetch, useModal, UsePagination } from '@hooks'

import { useState } from 'react'

function Persons () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data, error, loading } = UseFetch({ fetchFunction: PersonServices.getAll, page, limit })
  const [person, setPerson] = useState({
    idCard: '',
    names: '',
    lastNames: '',
    occupation: '',
    maritalStatus: '',
    nationality: '',
    sex: '',
    phoneNumber: '',
    location: '',
    birthDate: ''
  })
  const [search, setSearch] = useState('')

  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setPerson({})
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const persons = data.data
    const filteredPerson = persons.find((element) => element.id === id)
    setPerson(filteredPerson)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setPerson({ ...person, [name]: value })
  }

  const handleCreate = () => {
    PersonServices.create(person)
  }

  const handleEdit = async () => {
    PersonServices.update(person.id, { person })
  }

  const handleDelete = () => {
    PersonServices.delete(person.id)
  }

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
  }

  return (
    <AdminLayout>
      <div className='flex flex-col gap-y-2 h-full w-full'>

        <div className='flex flex-col gap-y-2'>
          <PanelTitle text='Persons' />

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
              <TableHeader>name</TableHeader>
              <TableHeader>id</TableHeader>
              <TableHeader>id card</TableHeader>
              <TableHeader>phone</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                data.data
                  ?.filter(item => item.names.toLowerCase().includes(search.toLowerCase()))
                  ?.map((person) => (
                    <tr
                      key={person.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 capitalize flex flex-row items-center gap-x-2'>

                        {
                          person.image
                            ? <AvatarImage imageUrl={person.image} alt={person.names + ' ' + person.lastNames} />
                            : <AvatarImageLabel initials={person.names[0] + person.lastNames[0]} />
                        }

                        <div className='flex flex-col'>
                          <p className='font-bold'>
                            {person.names}
                          </p>
                          <p className='font-bold'>
                            {person.lastNames}
                          </p>
                        </div>
                      </td>
                      <td className='px-4 py-2 text-center'>{person.id}</td>
                      <td className='px-4 py-2 text-center'>{person.idCard}</td>
                      <td className='px-4 py-2 text-center'>{person.phoneNumber}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, person.id)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, person.id)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, person.id)}
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
        title='Person Details'
        actionTitle='Accept'
        isOpen={viewModal.isOpen}
        onClose={viewModal.handleClose}
      >
        <div className='flex flex-col gap-y-2 p-4'>

          <DisabledText text={person.id} />

          <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
            <DisabledFormInput
              title='ID Card'
              value={person.idCard}
            />
            <DisabledFormInput
              title='Names'
              value={person.names}
            />
            <DisabledFormInput
              title='Last names'
              value={person.lastNames}
            />
            <DisabledFormInput
              title='Phone number'
              value={person.phoneNumber}
            />
            <DisabledFormInput
              title='Birth date'
              value={person.birthDate}
            />
            <DisabledFormInput
              title='Occupation'
              value={person.occupation}
            />
            <div className='lg:col-span-2'>
              <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4'>
                <DisabledFormInput
                  title='Marital status'
                  value={person.maritalStatus}
                />
                <DisabledFormInput
                  title='Sex'
                  value={person.sex}
                />
                <DisabledFormInput
                  title='Nationality'
                  value={person.nationality}
                />
              </div>
            </div>
            <DisabledFormInput
              title='Location'
              value={person.location}
            />
          </div>
        </div>
      </Modal>

      <Modal
        title='Create person'
        actionTitle='Save'
        isOpen={createModal.isOpen}
        action={handleCreate}
        onClose={createModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>
            <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
              <FormInputText
                title='ID Card'
                value={person.idCard}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                title='Names'
                value={person.names}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                title='Last names'
                value={person.lastNames}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                title='Phone number'
                value={person.phoneNumber}
                handleDataChange={handleDataChange}
              />
              <FormInputDate
                title='Birth date'
                value={person.birthDate}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                title='Occupation'
                value={person.occupation}
                handleDataChange={handleDataChange}
              />
              <div className='lg:col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4'>
                  <FormInputSelect
                    title='Marital status'
                    value={person.maritalStatus}
                    handleDataChange={handleDataChange}
                    options={[
                      { option: 'Single', value: 'S' },
                      { option: 'Married', value: 'M' },
                      { option: 'Divorced', value: 'D' }
                    ]}
                  />
                  <FormInputSelect
                    title='Sex'
                    value={person.sex}
                    handleDataChange={handleDataChange}
                    options={[
                      { option: 'Male', value: 'M' },
                      { option: 'Female', value: 'F' }
                    ]}
                  />
                  <FormInputSelect
                    title='Nationality'
                    value={person.nationality}
                    handleDataChange={handleDataChange}
                    options={[
                      { option: 'Ecuador', value: 'ECU' },
                      { option: 'United States', value: 'USA' }
                    ]}
                  />
                </div>
              </div>
              <FormInputText
                title='Location'
                value={person.location}
                handleDataChange={handleDataChange}
              />
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Edit person'
        actionTitle='Save changes'
        isOpen={editModal.isOpen}
        action={handleEdit}
        onClose={editModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledText text={person.id} />

            <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
              <FormInputText
                title='ID Card'
                value={person.idCard}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                title='Names'
                value={person.names}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                title='Last names'
                value={person.lastNames}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                title='Phone number'
                value={person.phoneNumber}
                handleDataChange={handleDataChange}
              />
              <FormInputDate
                title='Birth date'
                value={person.birthDate}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                title='Occupation'
                value={person.occupation}
                handleDataChange={handleDataChange}
              />
              <div className='lg:col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4'>
                  <FormInputSelect
                    title='Marital status'
                    value={person.maritalStatus}
                    handleDataChange={handleDataChange}
                    options={[
                      { option: 'Single', value: 'S' },
                      { option: 'Married', value: 'M' },
                      { option: 'Divorced', value: 'D' }
                    ]}
                  />
                  <FormInputSelect
                    title='Sex'
                    value={person.sex}
                    handleDataChange={handleDataChange}
                    options={[
                      { option: 'Male', value: 'M' },
                      { option: 'Female', value: 'F' }
                    ]}
                  />
                  <FormInputSelect
                    title='Nationality'
                    value={person.nationality}
                    handleDataChange={handleDataChange}
                    options={[
                      { option: 'Ecuador', value: 'ECU' },
                      { option: 'United States', value: 'USA' }
                    ]}
                  />
                </div>
              </div>
              <FormInputText
                title='Location'
                value={person.location}
                handleDataChange={handleDataChange}
              />
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Delete person'
        actionTitle='Delete'
        action={handleDelete}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledText text={person.id} />

            <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
              <DisabledFormInput
                title='ID Card'
                value={person.idCard}
              />
              <DisabledFormInput
                title='Names'
                value={person.names}
              />
              <DisabledFormInput
                title='Last names'
                value={person.lastNames}
              />
              <DisabledFormInput
                title='Phone number'
                value={person.phoneNumber}
              />
              <DisabledFormInput
                title='Birth date'
                value={person.birthDate}
              />
              <DisabledFormInput
                title='Occupation'
                value={person.occupation}
              />
              <div className='lg:col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4'>
                  <DisabledFormInput
                    title='Marital status'
                    value={person.maritalStatus}
                  />
                  <DisabledFormInput
                    title='Sex'
                    value={person.sex}
                  />
                  <DisabledFormInput
                    title='Nationality'
                    value={person.nationality}
                  />
                </div>
              </div>
              <DisabledFormInput
                title='Location'
                value={person.location}
              />
            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}

export default Persons

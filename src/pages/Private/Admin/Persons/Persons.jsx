import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { AvatarImage, AvatarImageLabel } from '@components/Images'
import { ButtonPrimary } from '@components/Buttons'
import { PanelTitle } from '@components/Texts'
import { Error } from '@components/Errors'
import { FormInputDate, FormInputText, FormInputSelect, DisabledFormInput, DisabledFormTextCopy } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { PersonServices } from '@services/Person'
import { SearchInput } from '@components/Inputs'
import { Spinner } from '@components/Spinners'

import { UseFetch, useModal, UsePagination } from '@hooks'

import { useState } from 'react'

function Persons () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data: fetchedPersons, error, loading, reloadData } = UseFetch({ fetchFunction: PersonServices.getAll, page, limit })
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
    const personsData = fetchedPersons.data
    const filteredPerson = personsData.find((element) => element.id === id)
    setPerson(filteredPerson)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setPerson({ ...person, [name]: value })
  }

  const handleCreate = async () => {
    await PersonServices.create(person)
    createModal.handleClose()
    reloadData()
  }

  const handleEdit = async () => {
    await PersonServices.update(person.id, person)
    editModal.handleClose()
    reloadData()
  }

  const handleDelete = async () => {
    await PersonServices.delete(person.id)
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
          <PanelTitle text='Persons' />

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

        {!error && !loading && fetchedPersons && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: fetchedPersons.page,
            totalPages: fetchedPersons.totalPages,
            results: fetchedPersons.results,
            totalResults: fetchedPersons.totalResults,
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
                fetchedPersons.data
                  ?.filter(item => item.names.toLowerCase().includes(search.toLowerCase()))
                  ?.map((_person) => (
                    <tr
                      key={_person.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 capitalize flex flex-row items-center gap-x-2'>

                        {
                          _person.image
                            ? <AvatarImage imageUrl={_person.image} alt={_person.names + ' ' + _person.lastNames} />
                            : <AvatarImageLabel initials={_person.names[0] + _person.lastNames[0]} />
                        }

                        <div className='flex flex-col'>
                          <p className='font-bold'>
                            {_person.names}
                          </p>
                          <p className='font-bold'>
                            {_person.lastNames}
                          </p>
                        </div>
                      </td>
                      <td className='px-4 py-2 text-center'>{_person.id}</td>
                      <td className='px-4 py-2 text-center'>{_person.idCard}</td>
                      <td className='px-4 py-2 text-center'>{_person.phoneNumber}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, _person.id)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, _person.id)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, _person.id)}
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

          <DisabledFormTextCopy title='Person ID' value={person.id} />

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
                id='idCard'
                name='idCard'
                title='ID Card'
                value={person.idCard}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='names'
                name='names'
                title='Names'
                value={person.names}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='lastNames'
                name='lastNames'
                title='Last names'
                value={person.lastNames}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='phoneNumber'
                name='phoneNumber'
                title='Phone number'
                value={person.phoneNumber}
                handleDataChange={handleDataChange}
              />
              <FormInputDate
                id='birthDate'
                name='birthDate'
                title='Birth date'
                value={person.birthDate}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='occupation'
                name='occupation'
                title='Occupation'
                value={person.occupation}
                handleDataChange={handleDataChange}
              />
              <div className='lg:col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4'>
                  <FormInputSelect
                    id='maritalStatus'
                    name='maritalStatus'
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
                    id='sex'
                    name='sex'
                    title='Sex'
                    value={person.sex}
                    handleDataChange={handleDataChange}
                    options={[
                      { option: 'Male', value: 'M' },
                      { option: 'Female', value: 'F' }
                    ]}
                  />
                  <FormInputSelect
                    id='nationality'
                    name='nationality'
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
                id='location'
                name='location'
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

            <DisabledFormTextCopy title='Person ID' value={person.id} />

            <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
              <FormInputText
                id='idCard'
                name='idCard'
                title='ID Card'
                value={person.idCard}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='names'
                name='names'
                title='Names'
                value={person.names}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='lastNames'
                name='lastNames'
                title='Last names'
                value={person.lastNames}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='phoneNumber'
                name='phoneNumber'
                title='Phone number'
                value={person.phoneNumber}
                handleDataChange={handleDataChange}
              />
              <FormInputDate
                id='birthDate'
                name='birthDate'
                title='Birth date'
                value={person.birthDate}
                handleDataChange={handleDataChange}
              />
              <FormInputText
                id='occupation'
                name='occupation'
                title='Occupation'
                value={person.occupation}
                handleDataChange={handleDataChange}
              />
              <div className='lg:col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4'>
                  <FormInputSelect
                    id='maritalStatus'
                    name='maritalStatus'
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
                    id='sex'
                    name='sex'
                    title='Sex'
                    value={person.sex}
                    handleDataChange={handleDataChange}
                    options={[
                      { option: 'Male', value: 'M' },
                      { option: 'Female', value: 'F' }
                    ]}
                  />
                  <FormInputSelect
                    id='nationality'
                    name='nationality'
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
                id='location'
                name='location'
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

            <DisabledFormTextCopy title='Person ID' value={person.id} />

            <div className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
              <DisabledFormInput
                id='idCard'
                name='idCard'
                title='ID Card'
                value={person.idCard}
              />
              <DisabledFormInput
                id='names'
                name='names'
                title='Names'
                value={person.names}
              />
              <DisabledFormInput
                id='lastNames'
                name='lastNames'
                title='Last names'
                value={person.lastNames}
              />
              <DisabledFormInput
                id='phoneNumber'
                name='phoneNumber'
                title='Phone number'
                value={person.phoneNumber}
              />
              <DisabledFormInput
                id='birthDate'
                name='birthDate'
                title='Birth date'
                value={person.birthDate}
              />
              <DisabledFormInput
                id='occupation'
                name='occupation'
                title='Occupation'
                value={person.occupation}
              />
              <div className='lg:col-span-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4'>
                  <DisabledFormInput
                    id='maritalStatus'
                    name='maritalStatus'
                    title='Marital status'
                    value={person.maritalStatus}
                  />
                  <DisabledFormInput
                    id='sex'
                    name='sex'
                    title='Sex'
                    value={person.sex}
                  />
                  <DisabledFormInput
                    id='nationality'
                    name='nationality'
                    title='Nationality'
                    value={person.nationality}
                  />
                </div>
              </div>
              <DisabledFormInput
                id='location'
                name='location'
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

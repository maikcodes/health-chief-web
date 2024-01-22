import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { DisabledText, PanelTitle } from '@components/Texts'
import { Modal } from '@components/Dialogs'
import { PersonServices } from '@services/Person'
import { SearchInput } from '@components/Inputs'
import { FormInputDate, FormInputText, FormInputSelect } from '@components/Forms'

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
    const filteredPerson = persons.filter((element) => element.id === id)[0]
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
    PersonServices.delete('50f206fe-7d6a-414f-a38f-378bed8522a0')
  }

  const renderProfileImage = (data) => {
    if (!data.image) {
      return (
        <div className='w-full h-full bg-biscay-500 text-center p-2 text-white font-bold uppercase'>
          {data.names[0] + '' + data.lastNames[0]}
        </div>
      )
    }

    return <img src={person.image} alt={`${person.names} ${person.lastNames}`} />
  }

  return (
    <AdminLayout>
      <div className='flex flex-col gap-y-2 h-full w-full'>

        <div className='flex flex-col gap-y-2'>
          <PanelTitle text='Persons' />

          <div className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'>
            <SearchInput placeholder='Search persons' />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </div>
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
              {data.data?.map((person) => (
                <tr
                  key={person.id}
                  className='lg:hover:bg-gray-300'
                >
                  <td className='px-4 py-2 capitalize flex flex-row items-center gap-x-2'>
                    <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-biscay-600'>
                      {renderProfileImage(person)}
                    </div>
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
              ))}
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
        <div className='flex items-center justify-center'>
          <img
            src={person.image}
            alt={`${person.names} ${person.lastNames}`}
            className='w-32 h-32 rounded-full'
          />
        </div>
        <div className='flex flex-col gap-y-2 p-4'>
          <DisabledText text={person.id} />

          <p className='font-bold'>Full Name:</p>
          <DisabledText text={person.names + ' ' + person.lastNames} />

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-bold'>Email:</p>
              <DisabledText text={person.email} />
            </div>
            <div>
              <p className='font-bold'>Phone:</p>
              <DisabledText text={person.phone} />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title='Create new person'
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
          <div className='flex items-center justify-center'>
            <img
              src={person.image}
              alt={`${person.names} ${person.lastNames}`}
              className='w-32 h-32 rounded-full'
            />
          </div>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledText text={person.id} />

            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                  <label htmlFor='names' className='font-bold'>First names:</label>
                  <DisabledText
                    text={person.names}
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='email' className='font-bold'>Email:</label>
                  <DisabledText
                    text={person.email}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                  <label htmlFor='lastNames' className='font-bold'>Last names:</label>
                  <DisabledText
                    text={person.lastNames}
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='phone' className='font-bold'>Phone:</label>
                  <DisabledText
                    text={person.phone}
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

export default Persons

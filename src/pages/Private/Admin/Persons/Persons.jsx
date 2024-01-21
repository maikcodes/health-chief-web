import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead } from '@components/Tables'
import { ButtonPrimary } from '@components/Buttons'
import { DisabledText, PanelTitle } from '@components/Texts'
import { Modal } from '@components/Dialogs'
import { PersonServices } from '@services/Person'
import { SearchInput, TextInput } from '@components/Inputs'

import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function Persons () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data, error, loading } = UseFetch({ fetchFunction: PersonServices.getAll, page, limit })
  const [person, setPerson] = useState({})
  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const properties = [
    'idCard',
    'names',
    'lastNames',
    'occupation',
    'maritalStatus',
    'nationality',
    'sex',
    'phoneNumber',
    'location',
    'birthDate'
  ]

  const handleEmptyModal = (modalOpenHandler) => {
    setPerson({
      id: '',
      idCard: '6301142207',
      names: 'willy maykros',
      lastNames: 'romero naula',
      occupation: 'software engineer',
      maritalStatus: 'S',
      nationality: 'ECU',
      sex: 'M',
      phoneNumber: '0911146600',
      location: 'Mars',
      birthDate: '1999-12-24',
      createdAt: '',
      updatedAt: ''
    })
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const persons = data.data
    const filteredUser = persons.filter((_user) => _user.id === id)[0]
    setPerson(filteredUser)
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
    PersonServices.update('2aceee46-8f35-4e0c-ba51-47c6381156b0', {
      idCard: '6301142207',
      names: 'edited again',
      lastNames: 'romero naula',
      occupation: 'software engineer',
      maritalStatus: 'S',
      nationality: 'ECU',
      sex: 'M',
      phoneNumber: '0911146600',
      location: 'Mars',
      birthDate: '1999-12-24'
    })

    const data = await PersonServices.get('2aceee46-8f35-4e0c-ba51-47c6381156b0')
    console.log(data)
  }

  const handleDelete = () => {
    PersonServices.delete('50f206fe-7d6a-414f-a38f-378bed8522a0')
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
              <td className='px-4 py-2 text-center'>id</td>
              <th className='px-4 py-2 w-72'>id card</th>
              <th className='px-4 py-2 w-72'>name</th>
              <th className='px-4 py-2'>phone</th>
              <th className='px-4 py-2 text-center'>settings</th>
            </TableHead>
            <TableBody>
              {data.data?.map((person) => (
                <tr
                  key={person.id}
                  className='lg:hover:bg-gray-300'
                >
                  <td className='px-4 py-2 font-bold text-center'>{person.id}</td>
                  <td className='px-4 py-2 font-bold text-center'>{person.idCard}</td>
                  <td className='px-4 py-2 capitalize flex w-72 md:w-62 flex-row items-center gap-x-2'>
                    <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-biscay-600'>
                      <img src={person.image} alt={`${person.names} ${person.lastNames}`} />
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
                  <td className='px-4 py-2'>{person.phoneNumber}</td>
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
        title='User Details'
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
            <div className='grid grid-cols-2 gap-4'>
              {properties.map(property => (
                <TextInput
                  key={property}
                  name={property}
                  id={property}
                  value={person[property]}
                  handleDataChange={handleDataChange}
                  placeholder={`Insert ${property}`}
                />
              ))}
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
                  <TextInput
                    name='names'
                    id='names'
                    value={person.names}
                    handleDataChange={handleDataChange}
                    placeholder='Insert first names'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='email' className='font-bold'>Email:</label>
                  <TextInput
                    name='email'
                    id='email'
                    value={person.email}
                    handleDataChange={handleDataChange}
                    placeholder='Insert email'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                  <label htmlFor='lastNames' className='font-bold'>Last names:</label>
                  <TextInput
                    name='lastNames'
                    id='lastNames'
                    value={person.lastNames}
                    handleDataChange={handleDataChange}
                    placeholder='Insert last names'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='phone' className='font-bold'>Phone:</label>
                  <TextInput
                    name='phone'
                    id='phone'
                    value={person.phone}
                    handleDataChange={handleDataChange}
                    placeholder='Insert phone'
                  />
                </div>
              </div>
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

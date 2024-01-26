import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { PanelTitle } from '@components/Texts'
import { FormInputDate, FormInputText, FormTextArea, FormInputSelect, DisabledFormInput } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'

import { GOHServices } from '@services/GOH'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function GOH () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data, error, loading } = UseFetch({ fetchFunction: GOHServices.getAll, page, limit })
  const [goh, setGoh] = useState({
    id: '',
    menarche: '',
    lastMenstruationDate: '',
    menstrualCycle: '',
    menstrualCycleDuration: '',
    dysmenorrhea: '',
    pregnanciesCount: '',
    abortionsCount: '',
    cesareansCount: '',
    normalDeliveriesCount: '',
    liveChildren: '',
    contraceptiveMethod: '',
    sexualDebutAge: '',
    sexualPartnersCount: ''
  })
  const [search, setSearch] = useState('')

  const createModal = useModal()
  const viewModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()

  const handleEmptyModal = (modalOpenHandler) => {
    setGoh({})
    modalOpenHandler()
  }

  const handleOpenModal = (modalOpenHandler, id) => {
    const persons = data.data
    const filteredPerson = persons.find((element) => element.id === id)
    setGoh(filteredPerson)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setGoh({ ...goh, [name]: value })
  }

  const handleCreate = () => {
    GOHServices.create(goh)
  }

  const handleEdit = async () => {
    GOHServices.update(goh.id, { goh })
  }

  const handleDelete = () => {
    GOHServices.delete(goh.id)
  }

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
  }

  return (
    <AdminLayout>
      <div className='flex flex-col gap-y-2 h-full w-full'>

        <div className='flex flex-col gap-y-2'>
          <PanelTitle text='Gynecological Obstetrical Histories' />

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
              <TableHeader>last menstruation date</TableHeader>
              <TableHeader>settings</TableHeader>
            </TableHead>
            <TableBody>
              {
                data.data
                  ?.filter(item => item.id.toLowerCase().includes(search.toLowerCase()))
                  ?.map((_goh) => (
                    <tr
                      key={_goh.id}
                      className='lg:hover:bg-gray-300'
                    >
                      <td className='px-4 py-2 text-center'>{_goh.id}</td>
                      <td className='px-4 py-2 text-center'>{_goh.lastMenstruationDate}</td>
                      <td className='px-4 py-2'>
                        <div className='flex flex-row items-center justify-center gap-x-4'>
                          <RowOptions
                            onViewCLick={() => handleOpenModal(viewModal.handleOpen, _goh.id)}
                            onEditClick={() => handleOpenModal(editModal.handleOpen, _goh.id)}
                            onDeleteClick={() => handleOpenModal(deleteModal.handleOpen, _goh.id)}
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
        title='Gynecological Obstetrical History Details'
        actionTitle='Accept'
        isOpen={viewModal.isOpen}
        onClose={viewModal.handleClose}
      >
        <div className='flex flex-col gap-y-2 p-4'>

          <DisabledFormInput
            title='ID Gynecological Obstetrical History'
            value={goh.id}
          />

          <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

            <DisabledFormInput
              title='Menarche'
              value={goh.menarche}
            />

            <DisabledFormInput
              title='Last Menstruation Date'
              value={goh.lastMenstruationDate}
            />

            <DisabledFormInput
              title='Menstruation Cycle'
              value={goh.menstrualCycle}
            />

            <DisabledFormInput
              title='Menstruation Cycle Duration'
              value={goh.menstrualCycleDuration}
            />

            <DisabledFormInput
              title='Dysmenorrhea'
              value={goh.dysmenorrhea ? 'YES' : 'NO'}
            />

            <DisabledFormInput
              title='Pregnancies Count'
              value={goh.pregnanciesCount}
            />

            <DisabledFormInput
              title='Abortions Count'
              value={goh.abortionsCount}
            />

            <DisabledFormInput
              title='Cesareans Count'
              value={goh.cesareansCount}
            />

            <DisabledFormInput
              title='Normal Deliveries Count'
              value={goh.normalDeliveriesCount}
            />

            <DisabledFormInput
              title='Live Children'
              value={goh.liveChildren}
            />

            <DisabledFormInput
              title='Sexual Debut Age'
              value={goh.sexualDebutAge ?? 'No'}
            />

            <DisabledFormInput
              title='Sexual Partners Count'
              value={goh.sexualPartnersCount}
            />

            <div className='col-span-2'>

              <FormTextArea
                title='Conceptive Method'
                value={goh.contraceptiveMethod}
                isDisabled
              />

            </div>

          </div>
        </div>
      </Modal>

      <Modal
        title='Create Gynecological Obstetrical History'
        actionTitle='Save'
        isOpen={createModal.isOpen}
        action={handleCreate}
        onClose={createModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>
            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

              <FormInputDate
                title='Menarche'
                value={goh.menarche}
                handleDataChange={handleDataChange}
              />

              <FormInputDate
                title='Last Menstruation Date'
                value={goh.lastMenstruationDate}
                handleDataChange={handleDataChange}
              />

              <FormInputSelect
                title='Menstruation Cycle'
                value={goh.menstrualCycle}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'Regular', value: 'R' },
                  { option: 'Irregular', value: 'I' }
                ]}
              />

              <FormInputText
                title='Menstruation Cycle Duration'
                value={goh.menstrualCycleDuration}
                handleDataChange={handleDataChange}
              />

              <FormInputSelect
                title='Dysmenorrhea'
                value={goh.dysmenorrhea}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'YES', value: true },
                  { option: 'NO', value: false }
                ]}
              />

              <FormInputText
                title='Pregnancies Count'
                value={goh.pregnanciesCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Abortions Count'
                value={goh.abortionsCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Cesareans Count'
                value={goh.cesareansCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Normal Deliveries Count'
                value={goh.normalDeliveriesCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Live Children'
                value={goh.liveChildren}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Sexual Debut Age'
                value={goh.sexualDebutAge}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Sexual Partners Count'
                value={goh.sexualPartnersCount}
                handleDataChange={handleDataChange}
              />

              <div className='col-span-2'>

                <FormTextArea
                  title='Conceptive Method'
                  value={goh.contraceptiveMethod}
                  handleDataChange={handleDataChange}
                />

              </div>

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Edit Gynecological Obstetrical History'
        actionTitle='Save changes'
        isOpen={editModal.isOpen}
        action={handleEdit}
        onClose={editModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <FormInputText
              title='ID Gynecological Obstetrical History'
              value={goh.id}
              handleDataChange={handleDataChange}
            />

            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

              <FormInputDate
                title='Menarche'
                value={goh.menarche}
                handleDataChange={handleDataChange}
              />

              <FormInputDate
                title='Last Menstruation Date'
                value={goh.lastMenstruationDate}
                handleDataChange={handleDataChange}
              />

              <FormInputSelect
                title='Menstruation Cycle'
                value={goh.menstrualCycle}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'Regular', value: 'R' },
                  { option: 'Irregular', value: 'I' }
                ]}
              />

              <FormInputText
                title='Menstruation Cycle Duration'
                value={goh.menstrualCycleDuration}
                handleDataChange={handleDataChange}
              />

              <FormInputSelect
                title='Dysmenorrhea'
                value={goh.dysmenorrhea}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'YES', value: true },
                  { option: 'NO', value: false }
                ]}
              />

              <FormInputText
                title='Pregnancies Count'
                value={goh.pregnanciesCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Abortions Count'
                value={goh.abortionsCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Cesareans Count'
                value={goh.cesareansCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Normal Deliveries Count'
                value={goh.normalDeliveriesCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Live Children'
                value={goh.liveChildren}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Sexual Debut Age'
                value={goh.sexualDebutAge}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                title='Sexual Partners Count'
                value={goh.sexualPartnersCount}
                handleDataChange={handleDataChange}
              />

              <div className='col-span-2'>

                <FormTextArea
                  title='Conceptive Method'
                  value={goh.contraceptiveMethod}
                  handleDataChange={handleDataChange}
                />

              </div>

            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title='Delete Gynecological Obstetrical History'
        actionTitle='Delete'
        action={handleDelete}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.handleClose}
      >
        <form action=''>
          <div className='flex flex-col gap-y-2 p-4'>

            <DisabledFormInput
              title='ID Gynecological Obstetrical History'
              value={goh.id}
            />

            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

              <DisabledFormInput
                title='Menarche'
                value={goh.menarche}
              />

              <DisabledFormInput
                title='Last Menstruation Date'
                value={goh.lastMenstruationDate}
              />

              <DisabledFormInput
                title='Menstruation Cycle'
                value={goh.menstrualCycle}
              />

              <DisabledFormInput
                title='Menstruation Cycle Duration'
                value={goh.menstrualCycleDuration}
              />

              <DisabledFormInput
                title='Dysmenorrhea'
                value={goh.dysmenorrhea ? 'YES' : 'NO'}
              />

              <DisabledFormInput
                title='Pregnancies Count'
                value={goh.pregnanciesCount}
              />

              <DisabledFormInput
                title='Abortions Count'
                value={goh.abortionsCount}
              />

              <DisabledFormInput
                title='Cesareans Count'
                value={goh.cesareansCount}
              />

              <DisabledFormInput
                title='Normal Deliveries Count'
                value={goh.normalDeliveriesCount}
              />

              <DisabledFormInput
                title='Live Children'
                value={goh.liveChildren}
              />

              <DisabledFormInput
                title='Sexual Debut Age'
                value={goh.sexualDebutAge ?? 'No'}
              />

              <DisabledFormInput
                title='Sexual Partners Count'
                value={goh.sexualPartnersCount}
              />

              <div className='col-span-2'>

                <FormTextArea
                  title='Conceptive Method'
                  value={goh.contraceptiveMethod}
                  isDisabled
                />

              </div>

            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}

export default GOH

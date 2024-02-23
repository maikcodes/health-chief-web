import { AdminLayout } from '@components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead, TableHeader } from '@components/Tables/AdminTable'
import { ButtonPrimary } from '@components/Buttons'
import { Error } from '@components/Errors'
import { PanelTitle } from '@components/Texts'
import { FormInputDate, FormInputText, FormTextArea, FormInputSelect, DisabledFormInput, DisabledFormTextCopy } from '@components/Forms'
import { Modal } from '@components/Dialogs'
import { SearchInput } from '@components/Inputs'
import { Spinner } from '@components/Spinners'

import { GOHServices } from '@services/GOH'
import { UseFetch, useModal, UsePagination } from '@hooks'
import { useState } from 'react'

function GOH () {
  const { page, limit, handleLimitChange, handlePageChange } = UsePagination()
  const { data: fetchedGOH, error, loading, reloadData } = UseFetch({ fetchFunction: GOHServices.getAll, page, limit })
  const [goh, setGoh] = useState({
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
    const gohData = fetchedGOH.data
    const filteredGOH = gohData.find((element) => element.id === id)
    setGoh(filteredGOH)
    modalOpenHandler()
  }

  const handleDataChange = (event) => {
    const { name, value } = event.target
    setGoh({ ...goh, [name]: value })
  }

  const handleCreate = async () => {
    await GOHServices.create(goh)
    createModal.handleClose()
    reloadData()
  }

  const handleEdit = async () => {
    await GOHServices.update(goh.id, goh)
    editModal.handleClose()
    reloadData()
  }

  const handleDelete = async () => {
    await GOHServices.delete(goh.id)
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
          <PanelTitle text='Gynecological Obstetrical Histories' />

          <form
            className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'
            onSubmit={(event) => { event.preventDefault() }}
          >
            <SearchInput placeholder='Search gynecological obstetric histories' handleChange={handleSearch} />
            <ButtonPrimary text='New' onClick={() => handleEmptyModal(createModal.handleOpen)} />
          </form>
        </div>

        {error && <Error />}
        {loading && <Spinner />}

        {!error && !loading && fetchedGOH && (
          <AdminTable pagination={{
            handlePageChange,
            handleLimitChange,
            page: fetchedGOH.page,
            totalPages: fetchedGOH.totalPages,
            results: fetchedGOH.results,
            totalResults: fetchedGOH.totalResults,
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
                fetchedGOH.data
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

          <DisabledFormTextCopy
            id='id'
            name='id'
            title='Gynecological Obstetrical History ID'
            value={goh.id}
          />

          <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

            <DisabledFormInput
              id='menarche'
              name='menarche'
              title='Menarche'
              value={goh.menarche}
            />

            <DisabledFormInput
              id='lastMenstruationDate'
              name='lastMenstruationDate'
              title='Last Menstruation Date'
              value={goh.lastMenstruationDate}
            />

            <DisabledFormInput
              id='menstrualCycle'
              name='menstrualCycle'
              title='Menstruation Cycle'
              value={goh.menstrualCycle}
            />

            <DisabledFormInput
              id='menstrualCycleDuration'
              name='menstrualCycleDuration'
              title='Menstruation Cycle Duration'
              value={goh.menstrualCycleDuration}
            />

            <DisabledFormInput
              id='dysmenorrhea'
              name='dysmenorrhea'
              title='Dysmenorrhea'
              value={goh.dysmenorrhea ? 'YES' : 'NO'}
            />

            <DisabledFormInput
              id='pregnanciesCount'
              name='pregnanciesCount'
              title='Pregnancies Count'
              value={goh.pregnanciesCount}
            />

            <DisabledFormInput
              id='abortionsCount'
              name='abortionsCount'
              title='Abortions Count'
              value={goh.abortionsCount}
            />

            <DisabledFormInput
              id='cesareansCount'
              name='cesareansCount'
              title='Cesareans Count'
              value={goh.cesareansCount}
            />

            <DisabledFormInput
              id='normalDeliveriesCount'
              name='normalDeliveriesCount'
              title='Normal Deliveries Count'
              value={goh.normalDeliveriesCount}
            />

            <DisabledFormInput
              id='liveChildren'
              name='liveChildren'
              title='Live Children'
              value={goh.liveChildren}
            />

            <DisabledFormInput
              id='sexualDebutAge'
              name='sexualDebutAge'
              title='Sexual Debut Age'
              value={goh.sexualDebutAge ?? 'No'}
            />

            <DisabledFormInput
              id='sexualPartnersCount'
              name='sexualPartnersCount'
              title='Sexual Partners Count'
              value={goh.sexualPartnersCount}
            />

            <div className='col-span-2'>

              <FormTextArea
                id='contraceptiveMethod'
                name='contraceptiveMethod'
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
            <FormInputText
              id='id'
              name='id'
              title='Gynecological Obstetrical History ID'
              value={goh.id}
              handleDataChange={handleDataChange}
            />
            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

              <FormInputDate
                id='menarche'
                name='menarche'
                title='Menarche'
                value={goh.menarche}
                handleDataChange={handleDataChange}
              />

              <FormInputDate
                id='lastMenstruationDate'
                name='lastMenstruationDate'
                title='Last Menstruation Date'
                value={goh.lastMenstruationDate}
                handleDataChange={handleDataChange}
              />

              <FormInputSelect
                id='menstrualCycle'
                name='menstrualCycle'
                title='Menstruation Cycle'
                value={goh.menstrualCycle}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'Regular', value: 'R' },
                  { option: 'Irregular', value: 'I' }
                ]}
              />

              <FormInputText
                id='menstrualCycleDuration'
                name='menstrualCycleDuration'
                title='Menstruation Cycle Duration'
                value={goh.menstrualCycleDuration}
                handleDataChange={handleDataChange}
              />

              <FormInputSelect
                id='dysmenorrhea'
                name='dysmenorrhea'
                title='Dysmenorrhea'
                value={goh.dysmenorrhea}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'YES', value: true },
                  { option: 'NO', value: false }
                ]}
              />

              <FormInputText
                id='pregnanciesCount'
                name='pregnanciesCount'
                title='Pregnancies Count'
                value={goh.pregnanciesCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='abortionsCount'
                name='abortionsCount'
                title='Abortions Count'
                value={goh.abortionsCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='cesareansCount'
                name='cesareansCount'
                title='Cesareans Count'
                value={goh.cesareansCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='normalDeliveriesCount'
                name='normalDeliveriesCount'
                title='Normal Deliveries Count'
                value={goh.normalDeliveriesCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='liveChildren'
                name='liveChildren'
                title='Live Children'
                value={goh.liveChildren}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='sexualDebutAge'
                name='sexualDebutAge'
                title='Sexual Debut Age'
                value={goh.sexualDebutAge}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='sexualPartnersCount'
                name='sexualPartnersCount'
                title='Sexual Partners Count'
                value={goh.sexualPartnersCount}
                handleDataChange={handleDataChange}
              />

              <div className='col-span-2'>

                <FormTextArea
                  id='contraceptiveMethod'
                  name='contraceptiveMethod'
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

            <DisabledFormTextCopy
              id='id'
              name='id'
              title='Gynecological Obstetrical History ID'
              value={goh.id}
            />

            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

              <FormInputDate
                id='menarche'
                name='menarche'
                title='Menarche'
                value={goh.menarche}
                handleDataChange={handleDataChange}
              />

              <FormInputDate
                id='lastMenstruationDate'
                name='lastMenstruationDate'
                title='Last Menstruation Date'
                value={goh.lastMenstruationDate}
                handleDataChange={handleDataChange}
              />

              <FormInputSelect
                id='menstrualCycle'
                name='menstrualCycle'
                title='Menstruation Cycle'
                value={goh.menstrualCycle}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'Regular', value: 'R' },
                  { option: 'Irregular', value: 'I' }
                ]}
              />

              <FormInputText
                id='menstrualCycleDuration'
                name='menstrualCycleDuration'
                title='Menstruation Cycle Duration'
                value={goh.menstrualCycleDuration}
                handleDataChange={handleDataChange}
              />

              <FormInputSelect
                id='dysmenorrhea'
                name='dysmenorrhea'
                title='Dysmenorrhea'
                value={goh.dysmenorrhea}
                handleDataChange={handleDataChange}
                options={[
                  { option: 'YES', value: true },
                  { option: 'NO', value: false }
                ]}
              />

              <FormInputText
                id='pregnanciesCount'
                name='pregnanciesCount'
                title='Pregnancies Count'
                value={goh.pregnanciesCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='abortionsCount'
                name='abortionsCount'
                title='Abortions Count'
                value={goh.abortionsCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='cesareansCount'
                name='cesareansCount'
                title='Cesareans Count'
                value={goh.cesareansCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='normalDeliveriesCount'
                name='normalDeliveriesCount'
                title='Normal Deliveries Count'
                value={goh.normalDeliveriesCount}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='liveChildren'
                name='liveChildren'
                title='Live Children'
                value={goh.liveChildren}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='sexualDebutAge'
                name='sexualDebutAge'
                title='Sexual Debut Age'
                value={goh.sexualDebutAge}
                handleDataChange={handleDataChange}
              />

              <FormInputText
                id='sexualPartnersCount'
                name='sexualPartnersCount'
                title='Sexual Partners Count'
                value={goh.sexualPartnersCount}
                handleDataChange={handleDataChange}
              />

              <div className='col-span-2'>

                <FormTextArea
                  id='contraceptiveMethod'
                  name='contraceptiveMethod'
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

            <DisabledFormTextCopy
              id='id'
              name='id'
              title='Gynecological Obstetrical History ID'
              value={goh.id}
            />

            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-3'>

              <DisabledFormInput
                id='menarche'
                name='menarche'
                title='Menarche'
                value={goh.menarche}
              />

              <DisabledFormInput
                id='lastMenstruationDate'
                name='lastMenstruationDate'
                title='Last Menstruation Date'
                value={goh.lastMenstruationDate}
              />

              <DisabledFormInput
                id='menstrualCycle'
                name='menstrualCycle'
                title='Menstruation Cycle'
                value={goh.menstrualCycle}
              />

              <DisabledFormInput
                id='menstrualCycleDuration'
                name='menstrualCycleDuration'
                title='Menstruation Cycle Duration'
                value={goh.menstrualCycleDuration}
              />

              <DisabledFormInput
                id='dysmenorrhea'
                name='dysmenorrhea'
                title='Dysmenorrhea'
                value={goh.dysmenorrhea ? 'YES' : 'NO'}
              />

              <DisabledFormInput
                id='pregnanciesCount'
                name='pregnanciesCount'
                title='Pregnancies Count'
                value={goh.pregnanciesCount}
              />

              <DisabledFormInput
                id='abortionsCount'
                name='abortionsCount'
                title='Abortions Count'
                value={goh.abortionsCount}
              />

              <DisabledFormInput
                id='cesareansCount'
                name='cesareansCount'
                title='Cesareans Count'
                value={goh.cesareansCount}
              />

              <DisabledFormInput
                id='normalDeliveriesCount'
                name='normalDeliveriesCount'
                title='Normal Deliveries Count'
                value={goh.normalDeliveriesCount}
              />

              <DisabledFormInput
                id='liveChildren'
                name='liveChildren'
                title='Live Children'
                value={goh.liveChildren}
              />

              <DisabledFormInput
                id='sexualDebutAge'
                name='sexualDebutAge'
                title='Sexual Debut Age'
                value={goh.sexualDebutAge ?? 'No'}
              />

              <DisabledFormInput
                id='sexualPartnersCount'
                name='sexualPartnersCount'
                title='Sexual Partners Count'
                value={goh.sexualPartnersCount}
              />

              <div className='col-span-2'>

                <FormTextArea
                  id='conceptiveMethod'
                  name='conceptiveMethod'
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

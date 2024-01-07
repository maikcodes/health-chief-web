import { AdminLayout } from '../../../../components/Layouts'
import { AdminTable, RowOptions, TableBody, TableHead } from '../../../../components/Tables'
import { ButtonPrimary } from '../../../../components/Buttons'
import { PanelTitle } from '../../../../components/Texts'
import { SearchInput } from '../../../../components/Inputs'
import { UserServices } from '../../../../services/UserServices/UserServices'

import useFetch from '../../../../hooks/UseFetch'
import usePagination from '../../../../hooks/UsePagination'

function Users () {
  const { page, limit, handleLimitChange, handlePageChange } = usePagination()
  const { data, error, loading } = useFetch({ fetchFunction: UserServices.getAll, page, limit })

  return (
    <AdminLayout>
      <div className='flex flex-col gap-y-2 h-full w-full'>

        <div className='flex flex-col gap-y-2'>
          <PanelTitle text='Users' />

          <div className='flex flex-col gap-y-2 md:flex-row lg:justify-between lg:items-center'>
            <SearchInput placeholder='Search users' />
            <ButtonPrimary text='New' onClick={() => { }} />
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
              <th className='px-4 py-2 w-72'>name</th>
              <th className='px-4 py-2'>email</th>
              <th className='px-4 py-2'>phone</th>
              <th className='px-4 py-2 text-center'>settings</th>
            </TableHead>
            <TableBody>
              {data.data?.map((user) => (
                <tr
                  key={user.id}
                  className='lg:hover:bg-gray-300'
                >
                  <td className='px-4 py-2 font-bold text-center'>{user.id}</td>
                  <td className='px-4 py-2 capitalize flex w-72 md:w-62 flex-row items-center gap-x-2'>
                    <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-biscay-600'>
                      <img src={user.image} alt={`${user.firstNames} ${user.lastNames}`} />
                    </div>
                    <div className='flex flex-col'>
                      <p className='font-bold'>
                        {user.firstNames}
                      </p>
                      <p className='font-bold'>
                        {user.lastNames}
                      </p>
                    </div>
                  </td>
                  <td className='px-4 py-2'>{user.email}</td>
                  <td className='px-4 py-2'>{user.phone}</td>
                  <td className='px-4 py-2'>
                    <div className='flex flex-row items-center justify-center gap-x-4'>
                      <RowOptions />
                    </div>
                  </td>
                </tr>
              ))}
            </TableBody>
          </AdminTable>
        )}
      </div>
    </AdminLayout>
  )
}

export default Users

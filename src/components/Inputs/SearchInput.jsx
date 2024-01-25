import { IoSearch } from 'react-icons/io5'

function SearchInput ({ placeholder, handleChange }) {
  return (
    <div className='relative items-center justify-between'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <IoSearch />
      </div>
      <input
        className='flex w-full p-2 pl-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg md:w-80 bg-gray-200 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-biscay-700'
        id='table-search-users'
        onChange={handleChange}
        placeholder={placeholder}
        type='text'
      />
    </div>
  )
}

export default SearchInput

function SearchInput ({ name, id, value, handleDataChange, placeholder }) {
  return (
    <input
      className='px-2 py-1 border-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-biscay-700'
      type='text'
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={handleDataChange}
    />
  )
}

export default SearchInput

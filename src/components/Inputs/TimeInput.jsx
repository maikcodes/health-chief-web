function TimeInput ({ name, id, value, handleDataChange }) {
  return (
    <input
      className='px-2 py-1 border-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-biscay-700'
      type='time'
      name={name}
      id={id}
      value={value}
      onChange={handleDataChange}
    />
  )
}

export default TimeInput

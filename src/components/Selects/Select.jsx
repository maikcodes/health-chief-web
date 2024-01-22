function Select ({ options, name, id, value, handleDataChange }) {
  return (
    <select
      name={name}
      id={id}
      value={value}
      onChange={handleDataChange}
      className='px-2 py-1 border-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-biscay-700'
    >
      <option hidden>Select an Option</option>
      {options.map((option) => (
        <option
          key={option.option}
          className='capitalize'
          value={option.value}
        >
          {option.option}
        </option>)
      )}
    </select>
  )
}

export default Select

function TextArea ({ name, id, value, handleDataChange, placeholder, isDisabled }) {
  if (isDisabled) {
    return (
      <textarea
        className='px-2 py-1 border-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-biscay-700 cursor-not-allowed'
        rows={4}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={handleDataChange}
        value={value}
        readOnly
      />
    )
  }

  return (
    <textarea
      className='px-2 py-1 border-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-biscay-700'
      rows={4}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={handleDataChange}
      value={value}
    />
  )
}

export default TextArea

function DisabledText ({ text }) {
  return (
    <p className=''>
      <span className='flex px-2 py-1 border-2 border-gray-300 bg-gray-100 rounded-lg lg:hover:cursor-not-allowed'>{text}</span>
    </p>
  )
}

export default DisabledText

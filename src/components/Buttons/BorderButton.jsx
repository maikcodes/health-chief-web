function BorderButton ({ icon, text, onClick }) {
  const renderSpan = () => (
    <span className='text-gray-500 font-bold lg:text-lg px-4'>
      {text}
    </span>
  )
  const renderIcon = () => (
    <div className='flex h-4 w-4 md:w-6 nd:h-6'>
      {icon}
    </div>
  )

  return (
    <button
      type='button'
      onClick={onClick}
      className='flex flex-row items-center justify-center w-full md:w-auto border-2 border-gray-400 rounded-lg lg:hover:bg-gray-300 px-4 h-10 capitalize'
    >
      {icon ? renderIcon() : null}
      {text ? renderSpan() : null}
    </button>
  )
}

export default BorderButton

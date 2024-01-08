function ButtonSecondary ({ icon, text, onClick }) {
  const renderSpan = () => (
    <span className='text-white font-bold lg:text-lg px-4'>
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
      className='flex flex-row items-center justify-center w-full md:w-auto bg-gray-500 rounded-lg lg:hover:bg-gray-400 px-4 h-10 capitalize'
    >
      {icon ? renderIcon() : null}
      {text ? renderSpan() : null}
    </button>
  )
}

export default ButtonSecondary

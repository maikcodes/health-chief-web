function AdminTable ({ tHead, children }) {
  return (
    <div className='bg-yellow-100 overflow-y-auto max-h-[400px] shadow-md rounded-lg border-solid border-2 border-indigo-600 no-scrollbar'>
      <table className='w-full'>
        <thead className='bg-indigo-600 md:text-lg uppercase my-2 text-white sticky top-0  text-left'>
          {tHead}
        </thead>

        <tbody className='bg-gray-300'>
          {children}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable

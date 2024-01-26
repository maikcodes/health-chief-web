import { CgClose } from 'react-icons/cg'
import { BorderButton, ButtonPrimary } from '../Buttons'

function Modal ({ title, actionTitle, isOpen, onClose, action, children }) {
  if (isOpen) {
    return (
      <div className='bg-gray-600 bg-opacity-80 fixed overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full'>
        <div className='relative p-4 w-full lg:max-w-[70vw] max-h-full'>
          <div className='relative bg-white rounded-lg shadow-lg shadow-gray-700'>

            <div className='flex items-center justify-between p-4 rounded-t-lg border-b border-gray-300 bg-biscay-700 text-white'>
              <h3 className='font-bold text-xl'>{title}</h3>
              <button onClick={onClose} className='lg:hover:bg-biscay-400 p-1 rounded'>
                <CgClose size={20} />
              </button>
            </div>

            <div className='p-4 lg:overflow-y-scroll lg:max-h-[60vh]'>
              {children}
            </div>

            <div className='flex flex-col gap-2 lg:flex-row lg:items-center p-4 border-t border-gray-300'>
              <ButtonPrimary text={actionTitle} onClick={action} />
              <BorderButton text='Cancel' onClick={onClose} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal

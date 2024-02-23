import { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

function CopyToClipboardText ({ text }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboardText = async (text) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  const handleCopyText = async (event) => {
    event.preventDefault()
    await copyToClipboardText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

  const renderCopy = () => {
    if (isCopied) return <><FiCheck className='text-green-700' /></>

    return (
      <button onClick={handleCopyText}>
        <FiCopy className='text-slate-500' />
      </button>
    )
  }

  return (
    <div className='flex flex-row justify-between gap-2 px-4 py-1 border-2 border-gray-300 bg-gray-100 rounded-lg'>
      <p>
        {text}
      </p>
      <span className='flex items-center justify-center text-lg' onClick={handleCopyText}>
        {renderCopy()}
      </span>

      {/* TODO: tooltip */}
    </div>
  )
}

export default CopyToClipboardText

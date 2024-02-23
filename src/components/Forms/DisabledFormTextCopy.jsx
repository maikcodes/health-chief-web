import { CopyToClipboardText } from '@components/Texts'

function DisabledFormTextCopy ({ value, title }) {
  return (
    <div className='flex flex-col'>
      <label className='font-bold'>{title}:</label>
      <CopyToClipboardText
        text={value}
      />
    </div>
  )
}

export default DisabledFormTextCopy

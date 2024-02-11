import { DisabledText } from '@components/Texts'

function DisabledFormInput ({ value, title }) {
  return (
    <div className='flex flex-col'>
      <label className='font-bold'>{title}:</label>
      <DisabledText
        text={value}
      />
    </div>
  )
}

export default DisabledFormInput

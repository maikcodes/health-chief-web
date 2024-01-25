import { DisabledText } from '@components/Texts'
import { toCamelCase } from '@services/DataFormatters'

function DisabledFormInput ({ value, title }) {
  const elementName = toCamelCase(title)

  return (
    <div className='flex flex-col'>
      <label className='font-bold' htmlFor={elementName}>{title}:</label>
      <DisabledText
        text={value}
      />
    </div>
  )
}

export default DisabledFormInput

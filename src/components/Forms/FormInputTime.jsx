import { TimeInput } from '@components/Inputs'
import { toCamelCase } from '@services/DataFormatters'

function FormInputTime ({ value, title, handleDataChange }) {
  const elementName = toCamelCase(title)

  return (
    <div className='flex flex-col'>
      <label className='font-bold'>{title}:</label>
      <TimeInput
        name={elementName}
        id={elementName}
        value={value}
        handleDataChange={handleDataChange}
      />
    </div>
  )
}

export default FormInputTime

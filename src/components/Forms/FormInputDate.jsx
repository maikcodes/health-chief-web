import { DateInput } from '@components/Inputs'
import { toCamelCase } from '@services/DataFormatters'

function FormInputDate ({ value, title, handleDataChange }) {
  const elementName = toCamelCase(title)

  return (
    <div className='flex flex-col'>
      <label className='font-bold' htmlFor={elementName}>{title}:</label>
      <DateInput
        name={elementName}
        id={elementName}
        value={value}
        handleDataChange={handleDataChange}
      />
    </div>
  )
}

export default FormInputDate

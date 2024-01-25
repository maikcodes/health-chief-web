import { TextInput } from '@components/Inputs'
import { toCamelCase } from '@services/DataFormatters'

function FormInputText ({ value, title, handleDataChange }) {
  const elementName = toCamelCase(title)

  return (
    <div className='flex flex-col'>
      <label className='font-bold' htmlFor={elementName}>{title}:</label>
      <TextInput
        name={elementName}
        id={elementName}
        value={value}
        handleDataChange={handleDataChange}
        placeholder={`Insert ${title}`}
      />
    </div>
  )
}

export default FormInputText

import { Select } from '@components/Selects'
import { toCamelCase } from '@services/DataFormatters'

function FormInputSelect ({ value, title, handleDataChange, options }) {
  const elementName = toCamelCase(title)
  return (
    <div className='flex flex-col'>
      <label className='font-bold' htmlFor={elementName}>{title}:</label>
      <Select
        name={elementName}
        id={elementName}
        value={value}
        options={options}
        handleDataChange={handleDataChange}
      />
    </div>
  )
}

export default FormInputSelect

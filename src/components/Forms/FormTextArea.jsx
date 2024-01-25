import { TextArea } from '@components/Inputs'
import { toCamelCase } from '@services/DataFormatters'

function FormTextArea ({ value, title, handleDataChange, isDisabled }) {
  const elementName = toCamelCase(title)

  return (
    <div className='flex flex-col'>
      <label className='font-bold' htmlFor={elementName}>{title}:</label>
      <TextArea
        name={elementName}
        id={elementName}
        value={value}
        handleDataChange={handleDataChange ?? null}
        placeholder={`Insert ${title}`}
        isDisabled={isDisabled ?? false}
      />
    </div>
  )
}

export default FormTextArea

import { TextInput } from '@components/Inputs'

function FormInputText ({ id, name, title, value, handleDataChange }) {
  return (
    <div className='flex flex-col'>
      <label className='font-bold' htmlFor={name}>{title}:</label>
      <TextInput
        id={id}
        name={name}
        value={value}
        handleDataChange={handleDataChange}
        placeholder={`Insert ${title}`}
      />
    </div>
  )
}

export default FormInputText

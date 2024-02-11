import { DateInput } from '@components/Inputs'

function FormInputDate ({ id, name, title, value, handleDataChange }) {
  return (
    <div className='flex flex-col'>
      <label className='font-bold' htmlFor={name}>{title}:</label>
      <DateInput
        id={id}
        name={name}
        value={value}
        handleDataChange={handleDataChange}
      />
    </div>
  )
}

export default FormInputDate

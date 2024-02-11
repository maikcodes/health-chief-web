import { TimeInput } from '@components/Inputs'

function FormInputTime ({ id, name, title, value, handleDataChange }) {
  return (
    <div className='flex flex-col'>
      <label className='font-bold' htmlFor={name}>{title}:</label>
      <TimeInput
        id={id}
        name={name}
        value={value}
        handleDataChange={handleDataChange}
      />
    </div>
  )
}

export default FormInputTime

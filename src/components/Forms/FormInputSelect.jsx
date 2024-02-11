import { Select } from '@components/Selects'

function FormInputSelect ({ id, name, title, value, handleDataChange, options }) {
  return (
    <div className='flex flex-col'>
      <label className='font-bold' htmlFor={name}>{title}:</label>
      <Select
        id={id}
        name={name}
        value={value}
        options={options}
        handleDataChange={handleDataChange}
      />
    </div>
  )
}

export default FormInputSelect

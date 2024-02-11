import { TextArea } from '@components/Inputs'

function FormTextArea ({ id, name, title, value, handleDataChange, isDisabled }) {
  return (
    <div className='flex flex-col'>
      <label className='font-bold' htmlFor={name}>{title}:</label>
      <TextArea
        id={id}
        name={name}
        value={value}
        handleDataChange={handleDataChange ?? null}
        placeholder={`Insert ${title}`}
        isDisabled={isDisabled ?? false}
      />
    </div>
  )
}

export default FormTextArea

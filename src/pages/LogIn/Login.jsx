import { useRef, useState } from 'react'
import { FormInputText } from '@components/Forms'
import { ButtonPrimary } from '@components/Buttons'
import useAuth from '@hooks/useAuth'

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const form = useRef()
  const { logIn } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await logIn({ email, password })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  return (
    <main className='m-0 p-0 w-screen h-screen flex justify-center items-center from-indigo-300 via-indigo-600 to bg-indigo-800 bg-gradient-to-b'>
      <div className='flex flex-row gap-8 items-center w-full justify-center'>
        <div className='bg-white rounded-lg shadow-lg shadow-gray-700 p-6 w-[350px]'>
          <form ref={form} action='#' method='post' onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <FormInputText
              title='Email'
              name='email'
              id='email'
              handleDataChange={handleEmailChange}
              value={email}
            />
            <FormInputText
              title='Password'
              name='password'
              id='password'
              handleDataChange={handlePasswordChange}
              value={password}
            />
            <ButtonPrimary text='Login' type='submit' />
          </form>
        </div>

      </div>
    </main>
  )
}

export default Login

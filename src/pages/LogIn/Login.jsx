import { useRef, useState } from 'react'
import { Auth } from '../../services/Auth'
import { useDispatch } from 'react-redux'
import { createUser } from '../../redux/states/user'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '../../models/routes'

function Login () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const form = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      Auth.login({ email, password })
      dispatch(createUser({ email, password }))
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true })
    } catch (error) {

    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  return (
    <section>
      <form ref={form} action='#' method='post' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' id='email' onChange={handleEmailChange} value={email} />
        </div>
        <div>
          <label htmlFor='password'>Password </label>
          <input type='text' name='password' id='password' onChange={handlePasswordChange} value={password} />
        </div>
        <input type='submit' value='Login' />
      </form>
    </section>
  )
}

export default Login

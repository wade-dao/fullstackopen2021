import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { useField } from '../hooks'
import { userLogin } from '../reducers/loginReducer'

import Notification from './Notification'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const username = useField('text')
  const { clearValue: clearValueUsername, ...usernameInput } = username
  const password = useField('text')
  const { clearValue: clearValuePassword, ...passwordInput } = password

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin({
      username: username.value,
      password: password.value
    }))
    clearValueUsername()
    clearValuePassword()
    history.push('/')
  }

  return (
    <div>
      <h2>login to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div className="username">
          username
          <input className="usernameInput" name="username" {...usernameInput} />
        </div>
        <div className="password">
          password
          <input className="passwordInput" name="password" {...passwordInput} />
        </div>
        <button className="loginButton" type="submit">login</button>
      </form>
    </div>
  )
}
export default Login
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" {...usernameInput}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...passwordInput}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}
export default Login
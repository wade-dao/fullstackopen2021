import React, { useState } from 'react'

const Login = ({ show, handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    await handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
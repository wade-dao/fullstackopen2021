import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'

import { LOGIN } from './mutations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)

  const [login] = useMutation(LOGIN)

  useEffect(() => {
    const token = window.localStorage.getItem('library-user-token')
    setUser({
      value: token
    })
  },[])

  const handleLogin = async (username, password) => {
    try {
      const result = await login({ variables: {
        username,
        password
      }})
      console.log(result.data.login.value)
      window.localStorage.setItem('library-user-token', result.data.login.value)
      setUser(result.data.login)
      setPage('authors')
    }
    catch (exception) {
      alert(exception)
    }
  }

  const handleLogout = () => {
    // console.log(window.localStorage.getItem('library-user-token'))
    window.localStorage.removeItem('library-user-token')
    setUser(null)
  }

  return (
    <div className="container">
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user === null
          ? <button onClick={() => setPage('login')}>login</button>
          : <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={handleLogout}>logout</button>
            </>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        handleLogin={handleLogin}
      />
    </div>
  )
}

export default App
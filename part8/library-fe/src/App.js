import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

import { LOGIN } from './mutations'
import { CURRENT_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')

  const [getCurrentUser, userData]  = useLazyQuery(CURRENT_USER)
  // const userData  = useQuery(CURRENT_USER)

  useEffect(() => {
    const existingUser = window.localStorage.getItem('library-user-info')
    if (existingUser)
      setUser(JSON.parse(existingUser))

    const existingToken = window.localStorage.getItem('library-user-token')
    if (existingToken)
      setToken(existingToken)
  },[])

  // const [login] = useMutation(LOGIN, {
  //   refetchQueries: [{ query: CURRENT_USER }],
  //   onError: (error) => {
  //     // setError(error.graphQLErrors[0].message)
  //     console.log(error.graphQLErrors[0].message)
  //   },
  //   update: (store, response) => {
  //     const dataInStore = store.readQuery({ query: CURRENT_USER })
  //     console.log('result in refetch', response.data.me)
  //     store.writeQuery({
  //       query: CURRENT_USER,
  //       data: {
  //         ...dataInStore,
  //         me: response.data.me
  //       }
  //     })
  //   }
  // })

  const [login] = useMutation(LOGIN)

  useEffect(() => {
    if (token !== '' && userData.data) {
      // getCurrentUser()
      window.localStorage.setItem('library-user-info', JSON.stringify(userData.data.me))
      setUser(userData.data.me)
    }
  }, [userData.data])

  const handleLogin = async (username, password) => {
    try {
      console.log('user: ', username)
      const result = await login({ variables: {
        username,
        password
      }})
      window.localStorage.setItem('library-user-token', result.data.login.value)
      getCurrentUser()
      setToken(result.data.login.value)
      setPage('authors')
    }
    catch (exception) {
      alert(exception)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('library-user-token')
    getCurrentUser()
    window.localStorage.removeItem('library-user-info')
    setPage('login')
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
              <button onClick={() => setPage('recommend')}>recommend</button>
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
      {user !== null
        ? <Recommendations
            show={page === 'recommend'}
            genre={user.favoriteGenre}
          />
        : null
      }

      <Login
        show={page === 'login'}
        handleLogin={handleLogin}
      />
    </div>
  )
}

export default App
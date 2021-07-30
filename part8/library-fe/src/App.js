import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useLazyQuery, useSubscription, useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

import { LOGIN } from './graphql/mutations'
import { ALL_BOOKS, CURRENT_USER } from './graphql/queries'
import { BOOK_ADDED } from './graphql/subscriptions'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')
  const client = useApolloClient()

  const [getCurrentUser, userData]  = useLazyQuery(CURRENT_USER, {
    fetchPolicy: "network-only"
  })

  useEffect(() => {
    const existingUser = window.localStorage.getItem('library-user-info')
    if (existingUser)
      setUser(JSON.parse(existingUser))

    const existingToken = window.localStorage.getItem('library-user-token')
    if (existingToken)
      setToken(existingToken)
  },[])

  const [login] = useMutation(LOGIN)

  useEffect(() => {
    if (token !== '' && userData.data && userData.data.me) {
      window.localStorage.setItem('library-user-info', JSON.stringify(userData.data.me))
      setUser(userData.data.me)
    }
  }, [userData.data, token])

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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      alert(addedBook.title, ' added!')
      updateCacheWith(addedBook)
    }
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.title).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
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
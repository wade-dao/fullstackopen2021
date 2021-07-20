import React, { useState, useEffect, useRef } from 'react'
// import { useDispatch } from 'react-redux'
// import { initializeBlogs } from './reducers/blogReducer'

// import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
// import loginService from './services/login'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userInit, userLogout } from './reducers/userReducer'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      dispatch(userInit(loggedUserJSON))
      blogService.setToken(loggedUserJSON.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin({ username, password }))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(userLogout())
    setUsername('')
    setPassword('')
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{loggedInUser.name} logged in <button className="logoutButton" onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
        <BlogList />
      </div>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <h2>login to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div className="username">
            username
            <input className="usernameInput"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="password">
            password
            <input className="passwordInput"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button className="loginButton" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      { loggedInUser === null ? loginForm() : blogList() }
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(async () => {
    const blogList = await blogService.getAll()
    setBlogs(blogList)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({ type: 0, content: 'wrong username or password' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleCreateNew = async (event) => {
    event.preventDefault()
    try {
      const addedBlog = await blogService.createNew({
        title: title,
        author: author,
        url: url
      })
      
      const newBlogs = blogs.concat(addedBlog)
      setBlogs(newBlogs)
      setErrorMessage({ type: 1, content: 'a new blog ' + title + ' by ' + author + ' added' })
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage({ type: 0, content: 'Unauthorized user' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        {errorMessage !== null && toast()}
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

        <h2>create new</h2>
        <form onSubmit={handleCreateNew}>
          <div>
            title:
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
              <input
              type="text"
              value={author}
              name="Password"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
              <input
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
        
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const toast = () => {
    return (
      <Notification message={errorMessage} />
    )
  }

  const loginForm = () => {
    return (
      <div>
        <h2>login to application</h2>
        {errorMessage !== null && toast()}
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      { user === null ? loginForm() : blogList() }
    </div>
  )
}

export default App
import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    async function fetchData() {
      const blogList = await blogService.getAll()
      blogList.sort((a, b) => {
        if (a.likes > b.likes)
          return 1
        if (a.likes < b.likes)
          return -1
        return 0
      })
      setBlogs(blogList)
    }
    fetchData()
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

  const createNewBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.createNew({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      })
      blogFormRef.current.toggleVisibility()
      const newBlogs = blogs.concat(addedBlog)
      setBlogs(newBlogs)
      setErrorMessage({ type: 1, content: 'a new blog ' + newBlog.title + ' by ' + newBlog.author + ' added' })
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

  const increaseLike = async (updatedBlog) => {
    try {
      const afterUpdatedBlog = await blogService.updateInformation({
        id: updatedBlog.id,
        title: updatedBlog.title,
        author: updatedBlog.author,
        url: updatedBlog.url,
        user: updatedBlog.user,
        likes: updatedBlog.likes
      })
      const localUpdatedBlogIds = blogs.map(b => b.id)
      const updatedBlogIndex = localUpdatedBlogIds.indexOf(afterUpdatedBlog.id)
      const updatedBlogs = [...blogs]
      updatedBlogs[updatedBlogIndex].likes = updatedBlog.likes
      setBlogs(updatedBlogs)
    } catch (exception) {
      setErrorMessage({ type: 0, content: 'Unauthorized user' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async(toBeDeleted) => {
    try {
      await blogService.deleteBlog(toBeDeleted)
      const afterDeletedBlogs = blogs.filter(b => b.id !== toBeDeleted)
      setBlogs(afterDeletedBlogs)
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
        {errorMessage !== null && <Notification message={errorMessage} /> }
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createNewBlog={createNewBlog} />
        </Togglable>

        {blogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={increaseLike} loggedInUser={user} deleteBlog={deleteBlog}/>)}
      </div>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <h2>login to application</h2>
        {errorMessage !== null && <Notification message={errorMessage} />}
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
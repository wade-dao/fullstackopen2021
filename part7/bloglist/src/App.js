import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userInit } from './reducers/loginReducer'

import { Switch, Route, useRouteMatch } from 'react-router-dom'

import blogService from './services/blogs'

import Notification from './components/Notification'
import Blog from './components/Blog'
import Users from './components/Users'
import Menu from './components/Menu'
import User from './components/User'
import Home from './components/Home'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      dispatch(userInit(JSON.parse(loggedUserJSON)))
      blogService.setToken(JSON.parse(loggedUserJSON).token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin({ username, password }))
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

  const matchUser = useRouteMatch('/users/:id')
  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  return (
    <div>
      { loggedInUser === null
        ? loginForm()
        :
        <div>
          <Menu />
          <Switch>
            <Route path="/blogs/:id">
              <Blog blog={blog} />
            </Route>
            <Route path="/users/:id">
              <User data={user} />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App
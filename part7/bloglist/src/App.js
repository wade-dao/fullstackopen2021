import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { userInit } from './reducers/loginReducer'

import blogService from './services/blogs'

import Blog from './components/Blog'
import Users from './components/Users'
import Menu from './components/Menu'
import User from './components/User'
import Home from './components/Home'
import Login from './components/Login'

const App = () => {
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

  const matchUser = useRouteMatch('/users/:id')
  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  return (
    <div className="container">
      { loggedInUser === null
        ? <Login />
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
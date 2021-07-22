import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { initializeUsers } from '../reducers/userReducer'

const User = ({ data }) => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const matchUser = useRouteMatch('/users/:id')

  useEffect(() => {
    if (data === null || typeof data === 'undefined')
      dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    data = matchUser
      ? users.find(user => user.id === matchUser.params.id)
      : null
  }, [users, matchUser])

  if (data !== null && typeof data !== 'undefined') {
    return (
      <div>
        <h2>{data.name}</h2>
        <h3>addded blogs</h3>
        <ul>
          {data.blogs.length > 0
            ? data.blogs.map(blog =>
              <li key={blog.id}>{blog.title}</li>
            )
            : null
          }
        </ul>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>waiting for data</h2>
      </div>
    )
  }
}

export default User
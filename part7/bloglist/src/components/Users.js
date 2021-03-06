import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeUsers } from '../reducers/userReducer'

import Table from 'react-bootstrap/Table'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <div className="userList">
        <Table striped>
          <tbody>
            <tr>
              <th></th>
              <th><h4>blogs created</h4></th>
            </tr>
            {users.map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
export default Users
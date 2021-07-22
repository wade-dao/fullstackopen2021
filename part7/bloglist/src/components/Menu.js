import { React } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../reducers/loginReducer'

import Notification from './Notification'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  const navStyle = {
    padding: 5,
    backgroundColor: '#D3D3D3',
    marginBottom: 5
  }

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }

  return (
    <div>
      <div style={navStyle}>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {loggedInUser.name} logged in <button className="logoutButton" onClick={handleLogout}>logout</button>
      </div>
      <h2>blog app</h2>
      <Notification />
    </div>
  )
}
export default Menu
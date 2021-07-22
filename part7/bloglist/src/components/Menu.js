import { React } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'

import { userLogout } from '../reducers/loginReducer'

import Notification from './Notification'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Blog App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/blogs">
                <Link style={padding} to="/blogs">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="/users">
                <Link style={padding} to="/users">Users</Link>
              </Nav.Link>
              <Navbar.Text style={padding}>
                <strong>{loggedInUser.name}</strong> logged in
              </Navbar.Text>
              <Button onClick={handleLogout} variant="secondary">Log out</Button>{' '}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Notification />
    </div>
  )
}
export default Menu
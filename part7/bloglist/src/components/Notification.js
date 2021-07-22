import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (notification.content === null || notification.content === '') {
    return null
  }

  return (
    <div className="notification">
      <Alert variant={notification.type ? 'success' : 'error'}>
        {notification.content}
      </Alert>
    </div>
  )
}

export default Notification
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const defaultStyle = {
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  let success = { ...defaultStyle }
  success.color = 'green'

  let error = { ...defaultStyle }
  error.color = 'red'

  if (notification.content === null || notification.content === '') {
    return null
  }

  return (
    <div className="notification" style={notification.type ? success : error}>
      {notification.content}
    </div>
  )
}

export default Notification
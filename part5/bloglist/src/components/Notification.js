import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
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

  if (message.content === null || message.content === '') {
    return null
  }

  return (
    <div style={message.type ? success : error}>
      {message.content}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.object.isRequired
}

export default Notification
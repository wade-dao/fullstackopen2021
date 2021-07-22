import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const buttonStyle = {
    marginBottom: 5
  }

  const hide = () => {
    return (
      // <button style={buttonStyle} id="createNewBlog" onClick={toggleVisibility}>{props.buttonLabel}</button>
      <Button style={buttonStyle} id="createNewBlog" variant="primary" onClick={toggleVisibility}>
        {props.buttonLabel}
      </Button>
    )
  }

  const show = () => {
    return (
      <div>
        {props.children}
        <Button style={buttonStyle} variant="secondary" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div>
      { visible === true ? show() :  hide () }
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
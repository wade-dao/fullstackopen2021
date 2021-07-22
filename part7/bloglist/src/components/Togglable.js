import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
      <button style={buttonStyle} id="createNewBlog" onClick={toggleVisibility}>{props.buttonLabel}</button>
    )
  }

  const show = () => {
    return (
      <div>
        {props.children}
        <button style={buttonStyle} onClick={toggleVisibility}>cancel</button>
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